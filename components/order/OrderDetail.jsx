import Image from 'next/image';
import Link from 'next/link';
import { formatINR, formatDate } from '@/lib/format';
import { CONFIG } from '@/lib/config';
import { CheckIcon, MailIcon, PhoneIcon, PinIcon, TruckIcon } from '../Icons';

const statusLabel = (order) =>
  order.paymentMethod === 'online' && order.status === 'pending_payment'
    ? 'Awaiting payment'
    : 'Confirmed';

export default function OrderDetail({ order, confirmation = false }) {
  const { totals, customer, shippingAddress, items } = order;
  const pending = order.status === 'pending_payment';

  return (
    <div className="order-grid">
      <div className="stack-lg">
        <section className="panel" aria-labelledby="order-items-title">
          <h2 className="panel__title" id="order-items-title">
            What&apos;s coming
          </h2>
          {items.map((item) => (
            <div className="line-item" key={`${item.productId}-${item.variantId}`}>
              <Link href={`/shop/${item.slug}`} className="line-item__media">
                <Image src={item.image} alt={item.name} fill sizes="76px" style={{ objectFit: 'cover' }} />
              </Link>
              <div>
                <Link href={`/shop/${item.slug}`} className="line-item__name">
                  {item.name}
                </Link>
                <p className="line-item__meta">
                  {item.variantLabel} · Qty {item.quantity} · {item.sku}
                </p>
              </div>
              <span className="line-item__price">{formatINR(item.price * item.quantity)}</span>
            </div>
          ))}

          <hr className="hairline" />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatINR(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="summary-row summary-row--discount">
              <span>Discount {order.coupon?.code ? `(${order.coupon.code})` : ''}</span>
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
          <p className="form-note">
            Payment method: {order.paymentMethod === 'cod' ? 'Cash on delivery' : 'Online payment'} ·{' '}
            {order.paymentStatus === 'paid' ? 'Paid' : 'Payment due on delivery'}
          </p>
        </section>

        <section className="panel" aria-labelledby="order-timeline-title">
          <h2 className="panel__title" id="order-timeline-title">
            Progress
          </h2>
          {order.timeline.map((entry) => (
            <div className="panel__row" key={entry.at + entry.label}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckIcon size={15} style={{ color: '#1f7a4d' }} />
                {entry.label}
              </span>
              <b>{formatDate(entry.at)}</b>
            </div>
          ))}
          <div className="panel__row">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
              <TruckIcon size={15} />
              Dispatch & delivery
            </span>
            <span>Within {CONFIG.commerce.shippingWindow}</span>
          </div>
          {order.notes && (
            <p className="form-note" style={{ borderTop: '1px solid var(--line)', paddingTop: '0.7rem' }}>
              <strong>Your note:</strong> {order.notes}
            </p>
          )}
        </section>
      </div>

      <div className="stack-md">
        <section className="panel" aria-labelledby="ship-address-title">
          <h2 className="panel__title" id="ship-address-title">
            Shipping to
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
            <strong>{customer.fullName}</strong>
            <br />
            {shippingAddress.address1}
            {shippingAddress.address2 ? (
              <>
                <br />
                {shippingAddress.address2}
              </>
            ) : null}
            <br />
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
            <br />
            {shippingAddress.country}
          </p>
          <hr className="hairline" />
          <p style={{ fontSize: '0.85rem', display: 'grid', gap: '0.4rem' }}>
            <a href={`mailto:${customer.email}`} style={{ display: 'flex', gap: '0.5rem' }}>
              <MailIcon size={15} /> {customer.email}
            </a>
            <a href={`tel:${customer.phone}`} style={{ display: 'flex', gap: '0.5rem' }}>
              <PhoneIcon size={15} /> {customer.phone}
            </a>
          </p>
        </section>

        <section className="panel">
          <h2 className="panel__title">Need to change something?</h2>
          <p className="form-note" style={{ lineHeight: 1.6 }}>
            Call or WhatsApp us with your order number and we will help.
          </p>
          <a href={`https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(`Hi Rather Honey, I have a question about order ${order.id}.`)}`} className="btn btn--sm btn--outline" target="_blank" rel="noreferrer noopener">
            <PhoneIcon size={15} />
            WhatsApp us
          </a>
          <p className="form-note" style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
            <PinIcon size={14} style={{ flex: 'none', marginTop: 2 }} />
            {CONFIG.contact.address}
          </p>
        </section>

        {confirmation && (
          <p className="form-note">
            A note: this storefront records your order on our side and our team confirms it by phone
            or email. {pending ? 'Online payment is not connected yet, so no money has been taken.' : 'No payment has been collected online — you pay on delivery.'}
          </p>
        )}
      </div>

      <span className="visually-hidden">{statusLabel(order)}</span>
    </div>
  );
}
