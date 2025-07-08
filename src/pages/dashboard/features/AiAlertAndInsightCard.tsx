import { Link } from "react-router-dom"
import AiInsightCard from "../../../components/ui/Card/AiInsightCard";


const AiAlertAndInsightCard = () => {
  const AiInsightsAlertData = [
    {
      title: "Idle Agent Detected",
      description: "Field Agent Rohit inactive for over 90 minutes",
      suggestion: "Verify agent's last location; send check-in reminder",
      priority: 'high' as const,
      timestamp: "10:22 AM"
    },
    {
      title: "Repeated Visits to Red-Zone Area",
      description: "Agent Rakesh Kumar has attempted collection in a flagged Red-Zone area 3 times this week.",
      suggestion: "Temporarily restrict future visits until further review.",
      priority: 'medium' as const,
      timestamp: "10:22 AM"
    },
    {
      title: "Agent Completing Tasks Ahead of Time",
      description: "Agent Sahil Khan has completed 90% of assigned tasks 30 minutes ahead of average completion time.",
      suggestion: "Acknowledge, Consider reassigning additional tasks for the day.",
      priority: 'low' as const,
      timestamp: "10:22 AM"
    },
    {
      title: "Unusual Travel Pattern Detected",
      description: "Agent Priya Mehta deviated significantly from assigned route without scheduled stops.",
      suggestion: "Review travel logs and confirm if route change was necessary.",
      priority: 'medium' as const,
      timestamp: "10:23 AM"
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg h-[665px] overflow-y-scroll">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">AI Alerts & Insights</h2>
        <Link to="/all-alerts"
          className="text-primary-700 text-sm font-medium hover:text-blue-500 transition-colors cursor-pointer">
          View all →
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-1">
        {AiInsightsAlertData.map((insight, index) => (
          <AiInsightCard
            key={index}
            {...insight}
          />
        ))}
      </div>
    </div>
  )
}

export default AiAlertAndInsightCard