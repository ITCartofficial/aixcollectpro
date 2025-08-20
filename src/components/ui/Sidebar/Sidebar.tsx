import React, { useState } from "react";
import IssueLoggedIcon from "../../../assets/icons/issuelogged.svg?react";
import AccessControlIcon from "../../../assets/icons/accesscontrol.svg?react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdTask,
  MdBarChart,
  MdDescription,
  MdNotificationImportant,
  MdEventAvailable,
  MdInsights,
  MdAssessment,
  MdSettings,
  MdLogout,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode | ((isActive: boolean) => React.ReactNode);
  path: string;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard />, path: "/" },
    {
      id: "team",
      label: "Team Management",
      icon: <MdPeople />,
      path: "/team-management",
    },
    {
      id: "task",
      label: "Task Management",
      icon: <MdTask />,
      path: "/task-management",
    },
    {
      id: "metrics",
      label: "Collection Metrics",
      icon: <MdBarChart />,
      path: "/collection-metrics",
    },
    {
      id: "documents",
      label: "Documents",
      icon: <MdDescription />,
      path: "/documents",
    },
    {
      id: "issuelogged",
      label: "Issue Logged",
      icon: (isActive: boolean) => (
        <IssueLoggedIcon
          style={{
            filter: isActive
              ? "brightness(0) saturate(0%) invert( 100%)"
              : "brightness(0) saturate(100%) invert(0%)",
          }}
        />
      ),
      path: "/issue-logged",
    },
    {
      id: "alerts",
      label: "Alerts & Escalations",
      icon: <MdNotificationImportant />,
      path: "/alerts-and-escalations",
    },
    {
      id: "attendance",
      label: "Attendance & Leave",
      icon: <MdEventAvailable />,
      path: "/attendance-leave",
    },
    {
      id: "insights",
      label: "AI Insights",
      icon: <MdInsights />,
      path: "/ai-insights",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <MdAssessment />,
      path: "/reports",
    },
    {
      id: "accesscontrol",
      label: "Access Control",
      icon: (isActive: boolean) => (
        <AccessControlIcon
          style={{
            filter: isActive
              ? "brightness(0) saturate(100%) invert(100%)"
              : "brightness(0) saturate(100%) invert(0%)",
          }}
        />
      ),
      path: "/access-control",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <MdSettings />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderIcon = (
    icon: React.ReactNode | ((isActive: boolean) => React.ReactNode),
    isActive: boolean
  ): React.ReactNode => {
    if (typeof icon === "function") {
      return icon(isActive);
    }
    return icon;
  };

  return (
    <div
      className={`bg-white h-full transition-all duration-300 ease-in-out rounded-lg ${
        isCollapsed ? "w-16" : "w-[260px]"
      } flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 flex-shrink-0">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-neutral-700  whitespace-nowrap overflow-hidden">
            AiXCollectPro
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-neutral-100 transition-colors flex-shrink-0 cursor-pointer"
        >
          {isCollapsed ? (
            <MdChevronRight className="w-5 h-5 text-neutral-600" />
          ) : (
            <MdChevronLeft className="w-5 h-5 text-neutral-600" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <li key={item.id} className={` ${isCollapsed ? "px-2" : "px-4"}`}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center ${
                    isCollapsed ? "" : "px-4"
                  } py-3 text-left transition-colors hover:bg-neutral-100 rounded-lg ${
                    isActive
                      ? "bg-primary-700 text-white hover:bg-primary-700"
                      : "text-neutral-600"
                  }`}
                >
                  <span
                    className={`text-xl flex-shrink-0 ${
                      isCollapsed ? "mx-auto" : "mr-3"
                    }`}
                  >
                    {renderIcon(item.icon, isActive)}
                  </span>
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout - Fixed at bottom */}
      <div className="bg-white border-t border-neutral-200 p-4 flex-shrink-0">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center text-red-500 hover:bg-red-50 transition-colors rounded-lg cursor-pointer ${
            isCollapsed ? "justify-center py-3" : "px-4 py-2"
          }`}
        >
          <span
            className={`text-xl flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`}
          >
            <MdLogout />
          </span>
          {!isCollapsed && (
            <span className="font-medium whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
