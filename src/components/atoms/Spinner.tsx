/**
 * Loading Spinner Component
 */

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function Spinner({ size = 'md', color = '#018838' }: SpinnerProps): React.ReactNode {
  const sizes = {
    sm: 24,
    md: 40,
    lg: 60,
  };

  const dimension = sizes[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 48 48`}
        style={{
          animation: 'spin 1s linear infinite',
        }}
      >
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray="31.4 94.2"
        />
      </svg>
    </div>
  );
}
