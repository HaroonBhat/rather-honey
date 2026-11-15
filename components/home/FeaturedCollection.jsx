import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '../ProductCard';
import Reveal from '../Reveal';
import { ArrowRight } from '../Icons';

export default function FeaturedCollection() {
  const products = getFeaturedProducts();
  const [lead, ...rest] = products;

  return (
    <section className="section section--cream collection" id="collection" aria-labelledby="collection-title">
      <div className="container">
        <div className="collection__head">
          <Reveal as="div">
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              The collection
            </p>
            <h2 className="display-lg collection__title" id="collection-title">
              A LITTLE BIT OF <em>NATURE</em> IN EVERY JAR.
            </h2>
          </Reveal>
          <Reveal className="collection__aside" variant="up" delay={120}>
            <p className="lede" style={{ fontSize: '0.98rem' }}>
              Real jars from the Rather Honey shelf — harvested in Gamroo, Bandipora and bottled in
              small batches. Choose your size, we&apos;ll do the rest.
            </p>
            <Link href="/shop" className="link-arrow">
              Shop all products
              <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="featured-grid">
          {lead && (
            <Reveal variant="up">
              <ProductCard product={lead} lead priority />
            </Reveal>
          )}
          <div className="featured-grid__stack">
            {rest.map((product, index) => (
              <Reveal key={product.id} variant="up" delay={120 + index * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
