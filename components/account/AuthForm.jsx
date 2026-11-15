'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '../ToastProvider';

export default function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const next = params.get('next') || '/account';
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }
      toast(tab === 'login' ? 'Welcome back.' : 'Your account is ready.');
      router.push(next);
      router.refresh();
    } catch {
      setError('Network error — please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div>
          <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>
            Rather Honey account
          </p>
          <h1 className="auth__title">{tab === 'login' ? 'Welcome back.' : 'Create your account.'}</h1>
          <p className="form-note" style={{ marginTop: '0.5rem' }}>
            {tab === 'login'
              ? 'Sign in to see your order history and check out faster.'
              : 'Keep every jar, order and address in one place.'}
          </p>
        </div>

        <div className="tabs" role="tablist" aria-label="Account access">
          <button
            type="button"
            role="tab"
            className="tabs__btn"
            aria-selected={tab === 'login'}
            onClick={() => {
              setTab('login');
              setError('');
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            className="tabs__btn"
            aria-selected={tab === 'register'}
            onClick={() => {
              setTab('register');
              setError('');
            }}
          >
            Create account
          </button>
        </div>

        <form onSubmit={submit} noValidate style={{ display: 'grid', gap: '0.8rem' }}>
          {tab === 'register' && (
            <>
              <div className="field">
                <label className="field__label" htmlFor="auth-name">
                  Full name
                </label>
                <input
                  id="auth-name"
                  className="input"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  required
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="auth-phone">
                  Mobile number <span style={{ textTransform: 'none' }}>(optional)</span>
                </label>
                <input
                  id="auth-phone"
                  className="input"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                />
              </div>
            </>
          )}

          <div className="field">
            <label className="field__label" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              className="input"
              autoComplete="email"
              value={form.email}
              onChange={update('email')}
              required
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              className="input"
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              value={form.password}
              onChange={update('password')}
              minLength={8}
              required
            />
            {tab === 'register' && <p className="form-note">At least 8 characters.</p>}
          </div>

          {error && (
            <p className="alert alert--error" role="alert" style={{ padding: '0.7rem 0.9rem' }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn btn--gold btn--block" disabled={loading}>
            {loading ? 'One moment…' : tab === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="form-note" style={{ lineHeight: 1.6 }}>
          Accounts are stored on this storefront only. We never see or store card numbers.
        </p>
      </div>
    </div>
  );
}
