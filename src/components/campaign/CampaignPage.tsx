'use client';
import { useState } from 'react';
import { useAppStore } from '@/store';
import { Target, Zap, CheckCircle2, Calendar } from 'lucide-react';
import { Campaign, CampaignPost } from '@/types';

const goals = [
    { id: 'leads', label: '🎯 Lead Generation', desc: 'Capture new customer inquiries' },
    { id: 'branding', label: '✨ Brand Building', desc: 'Grow your online presence' },
    { id: 'awareness', label: '📢 Awareness', desc: 'Educate your audience' },
];

const durations = [7, 14, 30];

const postTopics: Record<string, string[]> = {
    leads: [
        'Free Insurance Review Offer', 'Limited Time Deal – Call Now', 'Client Success Story',
        'Why You Need Coverage', 'Comparison: Term vs Whole Life', 'Family Protection Checklist',
        'Testimonial: How We Helped', 'Common Insurance Myths Busted',
    ],
    branding: [
        'My Story as an Insurance Advisor', 'Behind the Scenes – A Day in My Life',
        'Top 5 Finance Tips', 'About Our Agency', 'Awards & Recognition',
        'Community Work We Do', 'Our Team Introduction', 'Industry News Update',
    ],
    awareness: [
        'What Is Term Insurance?', 'Health vs Life Insurance Explained',
        'How Premiums Are Calculated', 'Claim Process Step by Step',
        'Insurance for Young Professionals', 'Tax Benefits of Insurance',
        'When Should You Buy Insurance?', 'Common Policy Mistakes to Avoid',
    ],
};

function generatePlan(goal: string, duration: number): CampaignPost[] {
    const topics = postTopics[goal] || postTopics['leads'];
    const platforms = ['Instagram', 'WhatsApp', 'Facebook', 'Telegram'];
    const now = new Date();
    return Array.from({ length: duration }, (_, i) => {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        return {
            day: i + 1,
            date: date.toISOString().split('T')[0],
            topic: topics[i % topics.length],
            caption: `Day ${i + 1}: ${topics[i % topics.length]} – Connect with us for more details! #KRKGrowth`,
            platform: platforms[i % platforms.length],
            completed: false,
        };
    });
}

export default function CampaignPage() {
    const { addCampaign, campaigns, showToast, addScore } = useAppStore();
    const [goal, setGoal] = useState<'leads' | 'branding' | 'awareness'>('leads');
    const [duration, setDuration] = useState<7 | 14 | 30>(14);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
    const [view, setView] = useState<'builder' | 'list'>('builder');

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const posts = generatePlan(goal, duration);
            const now = new Date();
            const end = new Date(now); end.setDate(now.getDate() + duration);
            const campaign: Campaign = {
                id: `campaign-${Date.now()}`,
                name: `${goal.charAt(0).toUpperCase() + goal.slice(1)} Campaign – ${duration} days`,
                goal, duration,
                startDate: now.toISOString().split('T')[0],
                endDate: end.toISOString().split('T')[0],
                posts, userId: 'demo', status: 'active',
                createdAt: new Date().toISOString(),
            };
            addCampaign(campaign);
            setActiveCampaign(campaign);
            setIsGenerating(false);
            setView('list');
            addScore(100);
            showToast(`${duration}-day campaign created! +100 pts 🚀`, 'success');
        }, 1500);
    };

    return (
        <div className="campaign-page animate-fade-in">
            <div className="tab-bar" style={{ marginBottom: '1.25rem' }}>
                <button className={`tab-item ${view === 'builder' ? 'active' : ''}`} onClick={() => setView('builder')} id="tab-builder">Build Campaign</button>
                <button className={`tab-item ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} id="tab-list">My Campaigns ({campaigns.length})</button>
            </div>

            {view === 'builder' ? (
                <div className="builder-form">
                    <div className="glass-card">
                        <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700 }}>🎯 Campaign Goal</h3>
                        <div className="goal-grid">
                            {goals.map(g => (
                                <button key={g.id} className={`goal-card ${goal === g.id ? 'active' : ''}`} onClick={() => setGoal(g.id as any)} id={`goal-${g.id}`}>
                                    <div style={{ fontSize: '1.25rem' }}>{g.label.split(' ')[0]}</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{g.label.substring(2)}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '4px' }}>{g.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700 }}>📅 Campaign Duration</h3>
                        <div className="duration-row">
                            {durations.map(d => (
                                <button key={d} className={`duration-btn ${duration === d ? 'active' : ''}`} onClick={() => setDuration(d as any)} id={`dur-${d}`}>
                                    {d} Days
                                    {d === 30 && <span className="badge badge-accent" style={{ fontSize: '0.6rem' }}>Popular</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ background: 'linear-gradient(135deg,rgba(108,99,255,0.1),rgba(245,158,11,0.05))' }}>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 700 }}>✅ Campaign Summary</h3>
                        <p style={{ fontSize: '0.88rem', marginBottom: '0.325rem' }}>📌 Goal: <strong>{goal.charAt(0).toUpperCase() + goal.slice(1)}</strong></p>
                        <p style={{ fontSize: '0.88rem', marginBottom: '0.325rem' }}>⏱ Duration: <strong>{duration} days</strong></p>
                        <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>📊 Posts: <strong>{duration} post ideas</strong> + daily scheduling</p>
                        <button className="btn btn-primary w-full" onClick={handleGenerate} disabled={isGenerating} id="generate-campaign-btn">
                            {isGenerating ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Generating plan...</> : <><Zap size={16} /> Generate Full Campaign</>}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="campaign-list">
                    {campaigns.length === 0 ? (
                        <div className="empty-state"><Target size={48} /><h3>No Campaigns Yet</h3><p>Build your first campaign to get started.</p></div>
                    ) : (
                        campaigns.map(c => (
                            <div key={c.id} className="glass-card campaign-item" onClick={() => setActiveCampaign(activeCampaign?.id === c.id ? null : c)}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.name}</div>
                                        <div className="text-xs text-muted">{c.startDate} → {c.endDate}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-primary'}`}>{c.status}</span>
                                        <span className="badge badge-accent">{c.duration}d</span>
                                    </div>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${(c.posts.filter(p => p.completed).length / c.posts.length) * 100}%` }} />
                                </div>
                                <div className="text-xs text-muted" style={{ marginTop: '4px' }}>{c.posts.filter(p => p.completed).length}/{c.posts.length} posts completed</div>

                                {activeCampaign?.id === c.id && (
                                    <div className="posts-grid animate-fade-in">
                                        {c.posts.map((post, i) => (
                                            <div key={i} className={`post-item ${post.completed ? 'done' : ''}`}>
                                                <div className="post-day">Day {post.day}</div>
                                                <div className="post-platform-badge">{post.platform}</div>
                                                <div className="post-topic">{post.topic}</div>
                                                {post.completed && <CheckCircle2 size={14} color="var(--accent2)" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            <style jsx>{`
        .campaign-page, .builder-form { display:flex; flex-direction:column; gap:1.25rem; }
        .goal-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem; }
        @media(max-width:500px){.goal-grid{grid-template-columns:1fr;}}
        .goal-card {
          padding:1rem; border-radius:var(--radius-sm); border:2px solid var(--border);
          background:var(--surface); cursor:pointer; text-align:center;
          transition:all var(--transition); font-family:var(--font-main);
        }
        .goal-card.active { border-color:var(--primary); background:rgba(108,99,255,0.1); }
        .duration-row { display:flex; gap:0.75rem; }
        .duration-btn {
          flex:1; padding:0.875rem; border-radius:10px; border:2px solid var(--border);
          background:var(--surface); cursor:pointer; font-weight:700;
          display:flex; flex-direction:column; align-items:center; gap:4px;
          transition:all var(--transition); font-family:var(--font-main); font-size:0.9rem;
        }
        .duration-btn.active { border-color:var(--primary); background:rgba(108,99,255,0.1); color:var(--primary); }
        .campaign-list { display:flex; flex-direction:column; gap:1rem; }
        .campaign-item { cursor:pointer; }
        .posts-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0.5rem; margin-top:1rem; }
        @media(min-width:600px){.posts-grid{grid-template-columns:repeat(3,1fr);}}
        .post-item {
          padding:0.625rem; background:var(--bg3); border-radius:8px;
          display:flex; flex-direction:column; gap:3px;
        }
        .post-item.done { opacity:0.6; }
        .post-day { font-size:0.68rem; font-weight:700; color:var(--primary); }
        .post-platform-badge { font-size:0.65rem; color:var(--text3); }
        .post-topic { font-size:0.75rem; font-weight:600; color:var(--text); }
      `}</style>
        </div>
    );
}
