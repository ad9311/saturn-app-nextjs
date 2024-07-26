import { auth } from "@/auth"

export default auth((request) => {
  if (!request.auth && request.nextUrl.pathname !== "/auth/sign-in") {
    const newUrl = new URL("/auth/sign-in", request.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
