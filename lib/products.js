/**
 * Rather Honey — product catalogue.
 *
 * This is the single source of truth for the storefront. Product data mirrors the
 * live Rather Honey store (product names, weights, prices and imagery are taken
 * from ratherhoney.odoo.com). To add a new honey variety, append an entry here —
 * every page (shop, product, search, cart, checkout, sitemap, schema.org) reads
 * from this file, so no layout changes are required.
 */

export const categories = [
  { slug: 'all', name: 'All Products' },
  { slug: 'raw-honey', name: 'Raw Honey' },
  { slug: 'shilajit', name: 'Shilajit' },
];

const money = (v) => Math.round(v * 100) / 100;

export const products = [
  {
    id: 'kiker-honey',
    slug: 'kiker-honey',
    name: 'Kiker Honey',
    subtitle: 'Also known as Acacia honey',
    category: 'raw-honey',
    badge: 'Bestseller',
    shortDescription:
      'A highly regarded monofloral honey named after the Kikar tree. Light, gentle and easy to love.',
    description: [
      'Kikar honey — widely known as Acacia honey — is a highly regarded monofloral honey. It takes its name from the Kikar tree, another common name for the Acacia tree.',
      'Part of the Rather Honey collection, harvested in the hills around Gamroo, Bandipora and bottled in small batches for your table.',
    ],
    highlights: ['Monofloral honey', 'Village-harvested', 'Bottled in small batches'],
    origin: 'Gamroo, Bandipora — Kashmir',
    notes: ['Acacia / Kikar bloom', 'Light amber', 'Gentle sweetness'],
    images: [
      { src: '/store/kiker/1.webp', alt: 'A jar of Rather Honey Kiker Honey photographed against the Kashmir mountains' },
      { src: '/store/kiker/3.webp', alt: 'Kiker Honey jar styled with honeycomb and wildflowers' },
      { src: '/store/kiker/2.webp', alt: 'Close-up of the Rather Honey Kiker Honey jar' },
      { src: '/store/kiker/4.webp', alt: 'Kiker Honey jar with a wooden honey dipper' },
    ],
    variants: [
      { id: '500g', label: '500 g', price: 599, sku: 'RH-KIK-500', inStock: true },
      { id: '1kg', label: '1 kg', price: 899, compareAt: null, sku: 'RH-KIK-1000', inStock: true },
    ],
    rating: { value: 5.0, count: 2 },
    featured: true,
    taxNote: 'Inclusive of all taxes',
  },
  {
    id: 'soli-honey',
    slug: 'soli-honey',
    name: 'Soli Honey',
    subtitle: 'Everyday sweetness, straight from the village',
    category: 'raw-honey',
    badge: null,
    shortDescription:
      'A smooth, everyday honey from the Rather Honey collection — harvested and bottled in Gamroo, Bandipora.',
    description: [
      'Soli Honey is part of the Rather Honey collection, harvested in the village of Gamroo in Bandipora, Kashmir, and bottled in small batches.',
      'A jar for the everyday table — spoon it into chai, drizzle it over curd, or eat it straight from the spoon.',
    ],
    highlights: ['Village-harvested', 'Small batches', 'Everyday jar'],
    origin: 'Gamroo, Bandipora — Kashmir',
    notes: ['Golden amber', 'Smooth texture', 'Everyday honey'],
    images: [
      { src: '/store/soli/1.webp', alt: 'A jar of Rather Honey Soli Honey' },
      { src: '/store/soli/2.webp', alt: 'Soli Honey jar styled on a rustic surface' },
      { src: '/store/soli/3.webp', alt: 'Soli Honey jar with warm natural lighting' },
      { src: '/store/soli/4.webp', alt: 'Soli Honey label detail' },
    ],
    variants: [
      { id: '500g', label: '500 g', price: 349, sku: 'RH-SOL-500', inStock: true },
      { id: '1kg', label: '1 kg', price: 699, sku: 'RH-SOL-1000', inStock: true },
    ],
    rating: { value: 5.0, count: 1 },
    featured: true,
    taxNote: 'Inclusive of all taxes',
  },
  {
    id: 'pure-himalayan-shilajit',
    slug: 'pure-himalayan-shilajit',
    name: 'Pure Himalayan Shilajit',
    subtitle: 'Gurez Valley, Kashmir',
    category: 'shilajit',
    badge: 'New',
    shortDescription:
      'Pure resin shilajit sourced from the mountains of Gurez Valley, Kashmir — carefully collected and processed.',
    description: [
      'Experience authentic Himalayan Shilajit sourced from the untouched mountains of Gurez Valley, Kashmir. Carefully collected and processed to preserve its natural purity, mineral richness and premium resin quality.',
      'Our Shilajit comes in pure resin form — not powder — making it a more authentic and traditional choice. Traditionally used in Ayurveda and Himalayan wellness routines.',
      'Net weight: 15 g. Store in a cool, dry place away from direct sunlight. This is a natural wellness product, not a medicine. Results may vary from person to person.',
    ],
    highlights: ['100% natural resin', 'Sourced from Gurez Valley', 'Resin form — not powder'],
    origin: 'Gurez Valley — Kashmir',
    notes: ['Pure resin', 'Himalayan origin', '15 g jar'],
    images: [
      { src: '/store/shilajit/1.webp', alt: 'A jar of Rather Honey & Bites Pure Himalayan Shilajit from Gurez Valley' },
      { src: '/store/shilajit/2.webp', alt: 'Pure Himalayan Shilajit jar photographed in natural light' },
      { src: '/store/shilajit/3.webp', alt: 'Shilajit resin jar detail' },
      { src: '/store/shilajit/4.webp', alt: 'Pure Himalayan Shilajit packaging close-up' },
    ],
    variants: [{ id: '15g', label: '15 g', price: 899, sku: 'RH-SHI-015', inStock: true }],
    rating: { value: 0, count: 0 },
    featured: true,
    taxNote: 'Inclusive of all taxes',
  },
];

/* ---------------------------------------------------------------- helpers */

export const getAllProducts = () => products;

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) || null;

export const getProductById = (id) => products.find((p) => p.id === id) || null;

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getRelatedProducts = (slug, limit = 3) =>
  products.filter((p) => p.slug !== slug).slice(0, limit);

export const getCategoryName = (slug) =>
  categories.find((c) => c.slug === slug)?.name ?? 'All Products';

export const getVariant = (product, variantId) =>
  product?.variants.find((v) => v.id === variantId) ?? product?.variants[0] ?? null;

export const priceRange = (product) => {
  const prices = product.variants.map((v) => v.price);
  return { min: money(Math.min(...prices)), max: money(Math.max(...prices)) };
};

export const searchProducts = (query) => {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) =>
    [p.name, p.subtitle, p.shortDescription, p.category, p.origin, ...(p.highlights || [])]
      .join(' ')
      .toLowerCase()
      .includes(q)
  );
};
