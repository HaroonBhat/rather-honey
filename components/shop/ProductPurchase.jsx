'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../CartProvider';
import { useToast } from '../ToastProvider';
import { formatINR } from '@/lib/format';
import { CONFIG } from '@/lib/config';
import { CheckIcon, MinusIcon, PlusIcon, ShieldIcon, TruckIcon } from '../Icons';

export default function ProductPurchase({ product }) {
  const { add, openCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];
  const soldOut = !variant.inStock;

  function handleAdd() {
    if (soldOut) return;
    add(product, variant.id, quantity, { openDrawer: true });
  }

  function handleBuyNow() {
    if (soldOut) return;
    add(product, variant.id, quantity, { openDrawer: false, silent: true });
    toast('Taking you to checkout…');
    router.push('/checkout');
  }

  return (
    <div className="pdp__info-inner">
      <div className="variant">
        <span className="field__label">Choose your size</span>
        <div className="variant__options">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              className="variant__opt"
              aria-pressed={v.id === variantId}
              onClick={() => setVariantId(v.id)}
              disabled={!v.inStock}
            >
              {v.label}
              <small>{formatINR(v.price)}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="pdp__price-row">
        <span className="pdp__price" aria-live="polite">
          {formatINR(variant.price)}
        </span>
        {variant.compareAt && variant.compareAt > variant.price && (
          <span className="pdp__compare">{formatINR(variant.compareAt)}</span>
        )}
        <span className="pdp__tax">{product.taxNote}</span>
      </div>

      <div className="pdp__actions">
        <div className="qty" style={{ justifyContent: 'space-between', minHeight: 54, paddingInline: 6 }}>
          <button
            type="button"
            className="qty__btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            style={{ width: 38, height: 38 }}
          >
            <MinusIcon size={15} />
          </button>
          <span className="qty__value" style={{ minWidth: 34 }} aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            className="qty__btn"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            disabled={quantity >= 20}
            aria-label="Increase quantity"
            style={{ width: 38, height: 38 }}
          >
            <PlusIcon size={15} />
          </button>
        </div>

        <button type="button" className="btn btn--gold" onClick={handleAdd} disabled={soldOut}>
          <span>{soldOut ? 'Sold out' : `Add to bag — ${formatINR(variant.price * quantity)}`}</span>
        </button>
      </div>

      <div className="pdp__buy">
        <button type="button" className="btn btn--outline btn--block" onClick={handleBuyNow} disabled={soldOut}>
          Buy it now
        </button>
        <button
          type="button"
          onClick={openCart}
          className="link-arrow"
          style={{ justifySelf: 'center', marginTop: '0.3rem' }}
        >
          View bag
        </button>
      </div>

      <ul className="pdp__trust">
        <li>
          <TruckIcon size={17} />
          Dispatch in {CONFIG.commerce.shippingWindow}
        </li>
        <li>
          <ShieldIcon size={17} />
          {CONFIG.commerce.returnWindow}
        </li>
        <li>
          <CheckIcon size={17} />
          Free delivery over {formatINR(CONFIG.commerce.freeShippingThreshold)}
        </li>
      </ul>
    </div>
  );
}
