// import AttendanceCardSections from "./AttendanceCardSections"
// import AttendanceSummary from "./AttendanceSummary"

// const AgentAttendance = () => {
//   return (
//      <div className="flex flex-col gap-y-4">
//       <AttendanceCardSections />
//       <AttendanceSummary/>
//     </div>
//   )
// }

// export default AgentAttendance

import AttendanceCardSections from "./AttendanceCardSections"
import AttendanceSummary from "./AttendanceSummary"

interface AgentAttendanceProps {
  agentData?: any; // The selected agent data passed from the profile
}

const AgentAttendance: React.FC<AgentAttendanceProps> = ({ agentData }) => {
  return (
     <div className="flex flex-col gap-y-4">
      <AttendanceCardSections agentData={agentData} />
      <AttendanceSummary agentData={agentData} />
    </div>
  )
}

export default AgentAttendance


