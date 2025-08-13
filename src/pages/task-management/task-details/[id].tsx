import TaskCard from "./TaskCard";
import TaskDetail from "./TaskDetail"; // update path if needed
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
import OutlineButton from "../../../components/ui/Buttons/OutlineButton";
import TabConfigurations from "./TabConfiguration"; // update path if needed

const TaskDetailPage = () => {
  const handleViewMap = () => {
    console.log("View in map clicked.");
  };

  return (
    <div className="mr-4">
      {/* Header */}
      <div className="w-full h-12 flex justify-between items-center mt-4 mb-4">
        <div className="items-center gap-2">
          <h1 className="text-xl lg:text-2xl font-bold text-black mb-2">
            Task-24501
          </h1>
          <p>\ Task Management\Task-24501</p>
        </div>
        <div className="flex gap-4">
          <OutlineButton text="Export Report" className="min-w-40" />
          <PrimaryButton
            text="AI Escalate"
            className="w-42 bg-primary-700 hover:bg-primary-600 text-white"
          />
        </div>
      </div>

      {/* Combined Card */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 flex flex-col gap-6">
        {/* Borrower Details */}
        <TaskDetail
          name="Anil Kumar"
          phone="+91 98765 43210"
          email="anilkumar20@gmail.com"
          altNumber1="+91 98450 12345"
          altNumber2="+91 98000 54321"
          address1="23, 2nd cross, HSR Layout, Bangalore, karnataka-5560100"
          address2="23, 2nd cross, HSR Layout, Bangalore, karnataka-5560100"
          agentName="Rakesh Kumar"
          agentInitials="RK"
          onViewMap={handleViewMap}
        />

        {/* Task & Loan Info */}
        <TaskCard
          taskDetails={{
            taskType: "Collection & KYC",
            taskId: "TASK-248712",
            taskStatus: "Pending",
            collectionStatus: "Not Updated",
            recommendedTime: "Today, 11:30 AM – 12:30 PM",
            notes: "Customer requested early visit last time.",
          }}
          loanInformation={{
            loanCategory: "Personal Loan",
            loanAmount: "₹2,00,000",
            loanNumber: "LN-84739012",
            bankName: "HDFC Bank",
            dueAmount: "₹5,340",
            dueDate: "10 May 2025",
            penalInterest: "₹500",
            overdueDays: "15 days",
            pos: "₹1,50,000",
            tos: "₹1,75,000",
          }}
        />
      </div>

      {/* Tabs Below */}
      <div className="mt-6">
        <TabConfigurations />
      </div>
    </div>
  );
};

export default TaskDetailPage;
