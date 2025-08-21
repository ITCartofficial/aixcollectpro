import { RxChevronDown, RxChevronRight } from "react-icons/rx";
import { useState } from "react";
import TelecallerNewLeaveRequest from "./TelecallerNewLeaveRequest";
import TelecallerRegularizationRequest from "./TelecallerRegularizationRequest";
import TelecallerRegularizationHistory from "./TelecallerRegularizationHistory";
import TelecallerLeaveRequstHistory from "./TelecallerLeaveRequestHistory";

const TelecallerLeaveRequest = () => {
  const [isLeaveHistoryOpen, setisLeaveHistoryOpen] = useState(true);
  const [isRegularizationHistoryOpen,setisRegularizationHistoryOpen]=useState(true)
  const toggleLeaveHistory = () => {
    setisLeaveHistoryOpen(!isLeaveHistoryOpen);
  };
  const toggleRegularizationHistory=()=>{
    setisRegularizationHistoryOpen(!isRegularizationHistoryOpen)
  }

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <TelecallerNewLeaveRequest />
        <TelecallerRegularizationRequest/>
      </div>
      {/* Leave Request History Section */}
      <div className="bg-white rounded-lg mt-3">
        <div
          className="flex items-center justify-between cursor-pointer px-3 py-3 hover:bg-gray-50 transition-colors mb-2 rounded-sm"
          onClick={toggleLeaveHistory}
        >
          <h2 className="text-regular font-semibold text-neutral-700">
            Leave Request History
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            {isLeaveHistoryOpen ? (
              <RxChevronDown className="w-5 h-5" />
            ) : (
              <RxChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
        {isLeaveHistoryOpen && (
          <div className="pb-4">
            <TelecallerLeaveRequstHistory />
          </div>
        )}
      </div>

      {/* Regularization Request History Section */}
      <div className="bg-white rounded-lg">
        <div
          className="flex items-center justify-between cursor-pointer px-3 py-3 hover:bg-gray-50 transition-colors mb-2 rounded-sm"
          onClick={toggleRegularizationHistory}
        >
          <h2 className="text-regular font-semibold text-neutral-700">
            Regularization Request History
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            {isRegularizationHistoryOpen ? (
              <RxChevronDown className="w-5 h-5" />
            ) : (
              <RxChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
        {isRegularizationHistoryOpen && (
          <div className="pb-4">
            <TelecallerRegularizationHistory/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelecallerLeaveRequest;
