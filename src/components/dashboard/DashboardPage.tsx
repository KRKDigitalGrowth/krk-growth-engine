'use client';
import { useAppStore } from '@/store';
import { Sparkles, TrendingUp, Users, Target, Zap, ArrowRight, BarChart3, Calendar, Shield, Star } from 'lucide-react';

export default function DashboardPage() {
    const { gamification, analytics, behavior, setActiveTab, showToast } = useAppStore();

    const levelColors: Record<string, string> = {
        Starter: '#6b7280', Pro: '#6c63ff', Expert: '#f59e0b', Legend: '#ef4444',
    };

    const quickActions = [
        { label: 'Generate Content', icon: Sparkles, tab: 'content', color: '#6c63ff' },
        { label: 'New Campaign', icon: Target, tab: 'campaign', color: '#f59e0b' },
        { label: 'View Calendar', icon: Calendar, tab: 'calendar', color: '#10b981' },
        { label: 'Insurance Mode', icon: Shield, tab: 'insurance', color: '#ef4444' },
    ];

    return (
        <div className="dashboard animate-fade-in">
            {/* Welcome Banner */}
            <div className="welcome-banner">
                <div>
                    <h2>Good morning, KRK! 👋</h2>
                    <p>Your AI engine is ready. Let's grow your business today.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setActiveTab('content')} id="generate-now-btn">
                    <Sparkles size={16} /> Generate Now
                </button>
            </div>

            {/* Stats Row */}
            <div className="stats-grid">
                {[
                    { label: 'Total Shares', value: analytics.totalShares, icon: TrendingUp, color: '#6c63ff', delta: '+12%' },
                    { label: 'Leads Generated', value: analytics.totalLeads, icon: Users, color: '#10b981', delta: '+8%' },
                    { label: 'Engagement Score', value: `${analytics.engagementScore}%`, icon: BarChart3, color: '#f59e0b', delta: '+5%' },
                    { label: 'Campaign Success', value: `${analytics.campaignSuccessRate}%`, icon: Target, color: '#ef4444', delta: '+3%' },
                ].map(({ label, value, icon: Icon, color, delta }) => (
                    <div key={label} className="stat-card animate-fade-in">
                        <div className="stat-icon" style={{ background: `${color}20`, color }}>
                            <Icon size={20} />
                        </div>
                        <div className="stat-number">{value}</div>
                        <div className="stat-label">{label}</div>
                        <div className="stat-delta up">{delta} this week</div>
                    </div>
                ))}
            </div>

            {/* AI Suggestion */}
            <div className="ai-suggestion glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={18} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Suggestion</div>
                        <div className="text-xs text-muted">Based on your behavior</div>
                    </div>
                    <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>LIVE</span>
                </div>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                    📊 Best time to post: <strong>9:00 AM – 11:00 AM</strong> today<br />
                    🏆 Top platform for you: <strong>{behavior.preferredPlatform}</strong><br />
                    📝 Your audience prefers: <strong>{behavior.avgCaptionLength} captions</strong> in <strong>{behavior.mostUsedCategory}</strong>
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('content')} id="act-suggestion-btn">
                    Act on This <ArrowRight size={14} />
                </button>
            </div>

            {/* Quick Actions */}
            <div>
                <div className="section-header">
                    <h3 className="section-title">Quick Actions</h3>
                </div>
                <div className="quick-actions-grid">
                    {quickActions.map(({ label, icon: Icon, tab, color }) => (
                        <button key={tab} className="quick-action-btn" onClick={() => setActiveTab(tab)} id={`qa-${tab}`}>
                            <div className="qa-icon" style={{ background: `${color}20`, color }}>
                                <Icon size={22} />
                            </div>
                            <span>{label}</span>
                            <ArrowRight size={14} className="qa-arrow" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Gamification */}
            <div className="gamification-row">
                <div className="glass-card flex-1">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Posting Streak</span>
                        <span style={{ fontSize: '1.5rem' }}>🔥</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                        {gamification.streak}
                    </div>
                    <div className="text-xs text-muted">days in a row</div>
                    <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
                        <div className="progress-fill" style={{ width: `${Math.min((gamification.streak / 30) * 100, 100)}%` }} />
                    </div>
                    <div className="text-xs text-muted" style={{ marginTop: '4px' }}>Goal: 30 days</div>
                </div>

                <div className="glass-card flex-1">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Growth Score</span>
                        <span style={{ fontSize: '1.5rem' }}>⭐</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>
                        {gamification.growthScore.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted">points</div>
                    <div style={{ marginTop: '0.75rem' }}>
                        <span className="badge" style={{ background: `${levelColors[gamification.weeklyLevel]}20`, color: levelColors[gamification.weeklyLevel] }}>
                            <Star size={10} /> {gamification.weeklyLevel}
                        </span>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div>
                <div className="section-header">
                    <h3 className="section-title">Achievements</h3>
                    <span className="badge badge-primary">{gamification.badges.filter(b => b.earned).length}/{gamification.badges.length}</span>
                </div>
                <div className="badges-grid">
                    {gamification.badges.map((badge) => (
                        <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
                            <div className="badge-icon">{badge.icon}</div>
                            <div className="badge-name">{badge.name}</div>
                            <div className="text-xs text-muted" style={{ textAlign: 'center' }}>{badge.description}</div>
                            {!badge.earned && <div className="locked-overlay">🔒</div>}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .dashboard { display: flex; flex-direction: column; gap: 1.5rem; }
        .welcome-banner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.5rem; background: linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.1));
          border-radius: var(--radius); border: 1px solid rgba(108,99,255,0.2);
        }
        .welcome-banner h2 { font-size: 1.2rem; font-weight: 800; margin-bottom: 4px; }
        .welcome-banner p { font-size: 0.85rem; color: var(--text2); }
        .stats-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; }
        @media(min-width:900px){ .stats-grid { grid-template-columns:repeat(4,1fr); } }
        .stat-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem; }
        .ai-suggestion { background: linear-gradient(135deg, rgba(108,99,255,0.08), rgba(245,158,11,0.05)) !important; }
        .quick-actions-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0.75rem; }
        @media(min-width:600px){ .quick-actions-grid { grid-template-columns:repeat(4,1fr); } }
        .quick-action-btn {
          display:flex; flex-direction:column; align-items:center; gap:0.5rem;
          padding:1rem 0.75rem; border-radius:var(--radius);
          background:var(--card-bg); border:1px solid var(--border);
          cursor:pointer; transition:all var(--transition); font-size:0.8rem;
          font-weight:600; color:var(--text); font-family:var(--font-main);
        }
        .quick-action-btn:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); border-color:var(--primary); }
        .qa-icon { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; }
        .qa-arrow { color:var(--text3); }
        .gamification-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .badges-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem; }
        @media(min-width:600px){ .badges-grid { grid-template-columns:repeat(6,1fr); } }
        .badge-card {
          display:flex; flex-direction:column; align-items:center; gap:4px;
          padding:0.875rem 0.5rem; background:var(--card-bg);
          border-radius:var(--radius-sm); border:1px solid var(--border);
          position:relative; overflow:hidden; transition:all var(--transition);
        }
        .badge-card.earned { border-color:rgba(108,99,255,0.3); }
        .badge-card.locked { opacity:0.5; }
        .badge-icon { font-size:1.75rem; }
        .badge-name { font-size:0.7rem; font-weight:700; text-align:center; }
        .locked-overlay {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,0.5); font-size:1.2rem;
        }
      `}</style>
        </div>
    );
}
