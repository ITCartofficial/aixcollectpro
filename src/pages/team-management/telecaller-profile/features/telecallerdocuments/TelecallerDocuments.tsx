// import { useState } from "react";
// import { FaEye } from "react-icons/fa";
// import documentVerificationTaskData from "../../../../../../data/document/documentVerificationTask.json";
// import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
// import Avatar from "../../../../../components/ui/Table/Avatar";
// import Badge from "../../../../../components/ui/Table/Badge";
// import DataTable from "../../../../../components/ui/Table/DataTable";

// interface DocVerificationTask {
//     taskId: string;
//     borrowerName: string;
//     docType: string;
//     status: 'Verified' | 'Rejected' | 'Pending' | 'Flagged';
//     uploadedBy: string;
//     lastUpdated: string;
//     avatar?: string;
// }

// const TelecallerDocuments = () => {
//     // Use imported data directly
//     const docVerificationTask: DocVerificationTask[] = documentVerificationTaskData as DocVerificationTask[];
//     const data: DocVerificationTask[] = docVerificationTask;
//     const [selectedRows, setSelectedRows] = useState<DocVerificationTask[]>([]);

//     const handleSelectionChange = (selected: DocVerificationTask[]) => {
//         setSelectedRows(selected);
//     };

//     const handleViewTask = (task: DocVerificationTask) => {
//         console.log('Viewing task:', task);
//         // Add your view logic here
//     };

//     // Table columns configuration
//     const columns: TableColumn<DocVerificationTask>[] = [
//         {
//             key: 'taskId',
//             label: 'Task Id',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'borrowerName',
//             label: 'Borrower Name',
//             sortable: true,
//             width: '200px',
//             render: (value, row) => (
//                 <div className="flex items-center space-x-3">
//                     <Avatar name={value} image={row.avatar} size="md" />
//                     <span className="font-medium text-gray-900">{value}</span>
//                 </div>
//             )
//         },

//         {
//             key: 'docType',
//             label: 'Doc Type',
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'status',
//             label: 'Status',
//             width: '120px',
//             className: 'text-center',
//             render: (value) => {
//                 const getVariant = (status: string) => {
//                     switch (status) {
//                         case 'Verified': return 'success';
//                         case 'Rejected': return 'danger';
//                         case 'Pending': return 'warning';
//                         case 'Flagged': return 'info';
//                         default: return 'info';
//                     }
//                 };
//                 return <Badge variant={getVariant(value)}>{value}</Badge>;
//             }
//         },
//         {
//             key: 'lastUpdated',
//             label: 'Last Updated',
//             sortable: true,
//             width: '160px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'taskId',
//             label: 'Action',
//             sortable: false,
//             width: '100px',
//             className: 'text-center',
//             render: (_, row) => (

//                 <div className="flex justify-center">
//                         <button
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleViewTask(row);
//                           }}
//                         >
//                           <FaEye className="w-4 h-4" />
//                           <span>View</span>
//                         </button>
//                       </div>
//             )
//         }
//     ];

//     return (
//         <div className="mt-4 bg-white rounded-lg">
//             {/* Selected Items Display */}
//             {selectedRows.length > 0 && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                     <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-blue-900">
//                             {selectedRows.length} task{selectedRows.length > 1 ? 's' : ''} selected
//                         </span>
//                         <button
//                             onClick={() => setSelectedRows([])}
//                             className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer">
//                             Clear selection
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Table */}
//             <DataTable
//                 data={data}
//                 columns={columns}
//                 selectable={true}
//                 selectedRows={selectedRows}
//                 onSelectionChange={handleSelectionChange}
//                 sortable={true}
//                 pagination={true}
//                 pageSize={10}
//                 className="shadow-sm"
//                 emptyMessage="No document verification tasks found"
//                 getRowId={(row) => row.taskId}
//             />
//         </div>
//     );
// };

// export default TelecallerDocuments;

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import documentVerificationTaskData from "../../../../../../data/document/documentVerificationTask.json";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import Avatar from "../../../../../components/ui/Table/Avatar";
import Badge from "../../../../../components/ui/Table/Badge";
import DataTable from "../../../../../components/ui/Table/DataTable";

interface DocVerificationTask {
  taskId: string;
  borrowerName: string;
  docType: string;
  status: "Verified" | "Rejected" | "Pending" | "Flagged";
  uploadedBy: string;
  lastUpdated: string;
  avatar?: string;
}

const TelecallerDocuments = () => {
  // Use imported data directly
  const docVerificationTask: DocVerificationTask[] =
    documentVerificationTaskData as DocVerificationTask[];
  const data: DocVerificationTask[] = docVerificationTask;
  const [selectedRows, setSelectedRows] = useState<DocVerificationTask[]>([]);

  const handleSelectionChange = (selected: DocVerificationTask[]) => {
    setSelectedRows(selected);
  };

  const handleViewTask = (task: DocVerificationTask) => {
    console.log("Viewing task:", task);
    // Add your view logic here
  };

  // Table columns configuration
  const columns: TableColumn<DocVerificationTask>[] = [
    {
      key: "taskId",
      label: "Task Id",
      sortable: true,
      width: "120px",
      className: "text-center",
      headerAlign: "center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "borrowerName",
      label: "Borrower Name",
      sortable: true,
      width: "200px",
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },

    {
      key: "docType",
      label: "Doc Type",
      width: "120px",
      className: "text-center",
      headerAlign: "center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
      className: "text-center",
      headerAlign: "center",
      render: (value) => {
        const getVariant = (status: string) => {
          switch (status) {
            case "Verified":
              return "success";
            case "Rejected":
              return "danger";
            case "Pending":
              return "warning";
            case "Flagged":
              return "info";
            default:
              return "info";
          }
        };
        return <Badge variant={getVariant(value)}>{value}</Badge>;
      },
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      sortable: true,
      width: "160px",
      className: "text-center",
      headerAlign: "center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "taskId",
      label: "Action",
      sortable: false,
      width: "100px",
      className: "text-center",
      headerAlign: "center",
      render: (_, row) => (
        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleViewTask(row);
            }}
          >
            <FaEye className="w-4 h-4" />
            <span>View</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 bg-white rounded-lg">
      {/* Selected Items Display */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} task{selectedRows.length > 1 ? "s" : ""}{" "}
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

      {/* Table */}
      <DataTable
        data={data}
        columns={columns}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        sortable={true}
        pagination={true}
        pageSize={10}
        className="shadow-sm"
        emptyMessage="No document verification tasks found"
        getRowId={(row) => row.taskId}
      />
    </div>
  );
};

export default TelecallerDocuments;
