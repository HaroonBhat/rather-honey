import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { CONFIG } from '@/lib/config';
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsappIcon } from '@/components/Icons';

export const metadata = {
  title: 'Contact — Talk to Rather Honey',
  description: `Reach Rather Honey at ${CONFIG.contact.phone} or ${CONFIG.contact.email}. Visit us in Gamroo, Bandipora, Jammu & Kashmir.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const details = [
    {
      icon: PinIcon,
      label: 'Visit',
      value: CONFIG.contact.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.contact.address)}`,
      external: true,
      cta: 'Open in maps',
    },
    {
      icon: PhoneIcon,
      label: 'Call',
      value: CONFIG.contact.phone,
      href: `tel:${CONFIG.contact.phoneRaw}`,
      cta: 'Call now',
    },
    {
      icon: WhatsappIcon,
      label: 'WhatsApp',
      value: CONFIG.contact.phone,
      href: `https://wa.me/${CONFIG.contact.whatsapp}`,
      external: true,
      cta: 'Start a chat',
    },
    {
      icon: MailIcon,
      label: 'Email',
      value: CONFIG.contact.email,
      href: `mailto:${CONFIG.contact.email}`,
      cta: 'Write to us',
    },
  ];

  return (
    <div className="section section--cream" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.4rem)' }}>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contact</span>
        </nav>

        <div style={{ display: 'grid', gap: 'clamp(2rem, 4.5vw, 3.6rem)' }} className="contact-grid">
          <div style={{ display: 'grid', gap: '1.4rem', alignContent: 'start' }}>
            <Reveal as="p" className="eyebrow">
              Contact
            </Reveal>
            <Reveal as="h1" className="display-xl" variant="up" delay={60}>
              LET&apos;S TALK <span className="accent-italic" style={{ color: 'var(--amber)' }}>HONEY.</span>
            </Reveal>
            <Reveal as="p" className="lede" variant="fade" delay={120}>
              Questions about a jar, a bulk order, or where your delivery is? Reach us directly — a
              person from the family will reply.
            </Reveal>

            <Reveal className="stack-md" variant="up" delay={160}>
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '44px 1fr',
                      gap: '0.9rem',
                      alignItems: 'center',
                      padding: '0.9rem 0',
                      borderTop: '1px solid var(--line)',
                    }}
                  >
                    <span
                      style={{
                        display: 'grid',
                        placeItems: 'center',
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        border: '1px solid var(--line-strong)',
                        color: 'var(--amber)',
                      }}
                    >
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="micro" style={{ color: 'rgba(36,23,15,.45)' }}>
                        {item.label}
                      </span>
                      <span style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', marginTop: 2 }}>
                        {item.value}
                      </span>
                      <span className="small" style={{ color: 'var(--amber)' }}>
                        {item.cta} →
                      </span>
                    </span>
                  </a>
                );
              })}

              <a
                href={CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn--outline btn--sm"
              >
                <InstagramIcon size={16} />
                @rather.honey
              </a>
            </Reveal>
          </div>

          <Reveal variant="up" delay={100}>
            <ContactForm />
          </Reveal>
        </div>

        <p className="form-note" style={{ marginTop: '2.4rem', maxWidth: '62ch' }}>
          Rather Honey is a small family business in {CONFIG.origin.village}, {CONFIG.origin.district}.
          We answer messages in the order they arrive, usually the same day. Orders are dispatched
          within {CONFIG.commerce.shippingWindow}.
        </p>
      </div>

      <style>{`
        @media (min-width: 940px) {
          .contact-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr); align-items: start; }
        }
      `}</style>
    </div>
  );
}
