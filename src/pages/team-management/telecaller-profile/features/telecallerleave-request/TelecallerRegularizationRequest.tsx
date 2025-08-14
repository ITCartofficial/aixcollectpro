import regularizationRequests from "../../../../../../data/settings/regularizationRequests.json";
import { RxDotsVertical } from "react-icons/rx";
import { useState } from "react";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import Badge from "../../../../../components/ui/Table/Badge";
import DataTable from "../../../../../components/ui/Table/DataTable";
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
        className: "text-left font-medium",
        render: (_value: string, row: RegularizationRequests) => (
            <div className="text-sm font-medium">
                {row.date}, {row.regularizationDurationStartTime} - {row.regularizationDurationEndTime}
            </div>
        )
    },
    {
        key: "notes",
        label: "Notes",
        className: "text-center font-medium",
        render: (value: string) => (
            <div className="text-sm text-gray-700">{value}</div>
        )
    },
    {
        key: "requestedAt",
        label: "Requested At",
        width: "200px",
        className: "text-left font-medium",
        render: (value: string) => (
            <div className="text-sm text-gray-700">{value}</div>
        )
    },
    {
        key: "status",
        label: "Action",
        width: "300px",
        className: "text-center font-medium",
        render: (value: string) => <Badge variant={getStatusVariant(value)}>{value}</Badge>,
    },
    {
        key: 'id',
        label: '',
        sortable: false,
        width: '50px',
        className: 'text-center',
        render: () => (
            <button
                className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                <RxDotsVertical className="w-4 h-4" />
            </button>
        )
    }
];

const TelecallerRegularizationRequest: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<RegularizationRequests[]>([]);

    // Handle row selection changes
    const handleSelectionChange = (selected: RegularizationRequests[]) => {
        setSelectedRows(selected);
    };

    // Fix the type issue by adding type assertion for status
    const data: RegularizationRequests[] = regularizationRequests
        .filter(item => item.status === 'Pending')
        .map((item, index) => ({
            ...item,
            id: `regularization-${index}`,
            status: item.status as 'Approved' | 'Rejected' | 'Pending', // Type assertion
        }));

    return (
        <div className="bg-white rounded-lg">
            <h2 className="text-regular font-semibold text-neutral-700 pb-4">New Regularization Request</h2>
            {/* SELECTED ITEMS DISPLAY SECTION */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} request{selectedRows.length > 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer">
                            Clear selection
                        </button>
                    </div>
                </div>
            )}
            <DataTable
                data={data}
                columns={columns}
                sortable={false}
                pageSize={1}
                pagination={true}
                selectable={true}
                className="shadow-sm"
                rowClassName="h-16"
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
                headerClassName="h-12 bg-gray-50"
                emptyMessage="No regularization requests found."
                getRowId={row => row.id}
            />
        </div>
    );
};

export default TelecallerRegularizationRequest;







