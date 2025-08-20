import PrimaryButton from "../../components/ui/Buttons/PrimaryButton"
import type { StatsData } from "../../components/ui/Card/StatsCard"
import StatsCardSection from "../../components/common/StatsCardSection"
import { LuCalendarClock, LuTriangleAlert } from "react-icons/lu"
import { RiFileList3Line } from "react-icons/ri"
import { MdNotificationImportant, MdPendingActions } from "react-icons/md"
import AlertsTable from "./features/AlertsTable"
import OutlineButton from "../../components/ui/Buttons/OutlineButton"



const statsData: StatsData[] = [
  {
    id: '1',
    title: 'Total Active Alerts',
    value: 35,
    icon: <MdNotificationImportant className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'Critical Alerts',
    value: 7,
    icon: <LuTriangleAlert className="w-5 h-5" />,
  },
  {
    id: '3',
    title: 'Pending Escalations',
    value: 12,
    icon: <MdPendingActions className="w-5 h-5" />,
  },
  {
    id: '4',
    title: 'Resolved Today',
    value: 62,
    icon: <RiFileList3Line className="w-5 h-5" />,
  },
  {
    id: '5',
    title: 'Average Resolution Time',
    value: '2 hrs 15 mins',
    icon: <LuCalendarClock className="w-5 h-5" />,

  },
]


const AlertsEscalations = () => {
  return (
    <div className="mr-4">
      <div className="w-full h-12 flex justify-between items-center mt-4">
        <h1 className="text-xl lg:text-2xl font-bold text-neutral-700 mb-5 mt-4">
          Alerts & Escalations
        </h1>
        <div className="flex gap-4">
          <OutlineButton text="Export Report" className="min-w-40" />
          <PrimaryButton text="AI Escalate" className="w-42 bg-primary-700 hover:bg-primary-700 text-white" />
        </div>
      </div>
      <StatsCardSection cardData={statsData} />
      <AlertsTable/>
    </div>
  )
}

export default AlertsEscalations