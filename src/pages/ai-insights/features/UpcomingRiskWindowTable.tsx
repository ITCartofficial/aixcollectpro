import type { TableColumn } from "../../../components/ui/Table/DataTable";
import DataTable from "../../../components/ui/Table/DataTable";
import upcomingRiskWindowData from "../../../../data/ai-insights/upcomingRiskWindowData.json";

// TYPE
interface RiskWindowRow {
  id: string;
  timeWindow: string;
  riskArea: string;
  riskFactor: string;
  recommendedAction: string;
}

const columns: TableColumn<RiskWindowRow>[] = [
  {
    key: "timeWindow",
    label: "Time Window",
    width: "150px",
    className: "text-left font-medium",
  },
  {
    key: "riskArea",
    label: "Risk Area",
    width: "120px",
    className: "text-left font-medium",
  },
  {
    key: "riskFactor",
    label: "Risk Factor",
    width: "220px",
    className: "text-left font-medium",
  },
  {
    key: "recommendedAction",
    label: "Recommended Action",
    width: "220px",
    className: "text-left font-medium",
  },
];

const UpcomingRiskWindowTable: React.FC = () => {
  const data: RiskWindowRow[] = upcomingRiskWindowData as RiskWindowRow[];

  return (
    <div className="bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-base md:text-lg font-semibold flex-1 mb-4">Upcoming Risk Window</h2>
      <DataTable
        data={data}
        columns={columns}
        sortable={false}
        pagination={false}
        selectable={false}
        className="shadow-sm"
        rowClassName="h-12"
        headerClassName="h-12"
        emptyMessage="No risk window data found."
        getRowId={row => row.id}
      />
    </div>
  );
};

export default UpcomingRiskWindowTable;






