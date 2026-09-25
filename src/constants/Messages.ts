/**
 * Error and Info Messages
 */

export const MESSAGES = {
  // Error Messages (EMSG1xxx)
  EMSG1001: 'Invalid email or password',
  EMSG1002: 'Account locked due to multiple failed login attempts',
  EMSG1003: 'Your session has expired. Please login again',
  EMSG1004: 'You do not have permission to access this page',
  EMSG1005: 'Invalid request parameters',
  EMSG1006: 'Server error. Please try again later',
  EMSG1007: 'Network error. Please check your connection',
  EMSG1008: 'Request timeout. Please try again',
  EMSG1009: 'Unauthorized access',
  EMSG1010: 'Resource not found',

  // Info Messages (IMSG2xxx)
  IMSG2001: 'Login successful',
  IMSG2002: 'Logout successful',
  IMSG2003: 'Password changed successfully',
  IMSG2004: 'Profile updated successfully',
  IMSG2005: 'Operation completed successfully',
  IMSG2006: 'Data saved successfully',
  IMSG2007: 'Data deleted successfully',

  // Validation Messages
  VALIDATION_REQUIRED: 'This field is required',
  VALIDATION_EMAIL: 'Please enter a valid email address',
  VALIDATION_PASSWORD: 'Password must be at least 8 characters',
  VALIDATION_PASSWORD_STRENGTH: 'Password must contain uppercase, lowercase, number and special character',
  VALIDATION_CONFIRM_PASSWORD: 'Passwords do not match',
  VALIDATION_PHONE: 'Please enter a valid phone number',
} as const;
