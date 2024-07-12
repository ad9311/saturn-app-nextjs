import 'client-only';
import Cookies from 'js-cookie';

export function setJWTCookie(name: string, authToken: string) {
  Cookies.set(name, authToken, {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'Strict',
  });
}
