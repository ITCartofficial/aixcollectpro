import { type ReactNode } from 'react';


interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export interface StatsData {
  id: string;
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string;
  className?: string;
}

const StatsCard = ({ title, value, icon, className = '' }: StatsCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(59,59,59,0.10)] p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-neutral-600 text-sm font-medium mb-2">{title}</h3>
          <p className="text-2xl font-bold text-neutral-700">{value}</p>
        </div>
        {icon && (
          <div className="bg-primary-100 rounded-lg p-3 text-primary-700">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;