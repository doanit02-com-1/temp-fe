import { NextRequest, NextResponse } from 'next/server';
import { AUTH_SESSION_TTL_SECONDS, COOKIE_KEYS } from '@/constants/Constants';
import { BackendAuthError, requestBackendAuth } from '@/lib/auth/backend';
import { deleteAuthSession, getAuthSession, saveAuthSession } from '@/lib/auth/redisSession';
import type { BackendRefreshResponse } from '@/lib/auth/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(COOKIE_KEYS.SESSION_ID)?.value;
  const session = sessionId ? await getAuthSession(sessionId) : null;
  if (!sessionId || !session) {
    return NextResponse.json({ type: 'about:blank', title: 'Unauthenticated', status: 401 }, { status: 401 });
  }

  try {
    const tokens = await requestBackendAuth<BackendRefreshResponse>('/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });
    if (!tokens.accessToken || !Number.isFinite(tokens.expiresIn) || tokens.expiresIn <= 0) {
      throw new BackendAuthError(502, 'Invalid backend response', 'The token service returned an incomplete response.');
    }
    const refreshedSession = {
      ...session,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || session.refreshToken,
      accessTokenExpiresAt: Date.now() + tokens.expiresIn * 1000,
    };
    await saveAuthSession(sessionId, refreshedSession, tokens.refreshExpiresIn || AUTH_SESSION_TTL_SECONDS);
    return NextResponse.json({ user: refreshedSession.user }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof BackendAuthError && error.status >= 500) {
      return NextResponse.json({ type: 'about:blank', title: error.title, status: error.status, detail: error.detail }, { status: error.status });
    }
    await deleteAuthSession(sessionId);
    const response = error instanceof BackendAuthError
      ? NextResponse.json({ type: 'about:blank', title: error.title, status: error.status, detail: error.detail }, { status: error.status })
      : NextResponse.json({ type: 'about:blank', title: 'Authentication service unavailable', status: 503 }, { status: 503 });
    response.cookies.set(COOKIE_KEYS.SESSION_ID, '', {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0,
    });
    return response;
  }
}