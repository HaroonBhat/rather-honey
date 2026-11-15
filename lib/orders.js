import crypto from 'crypto';
import { getProductById, getVariant } from './products';
import { cartTotals } from './config';
import { validateCoupon } from './coupons';
import { insertOrder, findOrder } from './store';

/**
 * Server-side order creation. Client prices are never trusted: every line is
 * re-resolved against the catalogue, then totals, shipping and discounts are
 * recomputed on the server before the order is persisted.
 */

const newOrderId = () => {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `RH-${stamp}${rand}`;
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());

export function normaliseItems(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return { error: 'Your bag is empty.' };
  }
  if (rawItems.length > 50) return { error: 'Too many items in one order.' };

  const items = [];
  for (const raw of rawItems) {
    const product = getProductById(raw?.productId);
    if (!product) return { error: 'One of the products in your bag is no longer available.' };
    const variant = getVariant(product, raw?.variantId);
    if (!variant || !variant.inStock) {
      return { error: `${product.name} is out of stock in that size.` };
    }
    const quantity = Math.floor(Number(raw?.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
      return { error: 'Quantities must be between 1 and 20.' };
    }
    items.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantId: variant.id,
      variantLabel: variant.label,
      sku: variant.sku,
      price: variant.price,
      quantity,
      image: product.images[0]?.src || '',
    });
  }
  return { items };
}

export async function createOrder(payload, user) {
  const { items, error } = normaliseItems(payload?.items);
  if (error) return { error };

  const customer = payload?.customer || {};
  const shipping = payload?.shippingAddress || {};

  const required = [
    ['fullName', customer.fullName, 'Full name'],
    ['email', customer.email, 'Email address'],
    ['phone', customer.phone, 'Phone number'],
    ['address1', shipping.address1, 'Address'],
    ['city', shipping.city, 'City'],
    ['state', shipping.state, 'State'],
    ['postalCode', shipping.postalCode, 'PIN code'],
  ];

  for (const [key, value, label] of required) {
    if (!String(value || '').trim()) return { error: `${label} is required.` };
  }
  if (!isEmail(customer.email)) return { error: 'Please enter a valid email address.' };
  if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(String(customer.phone).replace(/[\s-]/g, ''))) {
    return { error: 'Please enter a valid 10-digit Indian mobile number.' };
  }
  if (!/^\d{6}$/.test(String(shipping.postalCode).trim())) {
    return { error: 'Please enter a valid 6-digit PIN code.' };
  }

  const method = payload?.paymentMethod === 'online' ? 'online' : 'cod';
  if (method === 'online' && process.env.RAZORPAY_KEY_ID == null) {
    return {
      error:
        'Online payment is not configured yet. Choose cash on delivery, or contact us and we will arrange payment.',
    };
  }

  const subtotalRaw = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  let discount = 0;
  let coupon = null;
  if (payload?.couponCode) {
    const result = validateCoupon(payload.couponCode, subtotalRaw);
    if (result.valid) {
      discount = result.discount;
      coupon = { code: result.code, label: result.label, discount: result.discount };
    }
  }

  const totals = cartTotals(items, discount);

  const order = {
    id: newOrderId(),
    userId: user?.id || null,
    status: method === 'online' ? 'pending_payment' : 'confirmed',
    paymentMethod: method,
    paymentStatus: 'unpaid',
    coupon,
    items,
    totals,
    customer: {
      fullName: String(customer.fullName).trim(),
      email: String(customer.email).trim().toLowerCase(),
      phone: String(customer.phone).trim(),
    },
    shippingAddress: {
      address1: String(shipping.address1).trim(),
      address2: String(shipping.address2 || '').trim(),
      city: String(shipping.city).trim(),
      state: String(shipping.state).trim(),
      postalCode: String(shipping.postalCode).trim(),
      country: 'India',
    },
    notes: String(payload?.notes || '').slice(0, 500),
    createdAt: new Date().toISOString(),
    timeline: [{ at: new Date().toISOString(), label: 'Order placed' }],
  };

  await insertOrder(order);
  return { order };
}

export const getOrder = (id) => findOrder(id);

export function orderForEmail(order, email) {
  return order && String(order.customer.email).toLowerCase() === String(email).toLowerCase();
}
