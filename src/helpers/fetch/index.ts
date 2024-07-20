export async function getResource(url: string) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  return { response, data };
}

export async function postResource(url: string, body?: BodyInit) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body,
  });
  const data = await response.json();
  return { response, data };
}

export async function patchResource(url: string, body?: BodyInit) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body,
  });
  const data = await response.json();
  return { response, data };
}

export async function putResource(url: string, body?: BodyInit) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body,
  });
  const data = await response.json();
  return { response, data };
}

export async function deleteResource(url: string) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  return { response, data };
}
