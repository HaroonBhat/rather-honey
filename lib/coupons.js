import promotions from '@/data/promotions.json';

/**
 * Coupons live in data/promotions.json so the business can publish or pause a
 * discount without a code change. Example entry:
 *
 * { "code": "HARVEST10", "type": "percent", "value": 10,
 *   "minSubtotal": 999, "enabled": true, "label": "Harvest offer" }
 */
const coupons = () => (promotions.coupons || []).filter((c) => c.enabled);

export function validateCoupon(code, subtotal) {
  const needle = String(code || '').trim().toUpperCase();
  if (!needle) return { valid: false, message: 'Enter a code to apply.' };

  const available = coupons();
  if (available.length === 0) {
    return {
      valid: false,
      message: 'No promo codes are active right now — join the newsletter to hear when one is.',
    };
  }

  const coupon = available.find((c) => c.code.toUpperCase() === needle);
  if (!coupon) return { valid: false, message: 'That code is not valid right now.' };

  if (coupon.expiresOn && new Date(coupon.expiresOn) < new Date()) {
    return { valid: false, message: 'That code has expired.' };
  }
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      message: `Add ₹${Math.ceil(coupon.minSubtotal - subtotal)} more to use this code.`,
    };
  }

  const discount =
    coupon.type === 'percent'
      ? Math.round(subtotal * (coupon.value / 100) * 100) / 100
      : Math.min(coupon.value, subtotal);

  return {
    valid: true,
    code: coupon.code.toUpperCase(),
    label: coupon.label || coupon.code,
    type: coupon.type,
    value: coupon.value,
    discount,
    message: `${coupon.label || coupon.code} applied — you saved ₹${Math.round(discount)}.`,
  };
}

export const activeBanner = () =>
  promotions.banner && promotions.banner.enabled ? promotions.banner : null;
