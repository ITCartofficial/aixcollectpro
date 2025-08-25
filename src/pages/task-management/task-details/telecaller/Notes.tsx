import type { TableColumn } from "../../../../components/ui/Table/DataTable";
import DataTable from "../../../../components/ui/Table/DataTable";
import { useState } from "react";
import type { Notes } from "../../../../components/types/telecaller/telecallerTypes";
interface NotesTableProps {
  taskId?: string;
  taskData?: any;
}
const NotesTable: React.FC<NotesTableProps> = ({ taskId, taskData }) => {
  const [selectedRows, setSelectedRows] = useState<Notes[]>([]);
  const [rows, setRows] = useState<Notes[]>(() => {
    if (taskData?.expandedDetails?.taskDetails?.notes) {
      return [
        {
          id: taskId ?? "1",
          lastUpdated: taskData.lastUpdated ?? "—",
          expandedDetails: {
            taskDetails: {
              notes: taskData.expandedDetails.taskDetails.notes,
            },
          },
        },
      ];
    }
    return [];
  });

  const handleSelectionChange = (selected: Notes[]) => {
    setSelectedRows(selected);
  };

  const handleNoteChange = (id: string, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, expandedDetails: { taskDetails: { notes: value } } }
          : row
      )
    );
  };

  const handleAddRow = () => {
    const newRow: Notes = {
      id: (rows.length + 1).toString(),
      lastUpdated: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      expandedDetails: {
        taskDetails: {
          notes: "",
        },
      },
      isNew: true,
    };
    setRows((prev) => [...prev, newRow]);
  };

  const columns: TableColumn<Notes>[] = [
    {
      key: "lastUpdated",
      label: "Added Date",
      width: "200px",
      sortable: true,
      className: "text-left font-medium",
      render: (value: string) => (
        <div className="text-sm font-medium">{value}</div>
      ),
    },
    {
      key: "expandedDetails",
      label: "Notes",
      sortable: false,
      render: (_: any, row: Notes) =>
        row.isNew ? (
          <input
            type="text"
            value={row.expandedDetails.taskDetails.notes}
            onChange={(e) => handleNoteChange(row.id, e.target.value)}
            placeholder="Enter note..."
            className="border rounded px-2 py-1 text-sm w-full"
          />
        ) : (
          <span className="text-sm font-normal">
            {row.expandedDetails?.taskDetails?.notes ?? "—"}
          </span>
        ),
    },
  ];

  return (
    <div className="bg-white rounded-lg">
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} request{selectedRows.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      <DataTable
        data={rows}
        columns={columns}
        sortable={true}
        pageSize={5}
        pagination={false}
        selectable={true}
        className="shadow-sm"
        rowClassName="h-16"
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        headerClassName="h-12 bg-gray-50"
        emptyMessage="No notes found."
        getRowId={(row) => row.id}
      />

      <div className="flex justify-center mt-3">
        <button
          onClick={handleAddRow}
          className="text-primary-700 text-sm font-normal cursor-pointer"
        >
          + Add Notes
        </button>
      </div>
    </div>
  );
};

export default NotesTable;
