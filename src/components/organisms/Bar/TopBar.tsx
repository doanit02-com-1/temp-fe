/**
 * TopBar - Header navigation
 */

'use client';

import { useUserRole } from '@/hooks/useUserRole';
import { useUserStore } from '@/stores/userStore';
import { getRoleDisplayName } from '@/utils/auth/roleUtils';

export function TopBar(): React.ReactNode {
  const { userRole, userName } = useUserRole();
  const { clearUser } = useUserStore();

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      clearUser();
      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Source FE</div>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {userName} ({getRoleDisplayName(userRole)})
        </span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-white text-primary rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
