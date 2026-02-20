'use client';
import { useAppStore } from '@/store';
import { LayoutDashboard, Sparkles, BarChart3, Calendar, Users, Shield, Settings, X, Zap, Target, LogOut } from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content', label: 'Content Engine', icon: Sparkles },
    { id: 'campaign', label: 'Campaigns', icon: Target },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'insurance', label: 'Insurance Mode', icon: Shield },
    { id: 'admin', label: 'Admin Panel', icon: Settings },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { activeTab, setActiveTab } = useAppStore();

    const handleNav = (id: string) => { setActiveTab(id); onClose(); };

    return (
        <>
            {open && <div className="overlay" onClick={onClose} />}
            <aside className={`sidebar ${open ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon"><Zap size={20} /></div>
                        <div>
                            <div className="logo-title">KRK Growth</div>
                            <div className="logo-sub">AI Marketing Engine</div>
                        </div>
                    </div>
                    <button className="btn btn-ghost btn-icon hide-desktop" onClick={onClose}><X size={20} /></button>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            className={`nav-item ${activeTab === id ? 'active' : ''}`}
                            onClick={() => handleNav(id)}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                            {id === 'insurance' && <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>PRO</span>}
                        </button>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <div className="user-card">
                        <div className="user-avatar">K</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>KRK Agency</div>
                            <div className="text-muted text-xs">Insurance Advisor</div>
                        </div>
                    </div>
                </div>
            </aside>
            <style jsx>{`
        .overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          z-index: 99; backdrop-filter: blur(4px);
        }
        .sidebar {
          position: fixed; left: 0; top: 0; bottom: 0;
          width: var(--sidebar-width);
          background: var(--bg2);
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          z-index: 100;
          transform: translateX(-100%);
          transition: transform var(--transition);
        }
        @media (min-width: 900px) {
          .sidebar { transform: translateX(0); }
        }
        .sidebar.open { transform: translateX(0); }
        .sidebar-header {
          padding: 1.25rem 1rem;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }
        .logo { display: flex; align-items: center; gap: 0.75rem; }
        .logo-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          color: #fff; box-shadow: 0 4px 12px rgba(108,99,255,0.4);
        }
        .logo-title { font-family: var(--font-display); font-weight: 800; font-size: 1rem; color: var(--text); }
        .logo-sub { font-size: 0.7rem; color: var(--text3); }
        .sidebar-nav { flex: 1; padding: 0.75rem 0.75rem; display: flex; flex-direction: column; gap: 3px; overflow-y: auto; }
        .nav-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.625rem 0.875rem; border-radius: 10px;
          font-size: 0.875rem; font-weight: 500;
          color: var(--text2); cursor: pointer; border: none; background: transparent;
          transition: all var(--transition); width: 100%; text-align: left;
        }
        .nav-item:hover { background: var(--surface2); color: var(--text); }
        .nav-item.active {
          background: linear-gradient(135deg, rgba(108,99,255,0.15), rgba(108,99,255,0.05));
          color: var(--primary); font-weight: 600;
          border: 1px solid rgba(108,99,255,0.2);
        }
        .sidebar-footer { padding: 1rem; border-top: 1px solid var(--border); }
        .user-card {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem; background: var(--surface2);
          border-radius: 12px; cursor: pointer;
        }
        .user-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 0.9rem;
        }
      `}</style>
        </>
    );
}
