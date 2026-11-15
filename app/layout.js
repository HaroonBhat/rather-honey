import { Fraunces, Manrope } from 'next/font/google';
import Providers from '@/components/Providers';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import Newsletter from '@/components/home/Newsletter';
import { CONFIG } from '@/lib/config';

import './css/base.css';
import './css/layout.css';
import './css/home.css';
import './css/commerce.css';

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
});

const body = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rather Honey — Pure Village-Harvested Honey from Kashmir',
    template: '%s · Rather Honey',
  },
  description: `${CONFIG.description} Shop ${CONFIG.brand} raw honey and Himalayan shilajit, delivered across India.`,
  applicationName: CONFIG.brand,
  keywords: [
    'Rather Honey',
    'Kashmir honey',
    'raw honey India',
    'Bandipora honey',
    'Gamroo honey',
    'Himalayan shilajit',
    'buy honey online',
    'Kiker honey',
    'Soli honey',
  ],
  authors: [{ name: CONFIG.legalName }],
  creator: CONFIG.legalName,
  publisher: CONFIG.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: CONFIG.brand,
    locale: 'en_IN',
    title: 'Rather Honey — Nature’s Gold. Nothing Less.',
    description: CONFIG.description,
    url: '/',
    images: [
      {
        url: '/img/hero-jar.jpg',
        width: 1024,
        height: 1536,
        alt: 'A jar of Rather Honey with honey dripping from a wooden dipper',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rather Honey — Nature’s Gold. Nothing Less.',
    description: CONFIG.description,
    images: ['/img/hero-jar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
  category: 'shopping',
};

export const viewport = {
  themeColor: '#42200F',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: CONFIG.brand,
  legalName: CONFIG.legalName,
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  image: `${siteUrl}/img/hero-jar.jpg`,
  description: CONFIG.description,
  foundingDate: String(CONFIG.since),
  slogan: CONFIG.tagline,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'D-77, Gamroo',
    addressLocality: CONFIG.origin.district,
    addressRegion: CONFIG.origin.region,
    postalCode: '193502',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONFIG.contact.phoneRaw,
    email: CONFIG.contact.email,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'ur'],
  },
  sameAs: [CONFIG.social.instagram, CONFIG.social.facebook, CONFIG.social.x].filter(Boolean),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: CONFIG.brand,
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/shop?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <noscript>
          {/* Scroll reveals must never hide content when JavaScript is unavailable. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main id="main">{children}</main>
          <Newsletter />
          <Footer />
          <CartDrawer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
