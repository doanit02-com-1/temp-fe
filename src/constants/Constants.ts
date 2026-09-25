/**
 * Constants - Application-wide configurations
 */

// Role Codes
export const ROLE_CODES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
  GUEST: 'GUEST',
} as const;

// Cookie Keys
export const COOKIE_KEYS = {
  SESSION_ID: 'sessionId',
  REMEMBERS_ME: 'rememberMe',
  THEME: 'theme',
} as const;

export const AUTH_SESSION_TTL_SECONDS = Number(
  process.env.AUTH_SESSION_TTL_SECONDS || 604800
);

// Session Storage Keys
export const SESSION_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  ID_TOKEN: 'id_token',
  USER_ROLE: 'user_role',
  USER_ID: 'user_id',
} as const;

// Cognito Configuration
export const COGNITO_CONFIG = {
  REGION: process.env.NEXT_PUBLIC_COGNITO_REGION || 'ap-northeast-1',
  USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
  DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '',
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
} as const;

// Token Refresh Threshold (ms) - refresh token if expiration is within this time
export const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

// Admin Roles
export const ADMIN_ROLES = [ROLE_CODES.ADMIN] as const;

// Protected Routes
export const PROTECTED_ROUTES = ['/top', '/dashboard', '/settings'] as const;

// Public Routes (no auth required)
export const PUBLIC_ROUTES = ['/', '/login'] as const;
