import 'client-only';
import Cookies from 'js-cookie';

export function setJWTCookie(token: string) {
  Cookies.set('SATURN_APP_AUTH', token, {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'Strict',
  });
}
