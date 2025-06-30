import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";


//Types
interface MetricCardData {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  metric: string;
}

const MetricCard: React.FC<MetricCardData> = ({ title, value, percentage, isPositive, metric }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-[0px_1px_3px_0px_rgba(59, 59, 59, 0.10)]">
      <div className="flex items-center justify-between">
        <h3 className="text-regular font-medium text-gray-500">{title}</h3>
        <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? (
            <FiTrendingUp className="w-4 h-4" />
          ) : (
            <FiTrendingDown className="w-4 h-4" />
          )}
          <span>{percentage}</span>
        </div>
      </div>
      
      <div className="text-2xl font-bold text-neutral-700">{value}</div>
      <div className="text-2xl font-bold text-neutral-700">{metric}</div>
    </div>
  );
};

export default MetricCard




