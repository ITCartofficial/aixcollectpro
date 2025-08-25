import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

// Types for recent activity (can be reused for different data models)
export type RecentActivityStatus = "success" | "warning" | "info" | "error";

export interface RecentActivityItem {
  type: string;
  date: string;
  description: string;
  status: RecentActivityStatus;
}

export interface ExpandedRowContentProps<T> {
  row: T;
  // These keys are expected to be present in row, but the component is generic
  getTaskDetails: (row: T) => {
    recommendedTime?: string;
    notes?: string;
    amount?: string;
  };
  getLoanInformation: (row: T) => {
    loanCategory?: string;
    loanAmount?: string;
    loanNumber?: string;
    bankName?: string;
    netAmount?: string;
    dueDate?: string;
    pos?: string;
    tos?: string;
  };
  getRecentActivity: (row: T) => RecentActivityItem[];
  onMenuClick: (row: T, event: React.MouseEvent) => void;
}

const getActivityStatusVariant = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "info":
      return "bg-blue-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

function ExpandedRowContent<T>({
  row,
  getTaskDetails,
  getLoanInformation,
  getRecentActivity,
  onMenuClick,
}: ExpandedRowContentProps<T>) {
  const taskDetails = getTaskDetails(row);
  const loanInformation = getLoanInformation(row);
  const recentActivity = getRecentActivity(row);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Task Details */}
        <div className="bg-white p-4 rounded-lg border border-neutral-400 col-span-3">
          <h4 className="font-semibold text-neutral-700 mb-3">Task Details</h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-neutral-600">Recommended Time</span>
              <p className="text-sm font-medium">
                {taskDetails?.recommendedTime || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-sm text-neutral-600">Notes</span>
              <p className="text-sm">{taskDetails?.notes || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Loan Information */}
        <div className="bg-white p-4 rounded-lg border border-neutral-400 col-span-6">
          <h4 className="font-semibold text-neutral-700 mb-3">
            Loan Information
          </h4>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Loan Category</span>
              <p className="font-medium">
                {loanInformation?.loanCategory || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-neutral-600">Loan Amount</span>
              <p className="font-medium">
                {loanInformation?.loanAmount || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-neutral-600">Loan Number</span>
              <p className="font-medium">
                {loanInformation?.loanNumber || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-neutral-600">Bank Name</span>
              <p className="font-medium">
                {loanInformation?.bankName || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-neutral-600">Net Amount</span>
              <p className="font-medium">
                {loanInformation?.netAmount || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-neutral-600">Due Date</span>
              <p className="font-medium">{loanInformation?.dueDate || "N/A"}</p>
            </div>
            <div>
              <span className="text-neutral-600">POS</span>
              <p className="font-medium">{loanInformation?.pos || "N/A"}</p>
            </div>
            <div>
              <span className="text-neutral-600">TOS</span>
              <p className="font-medium">{loanInformation?.tos || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg border border-neutral-400 col-span-3">
          <h4 className="font-semibold text-neutral-700 mb-3">
            Recent Activity
          </h4>
          <div className="space-y-3">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getActivityStatusVariant(
                      activity.status
                    )}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-700">
                        {activity.type}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {activity.date}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex justify-end items-center mt-3 gap-2">
                      <button
                        className="flex items-center gap-[6px] bg-primary-600 text-white py-[5px] px-4 rounded-full text-sm hover:bg-primary-700 transition-colors cursor-pointer"
                        onClick={() => {
                          if (row && (row as any).taskId) {
                            const isFieldTask = (row as any).agent;
                            const route = isFieldTask
                              ? `/field-tasks/${(row as any).taskId}`
                              : `/task-details/${(row as any).taskId}`;
                            navigate(route);
                          }
                        }}
                      >
                        <FaEye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={(e) => onMenuClick(row, e)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-150"
                      >
                        <HiOutlineDotsVertical className="w-6 h-6 cursor-pointer text-neutral-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedRowContent;
