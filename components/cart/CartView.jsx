'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../CartProvider';
import { formatINR } from '@/lib/format';
import { CONFIG } from '@/lib/config';
import { BagIcon, CheckIcon, MinusIcon, PlusIcon, ShieldIcon, TruckIcon } from '../Icons';

export default function CartView() {
  const { items, totals, coupon, setCoupon, setQuantity, remove, hydrated } = useCart();
  const [code, setCode] = useState(coupon.code || '');
  const [message, setMessage] = useState(null);
  const [checking, setChecking] = useState(false);

  async function applyCoupon(event) {
    event.preventDefault();
    if (!code.trim()) return;
    setChecking(true);
    setMessage(null);
    try {
      const res = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), subtotal: totals.subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setCoupon({ code: data.code, label: data.label, discount: data.discount });
        setMessage({ tone: 'ok', text: data.message });
      } else {
        setCoupon(null);
        setMessage({ tone: 'err', text: data.message || 'That code is not valid.' });
      }
    } catch {
      setMessage({ tone: 'err', text: 'Could not check that code. Try again.' });
    } finally {
      setChecking(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="container">
        <div className="skeleton" style={{ height: 280, borderRadius: 4 }} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <BagIcon size={44} />
          <h2 className="display-sm">Your bag is empty.</h2>
          <p className="body-muted" style={{ maxWidth: '36ch' }}>
            Honey keeps for years. Your bag, unfortunately, does not hold itself.
          </p>
          <Link href="/shop" className="btn btn--gold">
            Shop the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-layout">
        <div>
          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-line" key={item.key}>
                <Link href={`/shop/${item.slug}`} className="cart-line__media">
                  <Image src={item.image} alt={item.name} fill sizes="112px" style={{ objectFit: 'cover' }} />
                </Link>
                <div>
                  <Link href={`/shop/${item.slug}`} className="cart-line__name">
                    {item.name}
                  </Link>
                  <p className="cart-line__meta">
                    {item.variantLabel} · {formatINR(item.price)} each
                  </p>
                  <button
                    type="button"
                    className="cart-line__side"
                    onClick={() => remove(item.key)}
                    style={{
                      display: 'inline-flex',
                      marginTop: '0.5rem',
                      fontSize: '0.74rem',
                      color: 'rgba(36,23,15,.5)',
                      textDecoration: 'underline',
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-line__side">
                  <div className="qty">
                    <button
                      type="button"
                      className="qty__btn"
                      onClick={() => setQuantity(item.key, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <MinusIcon size={14} />
                    </button>
                    <span className="qty__value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty__btn"
                      onClick={() => setQuantity(item.key, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      disabled={item.quantity >= 20}
                    >
                      <PlusIcon size={14} />
                    </button>
                  </div>
                  <span className="cart-line__price">{formatINR(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cluster" style={{ marginTop: '1.4rem', justifyContent: 'space-between' }}>
            <Link href="/shop" className="link-arrow">
              Continue shopping
            </Link>
            <p className="small body-muted">
              Dispatch in {CONFIG.commerce.shippingWindow} · {CONFIG.commerce.returnWindow}
            </p>
          </div>
        </div>

        <aside className="summary" aria-label="Order summary">
          <h2 className="summary__title">Order summary</h2>

          <div className="summary__rows">
            <div className="summary-row">
              <span>
                Subtotal ({totals.itemCount} item{totals.itemCount === 1 ? '' : 's'})
              </span>
              <strong>{formatINR(totals.subtotal)}</strong>
            </div>
            {coupon.code && totals.discount > 0 && (
              <div className="summary-row summary-row--discount">
                <span>Discount ({coupon.code})</span>
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
          </div>

          <form className="coupon" onSubmit={applyCoupon}>
            <label className="field__label" htmlFor="coupon-code">
              Have a code?
            </label>
            <div className="coupon__row">
              <input
                id="coupon-code"
                className="input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                autoComplete="off"
              />
              <button type="submit" className="btn btn--sm btn--outline" disabled={checking}>
                {checking ? 'Checking' : 'Apply'}
              </button>
            </div>
            {message && (
              <p className={`coupon__msg coupon__msg--${message.tone}`} role="status">
                {message.text}
              </p>
            )}
          </form>

          <Link href="/checkout" className="btn btn--gold btn--block">
            Proceed to checkout
          </Link>

          <p className="summary__note">
            {totals.shipping === 0 ? (
              <>
                <CheckIcon size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                Free delivery applied.
              </>
            ) : (
              <>
                <TruckIcon size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                Add {formatINR(CONFIG.commerce.freeShippingThreshold - totals.subtotal)} more for free
                delivery.
              </>
            )}
          </p>
          <p className="summary__note">
            <ShieldIcon size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
            Secure checkout · No card details stored on our servers.
          </p>
        </aside>
      </div>
    </div>
  );
}
