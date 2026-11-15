import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/home/Marquee';
import Accordion from '@/components/Accordion';
import { CONFIG } from '@/lib/config';
import { ArrowRight } from '@/components/Icons';

export const metadata = {
  title: 'Our process — From blossom to jar',
  description:
    'How Rather Honey gets from the hive to your table: blossom, bees, a hand harvest, and small-batch jars from Gamroo, Bandipora.',
  alternates: { canonical: '/our-process' },
  openGraph: { title: 'Our process — Rather Honey', url: '/our-process', images: ['/img/process-harvest.jpg'] },
};

const STEPS = [
  {
    title: 'Blossom',
    kicker: 'Stage 01',
    image: '/img/process-bloom.jpg',
    alt: 'Wildflowers and a bee in an alpine meadow',
    text: 'Honey is a record of the flowers around the hive. The Kikar bloom is what gives Kiker honey its identity; other local flowers feed the hives through the season.',
  },
  {
    title: 'The hives',
    kicker: 'Stage 02',
    image: '/img/process-honeycomb.jpg',
    alt: 'Honeycomb glistening with honey',
    text: 'The bees fill comb cell by cell while the hives sit in the village. There is no shortcut to this part — the season decides when there is honey to take.',
  },
  {
    title: 'The harvest',
    kicker: 'Stage 03',
    image: '/img/process-harvest.jpg',
    alt: 'A beekeeper lifting a frame heavy with honey',
    text: 'Frames are lifted by hand and the honey is collected in small batches, close to the hives it came from.',
  },
  {
    title: 'The jar',
    kicker: 'Stage 04',
    image: '/img/process-pack.jpg',
    alt: 'Glass jars being filled and packed',
    text: 'Jars are filled, labelled and packed in small runs, then dispatched — typically within two to three business days across India.',
  },
];

export default function OurProcessPage() {
  return (
    <>
      <header className="page-head page-head--brown">
        <div className="container page-head__inner">
          <nav className="breadcrumbs breadcrumbs--light" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Our process</span>
          </nav>
          <h1 className="display-xl page-head__title" style={{ color: 'var(--cream)' }}>
            BLOSSOM, BEES, <span className="accent-italic accent-gold">PATIENCE.</span>
          </h1>
          <p className="lede lede--light">
            Four stages, no detours. Here is exactly how a Rather Honey jar comes together.
          </p>
        </div>
      </header>

      <Marquee />

      {STEPS.map((step, index) => (
        <section
          key={step.title}
          className={`section ${index % 2 === 0 ? 'section--cream' : 'section--shell'}`}
          aria-labelledby={`step-${index}-title`}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gap: 'clamp(1.6rem, 4vw, 3.4rem)',
                alignItems: 'center',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              }}
            >
              <Reveal
                variant={index % 2 === 0 ? 'left' : 'right'}
                style={{ order: index % 2 === 0 ? 0 : 1 }}
              >
                <div style={{ position: 'relative', aspectRatio: '4 / 3.4', overflow: 'hidden', borderRadius: 3 }}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 780px) 90vw, 46vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </Reveal>

              <div style={{ display: 'grid', gap: '0.9rem' }}>
                <Reveal as="p" className="eyebrow">
                  {step.kicker}
                </Reveal>
                <Reveal as="h2" className="display-lg" variant="up" delay={60} id={`step-${index}-title`}>
                  {step.title.toUpperCase()}
                </Reveal>
                <Reveal as="p" className="lede" variant="fade" delay={120}>
                  {step.text}
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section section--sand">
        <div className="container container--narrow">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>
              Good to know
            </p>
            <h2 className="display-md" style={{ marginBottom: '1.6rem' }}>
              QUESTIONS PEOPLE <span className="accent-italic" style={{ color: 'var(--amber)' }}>ACTUALLY ASK.</span>
            </h2>
          </Reveal>

          <Accordion
            items={[
              {
                title: 'How is my order packed and shipped?',
                content: (
                  <p>
                    Jars are packed in small batches and dispatched within {CONFIG.commerce.shippingWindow}.
                    Delivery is free over ₹{CONFIG.commerce.freeShippingThreshold}; below that a flat ₹
                    {CONFIG.commerce.shippingFlatRate} applies.
                  </p>
                ),
              },
              {
                title: 'Why does honey crystallise?',
                content: (
                  <p>
                    Crystallisation is a natural process in honey. If you prefer your honey runny, stand
                    the jar in warm water for a few minutes. Store jars in a cool, dry place, away from
                    direct sunlight.
                  </p>
                ),
              },
              {
                title: 'What if something is wrong with my order?',
                content: (
                  <p>
                    Every jar is covered by our {CONFIG.commerce.returnWindow}. Write to{' '}
                    <a href={`mailto:${CONFIG.contact.email}`} style={{ textDecoration: 'underline' }}>
                      {CONFIG.contact.email}
                    </a>{' '}
                    or call {CONFIG.contact.phone} with your order number and we will make it right.
                  </p>
                ),
              },
              {
                title: 'How should I store shilajit?',
                content: (
                  <p>
                    Keep it in a cool, dry place away from direct sunlight. A pea-sized amount with
                    lukewarm water or milk once daily is how it is traditionally taken. It is a natural
                    wellness product, not a medicine.
                  </p>
                ),
              },
            ]}
          />

          <div className="cluster" style={{ marginTop: '1.8rem' }}>
            <Link href="/shop" className="btn btn--gold">
              Shop the collection <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn--outline">
              Ask us something
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
