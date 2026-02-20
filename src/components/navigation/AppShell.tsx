'use client';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Toast from '../ui/Toast';
import ContentPage from '../content/ContentPage';
import CampaignPage from '../campaign/CampaignPage';
import CalendarPage from '../calendar/CalendarPage';
import AnalyticsPage from '../analytics/AnalyticsPage';
import LeadsPage from '../leads/LeadsPage';
import InsurancePage from '../insurance/InsurancePage';
import AdminPage from '../admin/AdminPage';
import DashboardPage from '../dashboard/DashboardPage';

export default function AppShell({ children }: { children?: React.ReactNode }) {
    const { activeTab, theme, toast } = useAppStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const renderPage = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardPage />;
            case 'content': return <ContentPage />;
            case 'campaign': return <CampaignPage />;
            case 'calendar': return <CalendarPage />;
            case 'analytics': return <AnalyticsPage />;
            case 'leads': return <LeadsPage />;
            case 'insurance': return <InsurancePage />;
            case 'admin': return <AdminPage />;
            default: return <DashboardPage />;
        }
    };

    return (
        <div className="app-shell">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="main-wrapper">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <main className="main-content">
                    {renderPage()}
                </main>
                <BottomNav />
            </div>
            {toast && <Toast message={toast.message} type={toast.type as any} />}
            <style jsx>{`
        .app-shell {
          display: flex;
          min-height: 100vh;
          background: var(--bg);
        }
        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          margin-left: 0;
          transition: margin var(--transition);
        }
        @media (min-width: 900px) {
          .main-wrapper {
            margin-left: var(--sidebar-width);
          }
        }
        .main-content {
          flex: 1;
          padding: 1rem;
          padding-bottom: calc(var(--bottom-nav-height) + 1rem);
          overflow-y: auto;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        @media (min-width: 769px) {
          .main-content {
            padding: 1.5rem 2rem;
            padding-bottom: 2rem;
          }
        }
      `}</style>
        </div>
    );
}
