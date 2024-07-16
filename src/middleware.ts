import { NextRequest, NextResponse } from 'next/server';
import { verifyJWTToken } from './services/server-auth';

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('SATURN_APP_AUTH')?.value;
  const validatedJWTToken = await verifyJWTToken(authToken as string);

  if (authToken && validatedJWTToken) {
    if (request.nextUrl.pathname.startsWith('/sign-in')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } else {
    if (request.nextUrl.pathname.startsWith('/sign-in')) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
