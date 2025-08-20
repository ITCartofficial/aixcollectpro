import React from 'react';
type OptionType = 'upload-ai';

interface Option {
  id: OptionType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TaskAutoAssignProps {
  options: Option[];
  onOptionSelect: (optionId: OptionType) => void;
}

const TaskAutoAssign: React.FC<TaskAutoAssignProps> = ({ options, onOptionSelect }) => {
  return (
    <div className="flex gap-4 p-6">
      {options.map((option) => {
        const IconComponent = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onOptionSelect(option.id)}
            className={`
              flex-1 flex flex-col justify-center items-center rounded-lg border transition-all duration-200 p-8
              cursor-pointer outline-none
              border-blue-500
              bg-white text-gray-900 hover:bg-blue-600 hover:text-white
              group
            `}
            style={{ minWidth: 250, minHeight: 220 }}
          >
            <IconComponent className="mb-6 text-4xl text-blue-600 group-hover:text-white" />
            <span className="font-semibold text-lg mb-2 text-center group-hover:text-white">{option.title}</span>
            <span className="text-sm text-center text-gray-500 group-hover:text-white/80">{option.description}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TaskAutoAssign;
