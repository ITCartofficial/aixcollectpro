import React from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, suffix, className }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center rounded-md border border-gray-200 bg-white p-4 min-w-[140px] text-center ${className}`}>
      <span className="text-base text-neutral-600">{title}</span>
      <span className="text-lg font-bold text-neutral-700">
        {value} {suffix && <span className="text-lg font-bold text-neutral-700">{suffix}</span>}
      </span>
    </div>
  );
};

export default SummaryCard;
