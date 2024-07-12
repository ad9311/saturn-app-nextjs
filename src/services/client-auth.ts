import 'client-only';
import Cookies from 'js-cookie';

export function setJWTCookie(name: string, token: string) {
  Cookies.set(name, token, {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'Strict',
  });
}
