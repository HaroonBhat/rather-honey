import crypto from 'crypto';
import { cookies } from 'next/headers';
import { findUserById } from './store';

const COOKIE = 'rh_session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const secret = () =>
  process.env.RH_SESSION_SECRET || 'rather-honey-dev-secret-change-in-production';

/* --------------------------------------------------------- passwords */

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  try {
    const [, salt, hash] = String(stored).split(':');
    if (!salt || !hash) return false;
    const candidate = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, 'hex');
    if (candidate.length !== expected.length) return false;
    return crypto.timingSafeEqual(candidate, expected);
  } catch {
    return false;
  }
}

/* ----------------------------------------------------------- sessions */

const sign = (payload) =>
  crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

export function createSessionValue(userId) {
  const payload = `${userId}.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function readSessionValue(value) {
  if (!value) return null;
  const [userId, issued, signature] = String(value).split('.');
  if (!userId || !issued || !signature) return null;
  const expected = sign(`${userId}.${issued}`);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  if (Date.now() - Number(issued) > MAX_AGE * 1000) return null;
  return { userId, issued: Number(issued) };
}

export function sessionCookie(userId) {
  return {
    name: COOKIE,
    value: createSessionValue(userId),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  };
}

export const clearSessionCookie = () => ({
  name: COOKIE,
  value: '',
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 0,
});

/** Server components / route handlers: the signed-in user, or null. */
export async function getCurrentUser() {
  const session = readSessionValue(cookies().get(COOKIE)?.value);
  if (!session) return null;
  const user = await findUserById(session.userId);
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

export const publicUser = (user) => {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
};
