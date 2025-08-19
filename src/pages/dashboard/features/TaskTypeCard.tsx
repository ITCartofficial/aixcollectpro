// import React from 'react';
// import DonutChart from "../../components/ui/Chart/DonutChart";
// import type { DonutChartData } from "../../components/ui/Chart/DonutChart";

// // Task Type Card Props - data is no longer required from props
// interface TaskTypeCardProps {
//     title?: string;
//     timeFrame?: string;
//     centerLabel?: string;
//     centerValue?: string | number;
//     chartSize?: number;
//     donutSize?: string;
//     showLegend?: boolean;
//     className?: string;
//     onTimeFrameChange?: (value: string) => void;
//     timeFrameOptions?: string[];
// }

// // Task Type Card Component
// const TaskTypeCard: React.FC<TaskTypeCardProps> = ({
//     title = "Task Type",
//     timeFrame = "Last Week",
//     centerLabel = "Total Task",
//     centerValue,
//     chartSize = 180,
//     donutSize = '65%',
//     showLegend = true,
//     className = '',
//     onTimeFrameChange,
//     timeFrameOptions = ["Last Week", "Last Month", "Last Quarter", "Last Year"]
// }) => {
//     // ✅ Task type data defined inside the component
//     const taskTypeData: DonutChartData[] = [
//         {
//             label: "Collection",
//             value: 413,
//             color: "#3B82F6", // Blue
//             percentage: 60
//         },
//         {
//             label: "KYC",
//             value: 138,
//             color: "#F59E0B", // Orange
//             percentage: 20
//         },
//         {
//             label: "Follow-Up Calls",
//             value: 138,
//             color: "#14B8A6", // Green
//             percentage: 20
//         }
//     ];

//     // Calculate total if centerValue is not provided
//     const calculatedCenterValue = centerValue || taskTypeData.reduce((sum, item) => sum + item.value, 0);
//     const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         if (onTimeFrameChange) {
//             onTimeFrameChange(event.target.value);
//         }
//     };

//     return (
//         <div className={`lg:col-span-3 bg-white p-4 rounded-lg shadow-[0px_1px_3px_0px_rgba(0, 81, 175, 0.10)] ${className}`}>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-regular font-semibold text-neutral-700">{title}</h2>
//                 <div className="relative">
//                     <select
//                         className="appearance-none bg-white border border-neutral-300 rounded-sm font-medium px-3 py-2 pr-8 text-xs text-black focus:outline-none focus:ring-1 focus:primary-500 focus:border-none cursor-pointer"
//                         value={timeFrame}
//                         onChange={handleTimeFrameChange}
//                     >
//                         {timeFrameOptions.map((option) => (
//                             <option key={option} value={option}>{option}</option>
//                         ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                     </div>
//                 </div>
//             </div>

//             {/* Chart Container */}
//             <div className="flex flex-col items-center">
//                 <div className="mb-6">
//                     <DonutChart
//                         data={taskTypeData}
//                         size={chartSize}
//                         donutSize={donutSize}
//                         centerLabel={centerLabel}
//                         centerValue={calculatedCenterValue}
//                     />
//                 </div>

//                 {/* Legend */}
//                 {showLegend && (
//                     <div className="w-full max-w-sm space-y-3">
//                         {taskTypeData.map((item, index) => {
//                             const calculatedPercentage = item.percentage ||
//                                 Math.round((item.value / taskTypeData.reduce((sum, dataItem) => sum + dataItem.value, 0)) * 100);

//                             return (
//                                 <div key={index} className="flex items-center justify-between">
//                                     <div className="flex items-center space-x-3">
//                                         <div
//                                             className="w-3 h-3 rounded-full flex-shrink-0"
//                                             style={{ backgroundColor: item.color }}
//                                         ></div>
//                                         <span className="text-xs font-medium text-neutral-700">{item.label}</span>
//                                     </div>
//                                     <div className="flex items-center space-x-4">
//                                         <span className="text-xs font-medium text-neutral-700">{item.value}</span>
//                                         <span className="text-xs font-medium text-neutral-700 w-8 text-right">{calculatedPercentage}%</span>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TaskTypeCard;








import React from 'react';
import DonutChart from "../../../components/ui/Chart/DonutChart";
import type { DonutChartData } from "../../../components/ui/Chart/DonutChart";

// Task Type Card Props - data is no longer required from props
interface TaskTypeCardProps {
    title?: string;
    timeFrame?: string;
    centerLabel?: string;
    centerValue?: string | number;
    chartSize?: number;
    donutSize?: string;
    showLegend?: boolean;
    className?: string;
    onTimeFrameChange?: (value: string) => void;
    timeFrameOptions?: string[];
}

// Task Type Card Component
const TaskTypeCard: React.FC<TaskTypeCardProps> = ({
    title = "Task Type",
    timeFrame = "Last Week",
    centerLabel = "Total Task",
    centerValue,
    chartSize = 180,
    donutSize = '65%',
    showLegend = true,
    className = '',
    onTimeFrameChange,
    timeFrameOptions = ["Last Week", "Last Month", "Last Quarter", "Last Year"]
}) => {
    // ✅ Task type data defined inside the component
    const taskTypeData: DonutChartData[] = [
        {
            label: "Collection",
            value: 413,
            color: "#3B82F6", // Blue
            percentage: 60
        },
        {
            label: "KYC",
            value: 138,
            color: "#F59E0B", // Orange
            percentage: 20
        },
        {
            label: "Follow-Up Calls",
            value: 138,
            color: "#47B881", // Green
            percentage: 20
        }
    ];

    // Calculate total if centerValue is not provided
    const calculatedCenterValue = centerValue || taskTypeData.reduce((sum, item) => sum + item.value, 0);
    const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onTimeFrameChange) {
            onTimeFrameChange(event.target.value);
        }
    };

    return (
        <div className={`lg:col-span-3 bg-white p-4 rounded-lg shadow-[0px_1px_3px_0px_rgba(0, 81, 175, 0.10)] ${className}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-regular font-semibold text-neutral-700">{title}</h2>
                <div className="relative">
                    <select
                        className="appearance-none bg-white border border-neutral-300 rounded-sm font-medium px-3 py-2 pr-8 text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:primary-500 focus:border-none cursor-pointer"
                        value={timeFrame}
                        onChange={handleTimeFrameChange}
                    >
                        {timeFrameOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
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
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
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

export default TaskTypeCard;