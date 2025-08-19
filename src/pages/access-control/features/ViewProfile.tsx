import Avatar from "../../../components/ui/Table/Avatar";

interface TaskDetailProps {
  name: string;
  phone: string;
  email: string;
  role: string;
  vendor: string;
  employeeID: string;
  joinedOn: string;
  location: string;
  avatar?: string;
}

const ViewProfile: React.FC<TaskDetailProps> = ({
  name,
  phone,
  email,
  role,
  vendor,
  employeeID,
  joinedOn,
  location,
  avatar,
}) => {
  return (
    <div>
      {/* Card */}
      <div className="w-full rounded-lg bg-white px-6 py-6 flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Left: User Profile */}
        <div className=" gap-4 items-center flex border-r border-gray-200 pr-10">
          <div className="flex items-center space-x-3">
            <Avatar name={name} image={avatar} size="xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-xl ">{name}</h3>
            <p className="text-sm text-gray-600">
              {phone} | {email}
            </p>
          </div>
        </div>

        {/* Middle: Alternate Numbers & Addresses */}
        <div className="flex flex-col lg:flex-row gap-10 flex-[2] sm:px-6 ">
          <div>
            <p className="text-xs text-gray-400">Role</p>
            <p className="text-sm text-gray-900 font-medium mb-2">{role}</p>
            <p className="text-xs text-gray-400">Joined On</p>
            <p className="text-sm text-gray-900 font-medium">{joinedOn}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Vendor</p>
            <p className="text-sm text-gray-900 font-medium mb-2">{vendor}</p>
            <p className="text-xs text-gray-400">Employee ID</p>
            <p className="text-sm text-gray-900 font-medium">{employeeID}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Location</p>
            <p className="text-sm text-gray-900 font-medium">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
