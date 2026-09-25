/**
 * Authentication Service
 */

import { BaseService } from './baseService';
import type { ApiResponse, User, AuthToken } from '@/types';

export class AuthService extends BaseService {
  constructor() {
    super('/api/auth');
  }

  async login(email: string, password: string): Promise<ApiResponse<AuthToken & User>> {
    return this.post('/login', { email, password });
  }

  async logout(): Promise<ApiResponse> {
    return this.post('/logout', {});
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthToken>> {
    return this.post('/refresh', { refreshToken });
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.get('/profile');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.put('/profile', data);
  }

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<ApiResponse> {
    return this.post('/change-password', { oldPassword, newPassword });
  }
}

export const authService = new AuthService();
