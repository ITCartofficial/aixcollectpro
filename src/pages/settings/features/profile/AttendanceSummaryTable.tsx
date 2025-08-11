import type { TableColumn } from "../../../../components/ui/Table/DataTable";
import DataTable from "../../../../components/ui/Table/DataTable";
import userAttendanceSummary from "../../../../../data/settings/userAttendanceSummary.json";
import { RxDotsVertical } from "react-icons/rx";
import { useState } from "react";

interface AttendanceSummary {
    id: string;
    date: string;
    checkInTime: string;
    checkOutTime: string;
    totalHours: string;
    lateLogin: boolean;
}

const columns: TableColumn<AttendanceSummary>[] = [
    {
        key: "date",
        label: "Time Window",
        width: "200px",
        className: "text-center font-medium",
    },
    {
        key: "checkInTime",
        label: "Risk Area",
        headerAlign:'center',
        className: "text-center font-medium",
    },
    {
        key: "checkOutTime",
        label: "Risk Factor",
        headerAlign:'center',
        className: "text-center font-medium",
    },
    {
        key: "totalHours",
        label: "Total Hours",
        headerAlign:'center',
        className: "text-center font-medium",
    },
    {
        key: "lateLogin",
        label: "Late Login",
        headerAlign:'center',
        className: "text-center font-medium",
        render: (value: boolean) => value ? "Yes" : "No",
    },
    {
        key: 'id',
        label: '',
        sortable: false,
        width: '30px',
        className: 'text-right',
        render: () => (
            <button
                className="text-black px-3 py-1 text-sm flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded">
                <RxDotsVertical className="w-4 h-4" />
            </button>
        )
    }
];

const AttendanceSummaryTable: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<AttendanceSummary[]>([]);

    const data: AttendanceSummary[] = userAttendanceSummary.map((item, index) => ({
        ...item,
        id: `attendance-${index}`, // Generate unique id for each row
    }));

    // Handle row selection changes
    const handleSelectionChange = (selected: AttendanceSummary[]) => {
        setSelectedRows(selected);
    };

    return (
        <div className="bg-white rounded-lg">
            {/* SELECTED ITEMS DISPLAY SECTION */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} alert{selectedRows.length > 1 ? 's' : ''} selected
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
                pageSize={5}
                pagination={true}
                selectable={true}
                className="shadow-sm"
                rowClassName="h-12"
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
                headerClassName="h-12"
                emptyMessage="No attendance data found."
                getRowId={row => row.id}
            />
        </div>
    );
};

export default AttendanceSummaryTable;