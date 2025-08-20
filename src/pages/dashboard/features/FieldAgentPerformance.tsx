import { useNavigate } from "react-router-dom";
import PerformanceCard from "../../../components/ui/Card/PerformanceCard";


const FieldAgentPerformance = () => {
    const navigate =useNavigate();
    const fieldAgents = [
        {
            initials: 'RK',
            name: 'Rakesh Kumar',
            location: 'Whitefield',
            metricTitle: 'Total Visits',
            metricValue: 14,
            paidCases: 9,
            amountCollected: 88000,
            isTopPerformer: true,
        },
        {
            initials: 'NK',
            name: 'Nadeem Khan',
            location: 'Jayanagar',
            metricTitle: 'Total Visits',
            metricValue: 12,
            paidCases: 8,
            amountCollected: 73500,
        },
        {
            initials: 'RJ',
            name: 'Rajesh Kumar',
            location: 'MG Road',
            metricTitle: 'Total Visits',
            metricValue: 10,
            paidCases: 5,
            amountCollected: 70500,
        },
        {
            initials: 'SK',
            name: 'Suresh Kumar',
            location: 'Koramangala',
            metricTitle: 'Total Visits',
            metricValue: 13,
            paidCases: 7,
            amountCollected: 65000,
        },
        {
            initials: 'AM',
            name: 'Amit Mehta',
            location: 'HSR Layout',
            metricTitle: 'Total Visits',
            metricValue: 11,
            paidCases: 6,
            amountCollected: 58000,
        },
    ];
    const handleViewAll=()=> {
    navigate("/collection-metrics");
    }

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-neutral-700">Field Agent Performance</h2>
                <button className="text-primary-700 text-sm font-medium hover:text-primary-500 transition-colors cursor-pointer" onClick={handleViewAll}>
                    View all →
                </button>
            </div>

            {/* Vertical scrollable container showing 2 cards initially */}
            <div className="max-h-[320px] overflow-y-auto space-y-4 pr-2">
                {fieldAgents.map((agent, index) => (
                    <PerformanceCard key={index} {...agent} />
                ))}
            </div>
        </div>
    );
};

export default FieldAgentPerformance;