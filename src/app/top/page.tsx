import { requireAuthorizedSession } from '@/lib/auth/redisSession';
import { TopPageClient } from './TopPageClient';

export default async function TopPage() {
  const session = await requireAuthorizedSession('/top');

  return (
    <TopPageClient user={session.user} />
  );
}
