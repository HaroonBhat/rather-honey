import Link from 'next/link';
import { CONFIG } from '@/lib/config';
import {
  HoneycombMark,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsappIcon,
} from './Icons';

const shopLinks = [
  { href: '/shop', label: 'All products' },
  { href: '/shop?category=raw-honey', label: 'Raw honey' },
  { href: '/shop?category=shilajit', label: 'Shilajit' },
  { href: '/cart', label: 'Your bag' },
];

const companyLinks = [
  { href: '/our-story', label: 'Our story' },
  { href: '/our-process', label: 'Our process' },
  { href: '/contact', label: 'Contact us' },
  { href: '/account', label: 'My account' },
];

const helpLinks = [
  { href: '/policies/shipping-returns', label: 'Shipping & returns' },
  { href: '/policies/privacy', label: 'Privacy policy' },
  { href: '/policies/terms', label: 'Terms & conditions' },
  { href: '/contact', label: 'Talk to us' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label="Rather Honey — home">
              <HoneycombMark size={40} />
              <b>Rather Honey</b>
            </Link>
            <p className="footer__tagline">{CONFIG.tagline}</p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '38ch' }}>
              {CONFIG.description}
            </p>
            <div className="footer__social">
              {CONFIG.social.instagram && (
                <a
                  href={CONFIG.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Rather Honey on Instagram"
                >
                  <InstagramIcon size={17} />
                </a>
              )}
              <a
                href={`https://wa.me/${CONFIG.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Chat with Rather Honey on WhatsApp"
              >
                <WhatsappIcon size={17} />
              </a>
              <a href={`mailto:${CONFIG.contact.email}`} aria-label="Email Rather Honey">
                <MailIcon size={17} />
              </a>
            </div>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>Shop</h4>
              <ul>
                {shopLinks.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h4>Company</h4>
              <ul>
                {companyLinks.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h4>Help</h4>
              <ul>
                {helpLinks.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col" style={{ gridColumn: 'span 2' }}>
              <h4>Visit / Call</h4>
              <address className="footer__contact" style={{ fontStyle: 'normal' }}>
                <span style={{ display: 'flex', gap: '0.5rem' }}>
                  <PinIcon size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--gold)' }} />
                  <span>{CONFIG.contact.address}</span>
                </span>
                <a href={`tel:${CONFIG.contact.phoneRaw}`} style={{ display: 'flex', gap: '0.5rem' }}>
                  <PhoneIcon size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--gold)' }} />
                  {CONFIG.contact.phone}
                </a>
                <a
                  href={`mailto:${CONFIG.contact.email}`}
                  style={{ display: 'flex', gap: '0.5rem', wordBreak: 'break-word' }}
                >
                  <MailIcon size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--gold)' }} />
                  {CONFIG.contact.email}
                </a>
                <span style={{ fontSize: '0.78rem', color: 'rgba(248,241,228,.5)' }}>
                  Dispatch within {CONFIG.commerce.shippingWindow}
                </span>
              </address>
            </div>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          <span>RATHER HONEY</span>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {CONFIG.legalName}. All rights reserved.
          </p>
          <nav className="footer__legal" aria-label="Legal">
            <Link href="/policies/privacy">Privacy</Link>
            <Link href="/policies/terms">Terms</Link>
            <Link href="/policies/shipping-returns">Shipping & returns</Link>
          </nav>
          <p>
            Hand-harvested in {CONFIG.origin.village}, {CONFIG.origin.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
