import Image from 'next/image';
import Link from 'next/link';
import { CONFIG } from '@/lib/config';
import { formatINR } from '@/lib/format';
import { getProductBySlug } from '@/lib/products';
import { ArrowRight, BeeIcon, StarIcon } from '../Icons';
import Reveal from '../Reveal';
import Parallax from '../Parallax';

function RotatingSeal() {
  return (
    <svg className="hero__seal" viewBox="0 0 240 240" aria-hidden="true" focusable="false">
      <defs>
        <path
          id="seal-circle"
          d="M120,120 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0"
        />
      </defs>
      <circle cx="120" cy="120" r="112" fill="rgba(42,20,10,.55)" stroke="currentColor" strokeOpacity=".45" />
      <circle cx="120" cy="120" r="99" fill="none" stroke="currentColor" strokeOpacity=".25" strokeDasharray="2 6" />
      <text fill="currentColor" fontSize="15" letterSpacing="4.6" fontFamily="var(--font-body)" fontWeight="700">
        <textPath href="#seal-circle" startOffset="0%">
          HAND-HARVESTED IN KASHMIR · SINCE {CONFIG.since} ·
        </textPath>
      </text>
      <g transform="translate(120 120)" fill="none" stroke="currentColor">
        <circle r="36" strokeOpacity=".45" />
        <path d="M0 -18 L15.6 -9 V9 L0 18 L-15.6 9 V-9 Z" strokeWidth="1.6" />
        <path d="M0 -7.5 L6.5 -3.8 V3.8 L0 7.5 L-6.5 3.8 V-3.8 Z" fill="currentColor" fillOpacity=".35" stroke="none" />
        <circle r="2.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const spotlight = getProductBySlug('soli-honey');

  return (
    <section className="hero grain" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__copy">
            <Reveal as="p" className="eyebrow eyebrow--light" variant="fade">
              {CONFIG.origin.village}, {CONFIG.origin.district} — Kashmir
            </Reveal>

            <h1 className="hero__title" id="hero-title">
              <Reveal as="span" className="line" variant="up" delay={40}>
                STRAIGHT
              </Reveal>
              <Reveal as="span" className="line line--indent" variant="up" delay={120}>
                FROM NATURE.
              </Reveal>
              <Reveal as="span" className="line line--accent" variant="up" delay={220}>
                PURE GOLD.
              </Reveal>
            </h1>

            <Reveal as="p" className="hero__lede" variant="fade" delay={300}>
              Discover the natural richness of honey, carefully sourced and brought to your table.
            </Reveal>

            <Reveal className="hero__ctas" variant="up" delay={380}>
              <Link href="/shop" className="btn btn--gold">
                <span>Explore our honey</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/our-story" className="btn btn--outline-light">
                <span>Discover our story</span>
              </Link>
            </Reveal>

            <Reveal as="ul" className="hero__meta" variant="fade" delay={460}>
              <li>Since {CONFIG.since}</li>
              <li>Village harvested</li>
              <li>Delivered across India</li>
            </Reveal>
          </div>

          <Reveal className="hero__media" variant="zoom" delay={180}>
            <Parallax speed={0.055}>
              <div className="hero__frame">
                <Image
                src="/img/hero-jar.jpg"
                alt="A glass jar of golden honey with honey dripping from a wooden dipper, styled with honeycomb and wildflowers"
                fill
                priority
                sizes="(max-width: 999px) 88vw, 470px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Parallax>

            <RotatingSeal />

            <div className="hero__float-label" aria-hidden="true">
              <span>Today&apos;s jar</span>
              <b>Pure · Natural</b>
            </div>

            {spotlight && (
              <Link href={`/shop/${spotlight.slug}`} className="hero__chip">
                <span className="hero__chip-media">
                  <Image
                    src={spotlight.images[0].src}
                    alt=""
                    fill
                    sizes="46px"
                    style={{ objectFit: 'cover' }}
                  />
                </span>
                <span>
                  <b>{spotlight.name}</b>
                  <span className="cluster" style={{ gap: '0.25rem' }}>
                    <StarIcon size={11} filled />
                    5.0 · {spotlight.variants[0].label}
                  </span>
                </span>
                <span className="hero__chip-price">{formatINR(spotlight.variants[0].price)}</span>
              </Link>
            )}
          </Reveal>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
