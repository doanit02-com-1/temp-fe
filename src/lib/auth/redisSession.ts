import 'server-only';
import Redis from 'ioredis';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_SESSION_TTL_SECONDS, COOKIE_KEYS } from '@/constants/Constants';
import { hasAccessToRoute } from '@/data/screenPermissions';
import { BackendAuthError, requestBackendAuth } from './backend';
import type { AuthSession } from './types';

const SESSION_PREFIX = 'source-fe:auth-session:';
const SESSION_REFRESH_WINDOW_MS = 60_000;
const globalRedis = globalThis as typeof globalThis & { authRedis?: Redis };
let redisConnect: Promise<unknown> | undefined;

async function getRedis(): Promise<Redis> {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error('REDIS_URL is not configured.');

  const client = globalRedis.authRedis || new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
  });
  globalRedis.authRedis = client;

  if (client.status === 'wait') {
    redisConnect ||= client.connect();
    try {
      await redisConnect;
    } catch (error) {
      redisConnect = undefined;
      throw error;
    }
  }

  return client;
}

export async function saveAuthSession(sessionId: string, session: AuthSession, ttl: number) {
  const redis = await getRedis();
  await redis.set(`${SESSION_PREFIX}${sessionId}`, JSON.stringify(session), 'EX', Math.max(1, Math.floor(ttl)));
}

export async function getAuthSession(sessionId: string): Promise<AuthSession | null> {
  const redis = await getRedis();
  const value = await redis.get(`${SESSION_PREFIX}${sessionId}`);
  if (!value) return null;

  try {
    return JSON.parse(value) as AuthSession;
  } catch {
    await redis.del(`${SESSION_PREFIX}${sessionId}`);
    return null;
  }
}

export async function deleteAuthSession(sessionId: string) {
  const redis = await getRedis();
  await redis.del(`${SESSION_PREFIX}${sessionId}`);
}

export async function getCurrentAuthSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_KEYS.SESSION_ID)?.value;
  if (!sessionId) return null;

  const session = await getAuthSession(sessionId);
  if (!session) return null;
  if (session.accessTokenExpiresAt - Date.now() > SESSION_REFRESH_WINDOW_MS) return session;

  try {
    const tokens = await requestBackendAuth<{
      accessToken: string; refreshToken?: string; expiresIn: number; refreshExpiresIn?: number;
    }>('/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });
    const refreshed = {
      ...session,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || session.refreshToken,
      accessTokenExpiresAt: Date.now() + tokens.expiresIn * 1000,
    };
    await saveAuthSession(sessionId, refreshed, tokens.refreshExpiresIn || AUTH_SESSION_TTL_SECONDS);
    return refreshed;
  } catch (error) {
    if (error instanceof BackendAuthError && error.status >= 500) throw error;
    await deleteAuthSession(sessionId);
    return null;
  }
}

export async function requireAuthorizedSession(pathname: string): Promise<AuthSession> {
  const session = await getCurrentAuthSession();
  if (!session) redirect('/');

  const allowed = session.user.roles.some((role) => hasAccessToRoute(pathname, role));
  if (!allowed) redirect('/forbidden');
  return session;
}