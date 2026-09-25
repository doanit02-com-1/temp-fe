/**
 * Card molecule component
 */

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = '' }: CardProps): React.ReactNode {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
}
