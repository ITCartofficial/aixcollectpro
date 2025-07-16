<<<<<<< HEAD
import HeaderActionCenter from "../../components/common/HeaderActionCenter";
import StatsCardSection from "../../components/common/StatsCardSection"; // ✅ use reusable component

import { BsActivity } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { FaBusinessTime, FaDollarSign } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import type { StatsData } from "../../components/ui/Card/StatsCard";

const TeamManagement = () => {
  const leftButtons = [
    { type: "primary" as const, text: "Field Agent" },
    { type: "primary" as const, text: "Tele Callers" },
  ];

  const rightButtons = [
    { type: "outline" as const, text: "+Invite Agent" },
    { type: "primary" as const, text: "+Assign Task" },
  ];

  const statsData: StatsData[] = [
    {
      id: "1",
      title: "Total Field Agents",
      value: "28",
      icon: <FaBusinessTime className="w-6 h-6" />,
    },
    {
      id: "2",
      title: "Revenue Growth",
      value: "24%",
      icon: <FiTrendingUp className="w-6 h-6" />,
    },
    {
      id: "3",
      title: "Total Revenue",
      value: "$45,678",
      icon: <FaDollarSign className="w-6 h-6" />,
    },
    {
      id: "4",
      title: "Active Users",
      value: "1,234",
      icon: <BsActivity className="w-6 h-6" />,
    },
    {
      id: "5",
      title: "Total Orders",
      value: "567",
      icon: <CgShoppingCart className="w-6 h-6" />,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Team Management</h1>
      <HeaderActionCenter
        leftButtons={leftButtons}
        rightButtons={rightButtons}
      />
      <StatsCardSection statsData={statsData} />
=======
import { useState } from "react";
import HeaderActionCenter from "../../components/common/HeaderActionCenter";
import FieldAgentsTable from "./features/FieldAgenttable";
import StatsCardSection from "./features/StatsCardSection";
import TelecallersTable from "./features/TelecallersTable";

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState<"fieldAgent" | "telecaller">("fieldAgent");

  const leftButtons = [
    {
      text: "Field Agent",
      variant: activeTab === "fieldAgent" ? ("primary" as "primary") : ("outline" as "outline"),
      onClick: () => setActiveTab("fieldAgent"),
    },
    {
      text: "Telecallers",
      variant: activeTab === "telecaller" ? ("primary" as "primary") : ("outline" as "outline"),
      onClick: () => setActiveTab("telecaller"),
    },
  ];

  const rightButtons = [
    { text: "+Invite Agent", variant: "outline" as const, onClick: () => {} },
    { text: "+Assign Task", variant: "primary" as const, onClick: () => {} },
  ];

  return (
    <div className="mr-3">
      <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">
        Team Management
      </h1>
      <HeaderActionCenter leftButtons={leftButtons} rightButtons={rightButtons} />
      <StatsCardSection />

      {activeTab === "fieldAgent" && <FieldAgentsTable />}
      {activeTab === "telecaller" && <TelecallersTable />}
>>>>>>> dev
    </div>
  );
};

export default TeamManagement;
