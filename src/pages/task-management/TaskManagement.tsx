import { useState } from "react";
import type { StatsData } from "../../components/ui/Card/StatsCard";
import StatsCardSection from "../../components/common/StatsCardSection";
import { MdBarChart } from "react-icons/md";
import { TbFlag } from "react-icons/tb";
import { GrTask } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { PiHandCoinsDuotone } from "react-icons/pi";
import DateRangePickerInput from "../../components/ui/Input/DateRangePickerInput";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
import TelecallersTaskTable from "./features/TelecallersTaskTable";
import FieldAgentsTaskTable from "./features/FieldAgentsTaskTable";
import OutlineButton from "../../components/ui/Buttons/OutlineButton";

const statsData: StatsData[] = [
  {
    id: '1',
    title: 'Total Tasks',
    value: 1250,
    icon: <FaTasks className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'Completed Tasks',
    value: 864,
    icon: <GrTask className="w-5 h-5" />,
  },
  {
    id: '3',
    title: 'Flagged Tasks',
    value: 57,
    icon: <TbFlag className="w-5 h-5" />,
  },
  {
    id: '4',
    title: 'Collection Rate',
    value: '84%',
    icon: <MdBarChart className="w-5 h-5" />,
  },
  {
    id: '5',
    title: 'Avg. Visit Value',
    value: "₹3150",
    icon: <PiHandCoinsDuotone className="w-5 h-5" />,
  },
]

type TabType = "fieldTask" | "telecallerTask" ;

const TaskManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>("fieldTask");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="mr-3">
      <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">
        Task Management
      </h1>
      <div className="w-full flex sm:w-auto">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-4 h-10">
            <PrimaryButton
              text="Field Task"
              className={`w-32 ${
                activeTab === "fieldTask"
                  ? "bg-primary-700 text-white"
                  : "bg-white text-primary-700 hover:bg-primary-700 hover:text-white"
              }`}
              onClick={() => handleTabChange("fieldTask")}
            />
            <PrimaryButton
              text="Telecalling Task"
              className={`w-40 ${
                activeTab === "telecallerTask"
                  ? "bg-primary-700 text-white"
                  : "bg-white text-primary-700 hover:bg-primary-700 hover:text-white"
              }`}
              onClick={() => handleTabChange("telecallerTask")}
            />
          </div>
          <div className="flex gap-4">
            <DateRangePickerInput />
            <OutlineButton text="Export CSV" className="w-36"/>
            <PrimaryButton text="+Assign Task" className="w-36 bg-primary-700 hover:bg-primary-600 text-white" />
          </div>
        </div>
      </div>
      <StatsCardSection cardData={statsData} />

      {/* Conditional rendering based on active tab */}
      {activeTab === "fieldTask" && (
        <div className="mt-4">
          <FieldAgentsTaskTable />
        </div>
      )}
      {activeTab === "telecallerTask" && (
        <div className="mt-4">
          <TelecallersTaskTable />
        </div>
      )}
    </div>
  );
};

export default TaskManagement;