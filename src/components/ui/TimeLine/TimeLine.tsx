// interface TimelineProps {
//   children: React.ReactNode;
// }

// interface TimelineItemProps {
//   status?: "start" | "completed" | "active" | "pending";
//   isFirst?: boolean;
//   isLast?: boolean;
//   children: React.ReactNode;
// }

// export function Timeline({ children }: TimelineProps) {
//   return <div className="relative pl-8">{children}</div>;
// }

// export function TimelineItem({
//   status = "pending",
//   isFirst = false,
//   isLast = false,
//   children,
// }: TimelineItemProps) {
//   const circleStyles: Record<string, string> = {
//     active: "bg-white border-blue-500",
//     completed: "bg-green-500 border-green-500",
//     start: "bg-white border-gray-400",
//     pending: "bg-gray-300 border-gray-300",
//   };

//   const lineColor = (state: string) => {
//     switch (state) {
//       case "completed":
//         return "bg-green-500";
//       case "active":
//         return "bg-blue-500";
//       default:
//         return "bg-gray-300";
//     }
//   };

//   return (
//     <div className="relative flex items-start">
//       {/* Single line */}
//       {!isFirst && !isLast && (
//         <span
//           className={`absolute -left-[20px] top-0 w-0.5 h-full ${lineColor(
//             status
//           )}`}
//         />
//       )}
//       {isFirst && !isLast && (
//         <span
//           className={`absolute -left-[20px] top-1/2 w-0.5 h-1/2 ${lineColor(
//             status
//           )}`}
//         />
//       )}

//       {/* Circle */}
//       <span
//         className={`absolute -left-[30px] top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full border-2 ${circleStyles[status]}`}
//       >
//         {status === "completed" ? (
//           <svg
//             className="w-3 h-3 text-white"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={3}
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         ) : status === "start" ? (
//           <span className="w-2 h-2 rounded-full bg-gray-400" />
//         ) : null}
//       </span>

//       {/* Content */}
//       <div className="flex-1 ml-4 mb-8">{children}</div>
//     </div>
//   );
// }
import React, { Children, cloneElement, isValidElement } from "react";

export interface TimelineProps {
  children: React.ReactNode;
}

export interface TimelineItemProps {
  status?: "start" | "completed" | "active" | "pending";

  isFirst?: boolean;

  isLast?: boolean;

  children: React.ReactNode;
}

export const Timeline: React.FC<TimelineProps> = ({ children }) => {
  const total = Children.count(children);

  const items = Children.map(children, (child, idx) =>
    isValidElement(child)
      ? cloneElement(child, {
          isFirst: idx === 0,

          isLast: idx === total - 1,
        } as Partial<TimelineItemProps>)
      : child
  );

  return <div className="relative pl-8">{items}</div>;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  status = "pending",

  isFirst = false,

  isLast = false,

  children,
}) => {


  const getLineBelowColor = () => {
    if (isFirst) return "bg-blue-500";

    if (status === "completed" || status === "active") return "bg-green-500";

    return "bg-gray-300";
  };

  return (
    <div className="relative flex items-start min-h-16 ">
      {/* Line below dot: connects this dot to the next */}

      {!isLast && (
        <span
          className={`absolute left-[calc(-1.35rem+12px)] top-1/2 w-0.5 h-[calc(100%-24px)] ${getLineBelowColor()} z-0`}
          style={{
            top: "50%",

            height: "calc(100% - 4px)", 
          }}
        />
      )}

      {/* Dot */}
      <span
        className={`absolute -left-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full border-2 z-10 ${
          isFirst
            ? "bg-blue-500 border-blue-500"
            : status === "completed"
            ? "bg-green-500 border-green-500"
            : status === "active"
            ? "bg-white border-blue-500"
            : "bg-gray-300 border-gray-300"
        }`}
      >
        {isFirst ? (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <circle cx="6" cy="6" r="6" />
          </svg>
        ) : status === "completed" ? (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : status === "active" ? (
          <span className="w-2 h-2 rounded-full bg-blue-500" />
        ) : null}
      </span>

      {/* Content */}
      <div className="flex-1 ml-4 mb-8">{children}</div>
    </div>
  );
};
