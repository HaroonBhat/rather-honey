import Link from 'next/link';
import reviews from '@/data/reviews.json';
import { getProductBySlug } from '@/lib/products';
import { CONFIG } from '@/lib/config';
import Reveal from '../Reveal';
import { QuoteIcon, StarIcon } from '../Icons';

const rated = reviews.productRatings.filter((r) => r.count > 0);
const totalCount = rated.reduce((n, r) => n + r.count, 0);
const weighted = rated.reduce((sum, r) => sum + r.value * r.count, 0);
const average = totalCount ? Math.round((weighted / totalCount) * 10) / 10 : 0;

function Stars({ value, size = 14 }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={size} filled={i < Math.round(value)} />
      ))}
    </span>
  );
}

/**
 * Reviews are rendered only from verified data in data/reviews.json.
 * No names, quotes or ratings are invented: when `items` is empty the section
 * shows the real store ratings and invites customers to leave the first words.
 */
export default function Reviews() {
  const hasTestimonials = Array.isArray(reviews.items) && reviews.items.length > 0;

  return (
    <section className="section section--cream" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>
              Customer reviews
            </p>
            <h2 className="display-lg" id="reviews-title">
              LOVED, <span className="accent-italic" style={{ color: 'var(--amber)' }}>JAR BY JAR.</span>
            </h2>
          </Reveal>
          <Reveal className="section-head__aside" variant="fade" delay={100}>
            <p className="lede" style={{ fontSize: '0.94rem' }}>
              Ratings below are pulled from our own store, where customers rate the jar they actually
              received. We publish written reviews only when customers share them with us.
            </p>
          </Reveal>
        </div>

        <div className="reviews__grid">
          <Reveal className="score-card" variant="up">
            <span className="eyebrow eyebrow--light">Store rating</span>
            <p className="score-card__value">
              {average ? average.toFixed(1) : '—'}
              <small>/ 5</small>
            </p>
            <p className="cluster" style={{ gap: '0.6rem' }}>
              <Stars value={average} size={16} />
              <span style={{ fontSize: '0.78rem', color: 'rgba(248,241,228,.7)' }}>
                {totalCount} verified rating{totalCount === 1 ? '' : 's'}
              </span>
            </p>
            <p className="score-card__note">
              Collected on our own store, from customers who bought the jar. The average covers every
              rated product.
            </p>
          </Reveal>

          <div>
            <div className="rating-list">
              {rated.map((rating) => {
                const product = getProductBySlug(rating.slug);
                if (!product) return null;
                return (
                  <Reveal className="rating-list__row" key={rating.slug} variant="fade">
                    <span className="rating-list__name">
                      <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                      <small>{product.variants[0].label}</small>
                    </span>
                    <span className="rating-list__value">
                      <Stars value={rating.value} />
                      {rating.value.toFixed(1)}
                      <small style={{ fontWeight: 500, color: 'rgba(36,23,15,.45)' }}>
                        ({rating.count})
                      </small>
                    </span>
                  </Reveal>
                );
              })}
            </div>

            {hasTestimonials ? (
              <div className="reviews__cards">
                {reviews.items.map((review) => (
                  <article className="review-card" key={`${review.name}-${review.date}`}>
                    <QuoteIcon size={22} style={{ color: 'var(--gold)' }} />
                    <blockquote>{review.quote}</blockquote>
                    <footer>
                      <Stars value={review.rating} size={12} />
                      <span>
                        {review.name} · {review.date}
                      </span>
                    </footer>
                  </article>
                ))}
              </div>
            ) : (
              <Reveal className="invite-card mt-lg" variant="up" delay={80}>
                <h3>Bought a jar? Your words belong here.</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(36,23,15,.66)', lineHeight: 1.6 }}>
                  We only publish reviews written by real customers — so the space above stays honest
                  until they write them. If you have a jar at home, tell us how it tasted.
                </p>
                <div className="cluster">
                  <a
                    href={`mailto:${CONFIG.contact.email}?subject=My%20Rather%20Honey%20review`}
                    className="btn btn--sm btn--outline"
                  >
                    Share your review
                  </a>
                  <Link href="/shop" className="link-arrow">
                    Pick a jar first
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
