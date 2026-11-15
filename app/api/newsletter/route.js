import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/store';
import { isEmail } from '@/lib/validate';

export const runtime = 'nodejs';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = String(payload?.email || '').trim();
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  try {
    const result = await addSubscriber(email, String(payload?.source || 'site').slice(0, 40));
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error('newsletter error', error);
    return NextResponse.json(
      { error: 'We could not save your subscription. Please try again shortly.' },
      { status: 500 }
    );
  }
}
