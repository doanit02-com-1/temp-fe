import type { AuthUser } from '@/types';

export interface BackendLoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn?: number;
  user: AuthUser;
}

export interface BackendRefreshResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  refreshExpiresIn?: number;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: AuthUser;
}