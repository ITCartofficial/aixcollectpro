import CollectionPerformanceGraph from "./features/CollectionPerformanceGraph"
import FieldAgentPerformance from "./features/FieldAgentPerformance"
import MetricsCardSection from "./features/MetricsCardSection"
import TaskSection from "./features/TaskSection"
import TaskTypeCard from "./features/TaskTypeCard"
import TelecallerPerformance from "./features/TelecallerPerformance"
import TitleSection from "./features/TitleSection"

import type { CollectionData } from "./features/CollectionPerformanceGraph"
import LocationWiseCollectionSummary from "./features/LocationWiseCollectionSummary"
import VisitSuccessMatrics from "./features/VisitSuccessMatrics"
import FlaggedTaskCard from "./features/FlaggedTaskCard"
import AiAlertAndInsightCard from "./features/AiAlertAndInsightCard"
import TaskAssignmentModal from "./features/TaskAssignmentModal"
import { useState } from "react"


const data: CollectionData[] = [
  { date: '2025-06-02', amount: 3.2 },
  { date: '2025-06-03', amount: 4.8 },
  { date: '2025-06-04', amount: 6.5 },
  { date: '2025-06-05', amount: 8.2 },
  { date: '2025-06-06', amount: 12.5 },
  { date: '2025-06-07', amount: 15.8 },
  { date: '2025-06-08', amount: 18.9 }
];


const Dashboard = () => {
    const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <TitleSection onAssignTaskClick={openModal} />
      <TaskAssignmentModal isOpen={isModalOpen} onClose={closeModal} />
      
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mr-3">
        <div className="lg:col-span-5"><TaskSection /></div>
        <div className="lg:col-span-5"><MetricsCardSection /></div>

        <div className="lg:col-span-2"><TaskTypeCard /></div>
        <div className="lg:col-span-4"><FieldAgentPerformance /></div>
        <div className="lg:col-span-4"><TelecallerPerformance /></div>

        <div className="lg:col-span-5"><CollectionPerformanceGraph data={data} /></div>
        <div className="lg:col-span-5"><LocationWiseCollectionSummary /></div>

        {/* Final Bottom Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div><VisitSuccessMatrics/></div>
          <div><FlaggedTaskCard/></div>
        </div>

        <div className="lg:col-span-5"><AiAlertAndInsightCard/></div>
      </div>
    </div>
  )
}

export default Dashboard