import { BsActivity } from "react-icons/bs"
import { CgShoppingCart } from "react-icons/cg"
import { FaBusinessTime, FaDollarSign } from "react-icons/fa"
import { FiTrendingUp } from "react-icons/fi"
import  type { StatsData } from "../../components/ui/Card/StatsCard"
import StatsCard from "../../components/ui/Card/StatsCard"



const StatsCardSection = () => {
  const statsData: StatsData[] = [
    {
      id: '1',
      title: 'Total Field Agents',
      value: '28',
      icon: <FaBusinessTime className="w-6 h-6" />,
    },
    {
      id: '2',
      title: 'Revenue Growth',
      value: '24%',
      icon: <FiTrendingUp className="w-6 h-6" />,
    },
    {
      id: '3',
      title: 'Total Revenue',
      value: '$45,678',
      icon: <FaDollarSign className="w-6 h-6" />,
    },
    {
      id: '4',
      title: 'Active Users',
      value: '1,234',
      icon: <BsActivity className="w-6 h-6" />,
    },
    {
      id: '5',
      title: 'Total Orders',
      value: '567',
      icon: <CgShoppingCart className="w-6 h-6" />,
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