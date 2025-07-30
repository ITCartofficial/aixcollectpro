import React from 'react';
import DonutChart from "../../../components/ui/Chart/DonutChart";
import type { DonutChartData } from "../../../components/ui/Chart/DonutChart";

// Task Type Card Props - data is no longer required from props
interface TaskStatusDistributionProps {
    title?: string;
    centerLabel?: string;
    centerValue?: string | number;
    chartSize?: number;
    donutSize?: string;
    showLegend?: boolean;
    className?: string;
}

// Task Type Card Component
const TaskStatusDistribution: React.FC<TaskStatusDistributionProps> = ({
    title = "Task Status Distribution",
    centerLabel = "Total Issues",
    centerValue,
    chartSize = 180,
    donutSize = '65%',
    showLegend = true,
    className = '',
}) => {
    const taskTypeData: DonutChartData[] = [
        {
            label: "Completed",
            value: 1812,
            color: "#47B881",  // Green
            percentage: 85.07
        },
        {
            label: "In Progress",
            value: 97,
            color: "#3B82F6", // Blue
            percentage: 4.55
        },
        {
            label: "Follow-Up Pending",
            value: 84,
            color: "#F59E0B", // Orange
            percentage: 20
        },
        {
            label: "Flagged",
            value: 137,
            color: "#EC2D30", // Red
            percentage: 20
        }
    ];

    // Calculate total if centerValue is not provided
    const calculatedCenterValue = centerValue || taskTypeData.reduce((sum, item) => sum + item.value, 0);


    return (
        <div className={`col-span-5 lg:col-span-2 bg-white py-6 px-4 rounded-lg shadow-[0px_1px_3px_0px_rgba(0, 81, 175, 0.10)] ${className}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-regular font-semibold text-neutral-700">{title}</h2>
            </div>

            {/* Chart Container */}
            <div className="flex flex-col items-center">
                <div className="mb-4">
                    <DonutChart
                        data={taskTypeData}
                        size={chartSize}
                        donutSize={donutSize}
                        centerLabel={centerLabel}
                        centerValue={calculatedCenterValue}
                    />
                </div>

                {/* Legend */}
                {showLegend && (
                    <div className="w-full max-w-sm space-y-3">
                        {/* Legend Headers */}
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 flex-shrink-0"></div>
                                <span className="text-xs font-medium text-neutral-500">Task</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-xs font-medium text-neutral-500">Number</span>
                                <span className="text-xs font-medium text-neutral-500 w-8 text-right">%</span>
                            </div>
                        </div>

                        {/* Legend Items */}
                        {taskTypeData.map((item, index) => {
                            const calculatedPercentage = item.percentage ||
                                Math.round((item.value / taskTypeData.reduce((sum, dataItem) => sum + dataItem.value, 0)) * 100);

                            return (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="text-xs font-medium text-neutral-700">{item.label}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xs font-medium text-neutral-700">{item.value}</span>
                                        <span className="text-xs font-medium text-neutral-700 w-8 text-right">{calculatedPercentage}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskStatusDistribution;