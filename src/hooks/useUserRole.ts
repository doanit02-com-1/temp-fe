/**
 * useUserRole Hook
 * Retrieve and manage user role from store and session
 */

import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';

export function useUserRole() {
  const { userId, userRole, userName, isAdmin, initialize } = useUserStore();

  useEffect(() => {
    // Initialize user data from session storage on client
    if (typeof window !== 'undefined') {
      const storedUserId = sessionStorage.getItem('user_id');
      const storedRole = sessionStorage.getItem('user_role');
      const storedName = sessionStorage.getItem('user_name');

      if (storedUserId && storedRole) {
        initialize(storedUserId, storedRole, storedName);
      }
    }
  }, [initialize]);

  return {
    userId,
    userRole,
    userName,
    isAdmin,
    isInitialized: userId !== null && userRole !== null,
  };
}
