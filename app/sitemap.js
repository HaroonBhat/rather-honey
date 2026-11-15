import { products } from '@/lib/products';
import { policySlugs } from '@/lib/policies';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = ['', '/shop', '/our-story', '/our-process', '/contact', '/cart', '/account'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === '' || path === '/shop' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/shop' ? 0.9 : 0.6,
    })
  );

  const productRoutes = products.map((product) => ({
    url: `${base}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const policyRoutes = policySlugs.map((slug) => ({
    url: `${base}/policies/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  return [...staticRoutes, ...productRoutes, ...policyRoutes];
}
