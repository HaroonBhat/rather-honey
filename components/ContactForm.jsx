'use client';

import { useState } from 'react';
import { CheckIcon } from './Icons';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    setState('loading');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Could not send your message. Please try again.');
        setState('idle');
        return;
      }
      setState('sent');
      setForm(EMPTY);
    } catch {
      setError('Network error — please try again.');
      setState('idle');
    }
  }

  if (state === 'sent') {
    return (
      <div className="panel" style={{ justifyItems: 'start', gap: '0.8rem' }}>
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--gold)',
            color: 'var(--brown-deep)',
          }}
        >
          <CheckIcon size={22} />
        </span>
        <h2 className="panel__title">Message received.</h2>
        <p style={{ fontSize: '0.92rem', color: 'rgba(36,23,15,.68)' }}>
          Thank you — we read every message and reply as soon as we can. For anything urgent, call or
          WhatsApp us.
        </p>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => setState('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="panel" style={{ gap: '0.9rem' }} noValidate>
      <h2 className="panel__title">Send us a note</h2>
      <div className="form-grid form-grid--2">
        <div className="field">
          <label className="field__label" htmlFor="contact-name">
            Your name
          </label>
          <input id="contact-name" className="input" value={form.name} onChange={update('name')} required />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className="input"
            value={form.email}
            onChange={update('email')}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="field__label" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          className="input"
          value={form.subject}
          onChange={update('subject')}
          placeholder="Order, bulk enquiry, something else…"
          required
        />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className="textarea"
          value={form.message}
          onChange={update('message')}
          required
        />
      </div>

      {error && (
        <p className="alert alert--error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn--gold" disabled={state === 'loading'}>
        {state === 'loading' ? 'Sending…' : 'Send message'}
      </button>
      <p className="form-note">
        We use your details only to reply to this message.
      </p>
    </form>
  );
}
