import React from "react";

export interface AgentSummaryCard {
  label: string;
  icon: React.ReactNode;
  count: number;
  iconBg: string; // background color for icon
}

interface AgentStatusSummaryCardProps {
  summary: AgentSummaryCard[];
}

const AgentStatusSummaryCard: React.FC<AgentStatusSummaryCardProps> = ({ summary }) => (
  <div>
    {summary.map((item, idx) => (
      <div
        key={idx}
        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm mb-2 last:mb-0"
      >
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${item.iconBg}`}>
            {item.icon}
          </div>
          <span className="text-[15px] text-gray-900 font-medium">{item.label}</span>
        </div>
        <span className="text-2xl font-bold text-gray-900">{item.count}</span>
      </div>
    ))}
  </div>
);

export default AgentStatusSummaryCard;