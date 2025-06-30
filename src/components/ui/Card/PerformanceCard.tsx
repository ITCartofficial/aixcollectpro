import React from 'react';
import { FaAward } from 'react-icons/fa';
import { FiChevronRight, FiPhone } from 'react-icons/fi';
import { MdOutlineWhatsapp } from 'react-icons/md';



interface PerformanceCardProps {
    initials: string;
    name: string;
    location: string;
    metricTitle: string;
    metricValue: number;
    paidCases: number;
    amountCollected: number;
    isTopPerformer?: boolean;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
    initials,
    name,
    location,
    metricTitle,
    metricValue,
    paidCases,
    amountCollected,
    isTopPerformer = false,
}) => {
    return (
        <div className="w-full h-max border border-neutral-300 rounded-lg p-4 shadow-sm flex flex-col gap-3 relative bg-white min-h-[140px] overflow-hidden">
            {isTopPerformer && (
                <div className="flex items-center gap-1 absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 text-xs font-medium">
                    <FaAward /> <span>Top Performer</span>
                </div>
            )}

            {/* Header Section */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-3 text-neutral-700 truncate">{name}</h3>
                        <span className="text-xs text-gray-500">{location}</span>
                    </div>
                    <FiChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <button className="p-2 border border-gray-300 rounded-full text-primary-700 hover:bg-primary-50 transition-colors">
                        <FiPhone size={14} />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-full text-primary-700 hover:bg-primary-50 transition-colors">
                        <MdOutlineWhatsapp size={14} />
                    </button>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 text-sm pt-2">
                <div className="flex flex-col items-center text-center pr-2">
                    <span className="text-gray-500 text-xs mb-1">{metricTitle}</span>
                    <span className="font-semibold text-gray-900">{metricValue}</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-r border-gray-200 px-2">
                    <span className="text-gray-500 text-xs mb-1">Paid Cases</span>
                    <span className="font-semibold text-gray-900">{paidCases}</span>
                </div>
                <div className="flex flex-col items-center text-center pl-2">
                    <span className="text-gray-500 text-xs mb-1">Amount Collected</span>
                    <span className="font-semibold text-gray-900">₹{amountCollected.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;









