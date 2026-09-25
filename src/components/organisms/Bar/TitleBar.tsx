/**
 * TitleBar - Display page title with actions
 */

interface TitleBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function TitleBar({ title, subtitle, actions }: TitleBarProps): React.ReactNode {
  return (
    <div className="flex justify-between items-start mb-6 border-b pb-4">
      <div>
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
