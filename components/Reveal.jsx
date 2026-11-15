'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-triggered reveal. Uses a single IntersectionObserver per element and
 * unobserves after the first reveal so long pages stay cheap to scroll.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  variant = 'up',
  delay = 0,
  className = '',
  style,
  once = true,
  threshold = 0.16,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      node.classList.add('is-in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('is-in');
            if (once) observer.unobserve(node);
          } else if (!once) {
            node.classList.remove('is-in');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
