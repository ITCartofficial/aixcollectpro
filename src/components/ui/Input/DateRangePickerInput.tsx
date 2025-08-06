import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import type { RangeKeyDict } from 'react-date-range';
import { FaRegCalendarAlt } from 'react-icons/fa';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const DateRangePickerInput: React.FC = () => {
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date('2025-06-02'),
      endDate: new Date('2025-06-08'),
      key: 'selection',
    },
  ]);

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleChange = (item: RangeKeyDict) => {
    setRange([item.selection as Range]);
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="relative w-max">
      <div
        onClick={() => setShowPicker((prev) => !prev)}
        className="flex items-center justify-between border border-neutral-300 rounded-md px-4 py-3 cursor-pointer hover:border-neutral-5s00 min-w-[260px]"
      >
        <span className="text-neutral-700 text-sm">
          {formatDate(range[0].startDate)} - {formatDate(range[0].endDate)}
        </span>
        <FaRegCalendarAlt className="text-neutral-600 ml-2" />
      </div>

      {showPicker && (
        <div className="absolute z-10 mt-2 shadow-lg">
          <DateRange
            editableDateInputs={true}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={['#0074F0']}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePickerInput;