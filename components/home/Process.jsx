'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../Reveal';
import { ArrowRight } from '../Icons';

const STAGES = [
  {
    id: 'bloom',
    title: 'It begins with blossom',
    tag: 'Stage 01 — Nature',
    text: 'Honey is a record of what grows nearby. Around Gamroo the Kikar bloom shapes our Kiker honey, while other local flowers feed the hives through the season.',
    image: '/img/process-bloom.jpg',
    alt: 'Wildflowers in an alpine meadow with a honeybee collecting nectar',
  },
  {
    id: 'hive',
    title: 'The bees do the slow work',
    tag: 'Stage 02 — The hive',
    text: 'Our hives sit in the village, tended through the season the way they have been since 2015. Good honey cannot be hurried — it is gathered cell by cell.',
    image: '/img/process-honeycomb.jpg',
    alt: 'Golden honeycomb cells glistening with honey and a few bees',
  },
  {
    id: 'harvest',
    title: 'Lifted by hand',
    tag: 'Stage 03 — Harvest',
    text: 'Frames come out of the hive by hand and the honey is collected in small batches, close to the hives it came from.',
    image: '/img/process-harvest.jpg',
    alt: 'A beekeeper holding a honeycomb frame heavy with honey',
  },
  {
    id: 'jar',
    title: 'Bottled for your table',
    tag: 'Stage 04 — The jar',
    text: 'Each jar is filled, labelled and packed in small runs before it is dispatched — typically within two to three business days across India.',
    image: '/img/process-pack.jpg',
    alt: 'Clean glass honey jars with wooden lids arranged on a wooden workbench',
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section--cream process" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              Our process
            </p>
            <h2 className="display-lg" id="process-title">
              FROM BLOSSOM <span className="accent-italic" style={{ color: 'var(--amber)' }}>to</span> JAR.
            </h2>
          </Reveal>
          <Reveal className="section-head__aside" variant="up" delay={100}>
            <p className="lede" style={{ fontSize: '0.96rem' }}>
              Four slow stages, all of them close to home. Nothing here is rushed — least of all the
              bees.
            </p>
          </Reveal>
        </div>

        <div className="process__grid">
          <div className="process__visual">
            <Reveal variant="zoom">
              <div className="process__stage">
                {STAGES.map((stage, index) => (
                  <Image
                    key={stage.id}
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="(max-width: 999px) 90vw, 42vw"
                    className={index === active ? 'is-active' : 'is-hidden'}
                    style={{ objectFit: 'cover' }}
                  />
                ))}
                <div className="process__stage-caption">
                  <b>{STAGES[active].title}</b>
                  <span>{STAGES[active].tag}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="process__steps">
            {STAGES.map((stage, index) => (
              <article
                key={stage.id}
                className={`process__step${index === active ? ' is-active' : ''}`}
                data-index={index}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
              >
                <span className="process__num">0{index + 1}</span>
                <div>
                  <h3 className="process__step-title">{stage.title}</h3>
                  <p className="process__step-text">{stage.text}</p>
                  <span className="process__step-tag">{stage.tag}</span>
                  <div className="process__step-media">
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      width={720}
                      height={450}
                      sizes="90vw"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              </article>
            ))}

            <Reveal variant="fade" delay={80}>
              <Link href="/our-process" className="link-arrow mt-lg" style={{ marginTop: '2rem' }}>
                See how we work
                <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
