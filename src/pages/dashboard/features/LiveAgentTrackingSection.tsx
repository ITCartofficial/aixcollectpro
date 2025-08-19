// import { useState } from "react";
// import { FaSyncAlt } from "react-icons/fa";
// import Dropdown from "../../../components/common/Dropdown";
// import { MdLocationPin, MdOutlineAccessTimeFilled } from "react-icons/md";
// import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
// import type { AgentSummaryCard } from "../../../components/ui/Card/AgentStatusSummaryCard";
// import AgentStatusSummaryCard from "../../../components/ui/Card/AgentStatusSummaryCard";

// // Dummy multiple agent data
// const agents = [
//     {
//         id: "rakesh",
//         name: "Rakesh Kumar",
//         initials: "RK",
//         lat: 12.9352,
//         lng: 77.6245,
//         status: "On-Road",
//         lastCheckin: "12:05 PM",
//         location: "Koramangala",
//         tasks: { completed: 2, pending: 4 },
//     },
//     {
//         id: "priya",
//         name: "Priya Singh",
//         initials: "PS",
//         lat: 12.9330,
//         lng: 77.6220,
//         status: "Idle",
//         lastCheckin: "12:01 PM",
//         location: "HSR Layout",
//         tasks: { completed: 1, pending: 6 },
//     },
// ];

// const areaOptions = [
//     { label: "All Areas", value: "" },
//     { label: "Koramangala", value: "Koramangala" },
//     { label: "HSR Layout", value: "HSR Layout" },
// ];
// const agentOptions = [
//     { label: "All Agents", value: "" },
//     ...agents.map(a => ({ label: a.name, value: a.id })),
// ];
// const statusOptions = [
//     { label: "All Status", value: "" },
//     { label: "On-Road", value: "On-Road" },
//     { label: "Idle", value: "Idle" },
// ];

// const statusColors: Record<string, string> = {
//     "On-Road": "bg-green-100 text-green-700",
//     "Idle": "bg-yellow-100 text-yellow-700",
// };

// const MAP_BOUNDS = {
//     minLat: 12.9300,
//     maxLat: 12.9370,
//     minLng: 77.6200,
//     maxLng: 77.6270,
// };
// const MAP_WIDTH = 600;
// const MAP_HEIGHT = 380;

// // Helper to convert lat/lng to pixel positions
// function getMarkerPosition(lat: number, lng: number) {
//     const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * MAP_WIDTH;
//     const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * MAP_HEIGHT;
//     return { left: x, top: y };
// }

// // Agent summary cards data (with dynamic iconBg colors)
// const agentSummary: AgentSummaryCard[] = [
//     {
//         label: "Active On-Road Agents",
//         icon: <MdLocationPin className="w-5 h-5 text-[#0C9D61]" />,
//         count: 12,
//         iconBg: "bg-green-100",
//     },
//     {
//         label: "Idle Agents (>90 min)",
//         icon: <MdOutlineAccessTimeFilled className="w-5 h-5 text-[#FE9B0E]" />,
//         count: 3,
//         iconBg: "bg-yellow-100",
//     },
//     {
//         label: "Inactive Today",
//         icon: <MdOutlineAccessTimeFilled className="w-5 h-5 text-[#EC2D30]" />,
//         count: 5,
//         iconBg: "bg-red-100",
//     },
//     {
//         label: "On Leave Agents",
//         icon: <MdOutlineAccessTimeFilled className="w-5 h-5 text-[#2563eb]" />,
//         count: 6,
//         iconBg: "bg-blue-100",
//     },
// ];

// const LiveAgentTrackingSection = () => {
//     const [selectedArea, setSelectedArea] = useState("");
//     const [selectedAgent, setSelectedAgent] = useState("");
//     const [selectedStatus, setSelectedStatus] = useState("");
//     const [hoveredAgentId, setHoveredAgentId] = useState<string | null>(null);

//     const filteredAgents = agents.filter(a =>
//         (!selectedArea || a.location === selectedArea) &&
//         (!selectedAgent || a.id === selectedAgent) &&
//         (!selectedStatus || a.status === selectedStatus)
//     );

//     const handleRefresh = () => { };

//     return (
//         <div className="w-full mb-4">
//             {/* Header: Title left, Filters right */}
//             <div className="flex items-center justify-between flex-wrap gap-y-2 mb-4">
//                 <div className="flex gap-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Live Agent Tracking</h3>
//                     <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full mt-1 inline-block">Last Synced: 02:30 PM</span>
//                 </div>
//                 <div className="flex gap-2 flex-wrap">
//                     <Dropdown
//                         options={areaOptions}
//                         value={selectedArea}
//                         onChange={v => setSelectedArea(typeof v === "string" ? v : v[0])}
//                         placeholder="All Areas"
//                         className="w-44"
//                         searchable
//                     />
//                     <Dropdown
//                         options={agentOptions}
//                         value={selectedAgent}
//                         onChange={v => setSelectedAgent(typeof v === "string" ? v : v[0])}
//                         placeholder="All Agents"
//                         className="w-40"
//                         searchable
//                     />
//                     <Dropdown
//                         options={statusOptions}
//                         value={selectedStatus}
//                         onChange={v => setSelectedStatus(typeof v === "string" ? v : v[0])}
//                         placeholder="All Status"
//                         className="w-28"
//                     />
//                     <button
//                         className="px-3 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded flex items-center gap-1 text-sm font-medium cursor-pointer"
//                         onClick={handleRefresh}>
//                         <FaSyncAlt className="mr-1" /> Refresh
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content: Map and Summary */}
//             <div className="grid grid-cols-10 gap-6">
//                 {/* Map section: span 7 */}
//                 <div className="col-span-10 md:col-span-7 relative min-w-[400px]">
//                     <div className="relative w-full h-[360px] rounded-md overflow-hidden bg-gray-100">
//                         <iframe
//                             title="Agent Map"
//                             width="100%"
//                             height="100%"
//                             frameBorder="0"
//                             style={{ border: 0 }}
//                             src={`https://maps.google.com/maps?q=12.9336,77.6245&z=15&output=embed`}
//                             allowFullScreen
//                         />
//                         {filteredAgents.map(agent => {
//                             const { left, top } = getMarkerPosition(agent.lat, agent.lng);
//                             return (
//                                 <div
//                                     key={agent.id}
//                                     style={{
//                                         position: "absolute",
//                                         left,
//                                         top,
//                                         transform: "translate(-50%, -100%)",
//                                         zIndex: hoveredAgentId === agent.id ? 20 : 10,
//                                         cursor: "pointer",
//                                         pointerEvents: "auto" as React.CSSProperties["pointerEvents"],
//                                     }}
//                                     onMouseEnter={() => setHoveredAgentId(agent.id)}
//                                     onMouseLeave={() => setHoveredAgentId(null)}
//                                 >
//                                     <div
//                                         className={`w-7 h-7 rounded-full border-2 border-white shadow-md flex items-center justify-center ${statusColors[agent.status] || "bg-gray-300 text-gray-600"}`}
//                                         title={agent.name}
//                                     >
//                                         <span className="text-xs font-bold">{agent.initials}</span>
//                                     </div>
//                                     {hoveredAgentId === agent.id && (
//                                         <div className="absolute left-[44px] top-1 w-72 bg-white shadow-xl rounded-lg px-5 py-3 z-30"
//                                             style={{ minWidth: 220 }}>
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-3">
//                                                     <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-lg text-gray-600 border">
//                                                         {agent.initials}
//                                                     </div>
//                                                     <div>
//                                                         <div className="text-base font-medium text-gray-900">{agent.name}</div>
//                                                     </div>
//                                                 </div>
//                                                 <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[agent.status] || "bg-gray-200 text-gray-700"}`}>{agent.status}</span>
//                                             </div>
//                                             <div className="text-xs text-gray-500 mt-2">
//                                                 Last Check In: <span className="text-gray-700 font-medium">{agent.lastCheckin}</span> | Current Location: <span className="font-medium text-gray-700">{agent.location}</span>
//                                             </div>
//                                             <div className="text-xs text-gray-500 mt-2 mb-3">
//                                                 Task: <span className="text-gray-700 font-medium">{agent.tasks.completed} Completed, {agent.tasks.pending} pending</span>
//                                             </div>
//                                             <button className="text-xs font-semibold text-blue-700 px-3 py-1 border border-blue-700 rounded hover:bg-blue-50 transition">View Profile</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//                 {/* Card section: span 3 */}
//                 <div className="col-span-10 md:col-span-3 flex flex-col gap-4">
//                     <div className="text-sm font-semibold text-gray-700 mb-1">Agent Status Summary</div>
//                     <AgentStatusSummaryCard
//                         summary={agentSummary} />
//                     <PrimaryButton text="View All Agents" className="bg-primary-700 hover:bg-primary-600 text-white" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LiveAgentTrackingSection;










import { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown";
import { MdLocationPin, MdOutlineAccessTimeFilled } from "react-icons/md";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
import type { AgentSummaryCard } from "../../../components/ui/Card/AgentStatusSummaryCard";
import AgentStatusSummaryCard from "../../../components/ui/Card/AgentStatusSummaryCard";
import type { Agent } from "./AgentLiveTrackingMap";
import AgentLiveTrackingMap from "./AgentLiveTrackingMap";


// Dummy multiple agent data
const AGENTS: Agent[] = [
    {
        id: "rakesh",
        name: "Rakesh Kumar",
        status: "On-Road",
        lat: 12.9352,
        lng: 77.6245,
        lastCheckIn: "12:05 PM",
        currentLocation: "Koramangala",
        completed: 2,
        pending: 4,
    },
    {
        id: "priya",
        name: "Priya Singh",
        status: "Idle",
        lat: 12.9330,
        lng: 77.6220,
        lastCheckIn: "12:01 PM",
        currentLocation: "HSR Layout",
        completed: 1,
        pending: 6,
    },
    {
        id: "amit",
        name: "Amit Sharma",
        status: "On-Road",
        lat: 12.9718,
        lng: 77.6412,
        lastCheckIn: "12:10 PM",
        currentLocation: "Indiranagar",
        completed: 5,
        pending: 1,
    },
    {
        id: "sneha",
        name: "Sneha Rao",
        status: "On-Road",
        lat: 12.9755,
        lng: 77.6050,
        lastCheckIn: "12:15 PM",
        currentLocation: "MG Road",
        completed: 3,
        pending: 2,
    },
    {
        id: "arjun",
        name: "Arjun Mehta",
        status: "Idle",
        lat: 12.9834,
        lng: 77.5855,
        lastCheckIn: "12:08 PM",
        currentLocation: "Shivaji Nagar",
        completed: 0,
        pending: 5,
    },
    {
        id: "meera",
        name: "Meera Iyer",
        status: "On-Road",
        lat: 12.9712,
        lng: 77.6223,
        lastCheckIn: "12:20 PM",
        currentLocation: "Halasuru",
        completed: 4,
        pending: 3,
    },
    {
        id: "vishal",
        name: "Vishal Nair",
        status: "On-Road",
        lat: 12.9721,
        lng: 77.6190,
        lastCheckIn: "12:18 PM",
        currentLocation: "Trinity Circle",
        completed: 2,
        pending: 2,
    },
    {
        id: "anu",
        name: "Anu Thomas",
        status: "Idle",
        lat: 12.9166,
        lng: 77.6101,
        lastCheckIn: "12:12 PM",
        currentLocation: "BTM Layout",
        completed: 1,
        pending: 7,
    },
    {
        id: "rahul",
        name: "Rahul Verma",
        status: "On-Road",
        lat: 12.9792,
        lng: 77.5913,
        lastCheckIn: "12:25 PM",
        currentLocation: "Vasanth Nagar",
        completed: 3,
        pending: 4,
    },
    {
        id: "neha",
        name: "Neha Kapoor",
        status: "Idle",
        lat: 12.9344,
        lng: 77.6100,
        lastCheckIn: "12:30 PM",
        currentLocation: "Jayanagar",
        completed: 5,
        pending: 0,
    },
    {
        id: "karthik",
        name: "Karthik Reddy",
        status: "On-Road",
        lat: 12.9980,
        lng: 77.5534,
        lastCheckIn: "12:22 PM",
        currentLocation: "Malleshwaram",
        completed: 2,
        pending: 5,
    },
    {
        id: "pallavi",
        name: "Pallavi Desai",
        status: "On-Road",
        lat: 12.9575,
        lng: 77.5669,
        lastCheckIn: "12:27 PM",
        currentLocation: "Basavanagudi",
        completed: 4,
        pending: 1,
    }
];


const areaOptions = [
    { label: "All Areas", value: "" },
    { label: "Koramangala", value: "Koramangala" },
    { label: "HSR Layout", value: "HSR Layout" },
    { label: "Indiranagar", value: "Indiranagar" },
];
const agentOptions = [
    { label: "All Agents", value: "" },
    ...AGENTS.map(a => ({ label: a.name, value: a.id })),
];
const statusOptions = [
    { label: "All Status", value: "" },
    { label: "On-Road", value: "On-Road" },
    { label: "Idle", value: "Idle" },
    { label: "Offline", value: "Offline" },
];

const agentSummary: AgentSummaryCard[] = [
    {
        label: "Active On-Road Agents",
        icon: <MdLocationPin className="w-5 h-5 text-[#0C9D61]" />,
        count: AGENTS.filter(a => a.status === "On-Road").length,
        iconBg: "bg-green-100",
    },
    {
        label: "Idle Agents (>90 min)",
        icon: <MdOutlineAccessTimeFilled className="w-5 h-5 text-secondary-500" />,
        count: AGENTS.filter(a => a.status === "Idle").length,
        iconBg: "bg-yellow-100",
    },
    {
        label: "Inactive Today",
        icon: <MdOutlineAccessTimeFilled className="w-5 h-5 text-[#EC2D30]" />,
        count: 0,
        iconBg: "bg-red-100",
    },
    {
        label: "On Leave Agents",
        icon: <MdOutlineAccessTimeFilled className="w-5 h-5 text-primary-700" />,
        count: 0,
        iconBg: "bg-blue-100",
    },
];

const LiveAgentTrackingSection = () => {
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedAgent, setSelectedAgent] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    // Filtering logic, matching props to your AgentLiveTrackingMap fields
    const filteredAgents = AGENTS.filter(a =>
        (!selectedArea || a.currentLocation === selectedArea) &&
        (!selectedAgent || a.id === selectedAgent) &&
        (!selectedStatus || a.status === selectedStatus)
    );

    const handleRefresh = () => {};

    return (
        <div className="w-full mb-4">
            {/* Header: Title left, Filters right */}
            <div className="flex items-center justify-between flex-wrap gap-y-2 mb-4">
                <div className="flex gap-4">
                    <h3 className="text-lg font-semibold text-neutral-700">Live Agent Tracking</h3>
                    <span className="text-xs bg-neutral-100 text-neutral-500 px-2 py-1 rounded-full mt-1 inline-block">Last Synced: 02:30 PM</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Dropdown
                        options={areaOptions}
                        value={selectedArea}
                        onChange={v => setSelectedArea(typeof v === "string" ? v : v[0])}
                        placeholder="All Areas"
                        className="w-44"
                        searchable
                    />
                    <Dropdown
                        options={agentOptions}
                        value={selectedAgent}
                        onChange={v => setSelectedAgent(typeof v === "string" ? v : v[0])}
                        placeholder="All Agents"
                        className="w-40"
                        searchable
                    />
                    <Dropdown
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={v => setSelectedStatus(typeof v === "string" ? v : v[0])}
                        placeholder="All Status"
                        className="w-28"
                    />
                    <button
                        className="px-3 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded flex items-center gap-1 text-sm font-medium cursor-pointer"
                        onClick={handleRefresh}>
                        <FaSyncAlt className="mr-1" /> Refresh
                    </button>
                </div>
            </div>

            {/* Main Content: Map and Summary */}
            <div className="grid grid-cols-10 gap-6">
                {/* Map section: span 7 */}
                <div className="col-span-10 md:col-span-7 relative min-w-[400px]">
                    <div className="relative w-full h-[360px] rounded-md overflow-hidden bg-neutral-100">
                        <AgentLiveTrackingMap agents={filteredAgents} />
                    </div>
                </div>
                {/* Card section: span 3 */}
                <div className="col-span-10 md:col-span-3 flex flex-col gap-4">
                    <div className="text-sm font-semibold text-neutral-700 mb-1">Agent Status Summary</div>
                    <AgentStatusSummaryCard
                        summary={agentSummary} />
                    <PrimaryButton text="View All Agents" className="bg-primary-700 hover:bg-primary-600 text-white" />
                </div>
            </div>
        </div>
    );
};

export default LiveAgentTrackingSection;









