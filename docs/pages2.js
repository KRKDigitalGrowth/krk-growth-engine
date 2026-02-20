// ===== GLOBAL CAPTION STORE (safe - no text in onclick) =====
var SHARE_CAPTIONS = [
  { title: 'Policy Awareness', cat: 'insurance', text: 'Shield your family from financial disaster! One medical emergency can cost lakhs. Get the RIGHT insurance coverage today. FREE consultation available. Call me now!' },
  { title: 'Lead Magnet', cat: 'leads', text: 'FREE Financial Health Check - Limited to first 20 people only! I will review your existing policy and tell you if you are overpaying. DM me NOW before slots fill up!' },
  { title: 'Motivational', cat: 'motivational', text: 'Success is not just about earning more. It is about protecting what you have built. Your family, your legacy, your future - all deserve the best protection. Secure your legacy today. Call me!' }
];

// Read caption safely from the DOM element
function getCapText(idx) {
  var el = document.getElementById('shcap-' + idx);
  return el ? el.innerText : (SHARE_CAPTIONS[idx] ? SHARE_CAPTIONS[idx].text : '');
}

function sharePlatform(platform, idx) {
  var text = getCapText(idx);
  var encoded = encodeURIComponent(text);
  var urls = {
    whatsapp: 'https://wa.me/?text=' + encoded,
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/sharer/sharer.php?quote=' + encoded,
    telegram: 'https://t.me/share/url?text=' + encoded,
    threads: 'https://www.threads.net/',
    youtube: 'https://www.youtube.com/'
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () { });
  window.open(urls[platform], '_blank');
  STATE.analytics.totalShares++;
  toast('Caption copied & ' + platform + ' opened!', 'success');
}

function shareAllPlatforms(idx) {
  var text = getCapText(idx);
  // Show the share modal with caption
  document.getElementById('shareModalCaption').textContent = text;
  var waMsg = encodeURIComponent(text);
  var platforms = [
    { name: 'WhatsApp', icon: '💬', cls: 'whatsapp', url: 'https://wa.me/?text=' + waMsg },
    { name: 'Instagram', icon: '📸', cls: 'instagram', url: 'https://www.instagram.com/' },
    { name: 'Facebook', icon: '👍', cls: 'facebook', url: 'https://www.facebook.com/sharer/sharer.php?quote=' + waMsg },
    { name: 'Telegram', icon: '✈️', cls: 'telegram', url: 'https://t.me/share/url?text=' + waMsg },
    { name: 'Threads', icon: '🧵', cls: 'threads', url: 'https://www.threads.net/' },
    { name: 'YouTube', icon: '▶️', cls: 'youtube', url: 'https://www.youtube.com/' }
  ];
  document.getElementById('shareModalGrid').innerHTML = platforms.map(function (p) {
    return '<button class="share-btn ' + p.cls + '" onclick="shareFromModal(\'' + p.url.replace(/'/g, '&#39;') + '\',\'' + p.name + '\')">' +
      '<span class="share-icon">' + p.icon + '</span>' + p.name + '</button>';
  }).join('');
  openModal('shareModal');
}

function shareFromModal(url, name) {
  copyCaption();
  window.open(url, '_blank');
  STATE.analytics.totalShares++;
  toast('Opening ' + name + '! Caption copied.', 'success');
}

function copyCapIdx(idx) {
  var text = getCapText(idx);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function () { toast('Copied!', 'success'); }).catch(function () { toast('Select text manually', 'warning'); });
  } else {
    toast('Select & copy text manually', 'warning');
  }
}

// ===== MULTI SHARE HUB PAGE =====
function renderShare() {
  var cards = SHARE_CAPTIONS.map(function (c, i) {
    return '<div class="content-card">' +
      '<div class="content-card-header">' +
      '<div><strong>' + c.title + '</strong><div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">' + c.cat + '</div></div>' +
      '<span class="badge badge-purple">Ready</span>' +
      '</div>' +
      '<div class="content-text" id="shcap-' + i + '">' + c.text + '</div>' +
      '<div class="share-grid" style="margin-top:12px;">' +
      '<button class="share-btn whatsapp" onclick="sharePlatform(\'whatsapp\',' + i + ')"><span class="share-icon">💬</span>WhatsApp</button>' +
      '<button class="share-btn instagram" onclick="sharePlatform(\'instagram\',' + i + ')"><span class="share-icon">📸</span>Instagram</button>' +
      '<button class="share-btn facebook" onclick="sharePlatform(\'facebook\',' + i + ')"><span class="share-icon">👍</span>Facebook</button>' +
      '<button class="share-btn telegram" onclick="sharePlatform(\'telegram\',' + i + ')"><span class="share-icon">✈️</span>Telegram</button>' +
      '<button class="share-btn threads" onclick="sharePlatform(\'threads\',' + i + ')"><span class="share-icon">🧵</span>Threads</button>' +
      '<button class="share-btn youtube" onclick="sharePlatform(\'youtube\',' + i + ')"><span class="share-icon">▶️</span>YouTube</button>' +
      '</div>' +
      '<div style="margin-top:12px;display:flex;gap:8px;">' +
      '<button class="btn btn-primary btn-sm" onclick="shareAllPlatforms(' + i + ')">📤 Share All</button>' +
      '<button class="btn btn-ghost btn-sm" onclick="copyCapIdx(' + i + ')">📋 Copy</button>' +
      '</div>' +
      '</div>';
  }).join('');

  return '<div class="ai-suggestion" style="margin-bottom:20px;">' +
    '<div class="ai-tag">🤖 AI Recommendation</div>' +
    '<strong>Best time to share today: 7–9 PM</strong> · WhatsApp & Instagram are most active now.' +
    '</div>' +
    '<div style="display:flex;flex-direction:column;gap:16px;">' + cards + '</div>' +
    '<div style="text-align:center;margin-top:20px;">' +
    '<button class="btn btn-primary btn-lg" onclick="navigate(\'content\')">✨ Generate More Content</button>' +
    '</div>';
}

// ===== CAMPAIGN BUILDER =====
function renderCampaign() {
  var goalCards = [['leads', '🎯', 'Lead Gen'], ['branding', '✨', 'Branding'], ['awareness', '📣', 'Awareness']].map(function (arr) {
    var g = arr[0], ic = arr[1], n = arr[2];
    return '<div class="goal-card ' + (STATE.campaignGoal === g ? 'active' : '') + '" onclick="setCampaignGoal(\'' + g + '\')">' +
      '<div class="goal-icon">' + ic + '</div><div class="goal-name">' + n + '</div></div>';
  }).join('');

  var durCards = [[7, '7 Days'], [14, '14 Days'], [30, '30 Days']].map(function (arr) {
    var d = arr[0];
    return '<div class="duration-card ' + (STATE.campaignDuration === d ? 'active' : '') + '" onclick="setCampaignDur(' + d + ')">' +
      '<div class="duration-days">' + d + '</div><div class="duration-label">days</div></div>';
  }).join('');

  return '<div class="grid-2">' +
    '<div>' +
    '<div class="campaign-step">' +
    '<div style="margin-bottom:14px;font-weight:700;font-size:15px;"><span class="step-number">1</span>Campaign Goal</div>' +
    '<div class="goal-grid">' + goalCards + '</div>' +
    '</div>' +
    '<div class="campaign-step">' +
    '<div style="margin-bottom:14px;font-weight:700;font-size:15px;"><span class="step-number">2</span>Duration</div>' +
    '<div class="duration-grid">' + durCards + '</div>' +
    '</div>' +
    '<div class="campaign-step">' +
    '<div style="margin-bottom:14px;font-weight:700;font-size:15px;"><span class="step-number">3</span>Target Audience</div>' +
    '<div class="form-group"><select class="form-select"><option>Insurance Prospects</option><option>Existing Clients</option><option>Cold Leads</option><option>General Public</option></select></div>' +
    '<button class="btn btn-primary" style="width:100%;" onclick="generateCampaign()">🚀 Generate Campaign Plan</button>' +
    '</div>' +
    '</div>' +
    '<div id="campaignOutput"><div class="empty-state"><div class="empty-icon">🚀</div><div class="empty-title">Campaign Ready</div><div class="empty-desc">Configure your goal and duration, then click Generate</div></div></div>' +
    '</div>';
}

function setCampaignGoal(g) {
  STATE.campaignGoal = g;
  document.querySelectorAll('.goal-card').forEach(function (el) {
    el.classList.toggle('active', el.getAttribute('onclick').indexOf("'" + g + "'") !== -1);
  });
}
function setCampaignDur(d) {
  STATE.campaignDuration = d;
  document.querySelectorAll('.duration-card').forEach(function (el) {
    el.classList.toggle('active', el.getAttribute('onclick').indexOf('(' + d + ')') !== -1);
  });
}

function generateCampaign() {
  var out = document.getElementById('campaignOutput');
  out.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div class="animate-spin" style="font-size:32px;">⚙️</div><div style="margin-top:12px;">Building your campaign plan...</div></div>';
  setTimeout(function () {
    var d = STATE.campaignDuration, g = STATE.campaignGoal;
    var tpl = {
      leads: ['Policy Comparison Post', 'Client Success Story', 'FAQ on Insurance', 'WhatsApp Lead Magnet', 'Myth-busting Post', 'Free Consultation Offer', 'Testimonial Share'],
      branding: ['Brand Story Post', 'Meet the Advisor', 'Our Mission Post', 'Behind the Scenes', 'Client Journey Story', 'Value Proposition Post', 'Community Post'],
      awareness: ['Insurance Education Post', 'Did You Know? Stats', 'Festival Greeting + Tip', 'Industry News Share', 'Quick Insurance Tip', 'Infographic Style Post', 'Educational Thread']
    };
    var plan = tpl[g];
    var platforms = ['Instagram', 'WhatsApp', 'Facebook', 'Telegram'];
    var times = ['7:00 AM', '12:00 PM', '6:30 PM', '9:00 PM'];
    var rows = '';
    for (var i = 0; i < d; i++) {
      rows += '<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);">' +
        '<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">D' + (i + 1) + '</div>' +
        '<div style="flex:1;"><div style="font-size:13px;font-weight:600;">' + plan[i % plan.length] + '</div><div style="font-size:11px;color:var(--text-secondary);">📱 ' + platforms[i % 4] + ' · ⏰ ' + times[i % 4] + '</div></div>' +
        '<button class="btn btn-ghost btn-sm" onclick="navigate(\'content\')">✨</button>' +
        '</div>';
    }
    out.innerHTML = '<div class="card"><div class="card-header"><div><div class="card-title">📋 ' + d + '-Day ' + g.charAt(0).toUpperCase() + g.slice(1) + ' Campaign</div><div class="card-subtitle">AI-generated posting plan</div></div><button class="btn btn-primary btn-sm" onclick="toast(\'Campaign saved!\',\'success\')">💾 Save</button></div><div style="max-height:380px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;">' + rows + '</div></div>';
    toast('Campaign plan generated!', 'success');
  }, 1500);
}

// ===== CONTENT CALENDAR =====
function renderCalendar() {
  var now = new Date();
  var year = now.getFullYear(), month = now.getMonth();
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var days = '';
  for (var i = 0; i < firstDay; i++) days += '<div class="cal-day other-month"></div>';
  for (var d = 1; d <= daysInMonth; d++) {
    var key = year + '-' + month + '-' + d;
    var type = STATE.calendarPosts[key] || '';
    var isToday = d === now.getDate();
    days += '<div class="cal-day' + (isToday ? ' today' : '') + (type ? ' has-post ' + type : '') + '" onclick="calDayClick(' + d + ',\'' + type + '\')"><span style="font-size:13px;">' + d + '</span></div>';
  }
  var completed = Object.values(STATE.calendarPosts).filter(function (v) { return v === 'completed'; }).length;
  var scheduled = Object.values(STATE.calendarPosts).filter(function (v) { return v === 'scheduled'; }).length;
  var missed = Object.values(STATE.calendarPosts).filter(function (v) { return v === 'missed'; }).length;
  return '<div class="card" style="margin-bottom:20px;"><div class="card-header"><div class="card-title">📅 ' + months[month] + ' ' + year + '</div><div style="display:flex;gap:8px;"><span class="badge badge-blue">🔵 Scheduled</span><span class="badge badge-green">🟢 Done</span><span class="badge" style="background:rgba(255,71,71,0.1);color:var(--danger);">🔴 Missed</span></div></div><div class="cal-header">' + ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(function (n) { return '<div class="cal-day-name">' + n + '</div>'; }).join('') + '</div><div class="calendar-grid">' + days + '</div></div>' +
    '<div class="grid-2"><div class="card"><div class="card-title" style="margin-bottom:12px;">📊 Month Summary</div>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);"><span style="font-size:13px;">✅ Completed</span><span class="badge badge-green">' + completed + '</span></div>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);"><span style="font-size:13px;">📅 Scheduled</span><span class="badge badge-blue">' + scheduled + '</span></div>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;"><span style="font-size:13px;">❌ Missed</span><span class="badge badge-pink">' + missed + '</span></div>' +
    '</div><div class="card"><div class="card-title" style="margin-bottom:12px;">💡 Today\'s Suggested Post</div><div class="ai-suggestion"><div class="ai-tag">🤖 AI Pick</div><strong>Insurance Myth Buster</strong><br><span style="font-size:12px;color:var(--text-secondary);">Best for evening. Engage with a myth-vs-fact post on health insurance.</span></div><button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="navigate(\'content\')">✨ Create This Post</button></div></div>';
}

function calDayClick(d, type) {
  var labels = { completed: '✅ Post completed on this day', scheduled: '📅 Post scheduled', missed: '❌ Missed post – create now!', '': 'No post planned – add one?' };
  toast(labels[type] || 'Click to plan a post', type === 'missed' ? 'warning' : 'info');
  if (type === '' || type === 'missed') setTimeout(function () { navigate('content'); }, 1000);
}

// ===== LEADS =====
function renderLeads() {
  var rows = STATE.leads.map(function (l) {
    var statusClass = l.status === 'Hot' ? 'badge-pink' : l.status === 'Warm' ? 'badge-gold' : 'badge-blue';
    return '<tr><td><strong>' + l.name + '</strong></td><td>' + l.interest + '</td><td>' + l.source + '</td><td>' + l.date + '</td>' +
      '<td><span class="badge ' + statusClass + '">' + l.status + '</span></td>' +
      '<td><button class="btn btn-ghost btn-sm" onclick="chatWithLead(' + STATE.leads.indexOf(l) + ')">💬 Chat</button></td></tr>';
  }).join('');
  return '<div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px;">' +
    '<div class="stat-card purple"><div class="stat-icon">🎯</div><div class="stat-value">' + STATE.leads.length + '</div><div class="stat-label">Total Leads</div></div>' +
    '<div class="stat-card pink"><div class="stat-icon">🔥</div><div class="stat-value">' + STATE.leads.filter(function (l) { return l.status === 'Hot'; }).length + '</div><div class="stat-label">Hot Leads</div></div>' +
    '<div class="stat-card blue"><div class="stat-icon">📅</div><div class="stat-value">' + STATE.leads.filter(function (l) { return l.date === new Date().toISOString().split('T')[0]; }).length + '</div><div class="stat-label">Today\'s Leads</div></div>' +
    '</div>' +
    '<div class="card"><div class="card-header"><div class="card-title">📋 Lead Database</div><button class="btn btn-primary btn-sm" onclick="addTestLead()">+ Add Lead</button></div>' +
    '<div style="overflow-x:auto;"><table class="leads-table"><thead><tr><th>Name</th><th>Interest</th><th>Source</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
}

function chatWithLead(idx) {
  var l = STATE.leads[idx];
  if (!l) return;
  var msg = encodeURIComponent('Hi ' + l.name + ', I noticed you were interested in ' + l.interest + '. I would love to help you find the best plan. Can we schedule a call?');
  window.open('https://wa.me/?text=' + msg, '_blank');
  toast('Opening WhatsApp chat for ' + l.name, 'success');
}

function addTestLead() {
  var names = ['Arun Kumar', 'Divya S', 'Kiran Raj', 'Sunita Devi', 'Mohan Das'];
  var interests = ['Term Insurance', 'Health Plan', 'ULIP', 'Family Floater', 'Pension Plan'];
  var sources = ['WhatsApp', 'Instagram', 'Referral', 'Facebook'];
  var statuses = ['Hot', 'Warm', 'Cold'];
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
  return '<div class="grid-2">' +
    '<div><div class="card" style="margin-bottom:20px;">' +
    '<div class="card-title" style="margin-bottom:14px;">⚡ Analyze Your Content</div>' +
    '<div class="form-group"><label class="form-label">Paste Your Caption</label>' +
    '<textarea class="form-textarea" id="viralText" placeholder="Paste your post caption here to analyze its viral potential..." style="min-height:120px;"></textarea></div>' +
    '<button class="btn btn-primary" style="width:100%;" onclick="analyzeViral()">⚡ Analyze Viral Score</button>' +
    '</div></div>' +
    '<div id="viralResult"><div class="empty-state"><div class="empty-icon">⚡</div><div class="empty-title">Viral Intelligence</div><div class="empty-desc">Paste your content and click Analyze to get your viral probability score and improvement tips</div></div></div>' +
    '</div>';
}

function analyzeViral() {
  var text = document.getElementById('viralText').value.trim();
  if (!text) { toast('Please paste your caption first', 'warning'); return; }
  var out = document.getElementById('viralResult');
  out.innerHTML = '<div class="card" style="text-align:center;padding:40px;"><div class="animate-spin" style="font-size:32px;">⚡</div><div style="margin-top:12px;">Analyzing viral potential...</div></div>';
  setTimeout(function () {
    var hasHook = text.length > 20;
    var hasCTA = /call|dm|contact|click|chat|whatsapp|message/i.test(text);
    var hasEmoji = text.length !== text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').length;
    var hasUrgency = /now|today|limited|last|hurry/i.test(text);
    var hasEmotion = /family|protect|dream|secure|future|love|trust/i.test(text);
    var score = Math.min(95, Math.floor((hasHook ? 20 : 5) + (hasCTA ? 25 : 0) + (hasEmoji ? 15 : 0) + (hasUrgency ? 20 : 0) + (hasEmotion ? 15 : 0) + Math.floor(Math.random() * 10)));
    var suggestions = [];
    if (!hasHook) suggestions.push({ icon: '🪝', text: 'Add a strong opening hook to grab attention immediately' });
    if (!hasCTA) suggestions.push({ icon: '📣', text: 'Include a clear Call-To-Action (Call, DM, Click) to drive engagement' });
    if (!hasEmoji) suggestions.push({ icon: '😊', text: 'Add relevant emojis to increase visual appeal and reach' });
    if (!hasUrgency) suggestions.push({ icon: '⏰', text: 'Add urgency words like Today, Limited, Now to boost action' });
    if (!hasEmotion) suggestions.push({ icon: '❤️', text: 'Include emotional triggers like family, protect, secure for deeper connection' });
    if (suggestions.length === 0) suggestions.push({ icon: '✅', text: 'Excellent! Your content has all key viral elements' });
    var scoreClass = score > 75 ? 'badge-green' : score > 50 ? 'badge-blue' : 'badge-pink';
    var scoreLabel = score > 75 ? '🔥 High Potential' : score > 50 ? '✅ Good' : '📈 Needs Work';
    var suggHtml = suggestions.map(function (s) { return '<li class="suggestion-item"><span class="suggestion-icon">' + s.icon + '</span><span style="font-size:13px;">' + s.text + '</span></li>'; }).join('');
    out.innerHTML = '<div class="viral-score-card"><div class="viral-score-number">' + score + '</div><div class="viral-score-label">Viral Probability Score</div><div style="display:flex;gap:8px;justify-content:center;margin-top:10px;"><span class="badge ' + scoreClass + '">' + scoreLabel + '</span></div></div>' +
      '<div class="card"><div class="card-title" style="margin-bottom:12px;">💡 AI Improvement Suggestions</div><ul class="suggestions-list">' + suggHtml + '</ul><button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="navigate(\'content\')">✨ Regenerate with AI</button></div>';
    toast('Viral score: ' + score + '/100', 'success');
  }, 1400);
}
