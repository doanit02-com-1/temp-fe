'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { authService } from '@/services/authService';
import { useUserStore } from '@/stores/userStore';

export default function HomePage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await authService.login(email.trim(), password);
    setIsSubmitting(false);

    if (!result.ok || !result.response) {
      setError(result.errors?.[0] || 'Unable to sign in. Please try again.');
      return;
    }

    const user = result.response.user;
    setUser(user.id, user.roles[0] || 'USER', user.name);
    router.replace('/top');
  }

  return (
    <main className="login-shell">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-brand" aria-hidden="true">SF</div>
        <p className="login-eyebrow">SOURCE FE</p>
        <h1 id="login-title">Sign in to your account</h1>
        <p className="login-description">Use your organization account to continue.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            autoComplete="username"
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            autoComplete="current-password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <p className="login-error" role="alert">{error}</p>}
          <Button className="login-submit" type="submit" loading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </section>
    </main>
  );
}
