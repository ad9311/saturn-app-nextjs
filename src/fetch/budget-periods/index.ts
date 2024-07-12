import { defaultRequestHeaders } from "..";

export async function getBudgetPeriods(url: string, authToken: string, headers: HeadersInit = defaultRequestHeaders): Promise<Response> {
  return fetch(url, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${authToken}` },
  });
}
