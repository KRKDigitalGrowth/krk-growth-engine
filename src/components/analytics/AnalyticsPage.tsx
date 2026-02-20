'use client';
import { useAppStore } from '@/store';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, Users, Share2, Target, Award } from 'lucide-react';

export default function AnalyticsPage() {
    const { analytics } = useAppStore();

    return (
        <div className="analytics-page animate-fade-in">
            {/* KPI Cards */}
            <div className="kpi-grid">
                {[
                    { label: 'Total Shares', value: analytics.totalShares, icon: Share2, color: '#6c63ff', delta: '+12%' },
                    { label: 'Leads Generated', value: analytics.totalLeads, icon: Users, color: '#10b981', delta: '+8%' },
                    { label: 'Best Platform', value: analytics.bestPlatform, icon: Award, color: '#f59e0b', delta: '🥇 #1' },
                    { label: 'Engagement Score', value: `${analytics.engagementScore}%`, icon: TrendingUp, color: '#ef4444', delta: '+5%' },
                    { label: 'Campaign Success', value: `${analytics.campaignSuccessRate}%`, icon: Target, color: '#a78bfa', delta: '+3%' },
                ].map(({ label, value, icon: Icon, color, delta }) => (
                    <div key={label} className="stat-card kpi-card">
                        <div className="kpi-icon" style={{ background: `${color}20`, color }}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <div className="stat-number" style={{ fontSize: '1.5rem', color }}>{value}</div>
                            <div className="stat-label">{label}</div>
                            <div className="stat-delta up">{delta} this week</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Weekly Posts Bar Chart */}
            <div className="glass-card">
                <div className="section-header">
                    <h3 className="section-title">📊 Weekly Post Activity</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={analytics.weeklyPosts} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="day" tick={{ fill: 'var(--text3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'var(--text3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }}
                        />
                        <Bar dataKey="count" fill="#6c63ff" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Platform Breakdown Pie + Growth Trend Line side by side */}
            <div className="charts-row">
                <div className="glass-card" style={{ flex: 1 }}>
                    <div className="section-header">
                        <h3 className="section-title">🎯 Platforms</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie data={analytics.platformBreakdown} dataKey="count" nameKey="platform" cx="50%" cy="50%" outerRadius={70} innerRadius={40} paddingAngle={4}>
                                {analytics.platformBreakdown.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="platform-legend">
                        {analytics.platformBreakdown.map(({ platform, count, color }) => (
                            <div key={platform} className="platform-legend-item">
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                                <span>{platform}</span>
                                <span style={{ fontWeight: 700, color }}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ flex: 1 }}>
                    <div className="section-header">
                        <h3 className="section-title">📈 Growth Score</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={analytics.growthTrend} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="week" tick={{ fill: 'var(--text3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--text3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }} />
                            <Line type="monotone" dataKey="score" stroke="#6c63ff" strokeWidth={3} dot={{ fill: '#6c63ff', r: 5 }} activeDot={{ r: 7 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <style jsx>{`
        .analytics-page { display:flex; flex-direction:column; gap:1.25rem; }
        .kpi-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0.75rem; }
        @media(min-width:900px){.kpi-grid{grid-template-columns:repeat(5,1fr);}}
        .kpi-card { display:flex; align-items:center; gap:0.875rem; }
        .kpi-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .charts-row { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }
        @media(max-width:600px){.charts-row{grid-template-columns:1fr;}}
        .platform-legend { display:flex; flex-direction:column; gap:4px; margin-top:0.5rem; }
        .platform-legend-item { display:flex; align-items:center; gap:8px; font-size:0.78rem; color:var(--text2); }
        .platform-legend-item span:last-child { margin-left:auto; }
      `}</style>
        </div>
    );
}
