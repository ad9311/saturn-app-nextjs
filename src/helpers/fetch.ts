export const defaultRequestHeaders: HeadersInit = {
  Accept: 'application/json; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
};

export function getSession(
  url: string,
  body: BodyInit,
  headers: HeadersInit = defaultRequestHeaders
): Promise<Response> {
  return fetch(url, { method: 'POST', headers, body });
}

export function deleteSession(
  url: string,
  authToken: string,
  headers: HeadersInit = defaultRequestHeaders
): Promise<Response> {
  return fetch(url, {
    method: 'DELETE',
    headers: { ...headers, Authorization: `Bearer ${authToken}` },
  });
}

export function getCurrentUser(
  url: string,
  authToken: string,
  headers: HeadersInit = defaultRequestHeaders
) {
  return fetch(url, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${authToken}` },
  });
}
