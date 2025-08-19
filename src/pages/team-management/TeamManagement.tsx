import { useState } from "react";
import type { StatsData } from "../../components/ui/Card/StatsCard";
import StatsCardSection from "../../components/common/StatsCardSection";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
import TelecallersTable from "./features/TelecallersTable";
import FieldAgentsTable from "./features/FieldAgentTable";
import SupervisorsTable from "./features/SupervisorsTable";
import { GiCash } from "react-icons/gi";
import { LuChartNoAxesCombined, LuUserCheck } from "react-icons/lu";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import OutlineButton from "../../components/ui/Buttons/OutlineButton";
import AddMemberModal from "./features/AddMemberModal";
import TaskAssignmentModal from "../dashboard/features/TaskAssignmentModal";

const statsData: StatsData[] = [
  {
    id: "1",
    title: "Total Field Agents",
    value: "28",
    icon: <FaBusinessTime className="w-5 h-5" />,
  },
  {
    id: "2",
    title: "Agents Active Today ",
    value: "22",
    icon: <LuUserCheck className="w-5 h-5" />,
  },
  {
    id: "3",
    title: "Inactive Agents",
    value: "3",
    icon: <MdOutlineSchedule className="w-5 h-5" />,
  },
  {
    id: "4",
    title: "Average Visits",
    value: "6.8",
    icon: <LuChartNoAxesCombined className="w-5 h-5" />,
  },
  {
    id: "5",
    title: "Total Collection",
    value: "₹3,45,000",
    icon: <GiCash className="w-5 h-5" />,
  },
];

type TabType = "supervisor" | "fieldAgents" | "telecaller";

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>("supervisor"); // Default to supervisor

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // State for Add Member Modal
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const openAddMemberModal = () => setAddMemberModalOpen(true);
  const closeAddMemberModal = () => setAddMemberModalOpen(false);

  // State for Task Assignment Modal
  const [isTaskAssignmentModalOpen, setTaskAssignmentModalOpen] = useState(false);
  const openTaskAssignmentModal = () => setTaskAssignmentModalOpen(true);
  const closeTaskAssignmentModal = () => setTaskAssignmentModalOpen(false);

  return (
    <div className="mr-3">
      <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">
        Team Management
      </h1>
      <div className="w-full flex sm:w-auto">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-4 h-10">
            <PrimaryButton
              text="Supervisor"
              className={`w-36 ${
                activeTab === "supervisor"
                  ? "bg-primary-700 text-white"
                  : "bg-white text-primary-700 hover:bg-primary-700 hover:text-white"
              }`}
              onClick={() => handleTabChange("supervisor")}
            />
            <PrimaryButton
              text="Field Agents"
              className={`w-36 ${
                activeTab === "fieldAgents"
                  ? "bg-primary-700 text-white"
                  : "bg-white text-primary-700 hover:bg-primary-700 hover:text-white"
              }`}
              onClick={() => handleTabChange("fieldAgents")}
            />
            <PrimaryButton
              text="Telecallers"
              className={`w-40 ${
                activeTab === "telecaller"
                  ? "bg-primary-700 text-white"
                  : "bg-white text-primary-700 hover:bg-primary-700 hover:text-white"
              }`}
              onClick={() => handleTabChange("telecaller")}
            />
          </div>

          <div className="flex gap-x-4">
            <OutlineButton text="+Add New Member" onClick={openAddMemberModal} />
            <AddMemberModal isOpen={isAddMemberModalOpen} onClose={closeAddMemberModal} />

            <PrimaryButton
              text="+Assign Task"
              className="w-36 bg-primary-700 hover:bg-primary-600 text-white"
              onClick={openTaskAssignmentModal}
            />
            <TaskAssignmentModal isOpen={isTaskAssignmentModalOpen} onClose={closeTaskAssignmentModal} />
          </div>
        </div>
      </div>
      <StatsCardSection cardData={statsData} />

      {/* Conditional rendering based on active tab */}
      {activeTab === "supervisor" && (
        <div className="mt-4">
          <SupervisorsTable />
        </div>
      )}
      {activeTab === "fieldAgents" && (
        <div className="mt-4">
          <FieldAgentsTable />
        </div>
      )}
      {activeTab === "telecaller" && (
        <div className="mt-4">
          <TelecallersTable />
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
