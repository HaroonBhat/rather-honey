import Image from 'next/image';
import { CONFIG } from '@/lib/config';
import Reveal from '../Reveal';
import { InstagramIcon } from '../Icons';

const TILES = [
  {
    src: '/img/gallery-toast.jpg',
    alt: 'Sourdough toast drizzled with golden honey on a cream linen table',
    label: 'Morning ritual',
    wide: true,
  },
  {
    src: '/store/kiker/3.webp',
    alt: 'Rather Honey jar styled with honeycomb and flowers',
    label: 'Kiker Honey',
    tall: true,
  },
  {
    src: '/img/process-honeycomb.jpg',
    alt: 'Close-up of honeycomb glistening with honey',
    label: 'Straight from the comb',
  },
  {
    src: '/img/gallery-tea.jpg',
    alt: 'Honey dripping into a glass cup of herbal tea',
    label: 'A spoonful in chai',
    tall: true,
  },
  {
    src: '/img/hero-drip.jpg',
    alt: 'Golden honey dripping from a wooden dipper',
    label: 'Slow, and golden',
  },
  {
    src: '/img/process-pack.jpg',
    alt: 'Honey jars lined up on a wooden workbench',
    label: 'Small-batch jars',
  },
];

export default function Gallery() {
  return (
    <section className="section section--shell" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              From our world
            </p>
            <h2 className="display-lg" id="gallery-title">
              HONEY, IN <span className="accent-italic" style={{ color: 'var(--amber)' }}>EVERYDAY</span> MOMENTS.
            </h2>
          </Reveal>
          <Reveal className="section-head__aside" variant="fade" delay={80}>
            <p className="lede" style={{ fontSize: '0.94rem' }}>
              Serving ideas, harvest days and jars on tables. Follow along — we post the sweet parts.
            </p>
          </Reveal>
        </div>

        <div className="gallery__grid">
          {TILES.map((tile, index) => (
            <Reveal
              key={tile.src + index}
              as="a"
              href={CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className={`gallery__item${tile.wide ? ' gallery__item--wide' : ''}${tile.tall ? ' gallery__item--tall' : ''}`}
              variant="zoom"
              delay={index * 60}
              aria-label={`${tile.label} — view on Instagram`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 900px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="gallery__label">
                <InstagramIcon size={12} />
                {tile.label}
              </span>
            </Reveal>
          ))}
        </div>

        <div className="gallery__cta">
          <p className="small body-muted">Fresh from the hives, most weeks.</p>
          <a
            href={CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="link-arrow"
          >
            <InstagramIcon size={15} />
            @rather.honey
          </a>
        </div>
      </div>
    </section>
  );
}
