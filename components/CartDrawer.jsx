'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { formatINR } from '@/lib/format';
import { CONFIG, shippingFor } from '@/lib/config';
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TruckIcon } from './Icons';

export default function CartDrawer() {
  const { items, totals, isOpen, closeCart, setQuantity, remove } = useCart();
  const threshold = CONFIG.commerce.freeShippingThreshold;
  const remaining = Math.max(0, threshold - totals.subtotal);
  const progress = Math.min(1, totals.subtotal / threshold);

  return (
    <>
      <div
        className={`scrim${isOpen ? ' is-open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`drawer${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className="drawer__head">
          <h2 className="drawer__title">
            Your bag <span>{totals.itemCount} item{totals.itemCount === 1 ? '' : 's'}</span>
          </h2>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="Close bag">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="drawer__empty">
              <BagIcon size={40} />
              <p style={{ maxWidth: '26ch' }}>
                Your bag is empty. Something golden belongs in here.
              </p>
              <Link href="/shop" className="btn btn--gold btn--sm" onClick={closeCart}>
                Shop the collection
              </Link>
            </div>
          ) : (
            <>
              <div className="ship-progress">
                <span>
                  {remaining > 0 ? (
                    <>
                      You&apos;re <strong>{formatINR(remaining)}</strong> away from free delivery
                    </>
                  ) : (
                    <>
                      <TruckIcon size={15} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
                      Free delivery unlocked
                    </>
                  )}
                </span>
                <span className="ship-progress__bar" aria-hidden="true">
                  <span
                    className="ship-progress__fill"
                    style={{ display: 'block', transform: `scaleX(${progress})` }}
                  />
                </span>
              </div>

              {items.map((item) => (
                <div className="line-item" key={item.key}>
                  <Link href={`/shop/${item.slug}`} className="line-item__media" onClick={closeCart}>
                    <Image src={item.image} alt={item.name} fill sizes="76px" style={{ objectFit: 'cover' }} />
                  </Link>
                  <div>
                    <Link href={`/shop/${item.slug}`} className="line-item__name" onClick={closeCart}>
                      {item.name}
                    </Link>
                    <p className="line-item__meta">{item.variantLabel}</p>
                    <div className="qty" style={{ marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        className="qty__btn"
                        onClick={() => setQuantity(item.key, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span className="qty__value" aria-live="polite">
                        {item.quantity}
                      </span>
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
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="line-item__price">{formatINR(item.price * item.quantity)}</p>
                    <button
                      type="button"
                      className="line-item__remove"
                      onClick={() => remove(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatINR(totals.subtotal)}</strong>
            </div>
            <div className="summary-row summary-row--muted">
              <span>Delivery</span>
              <span>{shippingFor(totals.subtotal) === 0 ? 'Free' : formatINR(totals.shipping)}</span>
            </div>
            <Link href="/checkout" className="btn btn--gold btn--block" onClick={closeCart}>
              Checkout · {formatINR(totals.total)}
            </Link>
            <Link
              href="/cart"
              className="link-arrow"
              onClick={closeCart}
              style={{ justifySelf: 'center' }}
            >
              View full bag
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
