/**
 * Example - Creating a Simple API Service
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/apiClient';
import { getAuthorizedHeaders } from '@/utils/apiGetToken';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Loan {
  id: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export class LoanService {
  /**
   * Search loans with filters
   */
  static async searchLoans(params: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const authHeaders = await getAuthorizedHeaders();
    const headers = Object.entries(authHeaders).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined) as any[]
    ).toString();

    return apiGet<Loan[]>(
      `${BASE_URL}/api/loans?${query}`,
      headers
    );
  }

  /**
   * Get single loan by ID
   */
  static async getLoan(id: string) {
    const authHeaders = await getAuthorizedHeaders();
    const headers = Object.entries(authHeaders).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    return apiGet<Loan>(
      `${BASE_URL}/api/loans/${id}`,
      headers
    );
  }

  /**
   * Create new loan
   */
  static async createLoan(data: Omit<Loan, 'id' | 'createdAt'>) {
    const authHeaders = await getAuthorizedHeaders();
    const headers = Object.entries(authHeaders).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    return apiPost<Loan>(
      `${BASE_URL}/api/loans`,
      data,
      headers
    );
  }

  /**
   * Update loan
   */
  static async updateLoan(id: string, data: Partial<Loan>) {
    const authHeaders = await getAuthorizedHeaders();
    const headers = Object.entries(authHeaders).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    return apiPut<Loan>(
      `${BASE_URL}/api/loans/${id}`,
      data,
      headers
    );
  }

  /**
   * Delete loan
   */
  static async deleteLoan(id: string) {
    const authHeaders = await getAuthorizedHeaders();
    const headers = Object.entries(authHeaders).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    return apiDelete(
      `${BASE_URL}/api/loans/${id}`,
      headers
    );
  }

  /**
   * Approve loan
   */
  static async approveLoan(id: string) {
    return this.updateLoan(id, { status: 'approved' });
  }

  /**
   * Reject loan
   */
  static async rejectLoan(id: string) {
    return this.updateLoan(id, { status: 'rejected' });
  }
}

// Usage in component:
// const result = await LoanService.searchLoans({ status: 'pending' });
// if (result.ok) {
//   setLoans(result.response);
// }
