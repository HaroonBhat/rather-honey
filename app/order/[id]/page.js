import { notFound } from 'next/navigation';
import Link from 'next/link';
import OrderDetail from '@/components/order/OrderDetail';
import { getOrder } from '@/lib/orders';
import { formatDate, formatINR } from '@/lib/format';
import { CONFIG } from '@/lib/config';
import { CheckIcon, TruckIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Order confirmation',
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({ params }) {
  const order = await getOrder(params.id);
  if (!order) notFound();

  return (
    <div className="order-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Order {order.id}</span>
        </nav>

        <header className="order-hero">
          <span className="order-hero__check">
            <CheckIcon size={24} />
          </span>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <p className="eyebrow eyebrow--light">
              Order {order.status === 'pending_payment' ? 'received' : 'confirmed'}
            </p>
            <h1 className="display-md" style={{ color: 'var(--cream)', maxWidth: '20ch' }}>
              THANK YOU, {order.customer.fullName.split(' ')[0].toUpperCase()}.
            </h1>
            <p className="lede lede--light" style={{ maxWidth: '52ch' }}>
              Your jars are reserved. We dispatch within {CONFIG.commerce.shippingWindow}, and you can
              reach us any time on {CONFIG.contact.phone}.
            </p>
          </div>

          <div className="cluster" style={{ gap: '0.5rem 1.4rem', fontSize: '0.8rem' }}>
            <span className="order-hero__id">{order.id}</span>
            <span style={{ color: 'rgba(248,241,228,.6)' }}>Placed {formatDate(order.createdAt)}</span>
            <span style={{ color: 'rgba(248,241,228,.6)' }}>{formatINR(order.totals.total)}</span>
            <span
              className={`status-pill${order.status === 'pending_payment' ? ' status-pill--pending' : ''}`}
            >
              {order.status === 'pending_payment' ? 'Awaiting payment' : 'Confirmed'}
            </span>
          </div>

          <div className="cluster" style={{ marginTop: '0.4rem' }}>
            <Link href="/shop" className="btn btn--gold btn--sm">
              Continue shopping
            </Link>
            <a
              href={`https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(`Hi Rather Honey, my order is ${order.id}.`)}`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn--outline-light btn--sm"
            >
              <TruckIcon size={15} />
              Ask about delivery
            </a>
          </div>
        </header>

        <OrderDetail order={order} confirmation />
      </div>
    </div>
  );
}
