'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';
import QuickView from './QuickView';
import { formatINR } from '@/lib/format';
import { priceRange } from '@/lib/products';
import { CheckIcon, PlusIcon, StarIcon } from './Icons';

export default function ProductCard({ product, lead = false, priority = false }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const { min, max } = priceRange(product);
  const [primary, secondary] = product.images;

  const priceLabel = min === max ? formatINR(min) : `${formatINR(min)} – ${formatINR(max)}`;

  function handleAdd(event) {
    event.preventDefault();
    add(product, product.variants[0].id, 1, { openDrawer: true });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <>
      <article className={`product-card${lead ? ' product-card--lead' : ''}`}>
        <div className="product-card__media">
          <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 88vw, (max-width: 900px) 44vw, 30vw"
              className="product-card__img product-card__img--primary"
            />
            {secondary && (
              <Image
                src={secondary.src}
                alt=""
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 900px) 44vw, 30vw"
                className="product-card__img product-card__img--alt"
                aria-hidden="true"
              />
            )}
          </Link>
          {product.badge && (
            <span
              className={`product-card__badge${product.badge === 'New' ? ' product-card__badge--gold' : ''}`}
            >
              {product.badge}
            </span>
          )}
          <button
            type="button"
            className="product-card__quick"
            onClick={() => setQuickOpen(true)}
          >
            Quick view
          </button>
        </div>

        <div className="product-card__body">
          <div className="product-card__row">
            <Link href={`/shop/${product.slug}`} className="product-card__name">
              {product.name}
            </Link>
            <span className="product-card__price">
              {priceLabel}
              {product.variants.length === 1 && <small>{product.variants[0].label}</small>}
            </span>
          </div>

          <p className="product-card__desc">{product.shortDescription}</p>

          <div className="product-card__foot">
            <span className="product-card__weight">
              {product.rating.count > 0 ? (
                <span className="cluster" style={{ gap: '0.3rem' }}>
                  <StarIcon size={12} filled />
                  {product.rating.value.toFixed(1)} ({product.rating.count})
                </span>
              ) : (
                product.highlights?.[0]
              )}
            </span>
            <button
              type="button"
              className={`add-btn${added ? ' is-added' : ''}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to bag`}
            >
              {added ? <CheckIcon size={13} /> : <PlusIcon size={13} />}
              {added ? 'Added' : 'Add to bag'}
            </button>
          </div>
        </div>
      </article>

      <QuickView product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
