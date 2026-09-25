import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_KEYS } from '@/constants/Constants';
import { BackendAuthError, requestBackendAuth } from '@/lib/auth/backend';
import { deleteAuthSession, getAuthSession } from '@/lib/auth/redisSession';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(COOKIE_KEYS.SESSION_ID)?.value;
  let failure: unknown;

  try {
    const session = sessionId ? await getAuthSession(sessionId) : null;
    if (session) {
      await requestBackendAuth<void>('/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.accessToken}` },
        body: JSON.stringify({ refreshToken: session.refreshToken }),
      });
    }
  } catch (error) {
    failure = error;
  }

  if (sessionId) {
    try {
      await deleteAuthSession(sessionId);
    } catch (error) {
      failure ||= error;
    }
  }

  const response = failure
    ? NextResponse.json(toProblem(failure), { status: failure instanceof BackendAuthError ? failure.status : 503 })
    : new NextResponse(null, { status: 204 });
  response.cookies.set(COOKIE_KEYS.SESSION_ID, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}

function toProblem(error: unknown) {
  if (error instanceof BackendAuthError) {
    return { type: 'about:blank', title: error.title, status: error.status, detail: error.detail };
  }
  return {
    type: 'about:blank', title: 'Authentication service unavailable', status: 503,
    detail: 'The local session was cleared, but backend logout could not be confirmed.',
  };
}