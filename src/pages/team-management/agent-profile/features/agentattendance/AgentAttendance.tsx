import AttendanceCardSections from "./AttendanceCardSections"
import AttendanceSummary from "./AttendanceSummary"

const AgentAttendance = () => {
  return (
     <div className="flex flex-col gap-y-4">
      <AttendanceCardSections />
      <AttendanceSummary/>
    </div>
  )
}

export default AgentAttendance