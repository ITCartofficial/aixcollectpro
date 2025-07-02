import HeaderActionCenter from "../../components/common/HeaderActionCenter"
import StatsCardSection from "./StatsCardSection"


const TeamManagement = () => {
  return (
    <div className="mr-3">
      <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">Team Management</h1>
      <HeaderActionCenter/> 
      <StatsCardSection/>
    </div>
  )
}

export default TeamManagement