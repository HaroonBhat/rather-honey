'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { formatINR } from '@/lib/format';
import { CloseIcon, MinusIcon, PlusIcon, StarIcon } from './Icons';

export default function QuickView({ product, open, onClose }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setVariantId(product.variants[0].id);
      setQuantity(1);
    }
  }, [open, product]);

  return (
    <div
      className={`quick${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} quick view`}
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="quick__panel">
        <button type="button" className="quick__close icon-btn" onClick={onClose} aria-label="Close quick view">
          <CloseIcon size={20} />
        </button>

        <div className="quick__media">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 760px) 90vw, 320px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="quick__body">
          <span className="eyebrow">{product.category === 'shilajit' ? 'Shilajit' : 'Raw honey'}</span>
          <h2 className="display-sm" style={{ fontSize: '1.9rem' }}>{product.name}</h2>
          {product.rating.count > 0 && (
            <p className="cluster" style={{ gap: '0.4rem', fontSize: '0.78rem', color: 'rgba(36,23,15,.6)' }}>
              <span className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} size={13} filled={i < Math.round(product.rating.value)} />
                ))}
              </span>
              {product.rating.value.toFixed(1)} · {product.rating.count} review{product.rating.count === 1 ? '' : 's'}
            </p>
          )}
          <p style={{ fontSize: '0.88rem', color: 'rgba(36,23,15,.68)', lineHeight: 1.6 }}>
            {product.shortDescription}
          </p>

          <div className="variant">
            <span className="field__label">Size</span>
            <div className="variant__options">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className="variant__opt"
                  aria-pressed={v.id === variantId}
                  onClick={() => setVariantId(v.id)}
                >
                  {v.label}
                  <small>{formatINR(v.price)}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="cluster" style={{ justifyContent: 'space-between', gap: '0.8rem' }}>
            <div className="qty">
              <button
                type="button"
                className="qty__btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <MinusIcon size={14} />
              </button>
              <span className="qty__value">{quantity}</span>
              <button
                type="button"
                className="qty__btn"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                disabled={quantity >= 20}
              >
                <PlusIcon size={14} />
              </button>
            </div>
            <span className="pdp__price" style={{ fontSize: '1.5rem' }}>
              {formatINR(variant.price * quantity)}
            </span>
          </div>

          <button
            type="button"
            className="btn btn--gold btn--block"
            onClick={() => {
              add(product, variant.id, quantity, { openDrawer: true });
              onClose();
            }}
          >
            Add to bag
          </button>
          <Link href={`/shop/${product.slug}`} className="link-arrow" onClick={onClose} style={{ justifySelf: 'center' }}>
            Full product details
          </Link>
        </div>
      </div>
    </div>
  );
}
