import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductGallery from '@/components/shop/ProductGallery';
import ProductPurchase from '@/components/shop/ProductPurchase';
import Accordion from '@/components/Accordion';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import { formatINR } from '@/lib/format';
import { CONFIG } from '@/lib/config';
import { StarIcon } from '@/components/Icons';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };

  const price = Math.min(...product.variants.map((v) => v.price));
  const title = `${product.name} — ${product.variants[0].label} · ${formatINR(price)}`;
  const description = `${product.shortDescription} Free delivery over ₹${CONFIG.commerce.freeShippingThreshold}. Dispatch in ${CONFIG.commerce.shippingWindow}.`;

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `/shop/${product.slug}`,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0].src],
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 2);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => `${siteUrl}${i.src}`),
    sku: product.variants[0].sku,
    brand: { '@type': 'Brand', name: CONFIG.brand },
    category: product.category === 'shilajit' ? 'Health & Wellness' : 'Grocery & Gourmet Food',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...product.variants.map((v) => v.price)),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability: 'https://schema.org/InStock',
      offers: product.variants.map((variant) => ({
        '@type': 'Offer',
        name: `${product.name} — ${variant.label}`,
        sku: variant.sku,
        price: variant.price,
        priceCurrency: 'INR',
        availability: variant.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: `${siteUrl}/shop/${product.slug}`,
        seller: { '@type': 'Organization', name: CONFIG.legalName },
      })),
    },
    ...(product.rating.count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.value,
            reviewCount: product.rating.count,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${siteUrl}/shop` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${siteUrl}/shop/${product.slug}` },
    ],
  };

  return (
    <>
      <div className="pdp">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="pdp__grid">
            <ProductGallery images={product.images} name={product.name} badge={product.badge} />

            <div className="pdp__info">
              <div>
                <p className="eyebrow" style={{ marginBottom: '0.7rem' }}>
                  {product.category === 'shilajit' ? 'Shilajit' : 'Raw honey'} · {product.origin}
                </p>
                <h1 className="pdp__title">{product.name}</h1>
                <p className="pdp__subtitle" style={{ marginTop: '0.4rem' }}>
                  {product.subtitle}
                </p>

                {product.rating.count > 0 && (
                  <p className="pdp__rating" style={{ marginTop: '0.7rem' }}>
                    <span className="stars" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} size={14} filled={i < Math.round(product.rating.value)} />
                      ))}
                    </span>
                    {product.rating.value.toFixed(1)} · {product.rating.count} verified review
                    {product.rating.count === 1 ? '' : 's'} on our store
                  </p>
                )}

                <p className="pdp__short" style={{ marginTop: '1rem' }}>
                  {product.shortDescription}
                </p>

                <div className="pdp__highlights" style={{ marginTop: '0.9rem' }}>
                  {product.highlights.map((highlight) => (
                    <span className="pill" key={highlight}>
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <ProductPurchase product={product} />

              <Accordion
                items={[
                  {
                    title: 'About this jar',
                    content: (
                      <>
                        {product.description.map((paragraph) => (
                          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                        ))}
                        <ul>
                          {product.notes.map((note) => (
                            <li key={note}>{note}</li>
                          ))}
                        </ul>
                      </>
                    ),
                  },
                  {
                    title: 'Delivery & returns',
                    content: (
                      <>
                        <p>
                          We dispatch orders within {CONFIG.commerce.shippingWindow}. Delivery is free on
                          orders over {formatINR(CONFIG.commerce.freeShippingThreshold)}; below that a flat{' '}
                          {formatINR(CONFIG.commerce.shippingFlatRate)} applies.
                        </p>
                        <p>
                          Every jar is covered by our {CONFIG.commerce.returnWindow}. If something is
                          wrong with your order, write to{' '}
                          <a href={`mailto:${CONFIG.contact.email}`}>{CONFIG.contact.email}</a> and we
                          will sort it out.
                        </p>
                      </>
                    ),
                  },
                  {
                    title: 'Storage & care',
                    content: (
                      <p>
                        Store in a cool, dry place away from direct sunlight. Honey can crystallise
                        naturally over time — stand the jar in warm water if you prefer it runny. For
                        shilajit, take a pea-sized amount with lukewarm water or milk once daily.
                      </p>
                    ),
                  },
                ]}
              />

              <p className="form-note">
                Questions before ordering? Call{' '}
                <a href={`tel:${CONFIG.contact.phoneRaw}`} style={{ textDecoration: 'underline' }}>
                  {CONFIG.contact.phone}
                </a>{' '}
                or{' '}
                <a href={`mailto:${CONFIG.contact.email}`} style={{ textDecoration: 'underline' }}>
                  email us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--shell" aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <Reveal>
                <p className="eyebrow" style={{ marginBottom: '0.8rem' }}>
                  Keep exploring
                </p>
                <h2 className="display-md" id="related-title">
                  YOU MIGHT ALSO LIKE
                </h2>
              </Reveal>
            </div>
            <div className="shop-grid" style={{ paddingTop: 0 }}>
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
