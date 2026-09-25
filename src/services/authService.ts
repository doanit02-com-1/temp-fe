import type { ApiResponse, AuthUser, LoginResponse } from '@/types';

async function request<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
    });
    const data = response.status === 204 ? undefined : await response.json();

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        errors: [data?.detail || data?.title || 'Request failed'],
      };
    }

    return { ok: true, status: response.status, response: data as T };
  } catch {
    return { ok: false, status: 0, errors: ['Unable to reach the application server'] };
  }
}

export const authService = {
  login(email: string, password: string) {
    return request<LoginResponse>('/api/auth/login', { email, password });
  },
  logout() {
    return request<void>('/api/auth/logout', {});
  },
  getCurrentUser() {
    return request<AuthUser>('/api/auth/me');
  },
};
