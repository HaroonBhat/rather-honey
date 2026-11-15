'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProductById, getVariant } from '@/lib/products';
import { cartTotals } from '@/lib/config';
import { useToast } from './ToastProvider';

const CartContext = createContext(null);
const STORAGE_KEY = 'ratherhoney.cart.v1';
const MAX_QTY = 20;

const lineKey = (productId, variantId) => `${productId}::${variantId}`;

const sanitise = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.reduce((acc, item) => {
    const product = getProductById(item?.productId);
    if (!product) return acc;
    const variant = getVariant(product, item?.variantId);
    if (!variant) return acc;
    const quantity = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(item.quantity) || 1)));
    acc.push({
      key: lineKey(product.id, variant.id),
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantId: variant.id,
      variantLabel: variant.label,
      price: variant.price,
      image: product.images[0]?.src || '',
      quantity,
    });
    return acc;
  }, []);
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const couponRef = useRef({ code: null, discount: 0 });
  const [coupon, setCouponState] = useState({ code: null, label: null, discount: 0 });
  const { toast } = useToast();

  /* hydrate */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(sanitise(parsed?.items));
        if (parsed?.coupon?.code && parsed?.coupon?.discount > 0) {
          setCouponState(parsed.coupon);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  /* persist */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, coupon }));
    } catch {
      /* storage may be full or blocked */
    }
  }, [items, coupon, hydrated]);

  /* keep drawer open state in sync with body scroll lock */
  useEffect(() => {
    document.body.classList.toggle('is-locked', isOpen);
    return () => document.body.classList.remove('is-locked');
  }, [isOpen]);

  /* close drawer on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const add = useCallback(
    (product, variantId, quantity = 1, { openDrawer = true, silent = false } = {}) => {
      const variant = getVariant(product, variantId);
      if (!product || !variant) return;
      const key = lineKey(product.id, variant.id);

      setItems((current) => {
        const existing = current.find((i) => i.key === key);
        if (existing) {
          return current.map((i) =>
            i.key === key ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) } : i
          );
        }
        return [
          ...current,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            variantId: variant.id,
            variantLabel: variant.label,
            price: variant.price,
            image: product.images[0]?.src || '',
            quantity: Math.min(MAX_QTY, Math.max(1, quantity)),
          },
        ];
      });

      setBump((n) => n + 1);
      if (!silent) toast(`${product.name} · ${variant.label} added to your bag`);
      if (openDrawer) setIsOpen(true);
    },
    [toast]
  );

  const remove = useCallback((key) => {
    setItems((current) => current.filter((i) => i.key !== key));
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    const next = Math.floor(Number(quantity));
    if (!Number.isFinite(next)) return;
    setItems((current) =>
      next <= 0
        ? current.filter((i) => i.key !== key)
        : current.map((i) => (i.key === key ? { ...i, quantity: Math.min(MAX_QTY, next) } : i))
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setCouponState({ code: null, label: null, discount: 0 });
  }, []);

  const setCoupon = useCallback((next) => {
    const value = next && next.code ? next : { code: null, label: null, discount: 0 };
    couponRef.current = value;
    setCouponState(value);
  }, []);

  const totals = useMemo(
    () => cartTotals(items, coupon.discount || 0),
    [items, coupon.discount]
  );

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      totals,
      coupon,
      setCoupon,
      add,
      remove,
      setQuantity,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      bump,
      hydrated,
      maxQuantity: MAX_QTY,
    }),
    [items, count, totals, coupon, setCoupon, add, remove, setQuantity, clear, isOpen, bump, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
