import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import OrderDetail from '@/components/order/OrderDetail';
import { getCurrentUser } from '@/lib/auth';
import { findOrderForUser } from '@/lib/store';
import { formatDate, formatINR } from '@/lib/format';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Order details',
  robots: { index: false, follow: false },
};

export default async function AccountOrderPage({ params }) {
  const user = await getCurrentUser();
  if (!user) redirect(`/account?next=/account/orders/${params.id}`);

  const order = await findOrderForUser(params.id, user.id);
  if (!order) notFound();

  return (
    <div className="account-shell">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/account">Account</Link>
          <span aria-hidden="true">/</span>
          <Link href="/account/orders">Orders</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{order.id}</span>
        </nav>

        <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.6rem' }}>
          <div>
            <h1 className="display-md">ORDER {order.id}</h1>
            <p className="small body-muted" style={{ marginTop: '0.4rem' }}>
              Placed {formatDate(order.createdAt)} · {formatINR(order.totals.total)}
            </p>
          </div>
          <span className={`status-pill${order.status === 'pending_payment' ? ' status-pill--pending' : ''}`}>
            {order.status === 'pending_payment' ? 'Awaiting payment' : 'Confirmed'}
          </span>
        </div>

        <OrderDetail order={order} />

        <p style={{ marginTop: '1.6rem' }}>
          <Link href="/account/orders" className="link-arrow">
            Back to all orders
          </Link>
        </p>
      </div>
    </div>
  );
}
