import StatsCardSection from "../../components/common/StatsCardSection"
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton"
import type { StatsData } from "../../components/ui/Card/StatsCard"
import { LiaHandshake } from "react-icons/lia"
import { TfiTimer } from "react-icons/tfi"
import { TbLocationSearch } from "react-icons/tb"
import { LuClipboardList } from "react-icons/lu"
import { PiWarningLight } from "react-icons/pi"
import HighRiskTaskTrend from "./features/HighRiskTaskTrends"
import SearchBar from "../../components/common/Searchbar"
import GeoRiskTaskDistribution from "./features/GeoRiskTaskDistribution"
import AiHighRiskTaskTable from "./features/AiHighRiskTaskTable"
import AgentResponseEfficiencyTable from "./features/AgentResponseEfficiencyTable"
import PTPToPaidConversionSection from "./features/PTPToPaidConversionSection"
import UpcomingRiskWindowTable from "./features/UpcomingRiskWindowTable"
import PredictiveAnalysisPanelTable from "./features/PredictiveAnalysisPanelTable"
import SmartAiRecommendation from "./features/SmartAiRecommendation"




const statsData: StatsData[] = [
  {
    id: '1',
    title: 'AI-High-Risk Tasks',
    value: 36,
    icon: <PiWarningLight className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'PTP to Paid Conversion',
    value: '61%',
    icon: <LiaHandshake className="w-5 h-5" />,
  },
  {
    id: '3',
    title: 'Average Response Time',
    value: "2.1 hrs",
    icon: <TfiTimer className="w-5 h-5" />,

  },
  {
    id: '4',
    title: 'Geo-Risk Zone',
    value: "22%",
    icon: <TbLocationSearch className="w-5 h-5" />,
  },
  {
    id: '5',
    title: 'Escalation Triggers',
    value: 15,
    icon: <LuClipboardList className="w-5 h-5" />,

  },
]

const AiInsights = () => {
  return (
    <div className="mr-4">
      {/* Header Title Section */}
      <div className="w-full h-12 flex justify-between items-center mt-4">
        <h1 className="text-xl lg:text-2xl font-bold text-neutral-700 mb-5 mt-4">AI Insights</h1>
        <div className="flex gap-4">
          <PrimaryButton text="Export Report" className="w-42 bg-primary-700 hover:bg-primary-600 text-white" />
        </div>
      </div>

      {/* Stats Card Section */}
      <StatsCardSection cardData={statsData} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-x-6 gap-y-4 mt-4">
        {/* High Risk Task Trend Section */}
        <div className="col-span-5">
          <HighRiskTaskTrend />
        </div>

        {/* Geo-Risk Task Distribution Section */}
        <div className="bg-white p-4 col-span-5 rounded-lg shadow-[0px_1px_3px_0px_rgba(59,59,59,0.10)]">
          <div className="flex justify-between pb-4">
            <h2 className="text-base font-semibold text-neutral-700">Geo-Risk Task Distribution</h2>
            <SearchBar placeholder="Search area..." />
          </div>
          <GeoRiskTaskDistribution />
        </div>

        <div className="grid col-span-10 gap-y-4">
          <AiHighRiskTaskTable />
          <AgentResponseEfficiencyTable />
        </div>

        <div className="col-span-5">
          <PTPToPaidConversionSection />
        </div>
        <div className="col-span-5">
          <UpcomingRiskWindowTable />
        </div>
        <div className="col-span-5">
          <PredictiveAnalysisPanelTable />
        </div>
        <div className="col-span-5">
          <SmartAiRecommendation />
        </div>

      </div>
    </div>
  )
}

export default AiInsights