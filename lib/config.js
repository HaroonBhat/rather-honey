import site from '@/data/site.json';

export const CONFIG = site;

export const shippingFor = (subtotal) => {
  const { freeShippingThreshold, shippingFlatRate } = site.commerce;
  if (!subtotal) return 0;
  return subtotal >= freeShippingThreshold ? 0 : shippingFlatRate;
};

export const cartTotals = (items = [], discount = 0) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountValue = Math.round(Math.min(discount, subtotal) * 100) / 100;
  const shipping = shippingFor(subtotal - discountValue);
  const total = Math.round((subtotal - discountValue + shipping) * 100) / 100;
  return { subtotal, discount: discountValue, shipping, total, itemCount: items.reduce((n, i) => n + i.quantity, 0) };
};
