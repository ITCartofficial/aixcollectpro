import type { TableColumn } from "../../../components/ui/Table/DataTable";
import DataTable from "../../../components/ui/Table/DataTable";
import predictiveAnalysisPanelData from "../../../../data/ai-insights/predictiveAnalysisPanelData.json";

// TYPE
interface PredictiveAnalysisRow {
    id: string;
    forecastFocus: string,
    insightSummary: string,
    recommendedAction: string
}

const columns: TableColumn<PredictiveAnalysisRow>[] = [
    {
        key: "forecastFocus",
        label: "Forcast Focus",
        width: "150px",
        className: "text-left font-medium",
    },
    {
        key: "insightSummary",
        label: "Insight Summary",
        width: "120px",
        className: "text-left font-medium",
    },
    {
        key: "recommendedAction",
        label: "Recommended Action",
        width: "220px",
        className: "text-left font-medium",
    }
];

const PredictiveAnalysisPanelTable: React.FC = () => {
    const data: PredictiveAnalysisRow[] = predictiveAnalysisPanelData as PredictiveAnalysisRow[];

    return (
        <div className="bg-white rounded-lg p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold flex-1 mb-4">Predictive Analysis Panel</h2>
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

export default PredictiveAnalysisPanelTable;






