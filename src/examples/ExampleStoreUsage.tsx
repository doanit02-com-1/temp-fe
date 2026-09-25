/**
 * Example - Using Zustand Store
 */

'use client';

import { useUserStore } from '@/stores/userStore';
import { useUserRole } from '@/hooks/useUserRole';

export function ExampleStoreUsage() {
  const { userId, userRole, isAdmin } = useUserRole();
  const { setRole, clearUser } = useUserStore();

  return (
    <div>
      <h2>Current User</h2>
      <p>User ID: {userId}</p>
      <p>Role: {userRole}</p>
      <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>

      <button onClick={() => setRole('ADMIN')}>Make Admin</button>
      <button onClick={() => clearUser()}>Clear User</button>
    </div>
  );
}
