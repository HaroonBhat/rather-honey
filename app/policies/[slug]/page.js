import Link from 'next/link';
import { notFound } from 'next/navigation';
import { policies, policySlugs } from '@/lib/policies';

export const dynamicParams = false;

export function generateStaticParams() {
  return policySlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const policy = policies[params.slug];
  if (!policy) return { title: 'Policy not found' };
  return {
    title: policy.title,
    description: policy.intro.slice(0, 155),
    alternates: { canonical: `/policies/${params.slug}` },
  };
}

export default function PolicyPage({ params }) {
  const policy = policies[params.slug];
  if (!policy) notFound();

  return (
    <div className="prose-page">
      <div className="container container--narrow">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{policy.title}</span>
        </nav>

        <h1 className="display-lg" style={{ marginBlock: '0.7rem 0.6rem' }}>
          {policy.title.toUpperCase()}
        </h1>
        <p className="micro" style={{ color: 'rgba(36,23,15,.45)' }}>
          Last updated {policy.updated}
        </p>

        <div className="prose" style={{ marginTop: '1.8rem' }}>
          <p style={{ fontSize: '1.05rem', color: 'rgba(36,23,15,.8)' }}>{policy.intro}</p>
          {policy.sections.map((section) => (
            <section key={section.heading} style={{ display: 'grid', gap: '0.5rem' }}>
              <h2>{section.heading}</h2>
              {section.body}
            </section>
          ))}
        </div>

        <div className="cluster" style={{ marginTop: '2.4rem' }}>
          <Link href="/contact" className="btn btn--sm btn--outline">
            Contact us
          </Link>
          <Link href="/shop" className="link-arrow">
            Back to the shop
          </Link>
        </div>

        <nav className="cluster" style={{ marginTop: '2rem', gap: '1.2rem' }} aria-label="Other policies">
          {policySlugs
            .filter((slug) => slug !== params.slug)
            .map((slug) => (
              <Link key={slug} href={`/policies/${slug}`} className="small" style={{ textDecoration: 'underline' }}>
                {policies[slug].title}
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );
}
