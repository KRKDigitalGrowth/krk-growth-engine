// ===== CAMPAIGN BUILDER =====
function renderCampaign() {
    return `
  <div class="grid-2">
    <div>
      <div class="campaign-step">
        <div style="margin-bottom:14px;font-weight:700;font-size:15px;"><span class="step-number">1</span>Campaign Goal</div>
        <div class="goal-grid">
          ${[['leads', '🎯', 'Lead Gen'], ['branding', '✨', 'Branding'], ['awareness', '📣', 'Awareness']].map(([g, ic, n]) => `
            <div class="goal-card ${STATE.campaignGoal === g ? 'active' : ''}" onclick="setCampaignGoal('${g}')">
              <div class="goal-icon">${ic}</div><div class="goal-name">${n}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="campaign-step">
        <div style="margin-bottom:14px;font-weight:700;font-size:15px;"><span class="step-number">2</span>Duration</div>
        <div class="duration-grid">
          ${[[7, '7 Days'], [14, '14 Days'], [30, '30 Days']].map(([d, n]) => `
            <div class="duration-card ${STATE.campaignDuration === d ? 'active' : ''}" onclick="setCampaignDur(${d})">
              <div class="duration-days">${d}</div><div class="duration-label">days</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="campaign-step">
        <div style="margin-bottom:14px;font-weight:700;font-size:15px;"><span class="step-number">3</span>Target Audience</div>
        <div class="form-group">
          <select class="form-select"><option>Insurance Prospects</option><option>Existing Clients</option><option>Cold Leads</option><option>General Public</option></select>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="generateCampaign()">🚀 Generate Campaign Plan</button>
      </div>
    </div>
    <div id="campaignOutput">
      <div class="empty-state"><div class="empty-icon">🚀</div><div class="empty-title">Campaign Ready</div><div class="empty-desc">Configure your goal and duration, then click Generate</div></div>
    </div>
  </div>`;
}

function setCampaignGoal(g) {
    STATE.campaignGoal = g;
    document.querySelectorAll('.goal-card').forEach(el => el.classList.toggle('active', el.onclick.toString().includes(`'${g}'`)));
}
function setCampaignDur(d) {
    STATE.campaignDuration = d;
    document.querySelectorAll('.duration-card').forEach(el => el.classList.toggle('active', el.onclick.toString().includes(`(${d})`)));
}

function generateCampaign() {
    const out = document.getElementById('campaignOutput');
    out.innerHTML = `<div class="card" style="text-align:center;padding:40px;"><div class="animate-spin" style="font-size:32px;">⚙️</div><div style="margin-top:12px;">Building your campaign plan...</div></div>`;
    setTimeout(() => {
        const d = STATE.campaignDuration;
        const g = STATE.campaignGoal;
        const templates = {
            leads: ['Policy Comparison Post', 'Client Success Story', 'FAQ on Insurance', 'WhatsApp Lead Magnet', 'Myth-busting Post', 'Free Consultation Offer', 'Testimonial Share'],
            branding: ['Brand Story Post', 'Meet the Advisor', 'Our Mission Post', 'Behind the Scenes', 'Client Journey Story', 'Value Proposition Post', 'Community Post'],
            awareness: ['Insurance Education Post', 'Did You Know? Stats', 'Festival Greeting + Tip', 'Industry News Share', 'Quick Insurance Tip', 'Infographic Style Post', 'Educational Thread']
        };
        const plan = templates[g];
        const days = Array.from({ length: d }, (_, i) => ({
            day: i + 1,
            topic: plan[i % plan.length],
            time: ['7:00 AM', '12:00 PM', '6:30 PM', '9:00 PM'][i % 4],
            platform: ['Instagram', 'WhatsApp', 'Facebook', 'Telegram'][i % 4]
        }));
        out.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">📋 ${d}-Day ${g.charAt(0).toUpperCase() + g.slice(1)} Campaign</div><div class="card-subtitle">AI-generated posting plan</div></div>
        <button class="btn btn-primary btn-sm" onclick="toast('Campaign saved!','success')">💾 Save</button>
      </div>
      <div style="max-height:380px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;">
        ${days.map(d => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">D${d.day}</div>
            <div style="flex:1;"><div style="font-size:13px;font-weight:600;">${d.topic}</div><div style="font-size:11px;color:var(--text-secondary);">📱 ${d.platform} · ⏰ ${d.time}</div></div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('content')">✨</button>
          </div>`).join('')}
      </div>
    </div>`;
        toast('Campaign plan generated!', 'success');
    }, 1500);
}

// ===== CONTENT CALENDAR =====
function renderCalendar() {
    const now = new Date();
    const year = now.getFullYear(), month = now.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let days = '';
    for (let i = 0; i < firstDay; i++) days += `<div class="cal-day other-month"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const key = `${year}-${month}-${d}`;
        const type = STATE.calendarPosts[key] || '';
        const isToday = d === now.getDate();
        days += `<div class="cal-day ${isToday ? 'today' : ''} ${type ? 'has-post' : ''} ${type}" onclick="calDayClick(${d},'${type}')"><span style="font-size:13px;">${d}</span></div>`;
    }
    return `
  <div class="card" style="margin-bottom:20px;">
    <div class="card-header">
      <div class="card-title">📅 ${monthNames[month]} ${year}</div>
      <div style="display:flex;gap:8px;">
        <span class="badge badge-blue">🔵 Scheduled</span>
        <span class="badge badge-green">🟢 Done</span>
        <span class="badge" style="background:rgba(255,71,71,0.1);color:var(--danger);">🔴 Missed</span>
      </div>
    </div>
    <div class="cal-header">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="cal-day-name">${d}</div>`).join('')}</div>
    <div class="calendar-grid">${days}</div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">📊 Month Summary</div>
      ${[['✅ Completed', Object.values(STATE.calendarPosts).filter(v => v === 'completed').length, 'badge-green'],
        ['📅 Scheduled', Object.values(STATE.calendarPosts).filter(v => v === 'scheduled').length, 'badge-blue'],
        ['❌ Missed', Object.values(STATE.calendarPosts).filter(v => v === 'missed').length, 'badge-pink']].map(([l, n, b]) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
          <span style="font-size:13px;">${l}</span><span class="badge ${b}">${n}</span>
        </div>`).join('')}
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">💡 Today's Suggested Post</div>
      <div class="ai-suggestion">
        <div class="ai-tag">🤖 AI Pick</div>
        <strong>Insurance Myth Buster</strong><br>
        <span style="font-size:12px;color:var(--text-secondary);">Best for Friday evening. Engage with a myth-vs-fact post on health insurance.</span>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="navigate('content')">✨ Create This Post</button>
    </div>
  </div>`;
}

function calDayClick(d, type) {
    const labels = { completed: '✅ Post completed on this day', scheduled: '📅 Post scheduled', missed: '❌ Missed post – create now!', '': 'No post planned – add one?' };
    toast(labels[type] || 'Click to plan a post', type === 'missed' ? 'warning' : 'info');
    if (type === '' || type === 'missed') setTimeout(() => navigate('content'), 1000);
}

// ===== MULTI SHARE HUB =====
function renderShare() {
    const sampleCaptions = [
        { title: 'Policy Awareness', text: '🛡️ Is your family protected? Get the RIGHT insurance coverage today. One medical emergency can cost lakhs. Call me for FREE advice!', cat: 'insurance' },
        { title: 'Lead Magnet', text: '🎯 LIMITED TIME: Free financial health check for the first 20 people! Upload your existing policy and I\'ll tell you if you\'re overpaying. DM now!', cat: 'leads' },
        { title: 'Motivational', text: '💪 Success is not just about earning more. It\'s about protecting what you\'ve built. Secure your legacy today. Call me!', cat: 'motivational' }
    ];
    return `
  <div class="ai-suggestion" style="margin-bottom:20px;">
    <div class="ai-tag">🤖 AI Recommendation</div>
    <strong>Best time to share today: 7–9 PM</strong> · WhatsApp & Instagram are most active now.
  </div>
  <div style="display:flex;flex-direction:column;gap:16px;">
    ${sampleCaptions.map((c, i) => `
    <div class="content-card">
      <div class="content-card-header">
        <div><strong>${c.title}</strong><div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${c.cat}</div></div>
        <span class="badge badge-purple">Ready</span>
      </div>
      <div class="content-text">${c.text}</div>
      <div class="share-grid">
        <button class="share-btn whatsapp" onclick="quickShare('whatsapp','${c.text.replace(/'/g, "\\'")}')"><span class="share-icon">💬</span>WhatsApp</button>
        <button class="share-btn instagram" onclick="quickShare('instagram','${c.text.replace(/'/g, "\\'")}')"><span class="share-icon">📸</span>Instagram</button>
        <button class="share-btn facebook" onclick="quickShare('facebook','${c.text.replace(/'/g, "\\'")}')"><span class="share-icon">👍</span>Facebook</button>
        <button class="share-btn telegram" onclick="quickShare('telegram','${c.text.replace(/'/g, "\\'")}')"><span class="share-icon">✈️</span>Telegram</button>
        <button class="share-btn threads" onclick="quickShare('threads','${c.text.replace(/'/g, "\\'")}')"><span class="share-icon">🧵</span>Threads</button>
        <button class="share-btn youtube" onclick="quickShare('youtube','${c.text.replace(/'/g, "\\'")}')"><span class="share-icon">▶️</span>YouTube</button>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px;">
        <button class="btn btn-primary btn-sm" onclick="openShareModal('${c.text.replace(/'/g, "\\'")}')">📤 Share All</button>
        <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${c.text.replace(/'/g, "\\'")}');toast('Copied!','success')">📋 Copy</button>
      </div>
    </div>`).join('')}
  </div>
  <div style="text-align:center;margin-top:20px;">
    <button class="btn btn-primary btn-lg" onclick="navigate('content')">✨ Generate More Content</button>
  </div>`;
}

function quickShare(platform, text) {
    const encoded = encodeURIComponent(text);
    const urls = {
        whatsapp: `https://wa.me/?text=${encoded}`,
        instagram: `https://www.instagram.com/`,
        facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encoded}`,
        telegram: `https://t.me/share/url?text=${encoded}`,
        threads: `https://www.threads.net/`,
        youtube: `https://www.youtube.com/`
    };
    navigator.clipboard.writeText(text).catch(() => { });
    window.open(urls[platform], '_blank');
    STATE.analytics.totalShares++;
    toast(`Caption copied & ${platform} opened!`, 'success');
}

// ===== LEADS =====
function renderLeads() {
    return `
  <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px;">
    <div class="stat-card purple"><div class="stat-icon">🎯</div><div class="stat-value">${STATE.leads.length}</div><div class="stat-label">Total Leads</div></div>
    <div class="stat-card pink"><div class="stat-icon">🔥</div><div class="stat-value">${STATE.leads.filter(l => l.status === 'Hot').length}</div><div class="stat-label">Hot Leads</div></div>
    <div class="stat-card blue"><div class="stat-icon">📅</div><div class="stat-value">${STATE.leads.filter(l => l.date === new Date().toISOString().split('T')[0]).length}</div><div class="stat-label">Today's Leads</div></div>
  </div>
  <div class="card">
    <div class="card-header">
      <div class="card-title">📋 Lead Database</div>
      <button class="btn btn-primary btn-sm" onclick="addTestLead()">+ Add Lead</button>
    </div>
    <div style="overflow-x:auto;">
      <table class="leads-table">
        <thead><tr><th>Name</th><th>Interest</th><th>Source</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
        <tbody id="leadsBody">
          ${STATE.leads.map(l => `
          <tr>
            <td><strong>${l.name}</strong></td>
            <td>${l.interest}</td>
            <td>${l.source}</td>
            <td>${l.date}</td>
            <td><span class="badge ${l.status === 'Hot' ? 'badge-pink' : l.status === 'Warm' ? 'badge-gold' : 'badge-blue'}">${l.status}</span></td>
            <td><button class="btn btn-ghost btn-sm" onclick="chatWithLead('${l.name.replace(/'/g, "\\'")}','${l.interest}')">💬 Chat</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function chatWithLead(name, interest) {
    const msg = encodeURIComponent(`Hi ${name}, I noticed you were interested in ${interest}. I'd love to help you find the best plan. Can we schedule a call?`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
    toast(`Opening WhatsApp chat for ${name}`, 'success');
}

function addTestLead() {
    const names = ['Arun Kumar', 'Divya S', 'Kiran Raj', 'Sunita Devi', 'Mohan Das'];
    const interests = ['Term Insurance', 'Health Plan', 'ULIP', 'Family Floater', 'Pension Plan'];
    const sources = ['WhatsApp', 'Instagram', 'Referral', 'Facebook'];
    const statuses = ['Hot', 'Warm', 'Cold'];
    STATE.leads.unshift({
        name: names[Math.floor(Math.random() * names.length)],
        interest: interests[Math.floor(Math.random() * interests.length)],
        date: new Date().toISOString().split('T')[0],
        source: sources[Math.floor(Math.random() * sources.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)]
    });
    STATE.analytics.leadsGenerated++;
    navigate('leads');
    toast('New lead added!', 'success');
}

// ===== VIRAL PREDICTOR =====
function renderViral() {
    return `
  <div class="grid-2">
    <div>
      <div class="card" style="margin-bottom:20px;">
        <div class="card-title" style="margin-bottom:14px;">⚡ Analyze Your Content</div>
        <div class="form-group">
          <label class="form-label">Paste Your Caption</label>
          <textarea class="form-textarea" id="viralText" placeholder="Paste your post caption here to analyze its viral potential..." style="min-height:120px;"></textarea>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="analyzeViral()">⚡ Analyze Viral Score</button>
      </div>
    </div>
    <div id="viralResult">
      <div class="empty-state"><div class="empty-icon">⚡</div><div class="empty-title">Viral Intelligence</div><div class="empty-desc">Paste your content and click Analyze to get your viral probability score and improvement tips</div></div>
    </div>
  </div>`;
}

function analyzeViral() {
    const text = document.getElementById('viralText').value.trim();
    if (!text) { toast('Please paste your caption first', 'warning'); return; }
    const out = document.getElementById('viralResult');
    out.innerHTML = `<div class="card" style="text-align:center;padding:40px;"><div class="animate-spin" style="font-size:32px;">⚡</div><div style="margin-top:12px;">Analyzing viral potential...</div></div>`;
    setTimeout(() => {
        const hasHook = text.length > 20;
        const hasCTA = /call|dm|contact|click|chat|whatsapp|message/i.test(text);
        const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(text);
        const hasUrgency = /now|today|limited|last|hurry|don't wait/i.test(text);
        const hasEmotion = /family|protect|dream|secure|future|love|trust/i.test(text);
        const score = Math.min(95, Math.floor(
            (hasHook ? 20 : 5) + (hasCTA ? 25 : 0) + (hasEmoji ? 15 : 0) + (hasUrgency ? 20 : 0) + (hasEmotion ? 15 : 0) + Math.floor(Math.random() * 10)
        ));
        const suggestions = [];
        if (!hasHook) suggestions.push({ icon: '🪝', text: 'Add a strong opening hook to grab attention immediately' });
        if (!hasCTA) suggestions.push({ icon: '📣', text: 'Include a clear Call-To-Action (Call, DM, Click) to drive engagement' });
        if (!hasEmoji) suggestions.push({ icon: '😊', text: 'Add relevant emojis to increase visual appeal and reach' });
        if (!hasUrgency) suggestions.push({ icon: '⏰', text: 'Add urgency words like "Today", "Limited", "Now" to boost action' });
        if (!hasEmotion) suggestions.push({ icon: '❤️', text: 'Include emotional triggers like "family", "protect", "secure" for deeper connection' });
        if (suggestions.length === 0) suggestions.push({ icon: '✅', text: 'Excellent! Your content has all key viral elements' });
        out.innerHTML = `
    <div class="viral-score-card">
      <div class="viral-score-number">${score}</div>
      <div class="viral-score-label">Viral Probability Score</div>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:10px;flex-wrap:wrap;">
        <span class="badge ${score > 75 ? 'badge-green' : score > 50 ? 'badge-blue' : 'badge-pink'}">${score > 75 ? '🔥 High Potential' : score > 50 ? '✅ Good' : '📈 Needs Work'}</span>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">💡 AI Improvement Suggestions</div>
      <ul class="suggestions-list">
        ${suggestions.map(s => `<li class="suggestion-item"><span class="suggestion-icon">${s.icon}</span><span style="font-size:13px;">${s.text}</span></li>`).join('')}
      </ul>
      <button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="navigate('content')">✨ Regenerate with AI</button>
    </div>`;
        toast(`Viral score: ${score}/100`, 'success');
    }, 1400);
}
