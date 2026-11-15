import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { clearSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST() {
  cookies().set(clearSessionCookie());
  return NextResponse.json({ ok: true });
}
