// import React, { useState, useCallback, useRef, useEffect } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// type Agent = {
//   id: string;
//   name: string;
//   status: "On-Road" | "Idle" | "Offline";
//   avatar?: string;
//   lastCheckIn: string;
//   currentLocation: string;
//   lat: number;
//   lng: number;
//   completed: number;
//   pending: number;
//   profileUrl?: string;
// };

// const INITIAL_AGENTS: Agent[] = [
//   {
//     id: "1",
//     name: "Rakesh Kumar",
//     status: "On-Road",
//     lastCheckIn: "12:05 PM",
//     currentLocation: "Koramangala",
//     lat: 12.9352,
//     lng: 77.6245,
//     completed: 2,
//     pending: 4,
//   },
//   {
//     id: "2",
//     name: "Amit Sharma",
//     status: "On-Road",
//     lastCheckIn: "12:10 PM",
//     currentLocation: "Indiranagar",
//     lat: 12.9718,
//     lng: 77.6412,
//     completed: 5,
//     pending: 1,
//   },
//   {
//     id: "3",
//     name: "Priya Singh",
//     status: "Idle",
//     lastCheckIn: "11:55 AM",
//     currentLocation: "BTM Layout",
//     lat: 12.9166,
//     lng: 77.6101,
//     completed: 3,
//     pending: 2,
//   },
// ];

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 12.9716,
//   lng: 77.5946,
// };

// const getInitials = (name: string) => {
//   const [first, ...rest] = name.trim().split(" ");
//   const last = rest.length ? rest[rest.length - 1] : "";
//   return (first[0] + (last[0] || "")).toUpperCase();
// };

// const AgentInfoCard: React.FC<{ agent: Agent; onClose: () => void }> = ({
//   agent,
//   onClose,
// }) => (
//   <div className="absolute left-0 right-0 mx-auto z-50 w-96 bg-white rounded-lg shadow-lg p-4 top-6 border border-gray-100">
//     <div className="flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg uppercase">
//           {getInitials(agent.name)}
//         </div>
//         <span className="font-medium text-lg text-gray-900">{agent.name}</span>
//       </div>
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${agent.status === "On-Road" ? "bg-emerald-100 text-emerald-700" : agent.status === "Idle" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>
//         {agent.status}
//       </span>
//     </div>
//     <div className="mt-2 mb-1 text-gray-700 text-[15px]">
//       <span className="font-semibold">Last Check in :</span> <span className="font-medium">{agent.lastCheckIn}</span>
//       <span className="mx-2">|</span>
//       <span className="font-semibold">Current Location :</span> <span className="font-medium">{agent.currentLocation}</span>
//     </div>
//     <div className="mb-2 text-gray-700 text-[15px]">
//       Task : <span className="font-semibold">{agent.completed} Completed</span>, <span className="font-semibold">{agent.pending} pending</span>
//     </div>
//     <div className="flex justify-end">
//       <a
//         href={agent.profileUrl || "#"}
//         className="bg-blue-600 text-white px-4 py-1.5 rounded font-medium flex items-center gap-2 text-sm hover:bg-blue-700 transition"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
//         </svg>
//         View Profile
//       </a>
//       <button
//         className="ml-2 text-gray-400 hover:text-gray-600 text-lg"
//         onClick={onClose}
//         aria-label="Close"
//       >
//         ×
//       </button>
//     </div>
//   </div>
// );

// const AgentLiveTrackingMap: React.FC = () => {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
//   });

//   const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
//   const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
//   const mapRef = useRef<google.maps.Map | null>(null);

//   const onLoad = useCallback((map: google.maps.Map) => {
//     mapRef.current = map;
//   }, []);

//   // Simulate live updates (move agents randomly every 3 seconds)
//   useEffect(() => {
//     const moveAgent = (agent: Agent): Agent => {
//       // Move by a small random delta
//       const deltaLat = (Math.random() - 0.5) * 0.002;
//       const deltaLng = (Math.random() - 0.5) * 0.002;
//       return {
//         ...agent,
//         lat: agent.lat + deltaLat,
//         lng: agent.lng + deltaLng,
//       };
//     };
//     const interval = setInterval(() => {
//       setAgents(prev =>
//         prev.map(agent => agent.status === "On-Road" ? moveAgent(agent) : agent)
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Update info card if selected agent moves
//   useEffect(() => {
//     if (!selectedAgent) return;
//     const updated = agents.find(a => a.id === selectedAgent.id);
//     if (updated && (updated.lat !== selectedAgent.lat || updated.lng !== selectedAgent.lng)) {
//       setSelectedAgent(updated);
//     }
//   }, [agents, selectedAgent]);

//   if (!isLoaded) return <div className="h-96 flex justify-center items-center text-gray-500">Loading map...</div>;

//   return (
//     <div className="relative">
//       {selectedAgent && (
//         <AgentInfoCard agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
//       )}
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={12}
//         onLoad={onLoad}
//       >
//         {agents.map((agent) => (
//           <Marker
//             key={agent.id}
//             position={{ lat: agent.lat, lng: agent.lng }}
//             onClick={() => setSelectedAgent(agent)}
//             label={{
//               text: getInitials(agent.name),
//               color: "white",
//               fontWeight: "bold",
//               fontSize: "14px",
//               className: "bg-teal-500 rounded-full px-2 py-1",
//             }}
//             icon={{
//               url:
//                 "data:image/svg+xml;utf8," +
//                 encodeURIComponent(
//                   `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#14b8a6" stroke="#fff" stroke-width="3"/><text x="50%" y="56%" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold" fill="white">${getInitials(agent.name)}</text></svg>`
//                 ),
//               scaledSize: new window.google.maps.Size(40, 40),
//               anchor: new window.google.maps.Point(20, 20),
//             }}
//             title={agent.name}
//           />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// };

// export default AgentLiveTrackingMap;










import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export type Agent = {
  id: string;
  name: string;
  status: "On-Road" | "Idle" | "Offline";
  avatar?: string;
  lastCheckIn: string;
  currentLocation: string;
  lat: number;
  lng: number;
  completed: number;
  pending: number;
  profileUrl?: string;
};

export interface AgentLiveTrackingMapProps {
  agents: Agent[];
}

const containerStyle = {
  width: "100%",
  height: "360px",
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const getInitials = (name: string) => {
  const [first, ...rest] = name.trim().split(" ");
  const last = rest.length ? rest[rest.length - 1] : "";
  return (first[0] + (last[0] || "")).toUpperCase();
};

const AgentInfoCard: React.FC<{ agent: Agent; onClose: () => void }> = ({
  agent,
  onClose,
}) => (
  <div className="absolute left-0 right-0 mx-auto z-50 w-96 bg-white rounded-lg shadow-lg p-4 top-6 border border-neutral-100">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg uppercase">
          {getInitials(agent.name)}
        </div>
        <span className="font-medium text-lg text-neutral-700">{agent.name}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${agent.status === "On-Road" ? "bg-emerald-100 text-emerald-700" : agent.status === "Idle" ? "bg-yellow-100 text-yellow-700" : "bg-neutral-200 text-neutral-700"}`}>
        {agent.status}
      </span>
    </div>
    <div className="mt-2 mb-1 text-neutral-700 text-[15px]">
      <span className="font-semibold">Last Check in :</span> <span className="font-medium">{agent.lastCheckIn}</span>
      <span className="mx-2">|</span>
      <span className="font-semibold">Current Location :</span> <span className="font-medium">{agent.currentLocation}</span>
    </div>
    <div className="mb-2 text-neutral-700 text-[15px]">
      Task : <span className="font-semibold">{agent.completed} Completed</span>, <span className="font-semibold">{agent.pending} pending</span>
    </div>
    <div className="flex justify-end">
      <a
        href={agent.profileUrl || "#"}
        className="bg-primary-600 text-white px-4 py-1.5 rounded font-medium flex items-center gap-2 text-sm hover:bg-primary-700 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        View Profile
      </a>
      <button
        className="ml-2 text-neutral-400 hover:text-neutral-600 text-lg"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  </div>
);

const AgentLiveTrackingMap: React.FC<AgentLiveTrackingMapProps> = ({ agents }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [simAgents, setSimAgents] = useState<Agent[]>(agents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Keep simulation array in sync with filtered agents from props
  useEffect(() => {
    setSimAgents(agents);
  }, [agents]);

  // Simulate live updates (move agents randomly every 3 seconds)
  useEffect(() => {
    const moveAgent = (agent: Agent): Agent => {
      if (agent.status !== "On-Road") return agent;
      const deltaLat = (Math.random() - 0.5) * 0.002;
      const deltaLng = (Math.random() - 0.5) * 0.002;
      return {
        ...agent,
        lat: agent.lat + deltaLat,
        lng: agent.lng + deltaLng,
      };
    };
    const interval = setInterval(() => {
      setSimAgents(prev =>
        prev.map(agent => moveAgent(agent))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update info card if selected agent moves
  useEffect(() => {
    if (!selectedAgent) return;
    const updated = simAgents.find(a => a.id === selectedAgent.id);
    if (updated && (updated.lat !== selectedAgent.lat || updated.lng !== selectedAgent.lng)) {
      setSelectedAgent(updated);
    }
  }, [simAgents, selectedAgent]);

  if (!isLoaded) return <div className="h-96 flex justify-center items-center text-neutral-500">Loading map...</div>;

  return (
    <div className="relative">
      {selectedAgent && (
        <AgentInfoCard agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={simAgents.length ? { lat: simAgents[0].lat, lng: simAgents[0].lng } : center}
        zoom={12}
        onLoad={onLoad}
      >
        {simAgents.map((agent) => (
          <Marker
            key={agent.id}
            position={{ lat: agent.lat, lng: agent.lng }}
            onClick={() => setSelectedAgent(agent)}
            label={{
              text: getInitials(agent.name),
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              className: "bg-teal-500 rounded-full px-2 py-1",
            }}
            icon={{
              url:
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#14b8a6" stroke="#fff" stroke-width="3"/><text x="50%" y="56%" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold" fill="white">${getInitials(agent.name)}</text></svg>`
                ),
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20),
            }}
            title={agent.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default AgentLiveTrackingMap;