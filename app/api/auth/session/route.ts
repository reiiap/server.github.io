import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = verifySessionToken(cookieStore.get('voxensmp_session')?.value);
    return NextResponse.json({ ok: true, player: session });
  } catch {
    return NextResponse.json({ ok: true, player: null });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('voxensmp_session');
  return response;
}
