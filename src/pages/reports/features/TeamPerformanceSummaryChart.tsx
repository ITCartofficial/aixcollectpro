import type { LineChartSeries } from "../../../components/ui/Chart/LineChart";
import LineChart from "../../../components/ui/Chart/LineChart";


const chartData: LineChartSeries[] = [
  {
    name: "Telecaller",
    data: [0, 500, 1100, 2000, 2000, 1600],
    color: "#9C1960"
  },
  {
    name: "Field Agent",
    data: [0, 800, 900, 1800, 2000, 1200],
    color: "#1991FA"
  },
];

const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];

const TeamPerformanceSummaryChart = () => (
  <div className="col-span-5 lg:col-span-8 bg-white rounded-lg py-6 px-4">
    <h2 className="text-regular font-semibold text-neutral-700">Team Performance Summary</h2>
    <LineChart
      series={chartData}
      categories={months}
      height={345}
      showLegend
    />
  </div>
);

export default TeamPerformanceSummaryChart;