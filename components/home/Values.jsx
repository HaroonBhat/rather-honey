import Link from 'next/link';
import Reveal from '../Reveal';
import { DropIcon, HexIcon, LeafIcon, SunIcon } from '../Icons';

const VALUES = [
  {
    icon: HexIcon,
    title: 'Harvested, not manufactured',
    text: 'Our honey comes from hives in Gamroo, Bandipora — not from a blend assembled somewhere far away.',
  },
  {
    icon: LeafIcon,
    title: 'Sourced close to home',
    text: 'Honey from our own village. Shilajit from the mountains of Gurez Valley, Kashmir.',
  },
  {
    icon: SunIcon,
    title: 'Small-batch jars',
    text: 'Jars are filled in small runs through the season, so stock turns over instead of sitting in a warehouse.',
  },
  {
    icon: DropIcon,
    title: 'A taste of nature',
    text: 'Named by variety, sold as it comes — Kiker honey tastes of Kikar bloom, because that is what the bees found.',
  },
];

export default function Values() {
  return (
    <section className="section section--deep why" id="why" aria-labelledby="why-title">
      <div className="container">
        <div className="why__head">
          <Reveal>
            <p className="eyebrow eyebrow--light" style={{ marginBottom: '1rem' }}>
              Why Rather Honey
            </p>
            <h2 className="display-lg" id="why-title" style={{ color: 'var(--cream)', maxWidth: '16ch' }}>
              GOOD HONEY SHOULD NEED A <span className="accent-italic accent-gold">SHORT</span> STORY.
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={100}>
            <p className="lede lede--light" style={{ fontSize: '0.96rem', maxWidth: '34ch' }}>
              No long ingredient lists, no detours. Just what the hives gave us, put in a jar.
            </p>
          </Reveal>
        </div>

        <div className="why__grid">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal
                key={value.title}
                as="article"
                className="why-card"
                variant="up"
                delay={index * 80}
              >
                <span className="why-card__icon">
                  <Icon size={20} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="fade" delay={180} style={{ marginTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
          <Link href="/shop" className="link-arrow link-arrow--light">
            Taste the difference
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
