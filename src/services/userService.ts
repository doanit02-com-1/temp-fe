/**
 * User Service Example
 * Follows BaseService pattern for consistency
 */

import { BaseService } from './baseService';
import type { ApiResponse, User } from '@/types';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export class UserService extends BaseService {
  constructor() {
    super('/api/users');
  }

  async getUsers(params?: PaginationParams): Promise<ApiResponse<User[]>> {
    const query = new URLSearchParams(
      Object.entries(params || {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();

    return this.get<User[]>(`?${query}`);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<User>(`/${id}`);
  }

  async createUser(data: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    return this.post<User>('', data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return this.put<User>(`/${id}`, data);
  }

  async deleteUser(id: string): Promise<ApiResponse> {
    return this.delete(`/${id}`);
  }
}

export const userService = new UserService();
