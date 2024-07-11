import { NextRequest, NextResponse } from 'next/server';
import { verifyJWTToken } from './server-services/auth';

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get('SATURN_APP_AUTH')?.value;
  const validatedJWTToken = await verifyJWTToken(jwtToken as string);
  if (jwtToken && validatedJWTToken) {
    return NextResponse.next();
  } else {
    if (request.nextUrl.pathname.startsWith('/sign_in')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/sign_in', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
