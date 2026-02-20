// ===== DATA LAYER =====
const TEMPLATES = {
    hooks: {
        professional: [
            "Transform your financial future with one smart decision.",
            "Your family deserves the best protection. Here's how.",
            "Stop losing money. Start building wealth today.",
            "The top 1% know this secret about insurance.",
            "What your bank won't tell you about savings."
        ],
        friendly: [
            "Hey! Quick tip that changed my clients' lives 👇",
            "Real talk – are you truly covered? Let's check!",
            "I help families sleep better at night. Here's how 🌙",
            "Asked my client how they felt after getting insured... 😊",
            "Your neighbor just saved ₹15,000 on premiums. Want to know how?"
        ],
        aggressive: [
            "STOP wasting money on wrong policies! ❌",
            "Last chance: Premiums go UP next month. Act NOW.",
            "Your family is ONE accident away from financial ruin.",
            "WARNING: 80% of people are UNDER-insured!",
            "Don't wait for disaster to realize you needed this."
        ],
        motivational: [
            "Every great journey starts with protecting what matters most 🌟",
            "Your dreams deserve protection. Your family deserves security.",
            "Success is not just earning more. It's protecting more. 💪",
            "Champions plan for tomorrow while acting today. 🏆",
            "Rise. Protect. Thrive. Your legacy starts now."
        ]
    },
    captions: {
        english: {
            short: [
                "Secure your future today. One plan. Complete peace of mind. Call me now!",
                "Life is uncertain. Your financial plan shouldn't be. Let's talk!",
                "Best investment? Protecting what you love. Connect with me today.",
                "Don't leave your family's security to chance. I'm here to help.",
                "Smart people insure first. Wise people call me first. 📞"
            ],
            long: [
                "Are you truly prepared for life's uncertainties? Many families face financial crises not because they didn't work hard, but because they weren't protected. I help insurance advisors, families, and businesses build bulletproof financial plans that cover every stage of life. From health to life, term to investment – I provide complete guidance. DM me today for a FREE consultation and take the first step toward real financial freedom.",
                "📊 Did you know? 76% of Indians have NO life insurance. Even fewer have adequate health coverage. In today's world, one medical emergency can wipe out years of savings. That's where I come in. As a certified insurance advisor, I help you find the RIGHT plan at the BEST price. No jargon. No hidden charges. Just honest advice and complete protection for your family. Let's connect today!",
            ]
        },
        telugu: {
            short: [
                "మీ భవిష్యత్తును సురక్షితం చేసుకోండి. నేడే మాట్లాడండి! 🙏",
                "కుటుంబ సంరక్షణ మీ మొదటి బాధ్యత. బీమా తీసుకోండి.",
                "జీవితం అనిశ్చితం. మీ ప్లాన్ నిశ్చితంగా ఉండాలి. 📞"
            ],
            long: [
                "మీ కుటుంబం సురక్షితంగా ఉంటే మీరు నిద్రపోగలరు. నేను సహాయం చేస్తాను – సరైన ఇన్సూరెన్స్ ప్లాన్ ఎంచుకోవడంలో. హెల్త్ ఇన్సూరెన్స్ నుండి లైఫ్ ఇన్సూరెన్స్ వరకు, నేను మీకు అత్యుత్తమ వ్యక్తిగతీకరించిన పరిష్కారాలను అందిస్తాను. ఇప్పుడే సంప్రదించండి!"
            ]
        },
        hindi: {
            short: [
                "अपने परिवार को सुरक्षित करें। आज ही संपर्क करें! 🙏",
                "बीमा लेना नहीं, सही बीमा लेना ज़रूरी है। मैं मदद करूंगा।",
                "ज़िंदगी अनिश्चित है, आपकी योजना नहीं होनी चाहिए। 📞"
            ],
            long: [
                "क्या आपका परिवार सच में सुरक्षित है? आज 80% भारतीय परिवार बिना पर्याप्त बीमा के हैं। एक मेडिकल इमरजेंसी पूरी ज़िंदगी की बचत खा सकती है। मैं आपको सही प्लान दिलाता हूं – बिना जटिल भाषा के, बिना छुपे हुए चार्ज के। आज ही मुझसे बात करें और अपने परिवार का भविष्य सुरक्षित करें!"
            ]
        },
        tamil: {
            short: [
                "உங்கள் குடும்பத்தை பாதுகாக்கவும். இன்றே தொடர்புகொள்ளவும்! 🙏",
                "சரியான காப்பீடு = குடும்ப பாதுகாப்பு. என்னிடம் பேசுங்கள்.",
                "உங்கள் எதிர்காலம் உங்கள் தேர்வால் தீர்மானிக்கப்படுகிறது. 📞"
            ],
            long: [
                "உங்கள் குடும்பம் பாதுகாப்பாக இருக்கும்போது நீங்கள் அமைதியாக தூங்கலாம். சரியான காப்பீட்டு திட்டம் தேர்ந்தெடுக்க நான் உதவுகிறேன். ஆரோக்கிய காப்பீடு முதல் வாழ்க்கை காப்பீடு வரை, தனிப்பயனாக்கப்பட்ட தீர்வுகளை வழங்குகிறேன். இப்போதே தொடர்பு கொள்ளுங்கள்!"
            ]
        },
        kannada: {
            short: [
                "ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ರಕ್ಷಿಸಿ. ಇಂದೇ ಸಂಪರ್ಕಿಸಿ! 🙏",
                "ಸರಿಯಾದ ವಿಮೆ = ನೆಮ್ಮದಿಯ ಜೀವನ. 📞",
                "ನಿಮ್ಮ ಭವಿಷ್ಯ ಸುರಕ್ಷಿತವಾಗಿರಲಿ. ಮಾತನಾಡಿ."
            ],
            long: [
                "ನಿಮ್ಮ ಕುಟುಂಬ ಸುರಕ್ಷಿತವಾಗಿದ್ದಾಗ ನೀವು ಶಾಂತಿಯಿಂದ ನಿದ್ರಿಸಬಹುದು. ಸರಿಯಾದ ವಿಮಾ ಯೋಜನೆ ಆಯ್ಕೆ ಮಾಡಿಕೊಳ್ಳಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಆರೋಗ್ಯ ವಿಮೆಯಿಂದ ಜೀವ ವಿಮೆಯವರೆಗೆ, ನಿಮಗೆ ಅನುಕೂಲವಾದ ಪರಿಹಾರಗಳನ್ನು ನೀಡುತ್ತೇನೆ. ಇಂದೇ ಸಂಪರ್ಕಿಸಿ!"
            ]
        },
        malayalam: {
            short: [
                "നിങ്ങളുടെ കുടുംബത്തെ സംരക്ഷിക്കൂ. ഇന്നു തന്നെ ബന്ധപ്പെടൂ! 🙏",
                "ശരിയായ ഇൻഷുറൻസ് = കുടുംബ സുരക്ഷ. 📞",
                "ഭാവി ഉറപ്പാക്കൂ. ഇന്നു തന്നെ തുടങ്ങൂ."
            ],
            long: [
                "നിങ്ങളുടെ കുടുംബം സുരക്ഷിതമായിരിക്കുമ്പോൾ നിങ്ങൾക്ക് സമാധാനത്തോടെ ഉറങ്ങാൻ കഴിയും. ശരിയായ ഇൻഷുറൻസ് പ്ലാൻ തിരഞ്ഞെടുക്കാൻ ഞാൻ സഹായിക്കുന്നു. ആരോഗ്യ ഇൻഷുറൻസ് മുതൽ ജീവൻ ഇൻഷുറൻസ് വരെ, വ്യക്തിഗതമായ പരിഹാരങ്ങൾ നൽകുന്നു. ഇന്നു തന്നെ ബന്ധപ്പെടൂ!"
            ]
        }
    },
    hashtags: {
        insurance: "#InsuranceAdvisor #LifeInsurance #HealthInsurance #FinancialPlanning #FamilyProtection #TermInsurance #KRKGrowth #SecureYourFuture #IndianInsurance #WealthProtection",
        realestate: "#RealEstate #PropertyInvestment #HomeLoan #DreamHome #RealEstateIndia #PropertyAdvisor #KRKGrowth #InvestSmart",
        general: "#DigitalMarketing #BusinessGrowth #LeadGeneration #MarketingTips #KRKGrowth #SocialMediaMarketing #SmallBusiness #Entrepreneur",
        motivational: "#Motivation #Success #Mindset #GrowthMindset #Leadership #KRKGrowth #Hustle #Entrepreneur #DreamBig"
    },
    insurance_templates: {
        policy_awareness: [
            { title: "Term Insurance Explainer", content: "🛡️ TERM INSURANCE – The most affordable protection for your family!\n\n✅ High coverage at low premium\n✅ Tax benefits under 80C\n✅ Payout in case of unfortunate event\n\nA ₹1 Crore policy can cost as low as ₹500/month!\n\nCall me today for a FREE comparison:", cta: "Get Free Quote" },
            { title: "Health Insurance Must-Have", content: "🏥 WHY HEALTH INSURANCE IS NON-NEGOTIABLE IN 2024\n\n❌ Average hospitalization cost: ₹1.5 Lakhs\n❌ Cancer treatment: ₹5-20 Lakhs\n❌ Heart surgery: ₹3-8 Lakhs\n\n✅ WITH HEALTH INSURANCE: ₹0 out of pocket!\n\nDon't let medical bills drain your savings. Contact me:", cta: "Compare Plans Free" }
        ],
        renewal_reminders: [
            { title: "Policy Renewal Alert", content: "⚠️ POLICY RENEWAL REMINDER\n\nIs your insurance due for renewal?\n\n🔴 Lapsed policies = NO COVERAGE\n🔴 Missing renewal = Starting fresh\n🔴 New health conditions may affect future applications\n\n✅ Renew before expiry for continuous protection!\n\nI'll help you review and renew – Call me:", cta: "Renew Now" }
        ],
        claim_assistance: [
            { title: "Claim Help Available", content: "📋 CLAIM ASSISTANCE – I'm here for you!\n\nFiling an insurance claim can feel overwhelming. That's why I'm here:\n\n✅ Step-by-step claim guidance\n✅ Document checklist support\n✅ Follow-up with insurer on your behalf\n✅ Zero fee claim assistance\n\n24/7 support for my clients. That's my promise. Call me:", cta: "Get Claim Help" }
        ],
        family_protection: [
            { title: "Family Protection Plan", content: "👨‍👩‍👧‍👦 COMPLETE FAMILY PROTECTION PLAN\n\nOne plan that covers your ENTIRE family:\n\n🏥 Health coverage for all members\n💰 Life insurance for earning members\n🎓 Child education protection\n👴 Senior citizen coverage\n\nStarting at just ₹2,500/month for a family of 4!\n\nConnect with me for a personalized plan:", cta: "Plan My Family" }
        ],
        health_education: [
            { title: "Health Insurance Guide", content: "📚 HEALTH INSURANCE 101 – What you MUST know:\n\n1️⃣ Sum Insured vs Premium – Find the right balance\n2️⃣ Network Hospitals – Cashless treatment benefits\n3️⃣ Pre-existing conditions – Waiting period matters\n4️⃣ Co-payment clause – Hidden costs to watch for\n5️⃣ Restoration benefit – Extra coverage when needed\n\nConfused? I'll explain everything FREE of charge. Call me:", cta: "Learn More" }
        ]
    },
    cta_variations: [
        "📞 Call me now!",
        "💬 DM for free consultation",
        "👇 Comment 'INFO' for details",
        "🔗 Click link in bio",
        "📱 WhatsApp me directly",
        "✉️ Send me a message today",
        "📞 Book a FREE call now"
    ],
    trending_topics: [
        { tag: "Budget 2025", emoji: "📈", hot: true },
        { tag: "Festival Season", emoji: "🪔", hot: true },
        { tag: "New Year Goals", emoji: "🎯", hot: false },
        { tag: "Health Awareness", emoji: "❤️", hot: true },
        { tag: "Digital India", emoji: "🇮🇳", hot: false },
        { tag: "Startup Season", emoji: "🚀", hot: true },
        { tag: "Year End Review", emoji: "📊", hot: false },
        { tag: "Women Empowerment", emoji: "💪", hot: true }
    ]
};

const STATE = {
    currentPage: 'dashboard',
    theme: 'dark',
    selectedLang: 'english',
    selectedTone: 'professional',
    selectedCategory: 'insurance',
    campaignGoal: 'leads',
    campaignDuration: 7,
    generatedContent: null,
    leads: [
        { name: 'Ramesh Kumar', interest: 'Term Insurance', date: '2026-02-18', source: 'WhatsApp', status: 'Hot' },
        { name: 'Priya Sharma', interest: 'Health Insurance', date: '2026-02-17', source: 'Instagram', status: 'Warm' },
        { name: 'Suresh Reddy', interest: 'Family Protection', date: '2026-02-16', source: 'Facebook', status: 'Hot' },
        { name: 'Meena Iyer', interest: 'ULIP Plan', date: '2026-02-15', source: 'Telegram', status: 'Cold' },
        { name: 'Venkat Rao', interest: 'Term Insurance', date: '2026-02-14', source: 'WhatsApp', status: 'Warm' }
    ],
    analytics: {
        totalShares: 342,
        leadsGenerated: 28,
        engagementScore: 74,
        campaignSuccess: 68,
        streak: 12,
        growthScore: 2840,
        platforms: [
            { name: 'WhatsApp', icon: '💬', shares: 156, pct: 46 },
            { name: 'Instagram', icon: '📸', shares: 87, pct: 25 },
            { name: 'Facebook', icon: '👍', shares: 62, pct: 18 },
            { name: 'Telegram', icon: '✈️', shares: 37, pct: 11 }
        ],
        weekly: [45, 62, 38, 75, 89, 54, 71]
    },
    campaign: null,
    calendarPosts: {}
};

// Pre-generate some calendar posts
(function initCalendar() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const types = ['completed', 'completed', 'scheduled', 'missed', 'scheduled', 'completed'];
    for (let d = 1; d <= 28; d++) {
        const prob = Math.random();
        if (prob > 0.45) {
            const key = `${y}-${m}-${d}`;
            STATE.calendarPosts[key] = types[Math.floor(Math.random() * types.length)];
        }
    }
})();
