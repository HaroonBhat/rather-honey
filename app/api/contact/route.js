import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { insertMessage } from '@/lib/store';
import { isEmail } from '@/lib/validate';

export const runtime = 'nodejs';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(payload?.name || '').trim();
  const email = String(payload?.email || '').trim();
  const subject = String(payload?.subject || '').trim();
  const message = String(payload?.message || '').trim();

  if (name.length < 2) return NextResponse.json({ error: 'Please enter your name.' }, { status: 422 });
  if (!isEmail(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 422 });
  if (subject.length < 3) return NextResponse.json({ error: 'Add a short subject.' }, { status: 422 });
  if (message.length < 10) {
    return NextResponse.json({ error: 'Tell us a little more (at least 10 characters).' }, { status: 422 });
  }

  try {
    await insertMessage({
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('contact error', error);
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 });
  }
}
