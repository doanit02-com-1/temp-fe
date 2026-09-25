/**
 * Base Service - Common API service functionality
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/apiClient';
import { getAuthorizedHeaders } from '@/utils/apiGetToken';
import type { ApiResponse } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class BaseService {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  protected async getUrl(endpoint: string): Promise<string> {
    return `${BASE_URL}${this.basePath}${endpoint}`;
  }

  protected async getHeaders(): Promise<Record<string, string>> {
    const authHeaders = await getAuthorizedHeaders();
    return Object.entries(authHeaders).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
  }

  protected async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    const url = await this.getUrl(endpoint);
    const headers = await this.getHeaders();
    return apiGet<T>(url, headers);
  }

  protected async post<T = any>(
    endpoint: string,
    body: any
  ): Promise<ApiResponse<T>> {
    const url = await this.getUrl(endpoint);
    const headers = await this.getHeaders();
    return apiPost<T>(url, body, headers);
  }

  protected async put<T = any>(
    endpoint: string,
    body: any
  ): Promise<ApiResponse<T>> {
    const url = await this.getUrl(endpoint);
    const headers = await this.getHeaders();
    return apiPut<T>(url, body, headers);
  }

  protected async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    const url = await this.getUrl(endpoint);
    const headers = await this.getHeaders();
    return apiDelete<T>(url, headers);
  }
}
