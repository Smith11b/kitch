
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  const body = await request.json();
  const { access_token, refresh_token } = body || {};

  if (!access_token) {
    return NextResponse.json(
      { error: 'Missing access token' },
      { status: 400 }
    );
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax' as const,
  };

  const accessCookie = serialize('sb-access-token', access_token, cookieOptions);
  const refreshCookie = serialize(
    'sb-refresh-token',
    refresh_token || '',
    cookieOptions
  );


  const response = NextResponse.json({ success: true }, { status: 200 });
  response.headers.append('Set-Cookie', accessCookie);
  response.headers.append('Set-Cookie', refreshCookie);

  return response;
}
