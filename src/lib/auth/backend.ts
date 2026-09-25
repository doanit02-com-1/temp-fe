import 'server-only';

export class BackendAuthError extends Error {
  constructor(
    public readonly status: number,
    public readonly title: string,
    public readonly detail: string
  ) {
    super(detail);
  }
}

export async function requestBackendAuth<T>(path: string, init: RequestInit): Promise<T> {
  const baseUrl = process.env.BACKEND_API_BASE_URL?.replace(/\/$/, '');
  if (!baseUrl) {
    throw new BackendAuthError(503, 'Authentication service unavailable', 'BACKEND_API_BASE_URL is not configured.');
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/v1/auth${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init.headers },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new BackendAuthError(503, 'Authentication service unavailable', 'The local backend could not be reached.');
  }

  if (response.status === 204) return undefined as T;

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const problem = body && typeof body === 'object' ? body as Record<string, unknown> : {};
    throw new BackendAuthError(
      response.status,
      typeof problem.title === 'string' ? problem.title : 'Authentication failed',
      typeof problem.detail === 'string' ? problem.detail : 'The backend rejected the authentication request.'
    );
  }

  return body as T;
}