import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ENDPOINT = 'https://api.mcsrvstat.us/2/voxensmp.xyz';

type McSrvStatus = {
  online?: boolean;
  players?: { online?: number; max?: number };
  version?: string;
  motd?: { clean?: string[] };
  debug?: { ping?: boolean };
};

export async function GET() {
  try {
    const response = await fetch(ENDPOINT, { next: { revalidate: 60 } });
    if (!response.ok) {
      return NextResponse.json({ ok: false, error: 'Penyedia status Minecraft belum bisa dihubungi.' }, { status: 502 });
    }

    const data = (await response.json()) as McSrvStatus;
    return NextResponse.json({
      ok: true,
      online: Boolean(data.online),
      playersOnline: data.players?.online ?? 0,
      playersMax: data.players?.max ?? null,
      version: data.version ?? null,
      motd: data.motd?.clean?.filter(Boolean).join(' ') ?? null,
      ping: data.debug?.ping ?? null,
      checkedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Status server sementara belum tersedia.' }, { status: 503 });
  }
}
