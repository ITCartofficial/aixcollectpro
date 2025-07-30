import React, { useState } from "react";
import Dropdown from "../../components/common/Dropdown";
import fieldAgentsTaskData from "../../../data/task-management/fieldAgentsTask.json";
import attendanceJsonData from "../../../data/attendance/attendanceData.json";
import DateRangePickerInput from "../../components/ui/Input/DateRangePickerInput";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
import StatsCardSection from "../../components/common/StatsCardSection";
import { GrTask } from "react-icons/gr";
import type { StatsData } from "../../components/ui/Card/StatsCard";
import { TbCalendarTime, TbUserCheck } from "react-icons/tb";
import { LiaHandshake } from "react-icons/lia";
import { PiFilesDuotone } from "react-icons/pi";
import TaskStatusDistribution from "./features/TaskStatusDistribution";
import TeamPerformanceSummaryChart from "./features/TeamPerformanceSummaryChart";
import DocumentVerificationStatusChart from "./features/DocumentVerificationStatusChart";
import WorkforceAttendanceCard, { type AttendanceData } from "./features/WorkforceAttendanceChart";
import EscalationsRiskFlagsTrends from "./features/EscalationsRiskFlagsTrends";
import AiPoweredOperationalTrendsChart from "./features/AiPoweredOperationalTrendsChart";

// Type definition for your actual JSON structure
interface AgentData {
  id: string;
  agentName: string;
  role: string;
  presentDays: number;
  lateCheckIns: number;
  avgHrsPerDay: number;
  overtimeDays: number;
  todayCheckInOut: string;
  currentStatus: string;
  avatar: string;
}

// Prepare dropdown options
const teamTypeOptions = [
  { label: "All", value: "" },
  { label: "Field Agent", value: "field-agent" },
  { label: "Telecaller", value: "telecaller" }
];

const taskTypeOptionsFieldAgent = [
  { label: "All", value: "" },
  { label: "KYC", value: "kyc" },
  { label: "Collection", value: "collection" }
];

const taskTypeOptionsTelecaller = [
  { label: "All", value: "" },
  { label: "New Calls", value: "new-calls" },
  { label: "Followup", value: "followup" }
];

// Get unique location options from fieldAgentsTaskData
const locationSet = new Set<string>();
(fieldAgentsTaskData as any[]).forEach((item: any) => {
  if (item.location) locationSet.add(item.location);
});
const locationOptions = [
  { label: "All", value: "" },
  ...Array.from(locationSet).map(loc => ({ label: loc, value: loc }))
];

const statsData: StatsData[] = [
  {
    id: '1',
    title: 'Total Tasks',
    value: 2130,
    icon: <GrTask className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'Avg. Completion Time',
    value: '1.6 hrs',
    icon: <TbCalendarTime className="w-6 h-6" />,
  },
  {
    id: '3',
    title: 'PTP to Paid Conversion',
    value: '61%',
    icon: <LiaHandshake className="w-6 h-6" />,
  },
  {
    id: '4',
    title: 'Verified KYC Docs',
    value: '1234',
    icon: <PiFilesDuotone className="w-6 h-6" />,
  },
  {
    id: '5',
    title: 'Attendance Logged',
    value: "92%",
    icon: <TbUserCheck className="w-6 h-6" />,
  },
];

// Transform your actual agent data to attendance format
const transformAttendanceData = (agentsData: AgentData[]) => {
  // Generate sample dates (you can modify this based on your needs)
  const dates = ["June 2", "June 3", "June 4", "June 5", "June 6", "June 7", "June 8"];

  // Extract employee names from your data
  const employees = agentsData.map((agent: AgentData) => agent.agentName);

  // Create attendance data based on your agent data
  const data: AttendanceData = {};

  agentsData.forEach((agent: AgentData, agentIndex: number) => {
    data[agent.agentName] = {};

    dates.forEach((date: string, dateIndex: number) => {
      const seed = agentIndex * 7 + dateIndex;
      const presentProbability = Math.min(agent.presentDays / 30, 0.9); // Max 90% present
      const lateProbability = Math.min(agent.lateCheckIns / 30, 0.2); // Max 20% late

      // Use seed for consistent results
      const random = (seed * 9301 + 49297) % 233280 / 233280;

      if (random < presentProbability - lateProbability) {
        // Present
        data[agent.agentName][date] = { present: 1, absent: 0, late: 0 };
      } else if (random < presentProbability) {
        // Late
        data[agent.agentName][date] = { present: 0, absent: 0, late: 1 };
      } else {
        // Absent
        data[agent.agentName][date] = { present: 0, absent: 1, late: 0 };
      }
    });
  });

  return { employees, dates, data };
};

const Reports: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [teamType, setTeamType] = useState<string>("");
  const [taskType, setTaskType] = useState<string>("");
  const [locations, setLocations] = useState<string[] | string>("");

  // Cast your JSON data to the correct type and transform it
  const agentsData = attendanceJsonData as AgentData[];
  const { employees, dates, data: attendanceData } = transformAttendanceData(agentsData);

  // Select task type options based on team type
  const currentTaskTypeOptions =
    teamType === "field-agent"
      ? taskTypeOptionsFieldAgent
      : teamType === "telecaller"
        ? taskTypeOptionsTelecaller
        : [];

  return (
    <div className="mr-4">
      <div className="w-full h-12 flex justify-between items-center mt-4 mb-5">
        <h1 className="text-xl lg:text-2xl font-bold text-black">Reports</h1>
        <div className="flex gap-4">
          <DateRangePickerInput />
          <PrimaryButton text="Export Report" className="w-42 bg-primary-700 hover:bg-primary-600 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-lg py-5 px-4 md:px-4 lg:px-25 gap-4 md:gap-6 lg:gap-15">
        <div className="flex flex-col">
          <h4 className="text-neutral-700 text-base font-semibold pb-4">Team Type</h4>
          <Dropdown
            options={teamTypeOptions}
            value={teamType}
            onChange={v => {
              setTeamType(typeof v === "string" ? v : (Array.isArray(v) ? v[0] : ""));
              setTaskType("");
              setLocations("");
            }}
            placeholder="All"
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-neutral-700 text-base font-semibold pb-4">Task Type</h4>
          <Dropdown
            options={currentTaskTypeOptions.length > 0 ? currentTaskTypeOptions : [{ label: "All", value: "" }]}
            value={taskType}
            onChange={v => setTaskType(typeof v === "string" ? v : (Array.isArray(v) ? v[0] : ""))}
            placeholder="All"
            className="w-full"
            disabled={!teamType}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-neutral-700 text-base font-semibold pb-4">Location</h4>
          <Dropdown
            options={locationOptions}
            value={locations}
            onChange={v => setLocations(v)}
            placeholder="All"
            className="w-full"
            multiSelect
            searchable
            disabled={teamType !== "field-agent"}
          />
        </div>
      </div>

      <StatsCardSection cardData={statsData} />

      <div className="grid grid-cols-1 md:grid-cols-10 mt-4 gap-x-6 gap-y-4 mb-4">
        <TaskStatusDistribution />
        <TeamPerformanceSummaryChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <DocumentVerificationStatusChart />
        <WorkforceAttendanceCard
          employees={employees}
          dates={dates}
          data={attendanceData}
          currentPage={currentPage}
          itemsPerPage={5}
          onPageChange={setCurrentPage}
          barWidth={28}
          verticalGap={0}
          className="overflow-x-scroll md:overflow-x-hidden"
        />
        <EscalationsRiskFlagsTrends height={225} />
        <AiPoweredOperationalTrendsChart />
      </div>
    </div>
  );
};

export default Reports;













