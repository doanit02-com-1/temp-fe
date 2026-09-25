/**
 * Session Storage Utilities
 */

export function setSessionData(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, value);
  }
}

export function getSessionData(key: string): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function removeSessionData(key: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
}

export function clearAllSessionData(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.clear();
  }
}

export function setSessionJSON<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getSessionJSON<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const value = sessionStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    }
  }
  return null;
}
