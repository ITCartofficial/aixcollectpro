import Badge from "../../../../../components/ui/Table/Badge";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import DataTable from "../../../../../components/ui/Table/DataTable";
import regularizationRequests from "../../../../../../data/settings/regularizationRequests.json";
import { RxDotsVertical } from "react-icons/rx";


interface RegularizationRequests {
    id: string;
    date: string;
    regularizationDurationStartTime: string;
    regularizationDurationEndTime: string;
    notes: string;
    requestedAt: string;
    status: 'Approved' | 'Rejected' | 'Pending';
}

const getStatusVariant = (status: string): "success" | "warning" | "danger" | "info" | "secondary" => {
    switch (status) {
        case "Approved":
            return "success";
        case "Rejected":
            return "danger";
        case "Pending":
            return "warning";
        default:
            return "info";
    }
};

const columns: TableColumn<RegularizationRequests>[] = [
    {
        key: "date",
        label: "Date & Time to Regularize",
        width: "250px",
        headerAlign:'center',
        className: "text-center font-medium",
        render: (_value: string, row: RegularizationRequests) => (
            <div className="text-sm font-medium">
                {row.date}, {row.regularizationDurationStartTime} - {row.regularizationDurationEndTime}
            </div>
        )
    },
    {
        key: "notes",
        label: "Notes",
        className: "font-medium",
        render: (value: string) => (
            <div className="text-sm text-gray-700">{value}</div>
        )
    },
    {
        key: "requestedAt",
        label: "Requested At",
        className: "text-left font-medium",
        render: (value: string) => (
            <div className="text-sm text-gray-700">{value}</div>
        )
    },
    {
        key: "status",
        label: "Status",
        width: "300px",
        headerAlign:'center',
        className: "text-center font-medium",
        render: (value: string) => <Badge variant={getStatusVariant(value)}>{value}</Badge>,
    },
    {
      key: "id",
      label: "",
      sortable: false,
      width: "50px",
      className: "text-center",
      render: () => (
        <button className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer">
          <RxDotsVertical className="w-4 h-4" />
        </button>
      ),
    },
];

const SupervisorRegularizationHistory: React.FC = () => {
    // Fix the type issue by adding type assertion for status
    const data: RegularizationRequests[] = regularizationRequests
        .filter(item => item.status === 'Approved' || item.status === 'Rejected')
        .map((item, index) => ({
            ...item,
            id: `regularization-${index}`,
            status: item.status as 'Approved' | 'Rejected' | 'Pending', // Type assertion
        }));

    return (
        <div className="bg-white rounded-lg">            
            <DataTable
                data={data}
                columns={columns}
                sortable={false}
                pageSize={5}
                pagination={true}
                selectable={true}
                className="shadow-sm"
                rowClassName="h-16"
                headerClassName="h-12 bg-gray-50"
                emptyMessage="No regularization requests found."
                getRowId={row => row.id}
            />
        </div>
    );
};

export default SupervisorRegularizationHistory;







