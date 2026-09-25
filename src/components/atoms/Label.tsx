/**
 * Label atom component
 */

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export function Label({ required, children, ...props }: LabelProps): React.ReactNode {
  return (
    <label {...props} className="text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
