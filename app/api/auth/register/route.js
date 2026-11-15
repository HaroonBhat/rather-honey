import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { insertUser } from '@/lib/store';
import { hashPassword, sessionCookie, publicUser } from '@/lib/auth';
import { isEmail, isPhone } from '@/lib/validate';

export const runtime = 'nodejs';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(payload?.name || '').trim();
  const email = String(payload?.email || '').trim().toLowerCase();
  const phone = String(payload?.phone || '').trim();
  const password = String(payload?.password || '');

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please tell us your name.' }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 422 });
  }
  if (phone && !isPhone(phone)) {
    return NextResponse.json({ error: 'Enter a valid 10-digit mobile number.' }, { status: 422 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Use a password of at least 8 characters.' }, { status: 422 });
  }

  try {
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      address: null,
    };
    await insertUser(user);
    cookies().set(sessionCookie(user.id));
    return NextResponse.json({ ok: true, user: publicUser(user) }, { status: 201 });
  } catch (error) {
    if (error.code === 'EMAIL_TAKEN') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error('register error', error);
    return NextResponse.json({ error: 'Could not create your account right now.' }, { status: 500 });
  }
}
