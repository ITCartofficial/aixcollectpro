import { RiEdit2Line } from "react-icons/ri";
import Badge from "../../../../components/ui/Table/Badge";
import PrimaryButton from "../../../../components/ui/Buttons/PrimaryButton";

import { useAppSelector } from "../../../../lib/redux/reduxHooks";
import { selectUserDetailsProps } from "../../../../lib/redux/selectors";
import Avatar from "../../../../components/ui/Table/Avatar";

interface UserDetailsProps {
  onEdit?: () => void;
  onApplyLeave?: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  onEdit,
  onApplyLeave,
}) => {
  // Get user data from Redux instead of props
  const userData = useAppSelector(selectUserDetailsProps);

  // Loading state - show spinner while Redux data loads
  if (!userData) {
    return (
      <div className="w-full rounded-lg bg-white shadow-[0_1px_3px_0_rgba(0,81,175,0.10)] px-6 py-6 md:px-8">
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    phone,
    email,
    role,
    employeeId,
    location,
    vendor,
    reportingManager,
    joinedOn,
    status,
    avatar,
  } = userData;

  return (
    <div className="w-full rounded-lg bg-white shadow-[0_1px_3px_0_rgba(0,81,175,0.10)] px-6 py-6 md:px-8 transition-all">

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar 
            name={name}
            image={avatar || undefined}
            size="xl"
            className="w-16 h-16 text-lg font-semibold shadow-md"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-2">{name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="success">{status}</Badge>
              <button
                className="text-[#1976F6] text-sm font-medium flex items-center gap-1 hover:text-[#1565C0] transition-colors"
                onClick={onEdit}>
                Edit
                <RiEdit2Line className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-medium">{phone}</p>
              <p className="text-sm text-gray-600 font-medium">{email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-xs text-gray-400 mb-1">Role</div>
            <div className="text-sm text-gray-900 font-medium">{role}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Employee ID</div>
            <div className="text-sm text-gray-900 font-medium">{employeeId}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Location</div>
            <div className="text-sm text-gray-900 font-medium">{location}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Vendor</div>
            <div className="text-sm text-gray-900 font-medium">{vendor}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-xs text-gray-400 mb-1">Reporting Manager</div>
            <div className="text-sm text-gray-900 font-medium">{reportingManager}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-xs text-gray-400 mb-1">Joined On</div>
            <div className="text-sm text-gray-900 font-medium">{joinedOn}</div>
          </div>
        </div>

        <div className="flex justify-center">
          <PrimaryButton
            onClick={onApplyLeave}
            text="Apply Leave"
            className="w-full px-8 bg-primary-700 hover:bg-primary-600 text-white"
          />
        </div>
      </div>

      {/* Tablet Layout (md) - Like mobile but with Active status and edit button inline on right side */}
      <div className="hidden md:block lg:hidden space-y-6">

        {/* Profile Section with Status/Edit inline on Right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar 
              name={name}
              image={avatar || undefined}
              size="xl"
              className="w-20 h-20 text-xl font-semibold shadow-md"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{name}</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 font-medium">{phone}</p>
                <p className="text-sm text-gray-600 font-medium">{email}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Active Status and Edit Button inline, Apply Leave Button below */}
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="success" className="px-6">{status}</Badge>
              <button
                className="text-[#1976F6] text-sm font-medium flex items-center gap-1 hover:text-[#1565C0] transition-colors"
                onClick={onEdit}>
                Edit
                <RiEdit2Line className="w-4 h-4" />
              </button>
            </div>
            <PrimaryButton
              onClick={onApplyLeave}
              text="Apply Leave"
              className="w-36 bg-primary-700 hover:bg-primary-600 text-white"/>
          </div>
        </div>

        {/* Details Grid - 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Role</div>
            <div className="text-sm text-gray-900 font-medium">{role}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Employee ID</div>
            <div className="text-sm text-gray-900 font-medium">{employeeId}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Location</div>
            <div className="text-sm text-gray-900 font-medium">{location}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Vendor</div>
            <div className="text-sm text-gray-900 font-medium">{vendor}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-gray-400 mb-1">Reporting Manager</div>
            <div className="text-sm text-gray-900 font-medium">{reportingManager}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-gray-400 mb-1">Joined On</div>
            <div className="text-sm text-gray-900 font-medium">{joinedOn}</div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (lg+) - 3 section layout */}
      <div className="hidden lg:grid lg:grid-cols-10 gap-6 h-full">

        {/* Left: Avatar + Name + Contact */}
        <div className="col-span-4 flex items-center border-r border-gray-200 pr-6">
          <div className="flex items-center space-x-4 w-full">
            <Avatar 
              name={name}
              image={avatar || undefined}
              size="xl"
              className="w-24 h-24 text-2xl font-semibold shadow-md"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
              <div className="space-y-1">
                <div className="text-sm text-gray-600 truncate">{phone}</div>
                <div className="text-sm text-gray-600 truncate">{email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Details Grid */}
        <div className="col-span-4 grid grid-cols-2 lg:grid-cols-3 gap-4 content-start">
          <div>
            <div className="text-xs text-gray-400 mb-1">Role</div>
            <div className="text-sm text-gray-900 font-medium">{role}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Employee ID</div>
            <div className="text-sm text-gray-900 font-medium">{employeeId}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Location</div>
            <div className="text-sm text-gray-900 font-medium">{location}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Vendor</div>
            <div className="text-sm text-gray-900 font-medium">{vendor}</div>
          </div>
          <div className="lg:col-span-2">
            <div className="text-xs text-gray-400 mb-1">Reporting Manager</div>
            <div className="text-sm text-gray-900 font-medium">{reportingManager}</div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="text-xs text-gray-400 mb-1">Joined On</div>
            <div className="text-sm text-gray-900 font-medium">{joinedOn}</div>
          </div>
        </div>

        {/* Right: Status, Edit, Button */}
        <div className="col-span-2 flex flex-col items-end justify-between py-2">
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-x-3 items-center">
              <Badge variant="success" className="px-6">{status}</Badge>
              <button
                className="text-[#1976F6] text-sm font-medium cursor-pointer flex items-center gap-1 hover:text-[#1565C0] transition-colors"
                onClick={onEdit}>
                Edit
                <RiEdit2Line className="w-4 h-4" />
              </button>
            </div>
          </div>
          <PrimaryButton
            onClick={onApplyLeave}
            text="Apply Leave"
            className="w-36 bg-primary-700 hover:bg-primary-600 text-white"/>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;