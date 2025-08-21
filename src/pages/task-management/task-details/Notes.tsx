
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import DataTable from "../../../components/ui/Table/DataTable";
import { useState } from "react";

interface Notes {
    id: string;
    AddedDate: string;
    notes: string;
}

const columns: TableColumn<Notes>[] = [
    {
        key: "AddedDate",
        label: "Added Date",
        width: "200px",
        className: "text-left font-medium",
        render: (_value: string, row: Notes) => (
            <div className="text-sm font-medium">
                {row.AddedDate} 
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
];

const NotesTable: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<Notes[]>([]);

    // Handle row selection changes
    const handleSelectionChange = (selected: Notes[]) => {
        setSelectedRows(selected);
    };

    // Sample data for demonstration purposes
    const data: Notes[] = [
        {
            id: "1",
            AddedDate: "03 June, 2025",
            notes: "Customer requested early visit last time.",
        },
        {
            id: "2",
            AddedDate: "03 May, 2025",
            notes: "Customer asked to call before coming to collect.",
        }
    ];

    return (
        <div className="bg-white rounded-lg">
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} request{selectedRows.length > 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-sm text-primary-700 hover:text-primary-900 cursor-pointer">
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
                pagination={false}
                selectable={true}
                className="shadow-sm"
                rowClassName="h-16"
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
                headerClassName="h-12 bg-gray-50"
                emptyMessage="No pending leave requests found."
                getRowId={row => row.id}
            />
            <button className="text-primary-700 text-sm font-normal cursor-pointer">+ Add Notes</button>
        </div>
    );
};

export default NotesTable;