'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../CartProvider';
import { useToast } from '../ToastProvider';
import { formatINR } from '@/lib/format';
import { CONFIG } from '@/lib/config';
import { INDIAN_STATES, isEmail, isPhone, isPin } from '@/lib/validate';
import { BagIcon, CheckIcon, ShieldIcon, TruckIcon } from '../Icons';

const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  notes: '',
};

export default function CheckoutForm({ user, onlinePaymentsEnabled }) {
  const { items, totals, coupon, hydrated, clear } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [payment, setPayment] = useState('cod');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm((current) => ({
      ...current,
      fullName: current.fullName || user.name || '',
      email: current.email || user.email || '',
      phone: current.phone || user.phone || '',
      address1: current.address1 || user.address?.address1 || '',
      address2: current.address2 || user.address?.address2 || '',
      city: current.city || user.address?.city || '',
      state: current.state || user.address?.state || '',
      postalCode: current.postalCode || user.address?.postalCode || '',
    }));
  }, [user]);

  const update = (key) => (event) => {
    const value = event.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate() {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!isEmail(form.email)) next.email = 'Enter a valid email address.';
    if (!isPhone(form.phone)) next.phone = 'Enter a valid 10-digit mobile number.';
    if (!form.address1.trim()) next.address1 = 'Street address is required.';
    if (!form.city.trim()) next.city = 'City is required.';
    if (!form.state) next.state = 'Select your state.';
    if (!isPin(form.postalCode)) next.postalCode = 'Enter a 6-digit PIN code.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitError('');
    if (!validate()) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
          customer: { fullName: form.fullName, email: form.email, phone: form.phone },
          shippingAddress: {
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
          },
          notes: form.notes,
          paymentMethod: payment,
          couponCode: coupon.code || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || 'We could not place your order. Please try again.');
        setSubmitting(false);
        return;
      }

      toast('Order placed — thank you!');
      clear();
      router.push(`/order/${data.order.id}?placed=1`);
    } catch {
      setSubmitError('Network error — please check your connection and try again.');
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="container">
        <div className="skeleton" style={{ height: 320, borderRadius: 4 }} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <BagIcon size={44} />
          <h2 className="display-sm">There is nothing to check out yet.</h2>
          <p className="body-muted">Add a jar to your bag and come back.</p>
          <Link href="/shop" className="btn btn--gold">
            Shop the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <form className="checkout__grid" onSubmit={onSubmit} noValidate>
        <div>
          {!user && (
            <p className="form-note" style={{ marginBottom: '1.2rem' }}>
              Checking out as a guest. <Link href="/account" style={{ textDecoration: 'underline' }}>Sign in</Link>{' '}
              to keep your order history in one place.
            </p>
          )}

          <section className="checkout__section" aria-labelledby="contact-heading">
            <div className="checkout__section-head">
              <h2 className="checkout__section-title" id="contact-heading">
                <span className="checkout__section-num">1</span> Contact
              </h2>
            </div>
            <div className="form-grid form-grid--2">
              <div className="field">
                <label className="field__label" htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  className="input"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={update('fullName')}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p className="field__error" id="fullName-error">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="phone">
                  Mobile number
                </label>
                <input
                  id="phone"
                  className="input"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile"
                  value={form.phone}
                  onChange={update('phone')}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p className="field__error" id="phone-error">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="field span-2">
                <label className="field__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p className="field__error" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="checkout__section" aria-labelledby="shipping-heading">
            <div className="checkout__section-head">
              <h2 className="checkout__section-title" id="shipping-heading">
                <span className="checkout__section-num">2</span> Shipping address
              </h2>
              <span className="form-note">India only</span>
            </div>
            <div className="form-grid">
              <div className="field">
                <label className="field__label" htmlFor="address1">
                  Address
                </label>
                <input
                  id="address1"
                  className="input"
                  autoComplete="address-line1"
                  placeholder="House / street / village"
                  value={form.address1}
                  onChange={update('address1')}
                  aria-invalid={Boolean(errors.address1)}
                  aria-describedby={errors.address1 ? 'address1-error' : undefined}
                />
                {errors.address1 && (
                  <p className="field__error" id="address1-error">
                    {errors.address1}
                  </p>
                )}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="address2">
                  Landmark / apartment <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                </label>
                <input
                  id="address2"
                  className="input"
                  autoComplete="address-line2"
                  value={form.address2}
                  onChange={update('address2')}
                />
              </div>
              <div className="form-grid form-grid--3">
                <div className="field">
                  <label className="field__label" htmlFor="city">
                    City / town
                  </label>
                  <input
                    id="city"
                    className="input"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={update('city')}
                    aria-invalid={Boolean(errors.city)}
                  />
                  {errors.city && <p className="field__error">{errors.city}</p>}
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="state">
                    State
                  </label>
                  <select
                    id="state"
                    className="select"
                    autoComplete="address-level1"
                    value={form.state}
                    onChange={update('state')}
                    aria-invalid={Boolean(errors.state)}
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="field__error">{errors.state}</p>}
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="postalCode">
                    PIN code
                  </label>
                  <input
                    id="postalCode"
                    className="input"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={6}
                    value={form.postalCode}
                    onChange={update('postalCode')}
                    aria-invalid={Boolean(errors.postalCode)}
                  />
                  {errors.postalCode && <p className="field__error">{errors.postalCode}</p>}
                </div>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="notes">
                  Delivery notes <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                </label>
                <textarea
                  id="notes"
                  className="textarea"
                  value={form.notes}
                  onChange={update('notes')}
                  placeholder="Anything we should know?"
                  maxLength={500}
                />
              </div>
            </div>
          </section>

          <section className="checkout__section" aria-labelledby="payment-heading">
            <div className="checkout__section-head">
              <h2 className="checkout__section-title" id="payment-heading">
                <span className="checkout__section-num">3</span> Payment
              </h2>
            </div>
            <div className="form-grid">
              <label className="radio-card">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === 'cod'}
                  onChange={() => setPayment('cod')}
                  disabled={!CONFIG.commerce.codEnabled}
                />
                <span>
                  <b>Cash on delivery</b>
                  <span>Pay the courier when your jars arrive. Available across India.</span>
                </span>
              </label>

              <label className="radio-card">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={payment === 'online'}
                  onChange={() => setPayment('online')}
                  disabled={!onlinePaymentsEnabled}
                />
                <span>
                  <b>Pay online {onlinePaymentsEnabled ? '' : '(coming soon)'}</b>
                  <span>
                    {onlinePaymentsEnabled
                      ? 'UPI, cards and net banking via our payment gateway.'
                      : 'Our payment gateway is not connected yet. Until then, cash on delivery is available — or call us to arrange a bank transfer.'}
                  </span>
                </span>
              </label>
            </div>
          </section>

          {submitError && (
            <div className="alert alert--error" role="alert" style={{ marginBottom: '1rem' }}>
              {submitError}
            </div>
          )}

          <button type="submit" className="btn btn--gold btn--block" disabled={submitting}>
            {submitting ? 'Placing your order…' : `Place order · ${formatINR(totals.total)}`}
          </button>

          <p className="secure-note" style={{ marginTop: '0.8rem', justifyContent: 'center' }}>
            <ShieldIcon size={14} />
            Your details are used only to fulfil this order.
          </p>
        </div>

        <aside className="order-mini" aria-label="Order summary">
          <h2 className="summary__title" style={{ color: 'var(--cream)' }}>
            Your order
          </h2>

          <div className="order-mini__items">
            {items.map((item) => (
              <div className="order-mini__item" key={item.key}>
                <span className="order-mini__item-media">
                  <Image src={item.image} alt="" fill sizes="48px" style={{ objectFit: 'cover' }} />
                </span>
                <span>
                  <b>{item.name}</b>
                  <span>
                    {item.variantLabel} × {item.quantity}
                  </span>
                </span>
                <span style={{ fontSize: '0.82rem' }}>{formatINR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <hr className="hairline hairline--light" />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatINR(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="summary-row" style={{ color: '#9fd9b8' }}>
              <span>Discount {coupon.code ? `(${coupon.code})` : ''}</span>
              <span>−{formatINR(totals.discount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Delivery</span>
            <span>{totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <span>{formatINR(totals.total)}</span>
          </div>

          <p className="summary__note" style={{ color: 'rgba(248,241,228,.55)' }}>
            <TruckIcon size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
            Dispatch in {CONFIG.commerce.shippingWindow}. {CONFIG.commerce.returnWindow}.
          </p>
          <Link href="/cart" className="link-arrow link-arrow--light">
            Edit bag
          </Link>
        </aside>
      </form>
    </div>
  );
}
