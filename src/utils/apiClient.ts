/**
 * HTTP Client - Core API Handler
 * Handles timeouts, error handling, and response formatting
 */

interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  response?: T;
  errors?: string[];
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 10000
): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      ok: response.ok,
      status: response.status,
      response: data,
      errors: response.ok ? undefined : [data.message || 'Request failed'],
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          ok: false,
          status: 0,
          errors: [`Request timeout after ${timeoutMs}ms`],
        };
      }
      return {
        ok: false,
        status: 0,
        errors: [error.message],
      };
    }

    return {
      ok: false,
      status: 0,
      errors: ['Unknown error occurred'],
    };
  }
}

/**
 * Convenience method for GET requests
 */
export async function apiGet<T = any>(
  url: string,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

/**
 * Convenience method for POST requests
 */
export async function apiPost<T = any>(
  url: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

/**
 * Convenience method for PUT requests
 */
export async function apiPut<T = any>(
  url: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

/**
 * Convenience method for DELETE requests
 */
export async function apiDelete<T = any>(
  url: string,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}
