import { Link } from "react-router-dom";
import PerformanceCard from "../../../components/ui/Card/PerformanceCard";



const TelecallerPerformance = () => {
    const telecallers = [
        {
            initials: 'PS',
            name: 'Priya Sharma',
            location: 'Bangalore',
            metricTitle: 'Calls Made',
            metricValue: 145,
            paidCases: 12,
            amountCollected: 95000,
            isTopPerformer: true,
        },
        {
            initials: 'AS',
            name: 'Anita Singh',
            location: 'Bangalore',
            metricTitle: 'Calls Made',
            metricValue: 132,
            paidCases: 10,
            amountCollected: 78000,
        },
        {
            initials: 'VK',
            name: 'Vikram Kumar',
            location: 'Bangalore',
            metricTitle: 'Calls Made',
            metricValue: 128,
            paidCases: 9,
            amountCollected: 72000,
        },
        {
            initials: 'SG',
            name: 'Sunita Gupta',
            location: 'Bangalore',
            metricTitle: 'Calls Made',
            metricValue: 120,
            paidCases: 8,
            amountCollected: 68000,
        },
        {
            initials: 'RV',
            name: 'Ravi Verma',
            location: 'Bangalore',
            metricTitle: 'Calls Made',
            metricValue: 115,
            paidCases: 7,
            amountCollected: 62000,
        },
    ];

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Tele Caller Performance</h2>
                <Link to="/telecaller-performance"
                    className="text-primary-700 text-sm font-medium hover:text-blue-500 transition-colors cursor-pointer">
                    View all →
                </Link>
            </div>

            {/* Vertical scrollable container showing 2 cards initially */}
            <div className="max-h-[320px] overflow-y-auto space-y-4 pr-2">
                {telecallers.map((telecaller, index) => (
                    <PerformanceCard key={index} {...telecaller} />
                ))}
            </div>
        </div>
    );
};

export default TelecallerPerformance;