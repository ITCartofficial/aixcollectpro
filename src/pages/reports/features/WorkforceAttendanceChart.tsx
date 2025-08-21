import type { MatrixChartData } from "../../../components/ui/Chart/MatrixBarChart";
import MatrixChart from "../../../components/ui/Chart/MatrixBarChart";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface AttendanceStatus {
  present: number;
  absent: number;
  late: number;
}

export interface AttendanceData {
  [employeeName: string]: {
    [date: string]: AttendanceStatus;
  };
}

interface WorkforceAttendanceCardProps {
  employees: string[];
  dates: string[];
  data: AttendanceData;
  className?: string;
  showPagination?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  barWidth?: number;
  verticalGap?: number;
}

const WorkforceAttendanceCard: React.FC<WorkforceAttendanceCardProps> = ({
  employees,
  dates,
  data,
  className = "",
  showPagination = true,
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange,
  barWidth = 24,
  verticalGap = 8,
}) => {
  const statusColors = {
    present: "#0B4FBD",
    absent: "#4A90E2",
    late: "#B8D4F0"
  };

  // Calculate pagination dynamically
  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  // Convert attendance data to matrix chart format
  const matrixData: MatrixChartData = {};
  currentEmployees.forEach(employee => {
    matrixData[employee] = {};
    dates.forEach(date => {
      const status = data[employee]?.[date] || { present: 0, absent: 0, late: 0 };
      matrixData[employee][date] = {
        segments: [
          { value: status.present, color: statusColors.present },
          { value: status.absent, color: statusColors.absent },
          { value: status.late, color: statusColors.late }
        ]
      };
    });
  });

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const startItem = startIndex + 1;
  const endItem = Math.min(endIndex, totalItems);

  return (
    <div className={`bg-white p-6 rounded-lg ${className}`}>
      {/* Title */}
      <h2 className="text-regular font-semibold text-neutral-700 mb-4">
        Workforce Attendance & Availability Stats
      </h2>

      {/* Matrix Chart */}
      <div className="mb-4">
        <MatrixChart
          rows={currentEmployees}
          columns={dates}
          data={matrixData}
          height={220}
          rowWidth={120}
          cellHeight={32}
          gap={8}
          barWidth={barWidth}
          verticalGap={verticalGap}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-4 pt-4">
        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="w-3 h-3 text-neutral-600" />
            </button>
            <span className="text-sm text-neutral-600">
              {startItem} - {endItem} of {totalItems}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronRight className="w-3 h-3 text-neutral-600" />
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-col sm:flex-row md:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 rounded" style={{ backgroundColor: statusColors.present }} />
            <span className="text-sm text-neutral-700">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 rounded" style={{ backgroundColor: statusColors.absent }} />
            <span className="text-sm text-neutral-700">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 rounded" style={{ backgroundColor: statusColors.late }} />
            <span className="text-sm text-neutral-700">Late</span>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default WorkforceAttendanceCard;