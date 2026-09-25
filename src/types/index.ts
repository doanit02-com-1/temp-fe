/**
 * Type Definitions - Common types used across the application
 */

export type RoleType = 'ADMIN' | 'MANAGER' | 'USER' | 'GUEST';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  response?: T;
  errors?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
}

export interface AuthToken {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: RoleType[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
}

export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

export interface PageProps {
  params?: Record<string, any>;
  searchParams?: Record<string, string>;
}
