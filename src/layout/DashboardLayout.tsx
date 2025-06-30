import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/ui/Sidebar/Sidebar";
import Header from '../components/ui/Header/Header';

interface DashboardLayoutProps {
  showSidebar?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  showSidebar = true 
}) => {
  if (!showSidebar) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex py-3 pl-3 pr-0 gap-4">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header/>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;