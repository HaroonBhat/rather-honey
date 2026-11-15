'use client';

import { useEffect, useState } from 'react';
import { CONFIG } from '@/lib/config';

export default function AnnouncementBar() {
  const messages = CONFIG.announcements || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4600);
    return () => window.clearInterval(id);
  }, [messages.length]);

  if (!messages.length) return null;

  return (
    <div className="announce">
      <div className="container announce__inner">
        <div className="announce__rotator" aria-live="polite">
          {messages.map((message, i) => (
            <p key={message} className={`announce__msg${i === index ? ' is-active' : ''}`}>
              <span className="announce__dot" aria-hidden="true" />
              {message}
            </p>
          ))}
        </div>
        <div className="announce__meta">
          <span>Free delivery over ₹{CONFIG.commerce.freeShippingThreshold}</span>
          <a href={`tel:${CONFIG.contact.phoneRaw}`}>Call {CONFIG.contact.phone}</a>
        </div>
      </div>
    </div>
  );
}
