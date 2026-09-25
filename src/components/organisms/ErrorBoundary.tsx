/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI
 */

'use client';

import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#018838',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Reload Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
