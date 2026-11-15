import Image from 'next/image';
import Link from 'next/link';
import { CONFIG } from '@/lib/config';
import Reveal from '../Reveal';
import { ArrowRight } from '../Icons';

export default function Story() {
  return (
    <section className="section section--brown story" id="story" aria-labelledby="story-title">
      <div className="container">
        <div className="story__grid">
          <Reveal className="story__media" variant="left">
            <div className="story__main">
              <Image
                src="/img/story-hive.jpg"
                alt="Beehives standing in a wildflower meadow with the Kashmir Himalayas behind them"
                fill
                sizes="(max-width: 999px) 90vw, 44vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="story__overlap">
              <Image
                src="/img/process-harvest.jpg"
                alt="A beekeeper lifting a honeycomb frame heavy with honey"
                fill
                sizes="(max-width: 999px) 34vw, 16vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="story__stamp" aria-hidden="true">
              <span>Est.</span>
              <b>{CONFIG.since}</b>
              <span>Bandipora</span>
            </div>
          </Reveal>

          <div className="story__copy">
            <Reveal as="p" className="eyebrow eyebrow--light">
              Our story
            </Reveal>
            <Reveal as="h2" className="display-md" variant="up" delay={80} style={{ color: 'var(--cream)' }} id="story-title">
              MORE THAN HONEY. A CONNECTION WITH <span className="accent-italic accent-gold">NATURE.</span>
            </Reveal>
            <Reveal as="p" className="lede lede--light" variant="up" delay={150}>
              Rather Honey began in {CONFIG.since} in Gamroo, a village in Bandipora, Kashmir. What
              started as a small family effort — hives, blossoms, patience — grew into a brand that
              delivers nature&apos;s sweetness to households far beyond the valley.
            </Reveal>
            <Reveal as="p" className="lede lede--light" variant="up" delay={210}>
              We keep the work close to the source: the same village, the same hives, the same belief
              that good honey needs nothing added to it. Every jar is a short, honest journey from the
              hive to your table.
            </Reveal>

            <Reveal variant="up" delay={260}>
              <Link href="/our-story" className="link-arrow link-arrow--light">
                Discover our story
                <ArrowRight size={15} />
              </Link>
            </Reveal>

            <Reveal as="div" className="story__facts" variant="fade" delay={300}>
              <div className="fact">
                <b>{CONFIG.since}</b>
                <span>Harvesting in Gamroo</span>
              </div>
              <div className="fact">
                <b>2</b>
                <span>Honey varieties &amp; shilajit</span>
              </div>
              <div className="fact">
                <b>Gamroo</b>
                <span>Bandipora, Kashmir</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
