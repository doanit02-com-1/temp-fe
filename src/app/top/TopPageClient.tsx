'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { AuthUser } from '@/types';
import { authService } from '@/services/authService';
import { useUserStore } from '@/stores/userStore';

export function TopPageClient({ user }: { user: AuthUser }) {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    await authService.logout();
    clearUser();
    router.replace('/');
  }

  return (
    <main className="top-page">
      <header className="top-page-header">
        <div>
          <p className="login-eyebrow">SOURCE FE</p>
          <h1>Welcome, {user.name}</h1>
          <p>{user.email} · {user.roles.join(', ')}</p>
        </div>
        <button type="button" onClick={signOut} disabled={isSigningOut}>
          {isSigningOut ? 'Signing out...' : 'Sign out'}
        </button>
      </header>
      <section className="top-page-content">
        <h2>Application home</h2>
        <p>Your authenticated session is active.</p>
      </section>
    </main>
  );
}