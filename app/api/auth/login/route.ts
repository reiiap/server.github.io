import { NextResponse } from 'next/server';
import { consumeLoginCode, findLuckPermsPlayer, findLuckPermsRank, findOptionalPlayerStats } from '@/lib/auth/mysql';
import { createSessionToken, type PlayerSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

type LoginBody = {
  username?: string;
  code?: string;
};

function cleanUsername(username: string) {
  return username.trim().replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const username = cleanUsername(body.username ?? '');
    const code = String(body.code ?? '').trim();

    if (username.length < 3 || code.length < 6) {
      return NextResponse.json({ ok: false, error: 'Enter your Minecraft username and one-time server login code.' }, { status: 400 });
    }

    const player = await findLuckPermsPlayer(username);
    if (!player) {
      return NextResponse.json({ ok: false, error: 'ACCESS DENIED: this username is not registered in the VoxenSMP database.' }, { status: 403 });
    }

    const validCode = await consumeLoginCode(username, code);
    if (!validCode) {
      return NextResponse.json({ ok: false, error: 'ACCESS DENIED: invalid or expired Minecraft verification code.' }, { status: 403 });
    }

    const [rank, stats] = await Promise.all([
      findLuckPermsRank(player.uuid, player.primary_group),
      findOptionalPlayerStats(player.uuid),
    ]);

    const session: PlayerSession = {
      username: player.username,
      uuid: player.uuid,
      rank,
      avatarUrl: `https://mc-heads.net/avatar/${player.username}/96`,
      balance: stats.balance,
      playtime: stats.playtime,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    const token = createSessionToken(session);
    const response = NextResponse.json({ ok: true, player: session });
    response.cookies.set('voxensmp_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  } catch (error) {
    const message = error instanceof Error && error.message.includes('MYSQL_DATABASE_URL')
      ? 'Login database is not configured yet. Add MYSQL_DATABASE_URL and AUTH_SESSION_SECRET in Vercel.'
      : 'Login service temporarily unavailable.';
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}
