import PerformanceSummaryCard from "./PerformanceSummaryCard"
import PerformanceSummaryTable from "./PerformanceSummaryTable"


const PerformanceSummaryTab = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PerformanceSummaryCard/>
      <PerformanceSummaryTable/>
    </div>
  )
}

export default PerformanceSummaryTab