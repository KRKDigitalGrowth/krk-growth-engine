// ===== GAMIFICATION =====
function renderGamification() {
    const a = STATE.analytics;
    const level = a.growthScore < 1000 ? 'Bronze' : a.growthScore < 3000 ? 'Silver' : a.growthScore < 6000 ? 'Gold' : 'Platinum';
    const levelEmoji = { Bronze: '🥉', Silver: '🥈', Gold: '🥇', Platinum: '💎' }[level];
    const badges = [
        { icon: '🔥', name: '7-Day Streak', desc: 'Posted 7 days in a row', earned: a.streak >= 7 },
        { icon: '🌟', name: 'Super Sharer', desc: '100+ total shares', earned: a.totalShares >= 100 },
        { icon: '🎯', name: 'Lead Hunter', desc: '10+ leads captured', earned: a.leadsGenerated >= 10 },
        { icon: '⚡', name: 'Viral Creator', desc: 'Score 80+ on viral predictor', earned: false },
        { icon: '🏆', name: 'Campaign Pro', desc: 'Complete a 30-day campaign', earned: false },
        { icon: '💬', name: 'WhatsApp King', desc: '50+ WhatsApp shares', earned: a.totalShares >= 50 },
        { icon: '💎', name: 'Platinum Level', desc: 'Reach 6000 growth score', earned: a.growthScore >= 6000 },
        { icon: '🎓', name: 'Insurance Expert', desc: 'Use Insurance Mode 20+ times', earned: false }
    ];
    return `
  <div class="streak-display">
    <div class="streak-number">🔥${a.streak}</div>
    <div class="streak-info">
      <div class="label">Day Posting Streak</div>
      <div class="title">${levelEmoji} ${level} Level</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">Growth Score: ${a.growthScore.toLocaleString()} pts</div>
    </div>
    <div style="margin-left:auto;text-align:right;">
      <div style="font-size:28px;font-weight:800;font-family:'Space Grotesk',sans-serif;">${levelEmoji}</div>
      <div style="font-size:12px;color:var(--text-secondary);">${level} Advisor</div>
    </div>
  </div>
  <div class="grid-2" style="margin-bottom:20px;">
    <div class="card">
      <div class="card-title" style="margin-bottom:14px;">📊 Performance Stats</div>
      ${[
            ['📤 Total Shares', a.totalShares, 500],
            ['🎯 Leads Captured', a.leadsGenerated, 100],
            ['🔥 Best Streak', a.streak, 30],
            ['⚡ Engagement', a.engagementScore, 100]
        ].map(([l, v, max]) => `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span>${l}</span><strong>${v}</strong></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, (v / max) * 100)}%"></div></div>
        </div>`).join('')}
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:14px;">🏅 Weekly Performance</div>
      <div style="text-align:center;padding:16px 0;">
        <div style="font-size:64px;font-weight:900;font-family:'Space Grotesk',sans-serif;background:linear-gradient(135deg,var(--accent),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${levelEmoji}</div>
        <div style="font-size:18px;font-weight:700;margin-top:8px;">${level} Advisor</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:4px;">Top ${level === 'Bronze' ? '50%' : level === 'Silver' ? '25%' : level === 'Gold' ? '10%' : '1%'} this week</div>
        <div class="badge badge-gold" style="margin-top:12px;">🌟 Keep Posting to Level Up!</div>
      </div>
    </div>
  </div>
  <div class="section-header"><div class="section-title">🏆 Achievement Badges</div><span class="badge badge-purple">${badges.filter(b => b.earned).length}/${badges.length} Earned</span></div>
  <div class="badge-grid">
    ${badges.map(b => `
      <div class="badge-card ${b.earned ? 'earned' : ''}">
        <div class="badge-icon-lg" style="opacity:${b.earned ? 1 : 0.3}">${b.icon}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
        ${b.earned ? '<div class="badge badge-gold" style="margin-top:6px;justify-content:center;">Earned ✓</div>' : ''}
      </div>`).join('')}
  </div>`;
}

// ===== INSURANCE EXPERT MODE =====
function renderInsurance() {
    const cats = [
        { id: 'policy_awareness', icon: '📋', name: 'Policy Awareness', count: 2 },
        { id: 'renewal_reminders', icon: '🔔', name: 'Renewal Reminders', count: 1 },
        { id: 'claim_assistance', icon: '📞', name: 'Claim Assistance', count: 1 },
        { id: 'family_protection', icon: '👨‍👩‍👧‍👦', name: 'Family Protection', count: 1 },
        { id: 'health_education', icon: '🏥', name: 'Health Education', count: 1 }
    ];
    return `
  <div class="ai-suggestion" style="margin-bottom:20px;">
    <div class="ai-tag">🛡️ Insurance Expert Mode</div>
    <strong>Pre-built templates for insurance advisors.</strong> Choose a category to access ready-to-share professional content.
  </div>
  <div class="grid-3" style="margin-bottom:24px;" id="insCatGrid">
    ${cats.map(c => `
      <div class="insurance-category ${STATE.selectedCategory === c.id ? 'active' : ''}" onclick="loadInsCategory('${c.id}')">
        <div class="ins-icon">${c.icon}</div>
        <div class="ins-name">${c.name}</div>
        <div class="ins-count">${c.count} templates</div>
      </div>`).join('')}
  </div>
  <div id="insTemplates">
    <div class="empty-state"><div class="empty-icon">🛡️</div><div class="empty-title">Select a Category</div><div class="empty-desc">Choose a category above to view professional insurance templates</div></div>
  </div>`;
}

function loadInsCategory(catId) {
    STATE.selectedCategory = catId;
    document.querySelectorAll('.insurance-category').forEach(el => el.classList.toggle('active', el.onclick.toString().includes(`'${catId}'`)));
    const templates = TEMPLATES.insurance_templates[catId] || [];
    document.getElementById('insTemplates').innerHTML = templates.length ? templates.map(t => `
    <div class="content-card" style="margin-bottom:16px;">
      <div class="content-card-header">
        <strong>${t.title}</strong><span class="badge badge-purple">Insurance</span>
      </div>
      <div class="content-text" style="white-space:pre-line;">${t.content}</div>
      <div class="content-actions">
        <button class="btn btn-primary btn-sm" onclick="openShareModal('${t.content.replace(/\n/g, '\\n').replace(/'/g, "\\'")}')">📤 Share</button>
        <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${t.content.replace(/\n/g, '\\n').replace(/'/g, "\\'")}');toast('Copied!','success')">📋 Copy</button>
        <button class="btn btn-ghost btn-sm" onclick="openWhatsApp('${t.content.replace(/\n/g, ' ').replace(/'/g, "\\'")}')">💬 WhatsApp Lead</button>
      </div>
    </div>`).join('') : '<div class="empty-state"><div class="empty-icon">🛡️</div><div class="empty-title">Coming Soon</div></div>';
}

// ===== ADMIN PANEL =====
function renderAdmin() {
    return `
  <div class="admin-grid">
    ${[
            ['📝', 'Add Template', 'Create new content template', () => toast('Template editor coming soon!', 'info')],
            ['📣', 'Push Notification', 'Send notification to all users', () => toast('Notification sent to all users!', 'success')],
            ['🏷️', 'Featured Categories', 'Manage featured content', () => toast('Categories updated!', 'success')],
            ['📊', 'User Analytics', 'View platform growth stats', () => toast('Loading analytics...', 'info')],
            ['🎨', 'Theme Settings', 'Customize platform appearance', () => toast('Theme settings opening...', 'info')],
            ['💾', 'Export Data', 'Download leads and analytics', () => exportData()]
        ].map(([ic, title, desc, fn]) => `
      <div class="admin-action-card" onclick="(${fn.toString()})()">
        <div class="admin-action-icon">${ic}</div>
        <div class="admin-action-title">${title}</div>
        <div class="admin-action-desc">${desc}</div>
      </div>`).join('')}
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-title" style="margin-bottom:14px;">📈 Platform Stats</div>
      ${[['👤 Total Users', '1,248'], ['📤 Total Shares Today', '89'], ['🎯 Leads Today', '12'], ['⚡ Avg Viral Score', '71']].map(([l, v]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
          <span style="font-size:13px;">${l}</span><strong>${v}</strong>
        </div>`).join('')}
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:14px;">🔔 Send Notification</div>
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="form-input" id="notifTitle" placeholder="e.g. New Insurance Templates Added!"/>
      </div>
      <div class="form-group">
        <label class="form-label">Message</label>
        <textarea class="form-textarea" id="notifBody" placeholder="Notification message..." style="min-height:80px;"></textarea>
      </div>
      <button class="btn btn-primary" style="width:100%;" onclick="sendNotif()">📣 Send to All Users</button>
    </div>
  </div>`;
}

function sendNotif() {
    const t = document.getElementById('notifTitle').value;
    const b = document.getElementById('notifBody').value;
    if (!t || !b) { toast('Please fill title and message', 'warning'); return; }
    toast(`Notification "${t}" sent to 1,248 users!`, 'success');
    if (Notification.permission === 'granted') {
        new Notification(t, { body: b, icon: 'icons/icon-192.png' });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => { if (p === 'granted') new Notification(t, { body: b }); });
    }
}

function exportData() {
    const rows = [['Name', 'Interest', 'Date', 'Source', 'Status'], ...STATE.leads.map(l => [l.name, l.interest, l.date, l.source, l.status])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'krk-leads.csv'; a.click();
    toast('Leads exported as CSV!', 'success');
}

// ===== ANALYTICS DASHBOARD (standalone page under admin) =====
function renderAnalytics() { return renderDashboard(); }

// ===== INIT PAGE LOGIC =====
function initPageLogic(page) { }

// ===== BOOTSTRAP =====
document.addEventListener('DOMContentLoaded', () => {
    navigate('dashboard');
    // Close sidebar on outside click (mobile)
    document.getElementById('main').addEventListener('click', closeSidebarOnMobile);
    // Close share modal on overlay click
    document.getElementById('shareModal').addEventListener('click', function (e) {
        if (e.target === this) closeModal('shareModal');
    });
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        setTimeout(() => Notification.requestPermission(), 3000);
    }
});
