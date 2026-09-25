/**
 * useUserRole Hook
 * Retrieve and manage user role from store and session
 */

import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { authService } from '@/services/authService';

export function useUserRole() {
  const { userId, userRole, userName, isAdmin, initialize, clearUser, isInitialized } = useUserStore();

  useEffect(() => {
    let isCurrent = true;
    authService.getCurrentUser().then((result) => {
      if (!isCurrent) return;
      if (result.ok && result.response) {
        const user = result.response;
        initialize(user.id, user.roles[0] || 'USER', user.name);
      } else {
        clearUser();
      }
    });

    return () => { isCurrent = false; };
  }, [clearUser, initialize]);

  return {
    userId,
    userRole,
    userName,
    isAdmin,
    isInitialized,
  };
}
