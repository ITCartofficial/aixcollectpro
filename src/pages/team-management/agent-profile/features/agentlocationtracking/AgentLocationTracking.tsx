import { FaCheckCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";

const AgentLocationTracking = () => {
  return (
    <div className=" h-[504px] w-full rounded-lg bg-white shadow-[0_8px_16px_rgba(0,0,0,0.12)] overflow-hidden">
      {/* Map Container */}
      <div className="relative h-[450px] bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
        <p>Map</p>
      </div>

      {/* Legend */}
      <div className="p-4 bg-primary-50">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span className="text-neutral-700">Completed Check-in</span>
          </div>

          <div className="flex items-center space-x-2">
            <BiCurrentLocation className="w-4 h-4 text-primary-700" />
            <span className="text-neutral-700">Agent Current Location</span>
          </div>

          <div className="flex items-center space-x-2">
            <MdLocationOn className="w-4 h-4 text-primary-700" />
            <span className="text-neutral-700">Next Check-in Point</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLocationTracking;
