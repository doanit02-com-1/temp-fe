import { NextResponse } from 'next/server';
import { getCurrentAuthSession } from '@/lib/auth/redisSession';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getCurrentAuthSession();
  if (!session) {
    return NextResponse.json({
      type: 'about:blank', title: 'Unauthenticated', status: 401,
      detail: 'A valid session is required.',
    }, { status: 401 });
  }

  return NextResponse.json(session.user, { headers: { 'Cache-Control': 'no-store' } });
}