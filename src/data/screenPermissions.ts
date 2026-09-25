/**
 * Screen Permissions - RBAC Configuration
 * Maps routes to allowed roles
 */

import { ROLE_CODES } from '@/constants/Constants';

export interface ScreenPermissionConfig {
  [route: string]: (typeof ROLE_CODES)[keyof typeof ROLE_CODES][];
}

export const screenPermissions: ScreenPermissionConfig = {
  '/top': [ROLE_CODES.ADMIN, ROLE_CODES.MANAGER, ROLE_CODES.USER],
  '/dashboard': [ROLE_CODES.ADMIN, ROLE_CODES.MANAGER],
  '/dashboard/analytics': [ROLE_CODES.ADMIN, ROLE_CODES.MANAGER],
  '/dashboard/reports': [ROLE_CODES.ADMIN],
  '/settings': [ROLE_CODES.ADMIN],
  '/settings/users': [ROLE_CODES.ADMIN],
  '/settings/roles': [ROLE_CODES.ADMIN],
  '/loan': [ROLE_CODES.ADMIN, ROLE_CODES.MANAGER, ROLE_CODES.USER],
  '/invoice-storage': [ROLE_CODES.ADMIN, ROLE_CODES.MANAGER, ROLE_CODES.USER],
  '/system': [ROLE_CODES.ADMIN],
};

/**
 * Check if user role has access to route
 */
export function hasAccessToRoute(
  route: string,
  userRole: string | null | undefined
): boolean {
  if (!userRole) return false;

  const allowedRoles = screenPermissions[route];
  if (!allowedRoles || allowedRoles.length === 0) {
    return false;
  }

  return allowedRoles.includes(userRole as any);
}

/**
 * Get all accessible routes for a user role
 */
export function getAccessibleRoutes(userRole: string | null | undefined): string[] {
  if (!userRole) return [];

  return Object.entries(screenPermissions)
    .filter(([, roles]) => roles.includes(userRole as any))
    .map(([route]) => route);
}
