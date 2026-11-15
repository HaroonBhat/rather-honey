'use client';

import { ToastProvider } from './ToastProvider';
import { CartProvider } from './CartProvider';

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
