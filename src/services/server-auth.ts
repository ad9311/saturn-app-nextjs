import { jwtVerify, JWTPayload } from 'jose';

export function getJWTSecretKey() {
  const key = process.env.JWT_KEY;

  if (!key) {
    throw new Error('JWT key is undefined');
  }

  const encodedKey: Uint8Array = new TextEncoder().encode(key);
  return encodedKey;
}

export async function verifyJWTToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJWTSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
