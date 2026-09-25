/**
 * Input Field atom component
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className,
  ...props
}: InputProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {helperText && <span className="text-sm text-gray-500">{helperText}</span>}
    </div>
  );
}
