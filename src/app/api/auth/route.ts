import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // TODO: Call your backend API or Cognito
    // Example with public BE endpoint:
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: response.status }
      );
    }

    const authData = await response.json();

    // Create response with HTTP-only cookie
    const res = NextResponse.json({
      accessToken: authData.accessToken,
      idToken: authData.idToken,
      userId: authData.userId,
      role: authData.role,
      name: authData.name,
    });

    // Set HTTP-only cookie for sessionId
    res.cookies.set({
      name: 'sessionId',
      value: authData.sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    res.cookies.set({
      name: 'userRole',
      value: authData.role,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
    });

    return res;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Refresh token endpoint
 * Can be called as POST /api/auth/refresh
 */
async function handleRefresh(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 400 }
      );
    }

    // TODO: Call your backend API to refresh token
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${backendUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Token refresh failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      accessToken: data.accessToken,
      idToken: data.idToken,
    });
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Logout endpoint
 * Can be called as POST /api/auth/logout
 */
async function handleLogout() {
  try {
    // TODO: Call your backend API to invalidate token/session
    const res = NextResponse.json({ success: true });

    // Clear cookies
    res.cookies.delete('sessionId');
    res.cookies.delete('userRole');

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export for reference (comment out POST handlers if not used)
// export { handleRefresh, handleLogout };
