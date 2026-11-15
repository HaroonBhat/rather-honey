import Link from 'next/link';
import { HoneycombMark } from '@/components/Icons';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container not-found__inner">
        <HoneycombMark size={64} style={{ color: 'var(--amber)' }} />
        <p className="not-found__code">404</p>
        <h1 className="display-md" style={{ maxWidth: '18ch' }}>
          THIS JAR IS EMPTY.
        </h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          The page you were looking for has moved, or never existed. The honey, thankfully, is still
          here.
        </p>
        <div className="cluster justify-center">
          <Link href="/" className="btn btn--gold">
            Back home
          </Link>
          <Link href="/shop" className="btn btn--outline">
            Shop the collection
          </Link>
        </div>
      </div>
    </div>
  );
}
