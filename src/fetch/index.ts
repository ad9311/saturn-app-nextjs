export const defaultRequestHeaders: HeadersInit = {
  Accept: 'application/json; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
};

export async function getResource(
  url: string,
  authToken: string,
  headers: HeadersInit = defaultRequestHeaders
): Promise<Response> {
  return fetch(url, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${authToken}` },
  });
}

export async function postResource(
  url: string,
  authToken: string,
  body: BodyInit,
  headers: HeadersInit = defaultRequestHeaders
): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${authToken}` },
    body,
  });
}

export async function patchResource(
  url: string,
  authToken: string,
  body: BodyInit,
  headers: HeadersInit = defaultRequestHeaders
): Promise<Response> {
  return fetch(url, {
    method: 'PATCH',
    headers: { ...headers, Authorization: `Bearer ${authToken}` },
    body,
  });
}

export async function deleteResource(
  url: string,
  authToken: string,
  headers: HeadersInit = defaultRequestHeaders
): Promise<Response> {
  return fetch(url, {
    method: 'DELETE',
    headers: { ...headers, Authorization: `Bearer ${authToken}` },
  });
}
