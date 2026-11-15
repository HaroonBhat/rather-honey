import Link from 'next/link';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { getCurrentUser } from '@/lib/auth';
import { ShieldIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Secure checkout',
  description: 'Complete your Rather Honey order.',
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  const onlinePaymentsEnabled = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

  return (
    <div className="checkout">
      <header className="container" style={{ marginBottom: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cart">Bag</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Checkout</span>
        </nav>
        <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h1 className="display-lg">CHECKOUT</h1>
          <span className="secure-note">
            <ShieldIcon size={15} />
            Secure checkout
          </span>
        </div>
      </header>

      <CheckoutForm user={user} onlinePaymentsEnabled={onlinePaymentsEnabled} />
    </div>
  );
}
