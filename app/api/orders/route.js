import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/orders';
import { getCurrentUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const user = await getCurrentUser();
    const result = await createOrder(payload, user);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 422 });
    }
    return NextResponse.json({ ok: true, order: result.order }, { status: 201 });
  } catch (error) {
    console.error('order error', error);
    return NextResponse.json(
      { error: 'Something went wrong while placing your order. Please try again.' },
      { status: 500 }
    );
  }
}
