/**
 * Common TypeScript Interfaces
 */

export interface Option {
  label: string;
  value: string | number;
}

export interface SearchRadioProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export interface CommonDateInterface {
  startDate: Date | null;
  endDate: Date | null;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}

export interface SearchFormData {
  keyword: string;
  status?: string;
  dateRange?: CommonDateInterface;
  [key: string]: any;
}
