import Link from 'next/link';
import CartView from '@/components/cart/CartView';

export const metadata = {
  title: 'Your bag',
  description: 'Review the honey and shilajit in your Rather Honey bag before checkout.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="cart-page">
      <header className="container" style={{ marginBottom: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Bag</span>
        </nav>
        <h1 className="display-lg">YOUR BAG</h1>
      </header>
      <CartView />
    </div>
  );
}
