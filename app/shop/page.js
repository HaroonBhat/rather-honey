import Link from 'next/link';
import ShopBrowser from '@/components/shop/ShopBrowser';
import { categories } from '@/lib/products';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Shop — Raw honey & Himalayan shilajit',
  description:
    'Buy Rather Honey online: Kiker Honey and Soli Honey harvested in Gamroo, Bandipora, plus Pure Himalayan Shilajit from Gurez Valley. Free delivery over ₹999.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop Rather Honey',
    description: 'Kiker Honey, Soli Honey and Pure Himalayan Shilajit — delivered across India.',
    url: '/shop',
  },
};

export default function ShopPage({ searchParams }) {
  const initialCategory = categories.some((c) => c.slug === searchParams?.category)
    ? searchParams.category
    : 'all';
  const initialQuery = typeof searchParams?.q === 'string' ? searchParams.q : '';

  return (
    <>
      <header className="page-head">
        <div className="container page-head__inner">
          <Reveal as="nav" className="breadcrumbs" aria-label="Breadcrumb" variant="fade">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Shop</span>
          </Reveal>
          <Reveal as="h1" className="display-lg page-head__title" variant="up">
            THE COLLECTION
          </Reveal>
          <Reveal as="p" className="lede" variant="fade" delay={80}>
            Every jar on this page comes from our own village in Kashmir — or, in the case of our
            shilajit, from the mountains of Gurez Valley. Real products, real sizes, real prices.
          </Reveal>
        </div>
      </header>

      <ShopBrowser initialCategory={initialCategory} initialQuery={initialQuery} />
    </>
  );
}
