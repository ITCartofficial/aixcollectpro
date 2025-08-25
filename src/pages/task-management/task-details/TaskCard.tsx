

import React from "react";
import Badge from "../../../components/ui/Table/Badge";

interface LoanInformation {
  loanCategory: string;
  loanAmount: string;
  loanNumber: string;
  bankName: string;
  dueAmount: string;
  dueDate: string;
  penalInterest: string;
  overdueDays: string;
  pos: string;
  tos: string;
}

interface TaskDetails {
  taskType: string;
  taskId: string;
  taskStatus: string;
  collectionStatus: string;
  recommendedTime: string;
  notes: string;
}

interface TaskCardProps {
  taskDetails: TaskDetails;
  loanInformation: LoanInformation;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskDetails, loanInformation }) => {
  return (
    <div className="bg-white rounded-lg borde p-4 flex gap-6">
      {/* Task Details Section */}
      <div className="flex-1">
        <h1 className="text-xl lg:text-xl font-bold text-black mb-2">
          Task Details
        </h1>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-4 gap-y-5 text-sm">
            <div>
              <span className="text-gray-500">Task Type</span>
              <p className="font-medium">{taskDetails.taskType}</p>
            </div>
            <div>
              <span className="text-gray-500">Task ID</span>
              <p className="font-medium">{taskDetails.taskId}</p>
            </div>

            <div>
              <span className="text-gray-500 flex ">Task Status</span>
              <Badge variant={taskDetails.taskStatus === "Pending" ? "warning" : "success"}>
                {taskDetails.taskStatus}
              </Badge>
            </div>
            <div>
              <span className="text-gray-500">Collection Status</span>
              <Badge variant={taskDetails.collectionStatus === "Not Updated" ? "secondary" : "success"}>
                {taskDetails.collectionStatus}
              </Badge>
            </div>

            <div>
              <span className="text-gray-500 mr-2">Recommended Time</span>
              <p className="font-medium">{taskDetails.recommendedTime}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Notes</span>
              <p className="font-medium italic">"{taskDetails.notes}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Information Section */}
      <div className="flex-1">
        <h1 className="text-xl lg:text-xl font-bold text-black mb-2">
          Loan Information
        </h1>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-5 gap-y-5 text-sm mb-9.5">
            <div>
              <span className="text-gray-500">Loan Category</span>
              <p className="font-medium">{loanInformation.loanCategory}</p>
            </div>
            <div>
              <span className="text-gray-500">Loan Amount</span>
              <p className="font-medium">{loanInformation.loanAmount}</p>
            </div>

            <div>
              <span className="text-gray-500">Loan Number</span>
              <p className="font-medium">{loanInformation.loanNumber}</p>
            </div>
            <div>
              <span className="text-gray-500">Bank Name</span>
              <p className="font-medium">{loanInformation.bankName}</p>
            </div>

            <div>
              <span className="text-gray-500">Due Amount</span>
              <p className="font-medium">{loanInformation.dueAmount}</p>
            </div>
            <div>
              <span className="text-gray-500">Due Date</span>
              <p className="font-medium">{loanInformation.dueDate}</p>
            </div>

            <div>
              <span className="text-gray-500">Penal interest</span>
              <p className="font-medium">{loanInformation.penalInterest}</p>
            </div>
            <div>
              <span className="text-gray-500">Over Due Days</span>
              <p className="font-medium">{loanInformation.overdueDays}</p>
            </div>

            <div>
              <span className="text-gray-500">POS</span>
              <p className="font-medium">{loanInformation.pos}</p>
            </div>
            <div>
              <span className="text-gray-500">TOS</span>
              <p className="font-medium">{loanInformation.tos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
