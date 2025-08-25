import TaskCard from "../TaskCard";
import TaskDetail from "../TaskDetail";
import PrimaryButton from "../../../../components/ui/Buttons/PrimaryButton";
import OutlineButton from "../../../../components/ui/Buttons/OutlineButton";
import TabConfigurations from "./TabConfiguration";
import { useParams } from "react-router-dom";
import telecallersTaskData from "../../../../../data/task-management/telecallersTaskData.json";
import { FaHome } from "react-icons/fa";

const TaskDetailPage = () => {
  const { taskId } = useParams();
  console.log("I am taskId ", taskId);

  // Find the specific task based on taskId
  const currentTask = telecallersTaskData.find(
    (task) => task.taskId === taskId
  );
  console.log(currentTask);
  // If task not found, show error or default data
  if (!currentTask) {
    return (
      <div className="mr-4">
        <div className="w-full h-12 flex justify-center items-center mt-4 mb-4">
          <h1 className="text-xl lg:text-2xl font-bold text-red-600">
            Task not found: {taskId}
          </h1>
        </div>
      </div>
    );
  }

  const handleViewMap = () => {
    console.log("View in map clicked.");
  };

  return (
    <div className="mr-4">
      <div className="w-full h-12 flex justify-between items-center mt-4 mb-4">
        <div className="items-center gap-2">
          <h1 className="text-xl lg:text-2xl font-bold text-black mb-2">
            {currentTask.taskId}
          </h1>
          <div className="flex">
            <FaHome className="w-4 h-4 text-neutral-500 mt-1" />
            <p> \Task Management\{currentTask.taskId}</p>
          </div>
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
          name={currentTask.borrowerName}
          phone={currentTask.phone}
          email={currentTask.email}
          altNumber1={currentTask.altNumber1}
          altNumber2={currentTask.altNumber2}
          address1={currentTask.address1}
          address2={currentTask.address2}
          agentName={currentTask.telecaller}
          agentInitials={currentTask.telecaller
            .split(" ")
            .map((n) => n[0])
            .join("")}
          onViewMap={handleViewMap}
        />

        {/* Task & Loan Info */}
        <TaskCard
          taskDetails={{
            taskType: currentTask.taskType,
            taskId: currentTask.taskId,
            taskStatus: currentTask.status,
            collectionStatus: currentTask.collectionStatus,
            recommendedTime:
              currentTask.expandedDetails.taskDetails.recommendedTime,
            notes: currentTask.expandedDetails.taskDetails.notes,
          }}
          loanInformation={currentTask.expandedDetails.loanInformation}
        />
      </div>

      {/* Tabs Below */}
      <div className="mt-6">
        <TabConfigurations taskId={taskId} taskData={currentTask} />
      </div>
    </div>
  );
};

export default TaskDetailPage;
