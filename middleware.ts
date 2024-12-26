import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const accessTokenCookie = req.cookies.get('sb-access-token');
  const refreshTokenCookie = req.cookies.get('sb-refresh-token');


  if (accessTokenCookie) {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessTokenCookie.value,      // The actual JWT from the cookie
      refresh_token: refreshTokenCookie?.value || '',
    });

    if (sessionError) {
      console.error('Error setting session manually:', sessionError.message);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }


  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('No user session found, redirecting to login.');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
