'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="not-found">
      <div className="container not-found__inner">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display-md" style={{ maxWidth: '20ch' }}>
          THE HONEY JAR TIPPED OVER.
        </h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          An unexpected error stopped this page from loading. Try again — if it keeps happening, call
          us and we will take your order by phone.
        </p>
        <div className="cluster justify-center">
          <button type="button" className="btn btn--gold" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/" className="btn btn--outline">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
