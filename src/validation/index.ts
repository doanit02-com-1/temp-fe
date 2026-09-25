/**
 * Form Validation Rules
 */

export const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  confirmPassword: {
    required: 'Please confirm your password',
  },
  phone: {
    pattern: {
      value: /^[0-9+\-\s()]*$/,
      message: 'Invalid phone number',
    },
  },
  username: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Username must not exceed 20 characters',
    },
  },
  requiredField: {
    required: 'This field is required',
  },
};

export function matchPassword(getValues: any) {
  return {
    validate: (value: string) => {
      const password = getValues('password');
      return value === password || 'Passwords do not match';
    },
  };
}
