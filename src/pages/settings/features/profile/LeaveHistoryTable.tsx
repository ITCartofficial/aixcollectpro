import type { TableColumn } from "../../../../components/ui/Table/DataTable";
import DataTable from "../../../../components/ui/Table/DataTable";
import leaveRequests from "../../../../../data/settings/userLeaveRequests.json";
import Badge from "../../../../components/ui/Table/Badge";

interface LeaveRequests {
    id: string;
    leaveStartDate: string;
    leaveEndDate: string;
    days: number;
    leaveType: "Sick Leave" | "Casual Leave" | "Earned Leave" | "Unpaid Leave" | "Comp Offs" | "Maternity Leave" | "Paternity Leave";
    notes: string;
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

const columns: TableColumn<LeaveRequests>[] = [
    {
        key: "leaveStartDate",
        label: "Leave From - To",
        width: "200px",
        className: "text-left font-medium",
        render: (_value: string, row: LeaveRequests) => (
            <div className="text-sm font-medium">
                {row.leaveStartDate} - {row.leaveEndDate}
            </div>
        )
    },
    {
        key: "leaveType",
        label: "Leave Type",
        headerAlign:'center',
        className: "text-center font-medium",
        render: (value: string) => (
            <div className="text-sm text-neutral-700">{value}</div>
        )
    },
    {
        key: "days",
        label: "Days",
        width: "120px",
        headerAlign:'center',
        className: "text-center font-medium",
        render: (value: number) => (
            <div className="text-sm text-neutral-700">{value}</div>
        )
    },
    {
        key: "notes",
        label: "Notes",
        className: "font-medium",
        render: (value: string) => (
            <div className="text-sm text-neutral-700">{value}</div>
        )
    },
    {
        key: "status",
        label: "Status",
        width: "120px",
        className: "text-center font-medium",
        render: (value: string) => <Badge variant={getStatusVariant(value)}>{value}</Badge>,
    }
];

const LeaveHistory: React.FC = () => {
    // Process data with proper type casting and filter out pending requests
    const data: LeaveRequests[] = leaveRequests
        .filter(item => item.status === 'Approved' || item.status === 'Rejected')
        .map((item, index) => ({
            ...item,
            id: `leaveRequest-${index}`,
            days: typeof item.days === 'string' ? parseInt(item.days) : item.days,
            leaveType: item.leaveType as "Sick Leave" | "Casual Leave" | "Earned Leave" | "Unpaid Leave" | "Comp Offs" | "Maternity Leave" | "Paternity Leave",
            status: item.status as 'Approved' | 'Rejected' | 'Pending',
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
                emptyMessage="No processed leave requests found."
                getRowId={row => row.id}
            />
        </div>
    );
};

export default LeaveHistory;