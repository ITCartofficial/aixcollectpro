import { useCallback, useEffect, useRef, useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import Avatar from "../../../components/ui/Table/Avatar";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable, {
  type TableColumn,
} from "../../../components/ui/Table/DataTable";
import accessControlData from "../../../../data/access-control/acceessControlData.json";
import PopupMenu, {
  type PopupPosition,
} from "../../../components/ui/Table/PopupMenu";
import EditMemberModal from "./EditMemberModal";
import ViewProfileModal from "./ViewProfileModal";

interface AccessControlUser {
  id: string;
  employeeId: string;
  name: string;
  mobileNumber: string;
  role: string;
  avatar?: string;
  email?: string;
  location?: string;
  joinedOn?: string;
  vendor?: string;
}

const AccessControlTable: React.FC = () => {
  const usersData: AccessControlUser[] =
    accessControlData as AccessControlUser[];
  const [filteredData, setFilteredData] =
    useState<AccessControlUser[]>(usersData);
  const [selectedRows, setSelectedRows] = useState<AccessControlUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AccessControlUser | null>(
    null
  );
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<AccessControlUser | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // --- Handle outside click to close popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };
    if (showPopup) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  // --- Role based popup items
  const getMenuItems = (role: string) => {
    if (role === "Supervisor (Admin)") {
      return [
        { label: "Edit Profile", action: "edit" },
        { label: "Downgrade to Super Admin", action: "downgrade_super" },
        { label: "Disable", action: "disable" },
        { label: "Remove", action: "remove" },
      ];
    }
    if (role === "Super Admin") {
      return [
        { label: "Edit Profile", action: "edit" },
        { label: "Upgrade to Global Admin", action: "upgrade_global" },
        {
          label: "Downgrade to Supervisor (Admin)",
          action: "downgrade_supervisor",
        },
        { label: "Disable", action: "disable" },
        { label: "Remove", action: "remove" },
      ];
    }
    return [
      { label: "Edit Profile", action: "edit" },
      { label: "Upgrade to Super Admin", action: "upgrade_super" },
      { label: "Disable", action: "disable" },
      { label: "Remove", action: "remove" },
    ];
  };

  // --- Open popup
  const handleMenuClick = useCallback(
    (user: AccessControlUser, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
      setSelectedUser(user);
      setShowPopup(true);
    },
    []
  );

  // --- Handle popup action
  const handlePopupAction = (action: string) => {
    if (!selectedUser) return;

    if (action === "edit") {
      setUserToEdit(selectedUser); // Set the user to edit
      setShowEditModal(true);
      setShowPopup(false);
      return;
    }

    console.log(`Action: ${action} for user:`, selectedUser.name);
    setShowPopup(false);
  };

  // --- Close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setUserToEdit(null);
    setSelectedUser(null);
  };

  const roleOptions = [
    { label: "All Roles", value: "" },
    ...Array.from(new Set(usersData.map((u) => u.role))).map((r) => ({
      label: r,
      value: r,
    })),
  ];

  // Apply Filters
  const applyAllFilters = (
    query: string = searchQuery,
    role: string = selectedRole
  ) => {
    let filtered = [...usersData];

    if (query) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.employeeId.toLowerCase().includes(query.toLowerCase()) ||
          u.role.toLowerCase().includes(query.toLowerCase()) ||
          u.mobileNumber.includes(query)
      );
    }
    if (role) filtered = filtered.filter((u) => u.role === role);

    setFilteredData(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyAllFilters(query, selectedRole);
  };

  const handleSelectionChange = (selected: AccessControlUser[]) => {
    setSelectedRows(selected);
  };

  // In your component:
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userToView, setUserToView] = useState<AccessControlUser | null>(null);
  const handleViewUser = (user: AccessControlUser) => {
    // console.log("Viewing user:", user);
    setUserToView(user);
    setShowProfileModal(true);
  };

  // Table Columns
  const columns: TableColumn<AccessControlUser>[] = [
    {
      key: "employeeId",
      label: "Employee ID",
      sortable: true,
      width: "120px",
      className: "text-center",
      headerAlign: "center",
    },
    {
      key: "name",
      label: "Name",
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
      key: "mobileNumber",
      label: "Mobile",
      width: "140px",
      className: "text-center",
      headerAlign: "center",
    },
    {
      key: "role",
      label: "Role",
      width: "160px",
      className: "text-center",
      headerAlign: "center",
    },

    {
      key: "id",
      label: "Action",
      width: "100px",
      className: "text-center",
      headerAlign: "center",
      render: (_, row) => (
        <button
          onClick={() => handleViewUser(row)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 mx-auto"
        >
          <FaEye className="w-4 h-4" />
          <span>View</span>
        </button>
      ),
    },
    {
      key: "id",
      label: "",
      width: "50px",
      className: "text-center",
      render: (_, row) => (
        <button
          className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
          onClick={(e) => handleMenuClick(row, e)}
        >
          <RxDotsVertical className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="mt-4 bg-white rounded-lg p-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>

          <Dropdown
            options={roleOptions}
            value={selectedRole}
            onChange={(val) => {
              setSelectedRole(val as string);
              applyAllFilters(searchQuery, val as string);
            }}
            placeholder="Role"
            className="min-w-40"
          />
          <div className="ml-auto">
            <SearchBar
              placeholder="Search"
              onSearch={handleSearch}
              className="w-64"
            />
          </div>
        </div>
      </div>

      {/* Selected Banner */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} user{selectedRows.length > 1 ? "s" : ""}{" "}
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
        data={filteredData}
        columns={columns}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        sortable={true}
        pagination={true}
        pageSize={10}
        className="shadow-sm"
        emptyMessage="No users found"
        getRowId={(row) => row.id}
      />

      <PopupMenu
        isVisible={showPopup}
        position={popupPosition}
        onClose={() => setShowPopup(false)}
        onAction={handlePopupAction}
        popupRef={popupRef}
        menuItems={selectedUser ? getMenuItems(selectedUser.role) : []}
      />

      <EditMemberModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        userData={userToEdit}
      />
      <ViewProfileModal
        closeOnOverlayClick={true}
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setUserToView(null);
        }}
        userData={
          userToView
            ? {
                name: userToView.name,
                phone: userToView.mobileNumber,
                email: userToView.email ?? "",
                role: userToView.role,
                vendor: userToView.vendor ?? "",
                employeeID: userToView.employeeId,
                joinedOn: userToView.joinedOn ?? "",
                location: userToView.location ?? "",
              }
            : null
        }
      />
    </div>
  );
};

export default AccessControlTable;
