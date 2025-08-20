import React, { useState } from "react";
import TimelineChart from "../../../components/ui/Chart/TimelineChart";
import Dropdown from "../../../components/common/Dropdown";


const dataLastMonth = [
    { date: "Jun 1", value: 6 },
    { date: "Jun 2", value: 9 },
    { date: "Jun 3", value: 8 },
    { date: "Jun 4", value: 19 },
    { date: "Jun 5", value: 12 },
    { date: "Jun 6", value: 11 },
    { date: "Jun 7", value: 12 },
    { date: "Jun 8", value: 7 },
    { date: "Jun 9", value: 22 },
    { date: "Jun 10", value: 15 },
    { date: "Jun 11", value: 16 },
    { date: "Jun 12", value: 18 },
];
const dataThisMonth = [
    { date: "Jul 1", value: 7 },
    { date: "Jul 2", value: 10 },
    { date: "Jul 3", value: 12 },
    { date: "Jul 4", value: 15 },
    { date: "Jul 5", value: 14 },
    { date: "Jul 6", value: 13 },
    { date: "Jul 7", value: 13 },
    { date: "Jul 8", value: 10 },
    { date: "Jul 9", value: 18 },
    { date: "Jul 10", value: 15 },
    { date: "Jul 11", value: 16 },
    { date: "Jul 12", value: 18 },
];

const filterOptions = [
    { label: "Last Month", value: "lastMonth" },
    { label: "This Month", value: "thisMonth" },
];

const HighRiskTaskTrendCard: React.FC = () => {
    const [filter, setFilter] = useState<string>("lastMonth");

    const chartData = filter === "lastMonth" ? dataLastMonth : dataThisMonth;

    return (
        <div className="bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(59,59,59,0.10)] p-6 w-full">
            <div className="flex items-center mb-2">
                <h2 className="text-base font-semibold text-neutral-700 flex-1">
                    High-Risk Task Trend
                </h2>
                <div className="flex items-center gap-7">
                    {/* Legend */}
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-1.5 rounded-full bg-primary-600 inline-block" />
                        <span className="text-sm text-neutral-700 font-medium">
                            High-Risk Tasks
                        </span>
                    </div>
                    {/* Custom Dropdown as Filter */}
                    <Dropdown
                        options={filterOptions}
                        value={filter}
                        onChange={val => setFilter(typeof val === "string" ? val : (Array.isArray(val) ? val[0] : "lastMonth"))}
                        className="w-36"
                        placeholder="Select Month"
                    />
                </div>
            </div>
            <div className="mt-1">
                <TimelineChart data={chartData} height={300}/>
            </div>
        </div>
    );
};

export default HighRiskTaskTrendCard;