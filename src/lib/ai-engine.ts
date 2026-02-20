import { ContentPost, Language, Tone, Category } from '@/types';

// =============================================
// AI Content Generation Engine
// Rule-based smart content generator
// =============================================

const hooks: Record<string, Record<string, string[]>> = {
    English: {
        Insurance: [
            "🔥 One missed policy could cost your family everything. Here's why you need coverage TODAY.",
            "⚡ 73% of families are underinsured. Are you in that group?",
            "💡 Your family's future is worth more than a few rupees a month. Here's the plan.",
            "🚨 ALERT: If something happens to you tomorrow, is your family financially protected?",
            "✅ The smartest thing I did this year? Getting the right insurance plan. Here's why.",
        ],
        'Real Estate': [
            "🏠 This property won't last the weekend. Here's why buyers are rushing in.",
            "💰 How to make your money work while you sleep – real estate investing explained.",
            "🔑 3 reasons why NOW is the best time to buy property in this market.",
        ],
        Finance: [
            "📈 Stop letting your money sit idle. Here's how to grow it 3x in 5 years.",
            "💸 Most people lose ₹50,000+ every year by making this ONE financial mistake.",
            "🏦 The secret to financial freedom that no bank will tell you.",
        ],
        Motivation: [
            "🔥 Your competition is working right now. What are you doing?",
            "💪 Success doesn't wait for the perfect moment – it creates it.",
            "⚡ One decision today can change your financial future forever.",
        ],
    },
    Telugu: {
        Insurance: [
            "🔥 మీ కుటుంబ భవిష్యత్తు భద్రంగా ఉందా? ఈ ఒక్క నిర్ణయం అన్నీ మారుస్తుంది.",
            "⚡ Insurance లేకుండా జీవితం – ఇది రిస్క్ కాదు, నష్టం.",
            "💡 నేడు పెట్టుబడి పెట్టండి, రేపటి కుటుంబాన్ని సురక్షితంగా ఉంచండి.",
        ],
        Finance: [
            "📈 మీ డబ్బు పని చేయనివ్వండి – ఇక్కడ చూడండి ఎలాగో.",
            "💸 ఆర్థిక స్వాతంత్ర్యం అందరికీ సాధ్యమే – సరైన ప్లాన్ తో.",
        ],
        Motivation: [
            "🔥 మీ కల సాధించడానికి ఒక్క అడుగు ముందుకు వేయండి!",
            "💪 విజయం అది పని చేసే వారికే దక్కుతుంది.",
        ],
    },
    Hindi: {
        Insurance: [
            "🔥 क्या आपका परिवार सुरक्षित है? एक सही बीमा आपकी सारी चिंता दूर करेगा।",
            "⚡ जीवन बीमा आज लें, कल की चिंता से मुक्त रहें।",
            "💡 एक छोटी सी प्रीमियम से करें बड़े भविष्य की सुरक्षा।",
        ],
        Motivation: [
            "🔥 सफलता उन्हीं को मिलती है जो देर तक मेहनत करते हैं।",
            "💪 आज का एक सही फ़ैसला कल की ज़िंदगी बदल सकता है।",
        ],
    },
    Tamil: {
        Insurance: [
            "🔥 உங்கள் குடும்பம் பாதுகாப்பாக இருக்கிறதா? சரியான காப்பீடு எடுங்கள்.",
            "⚡ காப்பீடு இல்லாத வாழ்க்கை ஆபத்தானது – இப்போதே திட்டமிடுங்கள்.",
        ],
        Motivation: [
            "🔥 உங்கள் கனவை நோக்கி ஒரு அடி முன்னால் போடுங்கள்!",
            "💪 வெற்றி உழைப்பாளிகளுக்கே சொந்தம்.",
        ],
    },
    Kannada: {
        Insurance: [
            "🔥 ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಸೂಕ್ತ ರಕ್ಷಣೆ ಇದೆಯೇ? ಇಂದೇ ಯೋಜನೆ ಮಾಡಿ.",
            "⚡ ವಿಮೆ ಇಲ್ಲದ ಜೀವನ – ಇದು ಅಪಾಯ, ತಕ್ಷಣ ನಿರ್ಧರಿಸಿ.",
        ],
        Motivation: [
            "🔥 ಯಶಸ್ಸು ಶ್ರಮಿಸುವವರಿಗೆ ಮಾತ್ರ ಲಭ್ಯ.",
        ],
    },
    Malayalam: {
        Insurance: [
            "🔥 നിങ്ങളുടെ കുടുംബം സുരക്ഷിതമാണോ? ശരിയായ ഇൻഷുറൻസ് ഇന്നേ തിരഞ്ഞെടുക്കൂ.",
            "⚡ ഇൻഷുറൻസ് ഇല്ലാത്ത ജീവിതം – അപകടകരം, ഇപ്പോൾ തന്നെ പ്ലാൻ ചെയ്യൂ.",
        ],
        Motivation: [
            "🔥 വിജയം അദ്ധ്വാനിക്കുന്നവർക്കു മാത്രമാണ്.",
        ],
    },
};

const captions: Record<Tone, string[]> = {
    Professional: [
        "As a licensed professional, I've seen firsthand how proper planning transforms financial futures. Let's discuss the right strategy for your family's protection.",
        "Statistical data confirms: 80% of financial hardships can be prevented with the right insurance coverage. Don't wait – plan today.",
        "Your financial legacy begins with a single conversation. I'm here to guide you through every step of the process.",
    ],
    Friendly: [
        "Hey friends! 👋 Just sharing something that changed my family's financial game – and I think it could change yours too!",
        "Quick question – when did you last review your insurance plan? Let's chat over a quick call! ☎️",
        "I love helping people secure their families' futures. Drop me a message and let's figure out what works for YOU! 💙",
    ],
    Aggressive: [
        "STOP wasting money on things that don't matter. Your family needs REAL protection – and they need it NOW. Message me IMMEDIATELY.",
        "Your competitors are already covered. Your friends are already protected. What are YOU waiting for?! ACT TODAY.",
        "Every day without proper coverage is a day your family is at RISK. Don't let another day pass – call NOW! 📞",
    ],
    Motivational: [
        "The best investment you'll ever make isn't in stocks or real estate – it's in your family's SECURITY. Make that move today. 💪",
        "Champions plan ahead. Leaders protect their families. Which one are you? Step up and secure YOUR future. 🏆",
        "Success is not just about earning money – it's about protecting it. Take control of your financial destiny TODAY. 🔥",
    ],
};

const hashtagSets: Record<string, string[]> = {
    Insurance: ['#InsurancePlanning', '#LifeInsurance', '#FamilyProtection', '#FinancialSecurity', '#TermInsurance', '#HealthInsurance', '#PolicyBazaar', '#LICIndia', '#InsuranceAdvisor', '#SecureYourFuture'],
    'Real Estate': ['#RealEstate', '#PropertyInvestment', '#HomeLoans', '#PropertyDeals', '#RealestateMumbai', '#InvestInProperty', '#DreamHome', '#PropertyGoals'],
    Finance: ['#FinancialFreedom', '#WealthBuilding', '#Investment', '#MoneyMindset', '#PersonalFinance', '#MutualFunds', '#SIPInvesting', '#StockMarket'],
    Motivation: ['#Motivation', '#Mindset', '#Success', '#HardWork', '#Entrepreneurship', '#Growth', '#BusinessMindset', '#Leadership', '#GoalSetting'],
    Health: ['#HealthInsurance', '#WellnessFirst', '#HealthIsWealth', '#MedicalCover', '#HealthCare', '#FamilyHealth'],
};

const ctaVariants: Record<Tone, string[]> = {
    Professional: [
        'Schedule a complimentary consultation → WhatsApp me now',
        'Get your FREE insurance review → Click the link below',
        'Connect with me for a personalized financial plan',
    ],
    Friendly: [
        'Message me anytime – happy to help! 😊',
        'Drop a "YES" in comments if you want more info!',
        "Let's have a quick chat – tap the WhatsApp button below! 👇",
    ],
    Aggressive: [
        'CALL NOW – LIMITED SLOTS AVAILABLE! 🔥',
        'Message me TODAY – stop delaying your family\'s security!',
        'ACT NOW before it\'s too late → WhatsApp below 👇',
    ],
    Motivational: [
        'Take the first step toward financial freedom → Message me! 💪',
        'Your future self will thank you → Start today! 🚀',
        'Join 500+ families who made the smart choice → Connect now! 🏆',
    ],
};

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function computeViralScore(tone: Tone, language: string, category: string, captionLength: number): number {
    let score = 50;
    if (tone === 'Aggressive') score += 15;
    if (tone === 'Motivational') score += 12;
    if (tone === 'Friendly') score += 8;
    if (language !== 'English') score += 5;
    if (category === 'Insurance' || category === 'Finance') score += 8;
    if (captionLength > 150) score += 5;
    score += Math.floor(Math.random() * 15);
    return Math.min(score, 97);
}

function getViralTips(score: number, tone: Tone): string[] {
    const tips: string[] = [];
    if (score < 70) tips.push('Add an emotional trigger word in the first line');
    if (score < 80) tips.push('Include a specific number or statistic for credibility');
    if (tone !== 'Aggressive') tips.push('Create more urgency with time-sensitive language');
    if (score < 85) tips.push('Add a question to boost comment engagement');
    tips.push('Post between 8-10 AM or 6-8 PM for maximum reach');
    return tips.slice(0, 3);
}

export function generateContent(
    category: Category | string,
    tone: Tone,
    language: Language,
    userId: string
): ContentPost {
    const langHooks = hooks[language]?.[category] || hooks['English']?.[category] || hooks['English']['Motivation'];
    const hook = getRandomItem(langHooks);
    const shortCaption = getRandomItem(captions[tone]);
    const longCaption = `${hook}\n\n${shortCaption}\n\nHere's what I offer:\n✅ Free consultation\n✅ Personalized plans\n✅ 24/7 support after policy\n✅ Claim settlement assistance\n\nReach out today – your family deserves the best protection.`;
    const cta = getRandomItem(ctaVariants[tone]);
    const hashtags = [...(hashtagSets[category] || hashtagSets['Motivation']), '#KRKGrowth', '#MarketingPro'];
    const viralScore = computeViralScore(tone, language, category, longCaption.length);
    const viralTips = getViralTips(viralScore, tone);

    return {
        id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        hook,
        shortCaption,
        longCaption,
        cta,
        hashtags: hashtags.slice(0, 10),
        category,
        tone,
        language,
        platform: 'Instagram',
        viralScore,
        viralTips,
        createdAt: new Date().toISOString(),
        userId,
        shared: false,
        sharedPlatforms: [],
    };
}

export function generateMultiplePosts(
    category: Category | string,
    tone: Tone,
    language: Language,
    userId: string,
    count: number = 3
): ContentPost[] {
    return Array.from({ length: count }, () => generateContent(category, tone, language, userId));
}

export { hooks, captions, hashtagSets };
