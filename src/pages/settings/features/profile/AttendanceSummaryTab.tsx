import AttendanceCardSection from "./AttendanceCardSection"
import AttendanceSummaryTable from "./AttendanceSummaryTable"




const AttendanceSummaryTab = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <AttendanceCardSection/>
      <AttendanceSummaryTable/>
    </div>
  )
}

export default AttendanceSummaryTab