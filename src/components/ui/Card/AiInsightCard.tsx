import React from 'react';

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
            borderColor: 'border-l-red-500',
            badgeColor: 'bg-red-500',
            textColor: 'text-red-600'
        },
        medium: {
            borderColor: 'border-l-yellow-500',
            badgeColor: 'bg-yellow-500',
            textColor: 'text-yellow-600'
        },
        low: {
            borderColor: 'border-l-green-500',
            badgeColor: 'bg-green-500',
            textColor: 'text-green-600'
        }
    };

    const config = priorityConfig[priority];

    return (
        <div className={`w-full bg-white rounded-lg shadow-sm border ${config.borderColor} border-l-4 py-4 px-6 mx-auto`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <span className="text-sm text-gray-500">{timestamp}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>

            {/* Suggestion Section */}
            <div className="space-y-3">
                <h3 className="text-base font-medium text-gray-900">Suggestion</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{suggestion}</p>

                {/* Priority Badge */}
                <div className="flex justify-end">
                    <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-white mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${config.badgeColor} capitalize`}>
                            {priority}
                        </span>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiInsightCard;