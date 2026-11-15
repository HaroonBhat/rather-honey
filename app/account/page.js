import { Suspense } from 'react';
import Link from 'next/link';
import AuthForm from '@/components/account/AuthForm';
import LogoutButton from '@/components/account/LogoutButton';
import { getCurrentUser } from '@/lib/auth';
import { findOrdersForUser } from '@/lib/store';
import { formatDate, formatINR } from '@/lib/format';
import { ArrowRight, BagIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Your account',
  description: 'Sign in to Rather Honey to view orders and check out faster.',
  robots: { index: false, follow: true },
};

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Suspense fallback={<div className="loading-page"><span className="loader-hex" /></div>}>
        <AuthForm />
      </Suspense>
    );
  }

  const orders = await findOrdersForUser(user.id);
  const recent = orders.slice(0, 3);

  return (
    <div className="account-shell">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Account</span>
        </nav>

        <h1 className="display-lg" style={{ marginBottom: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
          HELLO, {user.name.split(' ')[0].toUpperCase()}.
        </h1>

        <div className="account-grid">
          <nav className="account-nav" aria-label="Account">
            <Link href="/account" aria-current="page">
              Overview
            </Link>
            <Link href="/account/orders">
              Orders <span aria-hidden="true">{orders.length}</span>
            </Link>
            <Link href="/shop">Shop</Link>
            <Link href="/policies/shipping-returns">Shipping & returns</Link>
            <LogoutButton />
          </nav>

          <div className="stack-lg">
            <section className="panel" aria-labelledby="profile-title">
              <div className="cluster" style={{ justifyContent: 'space-between' }}>
                <h2 className="panel__title" id="profile-title">
                  Your details
                </h2>
                <span className="pill">{user.name.split(' ')[0]}</span>
              </div>
              <div className="panel__row">
                <span>Name</span>
                <b>{user.name}</b>
              </div>
              <div className="panel__row">
                <span>Email</span>
                <b>{user.email}</b>
              </div>
              <div className="panel__row">
                <span>Phone</span>
                <b>{user.phone || '—'}</b>
              </div>
              <div className="panel__row">
                <span>With us since</span>
                <b>{formatDate(user.createdAt)}</b>
              </div>
            </section>

            <section aria-labelledby="recent-orders-title">
              <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 className="panel__title" id="recent-orders-title">
                  Recent orders
                </h2>
                <Link href="/account/orders" className="link-arrow">
                  All orders <ArrowRight size={14} />
                </Link>
              </div>

              {recent.length === 0 ? (
                <div className="panel" style={{ justifyItems: 'start' }}>
                  <BagIcon size={30} style={{ color: 'var(--gold)' }} />
                  <p style={{ fontSize: '0.92rem' }}>No orders yet — your first jar is waiting.</p>
                  <Link href="/shop" className="btn btn--sm btn--outline">
                    Shop the collection
                  </Link>
                </div>
              ) : (
                <div className="stack-md">
                  {recent.map((order) => (
                    <Link href={`/account/orders/${order.id}`} className="order-card" key={order.id}>
                      <div className="order-card__head">
                        <span className="order-card__id">{order.id}</span>
                        <span className={`status-pill${order.status === 'pending_payment' ? ' status-pill--pending' : ''}`}>
                          {order.status === 'pending_payment' ? 'Awaiting payment' : 'Confirmed'}
                        </span>
                      </div>
                      <div className="order-card__meta">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>
                          {order.items.reduce((n, i) => n + i.quantity, 0)} item
                          {order.items.reduce((n, i) => n + i.quantity, 0) === 1 ? '' : 's'}
                        </span>
                        <span>{formatINR(order.totals.total)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
