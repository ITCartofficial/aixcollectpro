import { FaAward } from "react-icons/fa"
import StatsCardSection from "../../components/common/StatsCardSection"
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton"
import DateRangePickerInput from "../../components/ui/Input/DateRangePickerInput"
import GoogleHeatMap from "./features/GoogleHeatMap"
import { IoFlagOutline } from "react-icons/io5"
import { MdOutlinePaid, MdPendingActions } from "react-icons/md"
import { PiHandCoins } from "react-icons/pi"
import type { StatsData } from "../../components/ui/Card/StatsCard"
import SearchBar from "../../components/common/Searchbar"
import CollectionTrendSection from "./features/CollectionTrendSection"
import FieldAgentCollectionTable from "./features/FieldAgentCollectionTable"




const statsData: StatsData[] = [
  {
    id: '1',
    title: 'Total Collection',
    value: "₹9,82,000",
    icon: <PiHandCoins className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'Paid Cases ',
    value: '182',
    icon: <MdOutlinePaid className="w-5 h-5" />,
  },
  {
    id: '3',
    title: ' PTP / Partial Paid',
    value: "89/42",
    icon: <MdPendingActions className="w-5 h-5" />,
  },
  {
    id: '4',
    title: 'Flagged',
    value: 16,
    icon: <IoFlagOutline className="w-5 h-5" />,
  },
  {
    id: '5',
    title: ' Top Performing Agent',
    value: 'Rajesh Kumar',
    icon: <FaAward className="w-5 h-5" />,

  },
]

const CollectionMetrics = () => {
  return (
    <div className="mr-4">
      <div className="w-full h-12 flex justify-between items-center mt-4">
        <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">
          Attendance & Leave
        </h1>
        <div className="flex gap-4">
          <DateRangePickerInput />
          <PrimaryButton text="Export Report" className="w-42 bg-primary-700 hover:bg-primary-600 text-white" />
        </div>
      </div>
      <StatsCardSection cardData={statsData} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-x-6 gap-y-4 mt-4">
        <div className="bg-white p-4 col-span-5 rounded-lg shadow-[0px_1px_3px_0px_rgba(59,59,59,0.10)]">
          <div className="flex justify-between pb-4">
            <h2 className="text-base font-semibold text-neutral-700">Location-Wise Collection Heatmap</h2>
            <SearchBar placeholder="Search area..." />
          </div>
          <GoogleHeatMap />
        </div>
        <div className="col-span-5">
          <CollectionTrendSection />
        </div>
        <div className="col-span-10">
          <FieldAgentCollectionTable />
        </div>
      </div>
    </div>
  )
}

export default CollectionMetrics