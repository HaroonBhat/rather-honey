import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import Story from '@/components/home/Story';
import Process from '@/components/home/Process';
import Values from '@/components/home/Values';
import PromoBanner from '@/components/home/PromoBanner';
import Reviews from '@/components/home/Reviews';
import Gallery from '@/components/home/Gallery';
import { getFeaturedProducts } from '@/lib/products';
import { formatINR } from '@/lib/format';
import { CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Rather Honey — Nature’s Gold. Nothing Less.',
  description:
    'Pure, village-harvested honey from Gamroo, Bandipora in Kashmir. Hand-harvested since 2015. Shop Kiker Honey, Soli Honey and Pure Himalayan Shilajit with delivery across India.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const products = getFeaturedProducts();

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rather Honey collection',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/shop/${product.slug}`,
      name: product.name,
      image: product.images[0].src,
      offers: {
        '@type': 'Offer',
        price: product.variants[0].price,
        priceCurrency: 'INR',
        availability: product.variants[0].inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
    })),
  };

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollection />

      {/* editorial trust strip */}
      <section className="section-ribbon" aria-label="Brand highlights">
        <span>Hand-harvested in {CONFIG.origin.village}</span>
        <span>Since {CONFIG.since}</span>
        <span>Free delivery over {formatINR(CONFIG.commerce.freeShippingThreshold)}</span>
        <span>{CONFIG.commerce.returnWindow}</span>
      </section>

      <Story />
      <Process />
      <Values />
      <PromoBanner />
      <Reviews />
      <Gallery />

      {/* closing invitation */}
      <section className="section section--sand" aria-labelledby="closing-title">
        <div className="container" style={{ display: 'grid', gap: '1.2rem', justifyItems: 'center', textAlign: 'center' }}>
          <span className="eyebrow">Ready when you are</span>
          <h2 className="display-md" id="closing-title" style={{ maxWidth: '22ch', textWrap: 'balance' }}>
            ONE SPOON IS ALL IT TAKES TO <span className="accent-italic" style={{ color: 'var(--amber)' }}>UNDERSTAND.</span>
          </h2>
          <p className="lede" style={{ textAlign: 'center' }}>
            Start with a 500 g jar of Kiker Honey, or go straight for the full collection.
          </p>
          <div className="cluster justify-center" style={{ marginTop: '0.6rem' }}>
            <Link href="/shop" className="btn">
              Shop the collection
            </Link>
            <Link href="/our-story" className="btn btn--outline">
              Our story
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
