import { createHmac, timingSafeEqual } from 'node:crypto';

export type PlayerSession = {
  username: string;
  uuid: string;
  rank: string;
  avatarUrl: string;
  balance?: number | null;
  playtime?: number | null;
  exp: number;
};

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SESSION_SECRET must be set to at least 32 characters.');
  }
  return secret;
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input).toString('base64url');
}

function signPayload(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createSessionToken(session: PlayerSession) {
  const payload = base64Url(JSON.stringify(session));
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token?: string | null): PlayerSession | null {
  if (!token || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = signPayload(payload);
  const left = encoder.encode(signature);
  const right = encoder.encode(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;

  const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as PlayerSession;
  if (!session.exp || session.exp < Date.now()) return null;
  return session;
}
