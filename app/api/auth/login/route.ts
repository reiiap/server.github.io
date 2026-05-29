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
      return NextResponse.json({ ok: false, error: 'Masukkan username Minecraft dan kode login sekali pakai dari server.' }, { status: 400 });
    }

    const player = await findLuckPermsPlayer(username);
    if (!player) {
      return NextResponse.json({ ok: false, error: 'AKSES DITOLAK: username ini belum terdaftar di database VoxenSMP.' }, { status: 403 });
    }

    const validCode = await consumeLoginCode(username, code);
    if (!validCode) {
      return NextResponse.json({ ok: false, error: 'AKSES DITOLAK: kode verifikasi Minecraft tidak valid atau sudah kedaluwarsa.' }, { status: 403 });
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
      ? 'Database login belum dikonfigurasi. Tambahkan MYSQL_DATABASE_URL dan AUTH_SESSION_SECRET di Vercel.'
      : 'Layanan login sementara belum tersedia.';
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}
