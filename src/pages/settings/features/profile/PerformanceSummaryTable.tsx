import type { TableColumn } from "../../../../components/ui/Table/DataTable";
import DataTable from "../../../../components/ui/Table/DataTable";
import userPerformanceSummary from "../../../../../data/settings/performanceSummary.json";


interface PerformanceSummaryData {
    id: string,
    date: string,
    keyActionTaken: string,
    taskType: string,
    status: string,
    teamInvolved: string,
    notes: string
}

const columns: TableColumn<PerformanceSummaryData>[] = [
    {
        key: "date",
        label: "Date",
        className: "text-center font-medium",
        render: (value) => <span className="font-medium">{value}</span>
    },
    {
        key: "keyActionTaken",
        label: "Key Action Taken",
        className: "text-left font-medium",
        render: (value) => <span className="font-medium">{value}</span>
    },
    {
        key: "taskType",
        label: "Task Type",
        className: "text-center font-medium",
        render: (value) => <span className="font-medium">{value}</span>
    },
    {
        key: "status",
        label: "Status",
        className: "text-center font-medium",
        render: (value) => <span className="font-medium">{value}</span>
    },
    {
        key: "teamInvolved",
        label: "Team Involved",
        className: "text-center font-medium",
        render: (value) => <span className="font-medium">{value}</span>
    },
    {
        key: "notes",
        label: "Notes",
        className: "text-left font-medium",
        render: (value) => <span className="font-medium">{value}</span>
    },
];

const PerformanceSummaryTable: React.FC = () => {
    const data: PerformanceSummaryData[] = userPerformanceSummary as PerformanceSummaryData[];
    return (
        <div className="bg-white rounded-lg">
            <DataTable
                data={data}
                columns={columns}
                sortable={false}
                pageSize={5}
                pagination={true}
                selectable={false}
                className="shadow-sm"
                rowClassName="h-12"
                headerClassName="h-12"
                emptyMessage="No performance data found."
                getRowId={row => row.id}
            />
        </div>
    );
};

export default PerformanceSummaryTable;