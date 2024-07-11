import 'client-only';

export function setJWTCookie(token: string) {
  const cookie = `SATURN_APP_AUTH=${token};path='/';Secure=true;SameSite=Strict`;
  document.cookie = cookie;
}
