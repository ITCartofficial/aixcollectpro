// import { useState, useEffect } from "react";
// import type { TableColumn } from "../../../components/ui/Table/DataTable";
// import Badge from "../../../components/ui/Table/Badge";
// import Dropdown from "../../../components/common/Dropdown";
// import SearchBar from "../../../components/common/Searchbar";
// import DataTable from "../../../components/ui/Table/DataTable";
// import { FaEye } from "react-icons/fa";
// import Avatar from "../../../components/ui/Table/Avatar";
// import LeaveRequestTable from "./LeaveRequestTable";
// import attendanceTableData from "../../../../data/attendance/attendanceData.json"



// // INTERFACE DEFINITIONS
// interface AttendanceData {
//     id: string;
//     name: string;
//     role: string;
//     presentDays: number;
//     lateCheckIns: number;
//     avgHrsPerDay: number;
//     overtimeDays: number;
//     todayCheckInOut: string;
//     currentStatus: 'Inactive' | 'On-Road' | 'Active' | 'Secondary' | 'Disabled';
//     avatar?: string;
// }

// const AttendanceTable: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<string>('attendance');
//     const attendanceData: AttendanceData[] = attendanceTableData as AttendanceData[];
//     const [filteredData, setFilteredData] = useState<AttendanceData[]>([]);
//     const [selectedRole, setSelectedRole] = useState<string[]>([]);
//     const [selectedStatus, setSelectedStatus] = useState<string>('');
//     const [selectedRows, setSelectedRows] = useState<AttendanceData[]>([]);
//     const [searchQuery, setSearchQuery] = useState<string>('');


//     // FILTER OPTIONS CONFIGURATION
//     const roleOptions = [
//         { label: 'All Role', value: '' },
//         ...Array.from(new Set(attendanceData.map(alert => alert.role).filter(role => role && role.trim() !== ''))).map(role => ({
//             label: role,
//             value: role
//         }))
//     ];

//     const statusOptions = [
//         { label: 'All Status', value: '' },
//         { label: 'On-Road', value: 'On-Road' },
//         { label: 'Inactive', value: 'Inactive' },
//         { label: 'Active', value: 'Active' },
//         { label: 'Disabled', value: 'Disabled' },
//     ];

//     // Helper function to apply status filtering
//     const applyStatusFilter = (data: AttendanceData[], filter: string) => {
//         if (!filter || filter === '') {
//             return data;
//         }
//         return data.filter(alert => alert.currentStatus === filter);
//     };

//     // Core function to apply all filters and search
//     const applyAllFilters = () => {
//         let filtered = [...attendanceData]; // Create a copy to avoid mutation

//         // Apply search filter first - searches across multiple fields
//         if (searchQuery && searchQuery.trim() !== '') {
//             const query = searchQuery.toLowerCase();
//             filtered = filtered.filter(attendance =>
//                 // Search by Agent ID
//                 (attendance.id && attendance.id.toLowerCase().includes(query)) ||
//                 // Search by Agent Name
//                 (attendance.name && attendance.name.toLowerCase().includes(query))
//             );
//         }

//         // Apply role filter
//         if (selectedRole.length > 0 && !selectedRole.includes('')) {
//             filtered = filtered.filter(attendance => selectedRole.includes(attendance.role));
//         }

//         // Apply status filter
//         if (selectedStatus && selectedStatus !== '') {
//             filtered = applyStatusFilter(filtered, selectedStatus);
//         }

//         setFilteredData(filtered);
//     };

//     // FILTER EFFECTS - Auto-apply when dependencies change
//     useEffect(() => {
//         if (attendanceData.length > 0) {
//             applyAllFilters();
//         }
//     }, [attendanceData, selectedRole, selectedStatus, searchQuery]);

//     // Handle search input changes
//     const handleSearch = (query: string) => {
//         setSearchQuery(query);
//     };

//     // Handle alert type filter changes
//     const handleRoleChange = (value: string | string[]) => {
//         const roleValues = Array.isArray(value) ? value : [value];

//         if (roleValues.includes('')) {
//             setSelectedRole([]);
//         } else {
//             setSelectedRole(roleValues);
//         }
//     };

//     // Handle status filter
//     const handleStatusChange = (value: string | string[]) => {
//         const statusValue = Array.isArray(value) ? value[0] : value;
//         setSelectedStatus(statusValue);
//     };

//     // Handle row selection changes
//     const handleSelectionChange = (selected: AttendanceData[]) => {
//         setSelectedRows(selected);
//     };

//     const handleViewAttendance = (attendance: AttendanceData) => {
//         console.log('Viewing agent:', attendance);
//     };

//     // Handle tab change
//     const handleTabChange = (tab: 'attendance' | 'leaveRequest') => {
//         setActiveTab(tab);
//         // Reset filters when switching tabs
//         setSelectedRole([]);
//         setSelectedStatus('');
//         setSearchQuery('');
//         setSelectedRows([]);
//     };

//     // If Leave Request tab is active, render LeaveRequestTable
//     if (activeTab === 'leaveRequest') {
//         return <LeaveRequestTable onTabChange={handleTabChange} activeTab={activeTab} />;
//     }

//     // TABLE COLUMN CONFIGURATION
//     const columns: TableColumn<AttendanceData>[] = [
//         {
//             key: 'id',
//             label: 'Agent Id',
//             sortable: true,
//             width: '140px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'name',
//             label: 'Name',
//             sortable: true,
//             width: '250px',
//             render: (value, row) => (
//                 <div className="flex items-center space-x-3">
//                     <Avatar name={value} image={row.avatar} size="md" />
//                     <span className="font-medium text-gray-900">{value}</span>
//                 </div>
//             )
//         },
//         {
//             key: 'role',
//             label: 'Role',
//             sortable: true,
//             width: '120px',
//             className: 'text-left',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'presentDays',
//             label: 'Present Days',
//             sortable: true,
//             width: '160px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'lateCheckIns',
//             label: 'Late Check-ins',
//             sortable: true,
//             width: '170px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'avgHrsPerDay',
//             label: 'Avg. Hrs/Day',
//             sortable: true,
//             width: '150px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value} hrs</span>
//         },
//         {
//             key: 'overtimeDays',
//             label: 'Overtime Days',
//             sortable: true,
//             width: '170px',
//             render: (value) => (
//                 <div className="flex items-center justify-center space-x-3">
//                     <span className="font-medium text-gray-900">{value}</span>
//                 </div>
//             )
//         },
//         {
//             key: 'todayCheckInOut',
//             label: 'Today Check-In / Out',
//             sortable: false,
//             width: '180px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'currentStatus',
//             label: 'Current Status',
//             sortable: false,
//             width: '170px',
//             className: 'text-center',
//             render: (value) => {
//                 const getVariant = (status: string) => {
//                     switch (status) {
//                         case 'On-Road': return 'info';
//                         case 'Inactive': return 'danger';
//                         case 'Active': return 'success';
//                         case 'Disabled': return 'secondary';
//                         default: return 'info';
//                     }
//                 };
//                 return <Badge variant={getVariant(value)}>{value}</Badge>;
//             }
//         },
//         {
//             key: 'id',
//             label: 'Action',
//             sortable: false,
//             width: '100px',
//             className: 'text-center',
//             render: (_, row) => (
//                 <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleViewAttendance(row);
//                     }}
//                 >
//                     <FaEye className="w-4 h-4" />
//                     <span>View</span>
//                 </button>
//             )
//         }
//     ];

//     // MAIN COMPONENT RENDER
//     return (
//         <div className="mt-4 bg-white rounded-lg p-6 relative">
//             {/* FILTERS AND SEARCH SECTION */}
//             <div className="bg-white p-4 rounded-lg mb-4">
//                 <div className="flex flex-wrap items-center gap-4">
//                     {/* Tab Navigation */}
//                     <div className="flex border-b border-gray-200">
//                         <button
//                             className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'attendance'
//                                 ? 'border-blue-500 text-blue-600'
//                                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                 }`}
//                             onClick={() => handleTabChange('attendance')}
//                         >
//                             Attendance
//                         </button>
//                         <button
//                             className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'leaveRequest'
//                                 ? 'border-blue-500 text-blue-600'
//                                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                 }`}
//                             onClick={() => handleTabChange('leaveRequest')}
//                         >
//                             Leave Request
//                         </button>
//                     </div>

//                     <span className="text-sm font-medium text-gray-700">Filter by:</span>

//                     {/* Role Filter Dropdown */}
//                     <Dropdown
//                         options={roleOptions}
//                         value={selectedRole}
//                         onChange={handleRoleChange}
//                         placeholder="Role"
//                         className="min-w-48"
//                     />

//                     {/* Status Filter Dropdown */}
//                     <Dropdown
//                         options={statusOptions}
//                         value={selectedStatus}
//                         onChange={handleStatusChange}
//                         placeholder="Current Status"
//                         className="min-w-48"
//                     />

//                     {/* Search Bar */}
//                     <div className="ml-auto">
//                         <SearchBar
//                             placeholder="Search by agent id or name..."
//                             onSearch={handleSearch}
//                             className="w-64"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* SELECTED ITEMS DISPLAY SECTION */}
//             {selectedRows.length > 0 && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                     <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-blue-900">
//                             {selectedRows.length} item{selectedRows.length > 1 ? 's' : ''} selected
//                         </span>
//                         <button
//                             onClick={() => setSelectedRows([])}
//                             className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
//                         >
//                             Clear selection
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* DATA TABLE SECTION */}
//             <div className="h-max bg-white rounded-lg shadow-sm">
//                 <DataTable
//                     data={filteredData}
//                     columns={columns}
//                     selectable={true}
//                     selectedRows={selectedRows}
//                     onSelectionChange={handleSelectionChange}
//                     sortable={true}
//                     pagination={true}
//                     pageSize={10}
//                     className="shadow-sm"
//                     emptyMessage="No attendance records found"
//                     getRowId={(row) => row.id}
//                 />
//             </div>
//         </div>
//     );
// };

// export default AttendanceTable;




import React, { useState, useEffect, useMemo } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Badge from "../../../components/ui/Table/Badge";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import { FaEye } from "react-icons/fa";
import Avatar from "../../../components/ui/Table/Avatar";
import { AttendanceCalculator } from "../../../components/types/attendanceCalculations";
import type { AttendanceSummary } from "../../../components/types/attendanceCalculations";
import fieldAgentData from "../../../../data/team-management/fieldAgentData.json";

interface AttendanceTableProps {
  selectedAgentId?: string; // Optional prop to show specific agent
  onViewAgent?: (agentId: string) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ 
  selectedAgentId, 
  onViewAgent 
}) => {
  // Calculate attendance data from field agents
  const attendanceData: AttendanceSummary[] = useMemo(() => {
    return fieldAgentData.map(agent => AttendanceCalculator.calculateAttendanceSummary(agent));
  }, []);

  // Filter data based on selectedAgentId if provided
  const initialData = useMemo(() => {
    if (selectedAgentId) {
      return attendanceData.filter(record => record.agentId === selectedAgentId);
    }
    return attendanceData;
  }, [attendanceData, selectedAgentId]);

  const [filteredData, setFilteredData] = useState<AttendanceSummary[]>(initialData);
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<AttendanceSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update filtered data when initialData changes
  useEffect(() => {
    setFilteredData(initialData);
  }, [initialData]);

  // Filter options
  const roleOptions = [
    { label: 'All Roles', value: '' },
    ...Array.from(new Set(attendanceData.map(record => record.role))).map(role => ({
      label: role,
      value: role
    }))
  ];

  const statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'On-Road', value: 'On-Road' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Active', value: 'Active' },
    { label: 'Disabled', value: 'Disabled' },
    { label: 'On Leave', value: 'On Leave' },
  ];

  const applyAllFilters = () => {
    let filtered = [...initialData];

    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record =>
        record.agentId.toLowerCase().includes(query) ||
        record.agentName.toLowerCase().includes(query)
      );
    }

    if (selectedRole.length > 0 && !selectedRole.includes('')) {
      filtered = filtered.filter(record => selectedRole.includes(record.role));
    }

    if (selectedStatus && selectedStatus !== '') {
      filtered = filtered.filter(record => record.currentStatus === selectedStatus);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyAllFilters();
  }, [initialData, selectedRole, selectedStatus, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRoleChange = (value: string | string[]) => {
    const roleValues = Array.isArray(value) ? value : [value];
    setSelectedRole(roleValues.includes('') ? [] : roleValues);
  };

  const handleStatusChange = (value: string | string[]) => {
    const statusValue = Array.isArray(value) ? value[0] : value;
    setSelectedStatus(statusValue);
  };

  const handleSelectionChange = (selected: AttendanceSummary[]) => {
    setSelectedRows(selected);
  };

  const handleViewAttendance = (record: AttendanceSummary) => {
    if (onViewAgent) {
      onViewAgent(record.agentId);
    } else {
      console.log('Viewing attendance for:', record);
      // Navigate to detailed attendance view
    }
  };

  const columns: TableColumn<AttendanceSummary>[] = [
    {
      key: 'agentId',
      label: 'Agent ID',
      sortable: true,
      width: '140px',
      className: 'text-center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'agentName',
      label: 'Name',
      sortable: true,
      width: '250px',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      width: '120px',
      className: 'text-left',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'presentDays',
      label: 'Present Days',
      sortable: true,
      width: '160px',
      className: 'text-center',
      render: (value, row) => (
        <span className="font-medium">
          {value}/{row.totalWorkingDays}
        </span>
      )
    },
    {
      key: 'lateCheckIns',
      label: 'Late Check-ins',
      sortable: true,
      width: '170px',
      className: 'text-center',
      render: (value) => (
        <span className={`font-medium ${value > 0 ? 'text-orange-600' : 'text-gray-900'}`}>
          {value}
        </span>
      )
    },
    {
      key: 'avgDailyHours',
      label: 'Avg. Hrs/Day',
      sortable: true,
      width: '150px',
      className: 'text-center',
      render: (value) => <span className="font-medium">{value} hrs</span>
    },
    {
      key: 'absentDays',
      label: 'Days Absent',
      sortable: true,
      width: '140px',
      className: 'text-center',
      render: (value) => (
        <span className={`font-medium ${value > 0 ? 'text-red-600' : 'text-gray-900'}`}>
          {value}
        </span>
      )
    },
    {
      key: 'totalOvertimeDays',
      label: 'Overtime Days',
      sortable: true,
      width: '170px',
      className: 'text-center',
      render: (value, row) => (
        <div className="text-center">
          <span className="font-medium text-gray-900">{value}</span>
          <div className="text-xs text-gray-500">
            ({row.totalOvertimeHours}h total)
          </div>
        </div>
      )
    },
    {
      key: 'todayCheckInOut',
      label: 'Today Check-In/Out',
      sortable: false,
      width: '180px',
      className: 'text-center',
      render: (value) => <span className="font-medium text-sm">{value}</span>
    },
    {
      key: 'currentStatus',
      label: 'Current Status',
      sortable: false,
      width: '170px',
      className: 'text-center',
      render: (value) => {
        const getVariant = (status: string) => {
          switch (status) {
            case 'On-Road':
            case 'online':
              return 'info';
            case 'Inactive':
            case 'In Active':
              return 'danger';
            case 'Active':
              return 'success';
            case 'Disabled':
              return 'secondary';
            case 'On Leave':
              return 'warning';
            default:
              return 'info';
          }
        };
        return <Badge variant={getVariant(value)}>{value}</Badge>;
      }
    },
    {
      key: 'agentId',
      label: 'Action',
      sortable: false,
      width: '100px',
      className: 'text-center',
      render: (_, row) => (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleViewAttendance(row);
          }}
        >
          <FaEye className="w-4 h-4" />
          <span>View</span>
        </button>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      {!selectedAgentId && (
        <div className="bg-white p-4 rounded-lg mb-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>

            <Dropdown
              options={roleOptions}
              value={selectedRole}
              onChange={handleRoleChange}
              placeholder="Role"
              className="min-w-48"
              multiSelect={true}
            />

            <Dropdown
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              placeholder="Current Status"
              className="min-w-48"
            />

            <div className="ml-auto">
              <SearchBar
                placeholder="Search by agent ID or name..."
                onSearch={handleSearch}
                className="w-64"
              />
            </div>
          </div>
        </div>
      )}

      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} record{selectedRows.length > 1 ? 's' : ''} selected
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
        data={filteredData}
        columns={columns}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        sortable={true}
        pagination={true}
        pageSize={selectedAgentId ? 5 : 10}
        className="shadow-sm"
        emptyMessage="No attendance records found"
        getRowId={(row) => row.agentId}
      />
    </div>
  );
};

export default AttendanceTable;
