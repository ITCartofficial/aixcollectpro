// import Badge from "../../../components/ui/Table/Badge";

// const TaskCard = () => {
//   return (
//     <div className="flex gap-6 w-full">
//       {/* Task Details Card */}
//       <div className="bg-white rounded-[8px] border border-[#E5E7EB] shadow-sm px-6 py-5 w-full">
//       <div className="flex flex-col gap-3">
//         {/* Top Row */}
//         <div className="flex flex-row justify-between gap-5">
//           {/* Task Type */}
//           <div className="flex flex-col flex-1 min-w-[120px]">
//             <span className="text-xs text-gray-500 font-medium mb-1">Task Type</span>
//             <span className="text-black text-base font-semibold">Collection & KYC</span>
//           </div>
//           {/* Task ID */}
//           <div className="flex flex-col flex-1 min-w-[120px]">
//             <span className="text-xs text-gray-500 font-medium mb-1">Task ID</span>
//             <span className="text-black text-base font-semibold">TASK-248712</span>
//           </div>
//           {/* Task Status */}
//           <div className="flex flex-col flex-1 min-w-[120px]">
//             <span className="text-xs text-gray-500 font-medium mb-1">Task Status</span>
//             <span className="mt-1">
//               <span className="bg-[#FFA726] text-white px-4 py-1 rounded-full text-sm font-semibold">
//                 Pending
//               </span>
//             </span>
//           </div>
//           {/* Collection Status */}
//           <div className="flex flex-col flex-1 min-w-full">
//             <span className="text-xs text-gray-500 font-medium mb-1">Collection Status</span>
//             <span className="mt-1">
//               <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold">
//                 Not Updated
//               </span>
//             </span>
//           </div>
//         </div>
//         {/* Bottom Row */}
//         <div className="flex flex-row justify-between gap-10 mt-2">
//           {/* Recommended Time */}
//           <div className="flex flex-col flex-1 min-w-full">
//             <span className="text-xs text-gray-500 font-medium mb-1">Recommended Time</span>
//             <span className="text-black text-base font-normal">
//               Today, 11:30 AM – 12:30 PM
//             </span>
//           </div>
//           {/* Notes */}
//           <div className="flex flex-col flex-1 min-w-full ">
//             <span className="text-xs text-gray-500 font-medium mb-1">Notes</span>
//             <span className="text-black text-base font-normal italic">
//               “Customer requested early visit last time.”
//             </span>
//           </div>
//           {/* Empty for symmetry */}
//           <div className="flex-1 min-w-full" />
//           <div className="flex-1 min-w-full" />
//         </div>
//       </div>
//     </div>

//       {/* Loan Info Card */}
//       <div className="flex-1 bg-white rounded-[8px] p-8 flex flex-col justify-between border border-[#E5E7EB] shadow-sm">
//         <div className="flex flex-row gap-10">
//           {/* 1st column */}
//           <div>
//             <p className="text-gray-500 text-sm font-medium mb-1">Loan Category</p>
//             <p className="text-black text-base font-semibold mb-6">Personal Loan</p>
//             <p className="text-gray-500 text-sm font-medium mb-1">Due Date</p>
//             <p className="text-black text-base font-normal">10 May 2025</p>
//           </div>
//           {/* 2nd column */}
//           <div>
//             <p className="text-gray-500 text-sm font-medium mb-1">Loan Amount</p>
//             <p className="text-black text-base font-semibold mb-6">₹2,00,000</p>
//             <p className="text-gray-500 text-sm font-medium mb-1">Penal interest</p>
//             <p className="text-black text-base font-normal">₹500</p>
//           </div>
//           {/* 3rd column */}
//           <div>
//             <p className="text-gray-500 text-sm font-medium mb-1">Loan Number</p>
//             <p className="text-black text-base font-semibold mb-6">LN-84739012</p>
//             <p className="text-gray-500 text-sm font-medium mb-1">Over Due Days</p>
//             <p className="text-black text-base font-normal">15 days</p>
//           </div>
//           {/* 4th column */}
//           <div>
//             <p className="text-gray-500 text-sm font-medium mb-1">Bank Name</p>
//             <p className="text-black text-base font-semibold mb-6">HDFC Bank</p>
//             <p className="text-gray-500 text-sm font-medium mb-1">POS</p>
//             <p className="text-black text-base font-normal">₹1,50,000</p>
//           </div>
//           {/* 5th column */}
//           <div>
//             <p className="text-gray-500 text-sm font-medium mb-1">Due Amount</p>
//             <p className="text-black text-base font-semibold mb-6">₹5,340</p>
//             <p className="text-gray-500 text-sm font-medium mb-1">TOS</p>
//             <p className="text-black text-base font-normal">₹1,75,000</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

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
          <div className="grid grid-cols-4 gap-y-10 text-sm">
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
              <span className="text-gray-500">Recommended Time</span>
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
          <div className="grid grid-cols-5 gap-y-15 text-sm">
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
