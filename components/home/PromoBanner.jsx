import Image from 'next/image';
import Link from 'next/link';
import { activeBanner } from '@/lib/coupons';
import Reveal from '../Reveal';
import { ArrowRight } from '../Icons';

/**
 * Promotional banner — fully driven by data/promotions.json. When the business
 * disables the banner (or schedules it off), the section disappears.
 */
export default function PromoBanner() {
  const banner = activeBanner();
  if (!banner) return null;

  return (
    <section className="promo grain" aria-labelledby="promo-title">
      <div className="promo__media">
        <Image
          src={banner.image}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          aria-hidden="true"
        />
      </div>
      <div className="promo__veil" aria-hidden="true" />

      <div className="container">
        <div className="promo__inner">
          <Reveal as="p" className="eyebrow eyebrow--light">
            {banner.eyebrow}
          </Reveal>
          <Reveal as="h2" className="display-lg promo__title" variant="up" delay={80} id="promo-title">
            LET NATURE <em>SWEETEN</em> YOUR EVERYDAY.
          </Reveal>
          <Reveal as="p" className="lede lede--light" variant="up" delay={150} style={{ maxWidth: '46ch' }}>
            {banner.body}
          </Reveal>

          {banner.code && (
            <Reveal variant="fade" delay={200}>
              <span className="promo__code">Use code {banner.code}</span>
            </Reveal>
          )}

          <Reveal className="promo__ctas" variant="up" delay={240}>
            <Link href={banner.ctaHref} className="btn btn--gold">
              {banner.ctaLabel}
              <ArrowRight size={16} />
            </Link>
            <Link href="/our-process" className="btn btn--outline-light">
              How it&apos;s made
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
