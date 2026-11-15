import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/coupons';

export const runtime = 'nodejs';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ valid: false, message: 'Invalid request.' }, { status: 400 });
  }

  const subtotal = Number(payload?.subtotal) || 0;
  const result = validateCoupon(payload?.code, subtotal);
  return NextResponse.json(result);
}
