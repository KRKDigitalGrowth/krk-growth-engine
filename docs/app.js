// ===== UTILITY & NAVIGATION =====
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstallPrompt = e; });

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => { });
}

function navigate(page) {
    STATE.currentPage = page;
    // Update sidebar
    document.querySelectorAll('.nav-item[data-page]').forEach(el => {
        el.classList.toggle('active', el.dataset.page === page);
    });
    // Update bottom nav
    document.querySelectorAll('.bottom-nav-item[data-page]').forEach(el => {
        el.classList.toggle('active', el.dataset.page === page);
    });
    const titles = {
        dashboard: 'Dashboard', content: 'AI Content Engine', campaign: 'Campaign Builder',
        calendar: 'Content Calendar', share: 'Multi-Share Hub', leads: 'Lead Capture',
        viral: 'Viral Predictor', gamification: 'My Progress', insurance: 'Insurance Expert Mode', admin: 'Admin Panel'
    };
    const subtitles = {
        dashboard: 'Welcome back, KRK User 👋', content: 'Generate AI-powered content instantly',
        campaign: 'Build smart marketing campaigns', calendar: 'Plan your monthly content strategy',
        share: 'Share to all platforms in one click', leads: 'Manage & track your leads',
        viral: 'Predict content virality before posting', gamification: 'Your growth journey & achievements',
        insurance: 'Specialized insurance content templates', admin: 'Manage templates & platform'
    };
    document.getElementById('topbarTitle').textContent = titles[page] || page;
    document.getElementById('topbarSubtitle').textContent = subtitles[page] || '';
    const container = document.getElementById('pageContainer');
    container.style.opacity = '0';
    container.style.transform = 'translateY(12px)';
    setTimeout(() => {
        container.innerHTML = renderPage(page);
        container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        initPageLogic(page);
    }, 150);
    closeSidebarOnMobile();
}

function renderPage(page) {
    switch (page) {
        case 'dashboard': return renderDashboard();
        case 'content': return renderContent();
        case 'campaign': return renderCampaign();
        case 'calendar': return renderCalendar();
        case 'share': return renderShare();
        case 'leads': return renderLeads();
        case 'viral': return renderViral();
        case 'gamification': return renderGamification();
        case 'insurance': return renderInsurance();
        case 'admin': return renderAdmin();
        default: return renderDashboard();
    }
}

function toast(msg, type = 'info') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: '💡', warning: '⚠️' };
    t.innerHTML = `<span>${icons[type] || '💡'}</span><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}

function toggleTheme() {
    const html = document.documentElement;
    STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', STATE.theme);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function closeSidebarOnMobile() {
    if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
}

function showInstallPrompt() {
    if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then(() => { deferredInstallPrompt = null; });
    } else {
        toast('Open in Chrome browser & tap "Add to Home Screen" to install the app!', 'info');
    }
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function copyCaption() {
    const cap = document.getElementById('shareModalCaption').textContent;
    navigator.clipboard.writeText(cap).then(() => toast('Caption copied!', 'success')).catch(() => {
        toast('Select & copy text manually', 'warning');
    });
}

function openShareModal(caption) {
    document.getElementById('shareModalCaption').textContent = caption;
    const waNum = '919000000000';
    const waMsg = encodeURIComponent(caption);
    const platforms = [
        { name: 'WhatsApp', icon: '💬', cls: 'whatsapp', url: `https://wa.me/?text=${waMsg}` },
        { name: 'Instagram', icon: '📸', cls: 'instagram', url: `https://www.instagram.com/` },
        { name: 'Facebook', icon: '👍', cls: 'facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${waMsg}` },
        { name: 'Telegram', icon: '✈️', cls: 'telegram', url: `https://t.me/share/url?text=${waMsg}` },
        { name: 'Threads', icon: '🧵', cls: 'threads', url: `https://www.threads.net/` },
        { name: 'YouTube', icon: '▶️', cls: 'youtube', url: `https://www.youtube.com/` }
    ];
    document.getElementById('shareModalGrid').innerHTML = platforms.map(p =>
        `<button class="share-btn ${p.cls}" onclick="shareToplatform('${p.url}','${p.name}')">
      <span class="share-icon">${p.icon}</span>${p.name}
    </button>`
    ).join('');
    openModal('shareModal');
}

function shareToplatform(url, name) {
    STATE.analytics.totalShares++;
    window.open(url, '_blank');
    toast(`Opening ${name}... Caption is copied!`, 'success');
    copyCaption();
}

// ===== DASHBOARD PAGE =====
function renderDashboard() {
    const a = STATE.analytics;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = Math.max(...a.weekly);
    return `
  <div class="ai-suggestion">
    <div class="ai-tag">🤖 AI Insight</div>
    <strong>Best time to post today: 7–9 PM</strong><br>
    <span style="font-size:13px;color:var(--text-secondary);">Your audience is most active on Friday evenings. Try a motivational insurance post in Telugu for max reach.</span>
  </div>
  <div class="stats-grid">
    <div class="stat-card purple">
      <div class="stat-icon">📤</div>
      <div class="stat-value">${a.totalShares}</div>
      <div class="stat-label">Total Shares</div>
      <div class="stat-change up">↑ 18% this week</div>
    </div>
    <div class="stat-card pink">
      <div class="stat-icon">🎯</div>
      <div class="stat-value">${a.leadsGenerated}</div>
      <div class="stat-label">Leads Generated</div>
      <div class="stat-change up">↑ 5 new today</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-icon">⚡</div>
      <div class="stat-value">${a.engagementScore}%</div>
      <div class="stat-label">Engagement Score</div>
      <div class="stat-change up">↑ 12% vs last week</div>
    </div>
    <div class="stat-card green">
      <div class="stat-icon">🏆</div>
      <div class="stat-value">${a.campaignSuccess}%</div>
      <div class="stat-label">Campaign Success</div>
      <div class="stat-change up">↑ 3% this month</div>
    </div>
  </div>
  <div class="grid-2" style="gap:20px;">
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">📊 Weekly Activity</div><div class="card-subtitle">Posts shared per day</div></div>
      </div>
      <div class="bar-chart" id="barChart">
        ${a.weekly.map((v, i) => `
          <div class="bar-col">
            <div class="bar" style="height:${(v / maxVal) * 100}%" title="${v} shares"></div>
            <div class="bar-label">${days[i]}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">📱 Top Platforms</div></div>
      <div class="platform-list">
        ${a.platforms.map(p => `
          <div class="platform-item">
            <div class="platform-icon">${p.icon}</div>
            <div class="platform-info"><div class="platform-name">${p.name}</div><div class="platform-metric">${p.shares} shares</div></div>
            <div class="platform-bar"><div class="progress-bar"><div class="progress-fill" style="width:${p.pct}%"></div></div></div>
          </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="grid-2" style="gap:20px;margin-top:20px;">
    <div class="card">
      <div class="card-header"><div class="card-title">🔥 Posting Streak</div></div>
      <div class="streak-display">
        <div class="streak-number">🔥${a.streak}</div>
        <div class="streak-info"><div class="label">Day Streak</div><div class="title">Consistency Pro!</div><div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">Keep it up – 3 more days to Gold badge</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">⚡ Quick Actions</div></div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary" onclick="navigate('content')">✨ Generate New Content</button>
        <button class="btn btn-ghost" onclick="navigate('campaign')">🚀 Start Campaign</button>
        <button class="btn btn-ghost" onclick="navigate('viral')">⚡ Check Viral Score</button>
      </div>
    </div>
  </div>`;
}

// ===== CONTENT ENGINE =====
function renderContent() {
    return `
  <div class="grid-2">
    <div>
      <div class="card" style="margin-bottom:20px;">
        <div class="card-title" style="margin-bottom:16px;">🌐 Language</div>
        <div class="lang-pills" id="langPills">
          ${['english', 'telugu', 'hindi', 'tamil', 'kannada', 'malayalam'].map(l => `
            <div class="lang-pill ${STATE.selectedLang === l ? 'active' : ''}" onclick="selectLang('${l}')">${l.charAt(0).toUpperCase() + l.slice(1)}</div>
          `).join('')}
        </div>
        <div class="card-title" style="margin-bottom:12px;margin-top:4px;">🎭 Tone</div>
        <div class="tone-grid" id="toneGrid">
          ${[['professional', '💼', 'Professional'], ['friendly', '😊', 'Friendly'], ['aggressive', '🔥', 'Aggressive Sales'], ['motivational', '💪', 'Motivational']].map(([t, ic, n]) => `
            <div class="tone-card ${STATE.selectedTone === t ? 'active' : ''}" onclick="selectTone('${t}')">
              <div class="tone-icon">${ic}</div>
              <div class="tone-name">${n}</div>
            </div>`).join('')}
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="categorySelect" onchange="STATE.selectedCategory=this.value">
            <option value="insurance">🛡️ Insurance</option>
            <option value="realestate">🏠 Real Estate</option>
            <option value="general">📱 General Business</option>
            <option value="motivational">💪 Motivational</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Trending Topic (Optional)</label>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${TEMPLATES.trending_topics.map(t => `<span class="badge ${t.hot ? 'badge-pink' : 'badge-blue'}" style="cursor:pointer;" onclick="addTrend('${t.tag}')">${t.emoji} ${t.tag}</span>`).join('')}
          </div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="generateContent()">✨ Generate AI Content</button>
      </div>
    </div>
    <div id="contentOutput">
      <div class="empty-state">
        <div class="empty-icon">✨</div>
        <div class="empty-title">Ready to Create</div>
        <div class="empty-desc">Select your settings and click Generate to create powerful marketing content</div>
      </div>
    </div>
  </div>`;
}

function selectLang(lang) {
    STATE.selectedLang = lang;
    document.querySelectorAll('.lang-pill').forEach(el => el.classList.toggle('active', el.textContent.toLowerCase() === lang));
}
function selectTone(tone) {
    STATE.selectedTone = tone;
    document.querySelectorAll('.tone-card').forEach(el => el.classList.toggle('active', el.onclick.toString().includes(`'${tone}'`)));
}
function addTrend(tag) { toast(`Trend "${tag}" added to context!`, 'success'); }

function generateContent() {
    const out = document.getElementById('contentOutput');
    out.innerHTML = `<div class="card" style="text-align:center;padding:40px;"><div class="animate-spin" style="font-size:32px;margin-bottom:12px;">⚙️</div><div>AI is crafting your content...</div></div>`;
    setTimeout(() => {
        const lang = STATE.selectedLang;
        const tone = STATE.selectedTone;
        const cat = STATE.selectedCategory;
        const hooks = TEMPLATES.hooks[tone];
        const hook = hooks[Math.floor(Math.random() * hooks.length)];
        const langObj = TEMPLATES.captions[lang] || TEMPLATES.captions['english'];
        const short = langObj.short[Math.floor(Math.random() * langObj.short.length)];
        const long = langObj.long ? langObj.long[Math.floor(Math.random() * langObj.long.length)] : short;
        const hashtags = TEMPLATES.hashtags[cat] || TEMPLATES.hashtags['general'];
        const cta = TEMPLATES.cta_variations[Math.floor(Math.random() * TEMPLATES.cta_variations.length)];
        const viralScore = Math.floor(62 + Math.random() * 30);
        STATE.generatedContent = { hook, short, long, hashtags, cta, viralScore };
        out.innerHTML = `
    <div class="viral-score-card" style="margin-bottom:16px;">
      <div class="viral-score-number">${viralScore}</div>
      <div class="viral-score-label">Viral Probability Score</div>
      <div class="badge ${viralScore > 75 ? 'badge-green' : 'badge-blue'}" style="margin-top:8px;">${viralScore > 75 ? '🔥 High Viral Potential' : '✅ Good Engagement'}</div>
    </div>
    <div class="tabs">
      <button class="tab active" onclick="switchTab('hook')">🪝 Hook</button>
      <button class="tab" onclick="switchTab('short')">⚡ Short</button>
      <button class="tab" onclick="switchTab('long')">📄 Long</button>
    </div>
    <div class="tab-panel active" id="tab-hook">
      <div class="content-card">
        <div class="content-text" style="font-size:16px;font-weight:600;color:var(--text-primary);">"${hook}"</div>
        <div class="content-actions">
          <button class="btn btn-primary btn-sm" onclick="openShareModal('${hook.replace(/'/g, "\\'")} \\n\\n${cta}')">📤 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${hook.replace(/'/g, "\\'")}'.then?navigator.clipboard.writeText('${hook.replace(/'/g, "\\'")}'):null);toast('Copied!','success')">📋 Copy</button>
        </div>
      </div>
    </div>
    <div class="tab-panel" id="tab-short">
      <div class="content-card">
        <div class="content-text">${short}</div>
        <div class="content-hashtags">${hashtags.split(' ').slice(0, 5).join(' ')}</div>
        <div class="content-actions">
          <button class="btn btn-primary btn-sm" onclick="openShareModal(document.getElementById('tab-short').querySelector('.content-text').textContent + ' ' + '${cta}')">📤 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('tab-short').querySelector('.content-text').textContent);toast('Copied!','success')">📋 Copy</button>
          <button class="btn btn-ghost btn-sm" onclick="openWhatsApp('${short.replace(/'/g, "\\'")} ${cta}')">💬 WhatsApp Lead</button>
        </div>
      </div>
    </div>
    <div class="tab-panel" id="tab-long">
      <div class="content-card">
        <div class="content-text">${long}</div>
        <div class="content-hashtags">${hashtags}</div>
        <div class="content-actions">
          <button class="btn btn-primary btn-sm" onclick="openShareModal(document.getElementById('tab-long').querySelector('.content-text').textContent)">📤 Share</button>
          <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('tab-long').querySelector('.content-text').textContent);toast('Copied!','success')">📋 Copy</button>
        </div>
      </div>
    </div>`;
        toast('Content generated!', 'success');
        STATE.analytics.totalShares++;
    }, 1500);
}

function switchTab(name) {
    document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', ['hook', 'short', 'long'][i] === name));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${name}`));
}

function openWhatsApp(msg) {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
    // Add lead
    STATE.leads.unshift({ name: 'New Lead', interest: STATE.selectedCategory, date: new Date().toISOString().split('T')[0], source: 'WhatsApp', status: 'Hot' });
    STATE.analytics.leadsGenerated++;
    toast('WhatsApp opened & lead tracked!', 'success');
}
