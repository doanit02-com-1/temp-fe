/**
 * User Store Utils
 * Helper functions for user store management
 */

import { useUserStore } from '@/stores/userStore';
import { SESSION_STORAGE_KEYS } from '@/constants/Constants';

export function initializeUserFromSession() {
  const { initialize } = useUserStore();

  if (typeof window !== 'undefined') {
    const userId = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_ID);
    const userRole = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_ROLE);
    const userName = sessionStorage.getItem('user_name');

    if (userId && userRole) {
      initialize(userId, userRole, userName);
    }
  }
}

export function saveUserToSession(
  userId: string,
  userRole: string,
  userName: string
) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_ID, userId);
    sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_ROLE, userRole);
    sessionStorage.setItem('user_name', userName);
  }
}

export function clearUserFromSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.USER_ID);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.USER_ROLE);
    sessionStorage.removeItem('user_name');
  }
}
