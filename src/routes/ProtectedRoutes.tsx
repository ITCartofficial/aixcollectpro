import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import PrivacyPolicy from '../pages/privacy-policy/PrivacyPolicy';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Settings from '../pages/settings/Settings';
import TeamManagement from '../pages/team-management/TeamManagement';
import TaskManagement from '../pages/task-management/TaskManagement';
import CollectionMetrics from '../pages/collection-metrics/CollectionMetrics';
import Documents from '../pages/documents/Documents';
import AttendanceLeave from '../pages/attendance-and-leave/AttendanceLeave';
import AiInsights from '../pages/ai-insights/AiInsights';
import Reports from '../pages/reports/Reports';
import AlertsEscalations from '../pages/alerts-and-escalations/AlertsEscalations';
import TaskDetails from '../pages/task-management/task-details/[id]';
import Profile from '../pages/profile/Profile';
import AgentProfile from '../pages/team-management/agent-profile/[id]';
import TelecallerProfile from '../pages/team-management/telecaller-profile/[id]';
// import About from '../pages/about/About';

export const ProtectedRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Routes WITH sidebar */}
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />

                <Route path="team-management" element={<TeamManagement />} />
                <Route path="team-management/agent-profile/:id" element={<AgentProfile />} />
                <Route path="team-management/telecaller-profile/:id" element={<TelecallerProfile />} />

                <Route path="task-management" element={<TaskManagement />} />
                <Route path="task-details/:id" element={<TaskDetails />} />

                <Route path="collection-metrics" element={<CollectionMetrics />} />
                <Route path="documents" element={<Documents />} />
                <Route path="alerts-and-escalations" element={<AlertsEscalations />} />
                <Route path="attendance-leave" element={<AttendanceLeave />} />
                <Route path="ai-insights" element={<AiInsights />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* Routes WITHOUT sidebar */}
            <Route path="/" element={<DashboardLayout showSidebar={false} />}>
                {/* <Route path="privacy-policy" element={<PrivacyPolicy />} /> */}
                {/* Add more routes that don't need sidebar here */}
            </Route>
        </Routes>
    );
};









