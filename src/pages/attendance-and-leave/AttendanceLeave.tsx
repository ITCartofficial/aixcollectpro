import { LuCalendarClock, LuTriangleAlert } from "react-icons/lu"
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton"
import { RiFileList3Line } from "react-icons/ri"
import type { StatsData } from "../../components/ui/Card/StatsCard"
import StatsCardSection from "../../components/common/StatsCardSection"
import { FaUser } from "react-icons/fa"
import { MdPendingActions } from "react-icons/md"
import AttendanceTable from "./features/AttendanceTable"
import DateRangePickerInput from "../../components/ui/Input/DateRangePickerInput"


const statsData: StatsData[] = [
  {
    id: '1',
    title: 'Total Present Today',
    value: 22,
    icon: <FaUser className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'Average Attendance Rate',
    value: '81%',
    icon: <LuTriangleAlert className="w-5 h-5" />,
  },
  {
    id: '3',
    title: 'Total Late Check-Ins',
    value: 18,
    icon: <MdPendingActions className="w-5 h-5" />,
  },
  {
    id: '4',
    title: 'Pending Leave Requests',
    value: 6,
    icon: <RiFileList3Line className="w-5 h-5" />,
  },
  {
    id: '5',
    title: ' Underutilized Members',
    value: '5',
    icon: <LuCalendarClock className="w-5 h-5" />,

  },
]

const AttendanceLeave = () => {
  return (
    <div className="mr-4">
      <div className="w-full h-12 flex justify-between items-center mt-4">
        <h1 className="text-xl lg:text-2xl font-bold text-neutral-700 mb-5 mt-4">
          Attendance & Leave
        </h1>
        <div className="flex gap-4">
          <DateRangePickerInput />
          <PrimaryButton text="Export Report" className="w-42 bg-primary-700 hover:bg-primary-600 text-white" />
        </div>
      </div>
      <StatsCardSection cardData={statsData} />
      <AttendanceTable/>
    </div>
  )
}

export default AttendanceLeave