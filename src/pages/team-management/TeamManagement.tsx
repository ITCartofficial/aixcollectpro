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
    </div>
  );
};

export default TeamManagement;
