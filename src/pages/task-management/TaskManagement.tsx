import HeaderActionCenter from "../../components/common/HeaderActionCenter";
import StatsCardSection from "../../components/common/StatsCardSection";

import { MdOutlineAddIcCall } from "react-icons/md";
import { MdOutlinePaid } from "react-icons/md";
import { MdOutlineCollections } from "react-icons/md";
import { MdOutlineSwapCalls } from "react-icons/md";
import { MdOutlinePhoneCallback } from "react-icons/md";
import type { StatsData } from "../../components/ui/Card/StatsCard";

const TaskManagement = () => {
  const leftButtons: { type: "primary" | "outline"; text: string }[] = [
    { type: "primary", text: "Field Task" },
    { type: "primary", text: "Telecalling Task" },
  ];

  const rightButtons: { type: "primary" | "outline"; text: string }[] = [
    { type: "outline", text: "Export CSV" },
    { type: "primary", text: "+Assign Task" },
  ];

  const statsData: StatsData[] = [
    {
      id: "1",
      title: "Total Tasks",
      value: "1,250",
      icon: <MdOutlineAddIcCall className="w-6 h-6" />,
      className: "",
    },
    {
      id: "2",
      title: "Completed Tasks",
      value: "864",
      icon: <MdOutlinePaid className="w-6 h-6" />,
      className: "",
    },
    {
      id: "3",
      title: "Flagged Tasks",
      value: "57",
      icon: <MdOutlineCollections className="w-6 h-6" />,
      className: "",
    },
    {
      id: "4",
      title: "Collection Rate",
      value: "74%",
      icon: <MdOutlineSwapCalls className="w-6 h-6" />,
      className: "text-green-500", // Example if you want to apply color
    },
    {
      id: "5",
      title: "Avg. Visit Value",
      value: "₹3,150",
      icon: <MdOutlinePhoneCallback className="w-6 h-6" />,
      className: "text-green-500",
    },
  ];

  return (
    <div className="mr-3">
      <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">
        Task Management
      </h1>
      <HeaderActionCenter
        leftButtons={leftButtons}
        rightButtons={rightButtons}
      />
      <StatsCardSection statsData={statsData} />
    </div>
  );
};

export default TaskManagement;
