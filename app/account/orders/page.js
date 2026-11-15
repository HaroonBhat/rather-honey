import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { findOrdersForUser } from '@/lib/store';
import { formatDate, formatINR } from '@/lib/format';
import { ArrowRight, BagIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Your orders',
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/account?next=/account/orders');

  const orders = await findOrdersForUser(user.id);

  return (
    <div className="account-shell">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/account">Account</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Orders</span>
        </nav>

        <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
          <h1 className="display-lg">YOUR ORDERS</h1>
          <p className="small body-muted">
            {orders.length} order{orders.length === 1 ? '' : 's'} placed
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <BagIcon size={40} />
            <h2 className="display-sm">No orders yet.</h2>
            <p className="body-muted">When you order, every jar and its status shows here.</p>
            <Link href="/shop" className="btn btn--gold">
              Shop the collection
            </Link>
          </div>
        ) : (
          <div className="stack-md">
            {orders.map((order) => (
              <Link href={`/account/orders/${order.id}`} className="order-card" key={order.id}>
                <div className="order-card__head">
                  <span className="order-card__id">{order.id}</span>
                  <span className={`status-pill${order.status === 'pending_payment' ? ' status-pill--pending' : ''}`}>
                    {order.status === 'pending_payment' ? 'Awaiting payment' : 'Confirmed'}
                  </span>
                </div>
                <div className="order-card__meta">
                  <span>{formatDate(order.createdAt)}</span>
                  <span>{order.items.length} line item{order.items.length === 1 ? '' : 's'}</span>
                  <span>{formatINR(order.totals.total)}</span>
                  <span>{order.paymentMethod === 'cod' ? 'Cash on delivery' : 'Online'}</span>
                </div>
                <div className="cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="order-card__thumbs">
                    {order.items.slice(0, 4).map((item) => (
                      <span className="order-card__thumb" key={`${item.productId}-${item.variantId}`}>
                        <Image src={item.image} alt={item.name} fill sizes="42px" style={{ objectFit: 'cover' }} />
                      </span>
                    ))}
                  </span>
                  <span className="link-arrow" style={{ borderBottom: 0, paddingBottom: 0 }}>
                    View order <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
