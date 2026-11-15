import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/home/Marquee';
import { CONFIG } from '@/lib/config';
import { ArrowRight, BeeIcon, InstagramIcon } from '@/components/Icons';

export const metadata = {
  title: 'Our story — From a village in Bandipora',
  description:
    'Rather Honey began in 2015 in Gamroo, Bandipora, Kashmir. Meet the family behind the jars and the village the honey comes from.',
  alternates: { canonical: '/our-story' },
  openGraph: { title: 'Our story — Rather Honey', url: '/our-story', images: ['/img/story-hive.jpg'] },
};

const TEAM = [
  {
    name: 'Noor Ul Jamal',
    role: 'Honey Director',
    image: '/store/team/noor.webp',
    bio: 'Leads the team and keeps the focus on the honey itself — from hive to jar.',
  },
  {
    name: 'Sajid Rather',
    role: 'Customer Relations Manager',
    image: '/store/team/sajid.webp',
    bio: 'The person on the other end of your call, email or WhatsApp message.',
  },
  {
    name: 'Abdul Hai',
    role: 'Operation Manager',
    image: '/store/team/abdul.webp',
    bio: 'Keeps orders, packing and dispatch moving so jars arrive on time.',
  },
  {
    name: 'Suhail Rather',
    role: 'Social Media Manager',
    image: '/store/team/suhail.webp',
    bio: 'Shares harvest days and new batches with the people who follow along.',
  },
];

export default function OurStoryPage() {
  return (
    <>
      <header className="section section--brown" style={{ paddingBottom: 'clamp(2.4rem, 5vw, 4rem)' }}>
        <div className="container">
          <nav className="breadcrumbs breadcrumbs--light" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Our story</span>
          </nav>

          <div style={{ display: 'grid', gap: 'clamp(1.6rem, 4vw, 3rem)', marginTop: '1.2rem' }} className="story-hero">
            <Reveal as="p" className="eyebrow eyebrow--light">
              Since {CONFIG.since} · {CONFIG.origin.village}, {CONFIG.origin.district}
            </Reveal>
            <Reveal as="h1" className="display-xl" variant="up" delay={60} style={{ color: 'var(--cream)' }}>
              FROM A VILLAGE IN <span className="accent-italic accent-gold">KASHMIR.</span>
            </Reveal>
            <Reveal as="p" className="lede lede--light" variant="fade" delay={140} style={{ maxWidth: '58ch' }}>
              Rather Honey is a family effort from Gamroo, a village in Bandipora. We harvest honey
              from hives close to home and send it out across India — one jar, one season at a time.
            </Reveal>
          </div>
        </div>
      </header>

      <Marquee tone="gold" />

      <section className="section section--cream">
        <div className="container">
          <div className="story__grid">
            <Reveal className="story__media" variant="left" style={{ paddingBottom: 0 }}>
              <div className="story__main" style={{ aspectRatio: '4 / 4.2' }}>
                <Image
                  src="/img/story-hive.jpg"
                  alt="Beehives in a wildflower meadow with the Kashmir Himalayas in the background"
                  fill
                  priority
                  sizes="(max-width: 999px) 90vw, 46vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="story__stamp" aria-hidden="true">
                <span>Est.</span>
                <b>{CONFIG.since}</b>
                <span>Gamroo</span>
              </div>
            </Reveal>

            <div className="story__copy">
              <Reveal as="h2" className="display-md" variant="up">
                HONEY, THE WAY THE VALLEY MAKES IT.
              </Reveal>
              <Reveal as="p" className="lede" variant="up" delay={80}>
                Our honey is harvested in Gamroo and named by what the bees found — Kiker honey from
                the Kikar bloom, Soli honey for the everyday table. The jars are filled in small
                batches, packed by the same family that keeps the hives.
              </Reveal>
              <Reveal as="p" className="lede" variant="up" delay={140}>
                In time we added something from higher up the valley: pure Himalayan shilajit from
                Gurez Valley, collected and processed with the same care we give our honey.
              </Reveal>
              <Reveal as="p" className="lede" variant="up" delay={200}>
                No middlemen stories, no borrowed heritage. Just a village, its seasons, and the jars
                we send out.
              </Reveal>

              <Reveal className="story__facts" variant="fade" delay={240} style={{ borderTopColor: 'var(--line)' }}>
                <div className="fact">
                  <b style={{ color: 'var(--brown)' }}>{CONFIG.since}</b>
                  <span style={{ color: 'rgba(36,23,15,.55)' }}>First harvest</span>
                </div>
                <div className="fact">
                  <b style={{ color: 'var(--brown)' }}>{CONFIG.origin.village}</b>
                  <span style={{ color: 'rgba(36,23,15,.55)' }}>{CONFIG.origin.district}, Kashmir</span>
                </div>
                <div className="fact">
                  <b style={{ color: 'var(--brown)' }}>Delhi → Srinagar</b>
                  <span style={{ color: 'rgba(36,23,15,.55)' }}>Delivery across India</span>
                </div>
              </Reveal>

              <Reveal variant="up" delay={280}>
                <Link href="/shop" className="link-arrow">
                  Taste the collection <ArrowRight size={15} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="team-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '0.8rem' }}>
                The people
              </p>
              <h2 className="display-lg" id="team-title">
                THE FAMILY BEHIND <span className="accent-italic" style={{ color: 'var(--amber)' }}>THE JARS.</span>
              </h2>
            </Reveal>
            <Reveal className="section-head__aside" variant="fade" delay={80}>
              <p className="lede" style={{ fontSize: '0.94rem' }}>
                Small team, close to the hives. If you write to us, one of these four will answer.
              </p>
            </Reveal>
          </div>

          <div className="team-grid">
            {TEAM.map((member, index) => (
              <Reveal as="article" key={member.name} className="team-card" variant="up" delay={index * 70}>
                <span className="team-card__avatar">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Rather Honey`}
                    fill
                    sizes="104px"
                    style={{ objectFit: 'cover' }}
                  />
                </span>
                <div className="team-card__body">
                  <h3>{member.name}</h3>
                  <p className="micro team-card__role">{member.role}</p>
                  <p className="small body-muted">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--brown" aria-labelledby="story-cta-title">
        <div className="container" style={{ display: 'grid', gap: '1.2rem', justifyItems: 'center', textAlign: 'center' }}>
          <BeeIcon size={40} style={{ color: 'var(--gold)' }} />
          <h2 className="display-md" id="story-cta-title" style={{ color: 'var(--cream)', maxWidth: '24ch' }}>
            COME TASTE WHERE WE <span className="accent-italic accent-gold">STARTED.</span>
          </h2>
          <p className="lede lede--light" style={{ textAlign: 'center' }}>
            Two honeys, one shilajit, all of it from this valley.
          </p>
          <div className="cluster justify-center">
            <Link href="/shop" className="btn btn--gold">
              Shop the collection
            </Link>
            <a
              href={CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn--outline-light"
            >
              <InstagramIcon size={16} />
              Follow along
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
