import { CONFIG } from '@/lib/config';
import NewsletterForm from '../NewsletterForm';
import Reveal from '../Reveal';
import { HoneycombMark } from '../Icons';

export default function Newsletter() {
  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <HoneycombMark className="newsletter__bees" size={340} aria-hidden="true" />
      <div className="container newsletter__inner">
        <div>
          <Reveal as="p" className="eyebrow eyebrow--light" style={{ marginBottom: '1rem' }}>
            Stay in the loop
          </Reveal>
          <Reveal as="h2" className="display-md newsletter__title" variant="up" delay={70} id="newsletter-title">
            A LITTLE MORE <span className="accent-italic accent-gold">SWEETNESS</span> IN YOUR INBOX.
          </Reveal>
          <Reveal as="p" className="lede lede--light" variant="fade" delay={140} style={{ marginTop: '1rem' }}>
            {CONFIG.newsletter.body}
          </Reveal>
        </div>
        <Reveal variant="up" delay={160}>
          <NewsletterForm source="footer" />
        </Reveal>
      </div>
    </section>
  );
}
