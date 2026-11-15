import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserByEmail } from '@/lib/store';
import { verifyPassword, sessionCookie, publicUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = String(payload?.email || '').trim().toLowerCase();
  const password = String(payload?.password || '');
  if (!email || !password) {
    return NextResponse.json({ error: 'Enter your email and password.' }, { status: 422 });
  }

  try {
    const user = await findUserByEmail(email);
    // Constant-ish response regardless of which half failed.
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Those details do not match an account.' }, { status: 401 });
    }
    cookies().set(sessionCookie(user.id));
    return NextResponse.json({ ok: true, user: publicUser(user) });
  } catch (error) {
    console.error('login error', error);
    return NextResponse.json({ error: 'Could not sign you in right now.' }, { status: 500 });
  }
}
