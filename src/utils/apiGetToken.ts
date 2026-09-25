/**
 * API Token Management
 * Retrieves JWT tokens from session storage and adds them to request headers
 */

export interface AuthHeaders {
  Authorization?: string;
  'X-ID-Token'?: string;
  [key: string]: string | undefined;
}

/**
 * Get authorized headers with JWT tokens
 * @returns Headers object with Authorization and X-ID-Token
 */
export async function getAuthorizedHeaders(): Promise<AuthHeaders> {
  const headers: AuthHeaders = {};

  try {
    // Retrieve tokens from sessionStorage or cookies
    const accessToken = sessionStorage.getItem('access_token');
    const idToken = sessionStorage.getItem('id_token');

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    if (idToken) {
      headers['X-ID-Token'] = `Bearer ${idToken}`;
    }
  } catch (error) {
    console.error('Error retrieving auth tokens:', error);
  }

  return headers;
}

/**
 * Check if token is still valid
 */
export function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime;
  } catch {
    return false;
  }
}

/**
 * Get token expiration time
 */
export function getTokenExpiration(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload.exp * 1000;
  } catch {
    return null;
  }
}
