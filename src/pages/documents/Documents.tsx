import OutlinesButton from "../../components/ui/Buttons/OutlineButton"
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton"
import type { StatsData } from "../../components/ui/Card/StatsCard"
import StatsCardSection from "../../components/common/StatsCardSection"
import { GrDocumentMissing, GrDocumentText } from "react-icons/gr"
import { PiFolderOpenLight } from "react-icons/pi"
import { TbFlag } from "react-icons/tb"
import { IoDocumentOutline } from "react-icons/io5"
import DocumentVerificationTaskTable from "./features/DocumentTable"

const statsData: StatsData[] = [
  {
    id: '1',
    title: 'Total Documents',
    value: 1235,
    icon: <GrDocumentText className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'Verified Documents',
    value: 1048,
    icon: <PiFolderOpenLight className="w-5 h-5" />,
  },
  {
    id: '3',
    title: 'Pending Verifications',
    value: 125,
    icon: <IoDocumentOutline className="w-5 h-5" />,
  },
  {
    id: '4',
    title: 'Rejected Documents',
    value: 62,
    icon: <GrDocumentMissing className="w-5 h-5" />,
  },
  {
    id: '5',
    title: 'Auto-Flagged by AI',
    value: 18,
    icon: <TbFlag className="w-5 h-5" />,

  },
]


const Documents = () => {
  return (
    <div className="mr-4">
      <div className="w-full h-12 flex justify-between items-center mt-4">
        <h1 className="text-xl lg:text-2xl font-bold text-black mb-5 mt-4">
          Documents
        </h1>
        <div className="flex gap-4">
          <OutlinesButton text="Upload Document" className="min-w-40" />
          <PrimaryButton text="AI Verify" className="w-42" />
        </div>
      </div>
      <StatsCardSection cardData={statsData} />
      <DocumentVerificationTaskTable />
    </div>
  )
}

export default Documents