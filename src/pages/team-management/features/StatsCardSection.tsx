import { FaBusinessTime } from "react-icons/fa"
import StatsCard from "../../../components/ui/Card/StatsCard"
import  type { StatsData } from "../../../components/ui/Card/StatsCard"

import { GiCash } from "react-icons/gi"
import { LuChartNoAxesCombined, LuUserCheck } from "react-icons/lu"
import { MdOutlineSchedule } from "react-icons/md"




const StatsCardSection = () => {
  const statsData: StatsData[] = [
    {
      id: '1',
      title: 'Total Field Agents',
      value: '28',
      icon: <FaBusinessTime className="w-5 h-5" />,
    },
    {
      id: '2',
      title: 'Agents Active Today ',
      value: '22',
      icon: <LuUserCheck className="w-5 h-5" />,
    },
    {
      id: '3',
      title: 'Inactive Agents',
      value: '3',
      icon: <MdOutlineSchedule className="w-5 h-5" />,
    },
    {
      id: '4',
      title: 'Average Visits',
      value: '6.8',
      icon: <LuChartNoAxesCombined className="w-5 h-5" />,
    },
    {
      id: '5',
      title: 'Total Collection',
      value: '₹3,45,000',
      icon: <GiCash className="w-5 h-5" />,
    },
  ]
  return (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            className={stat.className}
          />
        ))}
      </div>
  )
}

export default StatsCardSection