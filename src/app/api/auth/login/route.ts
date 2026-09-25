import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_SESSION_TTL_SECONDS, COOKIE_KEYS } from '@/constants/Constants';
import { BackendAuthError, requestBackendAuth } from '@/lib/auth/backend';
import { saveAuthSession } from '@/lib/auth/redisSession';
import type { BackendLoginResponse } from '@/lib/auth/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return problem(400, 'Invalid request', 'Request body must be valid JSON.');
  }

  if (
    !body || typeof body !== 'object' || !('email' in body) || !('password' in body) ||
    typeof body.email !== 'string' || typeof body.password !== 'string' ||
    !body.email.trim() || !body.password
  ) {
    return problem(400, 'Invalid request', 'Email and password are required.');
  }

  try {
    const auth = await requestBackendAuth<BackendLoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ email: body.email.trim(), password: body.password }),
    });
    if (
      !auth?.accessToken || !auth.refreshToken || !auth.user?.id || !auth.user.email ||
      !auth.user.name || !Array.isArray(auth.user.roles) ||
      !Number.isFinite(auth.expiresIn) || auth.expiresIn <= 0
    ) {
      return problem(502, 'Invalid backend response', 'The authentication service returned an incomplete response.');
    }

    const configuredTtl = Number.isInteger(AUTH_SESSION_TTL_SECONDS) && AUTH_SESSION_TTL_SECONDS > 0
      ? AUTH_SESSION_TTL_SECONDS
      : 604800;
    const ttl = Math.min(configuredTtl, auth.refreshExpiresIn || configuredTtl);
    const sessionId = randomUUID();
    await saveAuthSession(sessionId, {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      accessTokenExpiresAt: Date.now() + auth.expiresIn * 1000,
      user: auth.user,
    }, ttl);

    const response = NextResponse.json({ user: auth.user });
    response.cookies.set(COOKIE_KEYS.SESSION_ID, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: ttl,
    });
    return response;
  } catch (error) {
    return authProblem(error);
  }
}

function problem(status: number, title: string, detail: string) {
  return NextResponse.json({ type: 'about:blank', title, status, detail }, { status });
}

function authProblem(error: unknown) {
  if (error instanceof BackendAuthError) return problem(error.status, error.title, error.detail);
  return problem(503, 'Authentication service unavailable', 'Sign-in could not be completed.');
}