import { FiPhone, FiMapPin } from "react-icons/fi";
import OutlineButton from "../../../components/ui/Buttons/OutlineButton";

interface TaskDetailProps {
  name: string;
  phone: string;
  email: string;
  altNumber1: string;
  altNumber2: string;
  address1: string;
  address2: string;
  agentName: string;
  agentInitials: string;
  onViewMap: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  name,
  phone,
  email,
  altNumber1,
  altNumber2,
  address1,
  address2,
  agentName,
  agentInitials,
  onViewMap,
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Heading */}
      <h1 className="text-xl lg:text-xl font-bold text-black mb-2">
        Barrower Name
        </h1>

      {/* Card */}
      <div className="w-full rounded-lg bg-white px-6 py-6 flex flex-col lg:flex-row gap-6 items-start justify-between border border-gray-200">
        {/* Left: User Profile */}
        <div className=" gap-4 items-center flex border-r border-gray-200 pr-6">
          <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-[#E13900] flex items-center justify-center text-white font-bold text-xl">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
            <p className="text-sm text-gray-600">
              {phone} | {email}
            </p>
          </div>
        </div>

        {/* Middle: Alternate Numbers & Addresses */}
        <div className="flex flex-col lg:flex-row gap-6 flex-[2]">
          <div>
            <p className="text-xs text-gray-400">Alt Number 1</p>
            <p className="text-sm text-gray-900 font-medium mb-2">{altNumber1}</p>
            <p className="text-xs text-gray-400">Primary Address 1</p>
            <p className="text-sm text-gray-900 font-medium">{address1}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Alt Number 2</p>
            <p className="text-sm text-gray-900 font-medium mb-2">{altNumber2}</p>
            <p className="text-xs text-gray-400">Primary Address 2</p>
            <p className="text-sm text-gray-900 font-medium">{address2}</p>
          </div>
        </div>

        {/* Right: Agent and Buttons */}
        <div className="flex flex-col justify-between items-end h-full gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00838F] text-white flex items-center justify-center text-sm font-medium">
              {agentInitials}
            </div>
            <p className="text-sm text-gray-900 font-medium">{agentName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <FiPhone className="text-gray-600 text-lg" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <FiMapPin className="text-gray-600 text-lg" />
            </button>
            <OutlineButton
              onClick={onViewMap}
              text="View in Map"
              className="px-4 py-1 bg-primary-700 hover:bg-primary-600 text-primary-700 text-sm rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
