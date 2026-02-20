'use client';
import { useState } from 'react';
import { useAppStore } from '@/store';
import { generateMultiplePosts } from '@/lib/ai-engine';
import { buildShareUrls, copyToClipboard, openWhatsApp, buildLeadCaptureMessage } from '@/lib/whatsapp';
import { Sparkles, Copy, Share2, MessageCircle, RefreshCw, ChevronDown, TrendingUp, Zap } from 'lucide-react';
import { Language, Tone, Category } from '@/types';

const categories = ['Insurance', 'Real Estate', 'Finance', 'Health', 'Education', 'Business', 'Lifestyle', 'Motivation'];
const languages: Language[] = ['English', 'Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'];
const tones: Tone[] = ['Professional', 'Friendly', 'Aggressive', 'Motivational'];
const platforms = ['WhatsApp', 'Instagram', 'Facebook', 'Telegram', 'Threads', 'YouTube'];

const platformColors: Record<string, string> = {
    WhatsApp: '#25d366', Instagram: '#e1306c', Facebook: '#1877f2',
    Telegram: '#2ca5e0', Threads: '#000', YouTube: '#ff0000',
};

function ViralMeter({ score }: { score: number }) {
    const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
    const r = 40, circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    return (
        <div style={{ textAlign: 'center' }}>
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r={r} fill="none" stroke="var(--bg3)" strokeWidth="8" />
                <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                    style={{ transition: '1s cubic-bezier(0.4,0,0.2,1)' }} />
            </svg>
            <div style={{ marginTop: '-68px', fontSize: '1.4rem', fontWeight: 900, color, fontFamily: 'var(--font-display)' }}>{score}</div>
            <div style={{ marginTop: '38px', fontSize: '0.7rem', color: 'var(--text3)', fontWeight: 600 }}>VIRAL SCORE</div>
        </div>
    );
}

export default function ContentPage() {
    const { user, addPost, markShared, showToast, addScore } = useAppStore();
    const [category, setCategory] = useState('Insurance');
    const [language, setLanguage] = useState<Language>('English');
    const [tone, setTone] = useState<Tone>('Professional');
    const [isGenerating, setIsGenerating] = useState(false);
    const [posts, setPosts] = useState<ReturnType<typeof generateMultiplePosts>>([]);
    const [activePostIdx, setActivePostIdx] = useState(0);
    const [captionType, setCaptionType] = useState<'short' | 'long'>('short');

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const newPosts = generateMultiplePosts(category, tone, language, user?.uid || 'demo', 3);
            setPosts(newPosts);
            newPosts.forEach((p) => addPost(p));
            setActivePostIdx(0);
            setIsGenerating(false);
            addScore(50);
            showToast('3 posts generated! +50 points', 'success');
        }, 1200);
    };

    const activePost = posts[activePostIdx];

    const handleCopy = async (text: string) => {
        await copyToClipboard(text);
        showToast('Caption copied to clipboard!', 'success');
    };

    const handleShare = (platform: string) => {
        if (!activePost) return;
        const caption = captionType === 'short' ? activePost.shortCaption : activePost.longCaption;
        const urls = buildShareUrls(`${activePost.hook}\n\n${caption}\n\n${activePost.cta}`, activePost.hashtags);
        window.open(urls[platform] || urls['WhatsApp'], '_blank');
        markShared(activePost.id, platform);
        addScore(25);
        showToast(`Shared to ${platform}! +25 pts`, 'success');
    };

    const handleWhatsApp = () => {
        const msg = buildLeadCaptureMessage(category, 'Social Media', 'KRK Agency');
        openWhatsApp('919000000000', msg);
        showToast('WhatsApp opened!', 'info');
    };

    return (
        <div className="content-page animate-fade-in">
            {/* Controls */}
            <div className="glass-card controls-card">
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>⚡ AI Content Generator</h3>
                <div className="controls-grid">
                    <div className="input-group">
                        <label className="input-label">Category</label>
                        <select className="input" value={category} onChange={e => setCategory(e.target.value)} id="category-select">
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Language</label>
                        <select className="input" value={language} onChange={e => setLanguage(e.target.value as Language)} id="language-select">
                            {languages.map(l => <option key={l}>{l}</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Tone</label>
                        <select className="input" value={tone} onChange={e => setTone(e.target.value as Tone)} id="tone-select">
                            {tones.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                </div>
                <div className="tone-chips">
                    {tones.map(t => (
                        <button key={t} className={`chip ${tone === t ? 'active' : ''}`} onClick={() => setTone(t)}>{t}</button>
                    ))}
                </div>
                <button
                    className="btn btn-primary w-full" style={{ marginTop: '1rem' }}
                    onClick={handleGenerate} disabled={isGenerating} id="generate-btn"
                >
                    {isGenerating ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Generating...</> : <><Sparkles size={16} /> Generate 3 Posts</>}
                </button>
            </div>

            {/* Results */}
            {posts.length > 0 && (
                <div className="results-section animate-slide-up">
                    {/* Post Selector */}
                    <div className="tab-bar" style={{ marginBottom: '1rem' }}>
                        {posts.map((p, i) => (
                            <button key={i} className={`tab-item ${activePostIdx === i ? 'active' : ''}`} onClick={() => setActivePostIdx(i)} id={`post-tab-${i}`}>
                                Post {i + 1} · {p.viralScore}🔥
                            </button>
                        ))}
                    </div>

                    {activePost && (
                        <div className="post-card glass-card">
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <span className="badge badge-primary">{activePost.category}</span>{' '}
                                    <span className="badge badge-accent">{activePost.tone}</span>{' '}
                                    <span className="badge badge-success">{activePost.language}</span>
                                </div>
                                <ViralMeter score={activePost.viralScore} />
                            </div>

                            {/* Hook */}
                            <div className="content-section">
                                <div className="content-label">🎯 Hook Line</div>
                                <div className="content-text hook-text">{activePost.hook}</div>
                                <button className="btn btn-ghost btn-sm" onClick={() => handleCopy(activePost.hook)} id="copy-hook-btn">
                                    <Copy size={13} /> Copy Hook
                                </button>
                            </div>

                            {/* Caption toggle */}
                            <div className="tab-bar" style={{ marginBottom: '0.75rem' }}>
                                <button className={`tab-item ${captionType === 'short' ? 'active' : ''}`} onClick={() => setCaptionType('short')}>Short Caption</button>
                                <button className={`tab-item ${captionType === 'long' ? 'active' : ''}`} onClick={() => setCaptionType('long')}>Long Caption</button>
                            </div>
                            <div className="content-section">
                                <div className="content-text">{captionType === 'short' ? activePost.shortCaption : activePost.longCaption}</div>
                                <button className="btn btn-ghost btn-sm" onClick={() => handleCopy(captionType === 'short' ? activePost.shortCaption : activePost.longCaption)} id="copy-caption-btn">
                                    <Copy size={13} /> Copy Caption
                                </button>
                            </div>

                            {/* CTA */}
                            <div className="content-section">
                                <div className="content-label">📣 Call to Action</div>
                                <div className="content-text cta-text">{activePost.cta}</div>
                            </div>

                            {/* Hashtags */}
                            <div className="content-section">
                                <div className="content-label">🏷️ Hashtags</div>
                                <div className="hashtag-list">
                                    {activePost.hashtags.map(h => <span key={h} className="hashtag-chip">{h}</span>)}
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => handleCopy(activePost.hashtags.join(' '))} id="copy-hashtags-btn">
                                    <Copy size={13} /> Copy All Hashtags
                                </button>
                            </div>

                            {/* Viral Tips */}
                            <div className="viral-tips">
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <TrendingUp size={15} color="var(--primary)" /> Improve Your Score
                                </div>
                                {activePost.viralTips.map((tip, i) => (
                                    <div key={i} className="viral-tip">💡 {tip}</div>
                                ))}
                            </div>

                            {/* Share Buttons */}
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>🚀 One-Click Share</div>
                                <div className="platform-grid">
                                    {platforms.map(p => (
                                        <button key={p} className="platform-btn" style={{ '--pc': platformColors[p] } as any} onClick={() => handleShare(p)} id={`share-${p.toLowerCase()}`}>
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <button className="btn w-full" style={{ marginTop: '0.75rem', background: '#25d366', color: '#fff' }} onClick={handleWhatsApp} id="whatsapp-lead-btn">
                                    <MessageCircle size={16} /> Chat Now (Lead Capture)
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {posts.length === 0 && (
                <div className="empty-state">
                    <Sparkles size={48} />
                    <h3>Ready to Generate</h3>
                    <p>Select your category, language, and tone, then click Generate to create AI-powered posts.</p>
                </div>
            )}

            <style jsx>{`
        .content-page { display:flex; flex-direction:column; gap:1.25rem; }
        .controls-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem; }
        @media(max-width:600px){.controls-grid{grid-template-columns:1fr;}}
        .tone-chips { display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem; }
        .content-section { background:var(--bg3); border-radius:10px; padding:0.875rem; margin-bottom:0.75rem; }
        .content-label { font-size:0.75rem; font-weight:700; color:var(--text3); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.5rem; }
        .content-text { font-size:0.9rem; color:var(--text); line-height:1.7; white-space:pre-line; }
        .hook-text { font-weight:700; font-size:1rem; }
        .cta-text { color:var(--primary); font-weight:600; }
        .hashtag-list { display:flex; flex-wrap:wrap; gap:0.35rem; margin-top:0.25rem; }
        .hashtag-chip { font-size:0.75rem; color:var(--primary); background:rgba(108,99,255,0.1); padding:3px 8px; border-radius:100px; }
        .viral-tips { background:rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:0.875rem; margin-bottom:1rem; }
        .viral-tip { font-size:0.82rem; color:var(--text2); padding:3px 0; }
        .platform-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0.5rem; }
        .platform-btn {
          padding:0.5rem; border-radius:8px; font-size:0.78rem; font-weight:600;
          cursor:pointer; border:none; background:rgba(0,0,0,0.1);
          color:var(--pc); border:1px solid var(--pc);
          background:color-mix(in srgb,var(--pc) 12%, transparent);
          transition:all var(--transition);
        }
        .platform-btn:hover { background:var(--pc); color:#fff; }
      `}</style>
        </div>
    );
}
