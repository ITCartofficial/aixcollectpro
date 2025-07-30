import type { StackedBarChartSeries } from "../../../components/ui/Chart/StackedBarChart";
import StackedBarChart from "../../../components/ui/Chart/StackedBarChart";


const barSeries: StackedBarChartSeries[] = [
    { name: "Verified", data: [320, 250, 140, 270, 160], color: "#0768DD" },
    { name: "Pending", data: [190, 140, 100, 180, 110], color: "#1991FA" },
    { name: "Flagged", data: [120, 100, 60, 110, 80], color: "#64B6FF" },
    { name: "Rejected", data: [120, 110, 80, 90, 85], color: "#BCE0FD" }
];

const docCategories = ["Adhaar", "Pan", "Voter ID", "Driving License", "Passport"];


const DocumentVerificationStatusChart = () => {
    return (
        <div className="bg-white rounded-lg py-6 px-4">
            <h2 className="text-regular font-semibold text-neutral-700">Verification & Documentation Status</h2>
            <StackedBarChart
                series={barSeries}
                categories={docCategories}
                height={275}
                showLegend
                className="bg-white rounded-lg"/>
        </div>
    )
}

export default DocumentVerificationStatusChart