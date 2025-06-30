import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import PrivacyPolicy from '../pages/privacy-policy/PrivacyPolicy';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Settings from '../pages/settings/Settings';
// import About from '../pages/about/About';

export const ProtectedRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Routes WITH sidebar */}
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
                {/* <Route path="team-management" element={<TeamManagement />} />
                <Route path="collection-metrics" element={<CollectionMetrics />} />
                <Route path="documents" element={<Documents />} />
                <Route path="alerts-escalations" element={<AlertsEscalations />} />
                <Route path="attendance-leave" element={<AttendanceLeave />} />
                <Route path="ai-insights" element={<AIInsights />} />
                <Route path="reports" element={<Reports />} /> */}
                {/* Add more routes that need sidebar here */}
            </Route>

            {/* Routes WITHOUT sidebar */}
            <Route path="/" element={<DashboardLayout showSidebar={false} />}>
                {/* <Route path="privacy-policy" element={<PrivacyPolicy />} /> */}
                {/* Add more routes that don't need sidebar here */}
            </Route>
        </Routes>
    );
};









