'use client';
import { useAppStore } from '@/store';
import { LayoutDashboard, Sparkles, BarChart3, Calendar, Users } from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'content', label: 'Content', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'leads', label: 'Leads', icon: Users },
];

export default function BottomNav() {
    const { activeTab, setActiveTab } = useAppStore();
    return (
        <nav className="bottom-nav hide-desktop">
            {navItems.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    className={`bottom-nav-item ${activeTab === id ? 'active' : ''}`}
                    onClick={() => setActiveTab(id)}
                    id={`nav-${id}`}
                >
                    <Icon size={22} />
                    <span>{label}</span>
                </button>
            ))}
            <style jsx>{`
        .bottom-nav {
          position: fixed; bottom: 0; left: 0; right: 0;
          height: var(--bottom-nav-height);
          background: var(--bg2);
          border-top: 1px solid var(--border);
          display: flex; align-items: center;
          z-index: 50; backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding-bottom: env(safe-area-inset-bottom);
        }
        .bottom-nav-item {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px;
          padding: 0.5rem; border: none; background: transparent;
          color: var(--text3); cursor: pointer;
          font-size: 0.65rem; font-weight: 600;
          transition: all var(--transition);
          font-family: var(--font-main);
        }
        .bottom-nav-item.active { color: var(--primary); }
        .bottom-nav-item.active svg { filter: drop-shadow(0 0 6px rgba(108,99,255,0.6)); }
      `}</style>
        </nav>
    );
}
