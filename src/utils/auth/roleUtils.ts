/**
 * Role Utilities
 */

import { ROLE_CODES } from '@/constants/Constants';

export function isAdminRole(role: string | null | undefined): boolean {
  return role === ROLE_CODES.ADMIN;
}

export function isManagerRole(role: string | null | undefined): boolean {
  return role === ROLE_CODES.MANAGER;
}

export function hasElevatedRole(role: string | null | undefined): boolean {
  return role === ROLE_CODES.ADMIN || role === ROLE_CODES.MANAGER;
}

export function getRoleDisplayName(role: string | null | undefined): string {
  switch (role) {
    case ROLE_CODES.ADMIN:
      return 'Administrator';
    case ROLE_CODES.MANAGER:
      return 'Manager';
    case ROLE_CODES.USER:
      return 'User';
    case ROLE_CODES.GUEST:
      return 'Guest';
    default:
      return 'Unknown';
  }
}
