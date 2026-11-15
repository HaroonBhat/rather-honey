'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products, priceRange } from '@/lib/products';
import { formatINR } from '@/lib/format';
import { CloseIcon, SearchIcon } from './Icons';

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.subtitle, p.shortDescription, p.category, p.origin, ...(p.highlights || [])]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div
      className={`search-modal${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-modal__panel">
        <div className="search-modal__input-row">
          <SearchIcon size={20} />
          <input
            ref={inputRef}
            type="search"
            className="search-modal__input"
            placeholder="Search honey, shilajit…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results.length > 0) {
                onClose();
                router.push(`/shop/${results[0].slug}`);
              }
            }}
            aria-label="Search products"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
            <CloseIcon size={19} />
          </button>
        </div>
        <p className="search-modal__hint">
          {query ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'All products'}
        </p>
        <div className="search-modal__results">
          {results.length === 0 ? (
            <div className="search-empty">
              <p>Nothing matched “{query}”.</p>
              <Link href="/shop" className="link-arrow" onClick={onClose}>
                Browse the full collection
              </Link>
            </div>
          ) : (
            results.map((product) => {
              const { min } = priceRange(product);
              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="search-result"
                  onClick={onClose}
                >
                  <span className="search-result__media">
                    <Image
                      src={product.images[0].src}
                      alt=""
                      fill
                      sizes="56px"
                      style={{ objectFit: 'cover' }}
                    />
                  </span>
                  <span>
                    <span className="search-result__name">{product.name}</span>
                    <span className="search-result__meta" style={{ display: 'block' }}>
                      {product.highlights?.[0] || product.origin}
                    </span>
                  </span>
                  <span className="search-result__price">{formatINR(min)}</span>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
