'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../ProductCard';
import { categories, products } from '@/lib/products';
import { SearchIcon } from '../Icons';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name A–Z' },
];

const priceOf = (product) => Math.min(...product.variants.map((v) => v.price));

export default function ShopBrowser({ initialCategory = 'all', initialQuery = '' }) {
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (query.trim()) params.set('q', query.trim());
    const next = params.toString();
    router.replace(next ? `/shop?${next}` : '/shop', { scroll: false });
  }, [category, query, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => (category === 'all' ? true : p.category === category));
    if (q) {
      list = list.filter((p) =>
        [p.name, p.subtitle, p.shortDescription, p.category, p.origin, ...(p.highlights || [])]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }
    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => priceOf(a) - priceOf(b));
      case 'price-desc':
        return [...list].sort((a, b) => priceOf(b) - priceOf(a));
      case 'name':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [category, query, sort]);

  return (
    <div className="container">
      <div className="shop-toolbar">
        <div className="filters" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className="filter-chip"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="toolbar-right">
          <label className="visually-hidden" htmlFor="shop-search">
            Search products
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <SearchIcon
              size={16}
              style={{ position: 'absolute', left: 12, color: 'rgba(66,32,15,.45)' }}
            />
            <input
              id="shop-search"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ padding: '0.5rem 0.9rem 0.5rem 2.2rem', fontSize: '0.8rem', width: 180, borderRadius: 99 }}
            />
          </div>
          <label className="visually-hidden" htmlFor="shop-sort">
            Sort products
          </label>
          <select
            id="shop-sort"
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="result-count">
            {results.length} product{results.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="shop-empty">
          <SearchIcon size={40} />
          <h2 className="display-sm">No jars matched that search.</h2>
          <p className="body-muted" style={{ maxWidth: '38ch' }}>
            Try a different word, or browse the whole collection.
          </p>
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="shop-grid">
          {results.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
