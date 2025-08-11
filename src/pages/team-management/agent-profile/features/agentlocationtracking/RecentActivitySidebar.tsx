import React from "react";
import {
  Timeline,
  TimelineItem,
} from "../../../../../components/ui/TimeLine/TimeLine";
// import { FaCheckCircle, FaRegCircle, FaCircle } from 'react-icons/fa';

type ActivityStatus = "Completed" | "In-Progress";

interface Activity {
  location: string;
  type: string;
  note: string;
  time: string;
  status: ActivityStatus;
}

const activities: Activity[] = [
  {
    location: "5th Cross, Indiranagar",
    type: "Collection Visit",
    note: "On the Way to Follower Place",
    time: "02:30 PM",
    status: "In-Progress",
  },
  {
    location: "Domlur Extension",
    type: "Collection Visit",
    note: "Partial payment collected ₹2,000",
    time: "01:50 PM",
    status: "Completed",
  },
  {
    location: "1st Main Rd, Koramangala",
    type: "KYC Visit",
    note: "Docs collected & uploaded",
    time: "01:15 PM",
    status: "Completed",
  },
  {
    location: "KR Puram",
    type: "Start Day",
    note: "Started day from office",
    time: "12:25 PM",
    status: "Completed",
  },
];

const RecentActivitySidebar: React.FC = () => {
  return (
    <div className="w-full rounded-[8px] bg-white shadow-[0_8px_16px_rgba(0,0,0,0.12)] p-2">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="relative h-[420px] overflow-y-auto no-scrollbar timeline-reusable">
        <Timeline>
          {activities.map((activity, index) => (
            <TimelineItem
              key={index}
              status={
                index === 0
                  ? "active"
                  : activity.status === "Completed"
                  ? "completed"
                  : index === activities.length - 1
                  ? "start"
                  : "pending"
              }
              isFirst={index === 0}
              isLast={index === activities.length - 1}
            >
              {/* Your original card */}
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    {activity.location}
                  </p>
                  <div>
                    <p className="text-sm text-gray-500 py-[6px] px-4 bg-neutral-400 rounded-full">
                      {index === 0 ? "Last Updated" : "Updated"} :{" "}
                      {activity.time}
                    </p>
                    <p
                      className={`mt-1 px-2 py-1 rounded-full text-center text-sm font-medium ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {activity.status}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{activity.type}</p>
                <p className="text-sm text-gray-500">{activity.note}</p>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default RecentActivitySidebar;
