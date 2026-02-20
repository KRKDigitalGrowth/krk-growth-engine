'use client';
import { useAppStore } from '@/store';
import { Menu, Sun, Moon, Bell, Zap } from 'lucide-react';

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
    const { theme, toggleTheme, gamification, activeTab } = useAppStore();

    const pageTitles: Record<string, string> = {
        dashboard: 'Dashboard', content: 'Content Engine', campaign: 'Campaign Builder',
        calendar: 'Content Calendar', analytics: 'Analytics', leads: 'Lead Manager',
        insurance: 'Insurance Mode', admin: 'Admin Panel',
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="btn btn-ghost btn-icon hide-desktop" onClick={onMenuClick} id="menu-btn">
                    <Menu size={20} />
                </button>
                <div>
                    <h1 className="page-title">{pageTitles[activeTab] || 'KRK Growth Engine'}</h1>
                    <p className="page-sub">AI Marketing Platform</p>
                </div>
            </div>
            <div className="topbar-right">
                <div className="streak-pill">
                    <span>🔥</span>
                    <span>{gamification.streak}d streak</span>
                </div>
                <button className="btn btn-ghost btn-icon" onClick={toggleTheme} id="theme-toggle">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button className="btn btn-ghost btn-icon" id="notif-btn">
                    <Bell size={18} />
                </button>
                <div className="user-dot">K</div>
            </div>
            <style jsx>{`
        .topbar {
          height: var(--nav-height);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1rem;
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(12px);
        }
        .topbar-left { display: flex; align-items: center; gap: 0.75rem; }
        .page-title { font-size: 1.05rem; font-weight: 700; color: var(--text); }
        .page-sub { font-size: 0.7rem; color: var(--text3); }
        .topbar-right { display: flex; align-items: center; gap: 0.5rem; }
        .streak-pill {
          display: flex; align-items: center; gap: 4px;
          padding: 4px 10px; background: rgba(245,158,11,0.15);
          border-radius: 100px; font-size: 0.78rem; font-weight: 600;
          color: var(--accent); border: 1px solid rgba(245,158,11,0.3);
        }
        .user-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 0.85rem; cursor: pointer;
        }
      `}</style>
        </header>
    );
}
