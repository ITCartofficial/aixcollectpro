// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'pending' | 'not-updated';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant, className = '' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    pending: 'bg-purple-100 text-purple-800',
    'not-updated': 'bg-gray-200 text-gray-500',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;