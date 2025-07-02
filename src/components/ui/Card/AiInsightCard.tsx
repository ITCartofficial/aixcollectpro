import React from 'react';
import { RiAlertFill } from 'react-icons/ri';
// import { RiAlertFill } from 'react-icons/ri';

interface AiInsightCardProps {
    title: string;
    description: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
    timestamp: string;
}

const AiInsightCard: React.FC<AiInsightCardProps> = ({
    title,
    description,
    suggestion,
    priority,
    timestamp
}) => {
    const priorityConfig = {
        high: {
            borderColor: 'border-l-[#EC2D30]',
            badgeColor: 'bg-[#EC2D30]',
            textColor: 'text-red-600'
        },
        medium: {
            borderColor: 'border-l-[#FFAD0D]',
            badgeColor: 'bg-[#FFAD0D]',
            textColor: 'text-yellow-600'
        },
        low: {
            borderColor: 'border-l-[#0C9D61]',
            badgeColor: 'bg-[#0C9D61]',
            textColor: 'text-green-600'
        }
    };

    const config = priorityConfig[priority];

    return (
        <div className={`w-full bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] ${config.borderColor} border-l-4 py-3 px-4 sm:py-4 sm:px-6 mx-auto`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">{title}</h2>
                <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{timestamp}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">{description}</p>

            {/* Suggestion Section */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 sm:mb-2">Suggestion</h3>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words">{suggestion}</p>
                </div>

                {/* Priority Badge */}
                <div className="flex justify-start lg:justify-end lg:items-end">
                    <div className={`h-max flex items-center px-2 sm:px-3 py-1 rounded-full ${config.badgeColor} gap-1`}>
                        <RiAlertFill className='text-white' />
                        <span className="text-xs sm:text-sm font-medium text-white capitalize whitespace-nowrap">
                            {priority}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiInsightCard;