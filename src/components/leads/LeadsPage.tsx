'use client';
import { useState } from 'react';
import { useAppStore } from '@/store';
import { Users, MessageCircle, Search, Filter, Download } from 'lucide-react';
import { openWhatsApp, buildLeadCaptureMessage } from '@/lib/whatsapp';
import { Lead } from '@/types';

const defaultLeads: Lead[] = [
    { id: '1', name: 'Ramesh Kumar', phone: '919876543210', category: 'Term Insurance', sourcePlatform: 'WhatsApp', date: '2026-02-18', userId: 'demo', status: 'new', message: 'Interested in term plan' },
    { id: '2', name: 'Priya Sharma', phone: '919988776655', category: 'Health Insurance', sourcePlatform: 'Instagram', date: '2026-02-17', userId: 'demo', status: 'contacted' },
    { id: '3', name: 'Suresh Babu', phone: '919765432100', category: 'Family Protection', sourcePlatform: 'Facebook', date: '2026-02-16', userId: 'demo', status: 'converted' },
    { id: '4', name: 'Anitha Reddy', phone: '919654321098', category: 'Vehicle Insurance', sourcePlatform: 'Telegram', date: '2026-02-15', userId: 'demo', status: 'new' },
    { id: '5', name: 'Vijay Prakash', phone: '919543210987', category: 'Investment Plan', sourcePlatform: 'WhatsApp', date: '2026-02-14', userId: 'demo', status: 'contacted' },
];

export default function LeadsPage() {
    const { leads, addLead, updateLeadStatus, showToast } = useAppStore();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | Lead['status']>('all');
    const allLeads = leads.length > 0 ? leads : defaultLeads;

    const filtered = allLeads.filter(l => {
        const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.category.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filterStatus === 'all' || l.status === filterStatus;
        return matchSearch && matchFilter;
    });

    const statusColors: Record<string, string> = {
        new: 'badge-accent', contacted: 'badge-primary', converted: 'badge-success',
    };

    const handleChat = (lead: Lead) => {
        openWhatsApp(lead.phone, `Hi ${lead.name}! I'm following up on your interest in ${lead.category}. I'd love to help you find the best plan. Is now a good time to chat?`);
        if (lead.status === 'new') updateLeadStatus(lead.id, 'contacted');
        showToast('Opening WhatsApp...', 'info');
    };

    const handleExport = () => {
        const csv = ['Name,Phone,Category,Platform,Date,Status', ...filtered.map(l => `${l.name},${l.phone},${l.category},${l.sourcePlatform},${l.date},${l.status}`)].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'krk-leads.csv'; a.click();
        showToast('Leads exported!', 'success');
    };

    return (
        <div className="leads-page animate-fade-in">
            {/* Summary Stats */}
            <div className="leads-stats">
                {[
                    { label: 'Total Leads', value: allLeads.length, color: '#6c63ff' },
                    { label: 'New', value: allLeads.filter(l => l.status === 'new').length, color: '#f59e0b' },
                    { label: 'Contacted', value: allLeads.filter(l => l.status === 'contacted').length, color: '#6c63ff' },
                    { label: 'Converted', value: allLeads.filter(l => l.status === 'converted').length, color: '#10b981' },
                ].map(({ label, value, color }) => (
                    <div key={label} className="stat-card" style={{ textAlign: 'center', borderTop: `3px solid ${color}` }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--font-display)', color }}>{value}</div>
                        <div className="stat-label">{label}</div>
                    </div>
                ))}
            </div>

            {/* Search + Filter + Export */}
            <div className="leads-toolbar glass-card">
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
                    <input className="input" placeholder="Search leads..." value={search}
                        onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2rem' }} id="lead-search" />
                </div>
                <div className="tab-bar" style={{ flexShrink: 0 }}>
                    {['all', 'new', 'contacted', 'converted'].map(s => (
                        <button key={s} className={`tab-item ${filterStatus === s ? 'active' : ''}`}
                            onClick={() => setFilterStatus(s as any)} id={`filter-${s}`} style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>
                <button className="btn btn-secondary btn-sm" onClick={handleExport} id="export-btn">
                    <Download size={13} /> Export
                </button>
            </div>

            {/* Leads Table */}
            <div className="glass-card" style={{ overflow: 'auto' }}>
                {filtered.length === 0 ? (
                    <div className="empty-state"><Users size={40} /><h3>No leads found</h3></div>
                ) : (
                    <table className="leads-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Platform</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(lead => (
                                <tr key={lead.id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{lead.name}</div>
                                        <div className="text-xs text-muted">{lead.phone}</div>
                                    </td>
                                    <td>{lead.category}</td>
                                    <td>
                                        <span className="badge badge-primary">{lead.sourcePlatform}</span>
                                    </td>
                                    <td className="text-sm text-muted">{lead.date}</td>
                                    <td><span className={`badge ${statusColors[lead.status]}`}>{lead.status}</span></td>
                                    <td>
                                        <button className="btn btn-sm" style={{ background: '#25d366', color: '#fff', borderRadius: 8 }}
                                            onClick={() => handleChat(lead)} id={`chat-${lead.id}`}>
                                            <MessageCircle size={13} /> Chat
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <style jsx>{`
        .leads-page { display:flex; flex-direction:column; gap:1.25rem; }
        .leads-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:0.75rem; }
        @media(max-width:500px){.leads-stats{grid-template-columns:repeat(2,1fr);}}
        .leads-toolbar { display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap; }
        .leads-table { width:100%; border-collapse:collapse; font-size:0.85rem; }
        .leads-table th { text-align:left; padding:0.625rem 0.875rem; font-size:0.75rem; color:var(--text3); font-weight:700; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1px solid var(--border); }
        .leads-table td { padding:0.75rem 0.875rem; border-bottom:1px solid var(--border); color:var(--text); }
        .leads-table tr:last-child td { border-bottom:none; }
        .leads-table tr:hover td { background:var(--surface2); }
      `}</style>
        </div>
    );
}
