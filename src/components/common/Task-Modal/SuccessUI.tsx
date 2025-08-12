import { FaCheck } from "react-icons/fa";

 // Success UI Component
  const SuccessUI = () => (
    <div className="flex flex-col items-center justify-center pb-12 px-6 text-center ">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <FaCheck className="text-white text-2xl" />
      </div>
      
      {/* Success Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        10 Tasks Assigned Successfully with AI
      </h2>
      
      {/* Success Message */}
      <p className="text-gray-600 text-base leading-relaxed max-w-md">
        All tasks have been automatically assigned based on agent availability, location, and 
        performance. You can <span className="font-semibold">review, manage, or edit task details</span> anytime in the Task 
        Management section.
      </p>
    </div>
  );
export default SuccessUI;