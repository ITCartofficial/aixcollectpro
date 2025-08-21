import { FaHome, FaWhatsapp } from "react-icons/fa";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
import DateRangePickerInput from "../../../components/ui/Input/DateRangePickerInput";
import Avatar from "../../../components/ui/Table/Avatar";
import { FiPhoneCall } from "react-icons/fi";
import TabConfig from "./features/tabconfigurations/TabConfig";


interface UserProfileProps {
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  employeeId?: string;
  vendor?: string;
  dateOfJoining?: string;
  location?: string;
  reportingManager?: string;
  performanceScore?: string;
  status?: "online" | "offline";
}

const SupervisorProfile: React.FC<UserProfileProps> = ({
  role = "Field Collection Agent",
  vendor = "ITcart",
  dateOfJoining = "12 February 2023",
  location = "Bangalore",
  reportingManager = "Rakesh Nair",
  performanceScore = "84.1/10",
  status = "online",
}) => {

  return (
    <div className="p-4 w-full">
      {/* Header Section */}
      <div className="w-full flex  justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-black">
            Rajesh Khan
          </h1>
          <div className="flex items-center gap-y-2">
            <FaHome className="w-4 h-4 text-neutral-500" />
            <p>\Team Management \Rajesh Khan</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <DateRangePickerInput />
          <PrimaryButton
            text="Export Report"
            className="w-auto px-6 bg-primary-700 hover:bg-primary-600 text-white"
          />
        </div>
      </div>
      <div className="mx-auto shadow-2xl border-gray-600 rounded-lg  overflow-hidden bg-white">
        {/* Header Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Section - Profile Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <Avatar
                  name="Mashud Ahmed"
                  image=""
                  size="xl"
                  bgColor="#039FAA"
                />
              </div>

              {/* Name and Contact */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  Rajesh Khan
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                  <p className="text-gray-600 text-sm sm:text-base">1234567</p>
                  <p>|</p>
                  <p className="text-gray-600 text-sm sm:text-base truncate">
                    rajesh@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Status and Score */}
            <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
              {/* Status - Top */}
              <div className="flex items-center gap-2">
                <span
                  className="text-sm text-white px-3 py-1 rounded-full capitalize"
                  style={{ backgroundColor: "#0C9D61" }}
                >
                  {status === "online" ? "On-Board" : "Off-Board"}
                </span>
                <span className="text-xs text-gray-700 px-3 py-1 bg-gray-200 border border-gray-300 rounded-full">
                  Last Synced: 03:30 PM
                </span>
              </div>

              {/* Performance Score - Bottom */}
              <div className="bg-orange-100 px-8 py-1 rounded-md">
                <span className="text-xs text-gray-600">
                  Your Performance Score
                </span>
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold ml-2 inline-block">
                  {performanceScore}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className=" sm:px-6 md:px-8 lg:px-16">
          <div className="border-t border-neutral-300" />
        </div>

        {/* Details Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-16">
            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
              {/* Role */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Role
                </label>
                <p className="text-gray-900 font-medium">{role}</p>
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Employee ID
                </label>
                <p className="text-gray-900 font-medium">
                  AGT-1
                </p>
              </div>

              {/* Vendor */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Vendor
                </label>
                <p className="text-gray-900 font-medium">{vendor}</p>
              </div>

              {/* Date of Joining */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Date of Joining
                </label>
                <p className="text-gray-900 font-medium">{dateOfJoining}</p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Location
                </label>
                <p className="text-gray-900 font-medium">{location}</p>
              </div>

              {/* Reporting Manager */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Reporting Manager
                </label>
                <p className="text-gray-900 font-medium">{reportingManager}</p>
              </div>
            </div>

            {/* Action Buttons - Right Side */}
            <div className="flex flex-row gap-3 sm:gap-4">
              <PrimaryButton
                text="WhatsApp"
                icon={<FaWhatsapp size={16} />}
                className="w-36 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              />
              <PrimaryButton
                text="Call"
                icon={<FiPhoneCall size={16} />}
                className="w-36 bg-blue-600 hover:bg-blue-700 text-white"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Tab navigation */}
      <div className="mt-3">
        <TabConfig />
      </div>
    </div>
  );
};
export default SupervisorProfile;
