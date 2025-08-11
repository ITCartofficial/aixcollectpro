import AgentLocationTracking from "./AgentLocationTracking";
import RecentActivitySidebar from "./RecentActivitySidebar";

const CombinedLocationAndActivity = () => {
  return (
    <div className="w-full flex flex-col  gap-4 rounded-lg">
      {/* Map and locations */}
      <div className="flex gap-6">
        <AgentLocationTracking />
        <RecentActivitySidebar />
      </div>
    </div>
  );
};

export default CombinedLocationAndActivity;
