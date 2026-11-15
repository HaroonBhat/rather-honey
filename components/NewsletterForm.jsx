'use client';

import { useState } from 'react';
import { CheckIcon, MailIcon } from './Icons';

export default function NewsletterForm({ source = 'footer' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (state === 'loading') return;
    setState('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setState('error');
        setMessage(data.error || 'We could not add you right now. Please try again.');
        return;
      }
      setState('success');
      setMessage(
        data.alreadySubscribed
          ? 'You are already on the list — thank you for being here.'
          : 'You’re on the list. A little more sweetness is on its way.'
      );
      setEmail('');
    } catch {
      setState('error');
      setMessage('Network error — please check your connection and try again.');
    }
  }

  if (state === 'success') {
    return (
      <div className="newsletter__success" role="status">
        <CheckIcon size={20} />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form className="newsletter__form" onSubmit={onSubmit} noValidate>
      <label htmlFor={`newsletter-${source}`} className="visually-hidden">
        Email address
      </label>
      <div className="newsletter__row">
        <div className="input-wrapper" style={{ flex: 1, position: 'relative', minWidth: 200 }}>
          <MailIcon
            size={18}
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(248,241,228,.45)',
              pointerEvents: 'none',
            }}
          />
          <input
            id={`newsletter-${source}`}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="input input--dark"
            style={{ paddingLeft: 42 }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === 'error') setState('idle');
            }}
            aria-invalid={state === 'error'}
            aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
          />
        </div>
        <button type="submit" className="btn btn--gold" disabled={state === 'loading'}>
          {state === 'loading' ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      {state === 'error' ? (
        <p className="field__error" id="newsletter-error" role="alert" style={{ color: '#f0a79c' }}>
          {message}
        </p>
      ) : (
        <p className="newsletter__consent">
          Harvest notes only. No spam, and you can leave any time.
        </p>
      )}
    </form>
  );
}
