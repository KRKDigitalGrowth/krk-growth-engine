export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    phone?: string;
    whatsapp?: string;
    businessCategory: string;
    preferredLanguage: string;
    preferredTone: string;
    isAdmin?: boolean;
    createdAt: string;
}

export interface ContentPost {
    id: string;
    hook: string;
    shortCaption: string;
    longCaption: string;
    cta: string;
    hashtags: string[];
    category: string;
    tone: string;
    language: string;
    platform: string;
    viralScore: number;
    viralTips: string[];
    createdAt: string;
    userId: string;
    shared?: boolean;
    sharedPlatforms?: string[];
}

export interface Lead {
    id: string;
    name: string;
    phone: string;
    category: string;
    sourcePlatform: string;
    message?: string;
    date: string;
    userId: string;
    status: 'new' | 'contacted' | 'converted';
}

export interface Campaign {
    id: string;
    name: string;
    goal: 'leads' | 'branding' | 'awareness';
    duration: 7 | 14 | 30;
    startDate: string;
    endDate: string;
    posts: CampaignPost[];
    userId: string;
    status: 'active' | 'completed' | 'paused';
    createdAt: string;
}

export interface CampaignPost {
    day: number;
    date: string;
    topic: string;
    caption: string;
    platform: string;
    completed: boolean;
}

export interface CalendarDay {
    date: string;
    status: 'scheduled' | 'completed' | 'missed' | 'festival' | 'empty';
    posts: ContentPost[];
    festival?: string;
}

export interface GamificationStats {
    streak: number;
    growthScore: number;
    totalPosts: number;
    totalLeads: number;
    totalShares: number;
    badges: Badge[];
    weeklyLevel: 'Starter' | 'Pro' | 'Expert' | 'Legend';
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedAt?: string;
}

export interface AnalyticsData {
    totalShares: number;
    totalLeads: number;
    bestPlatform: string;
    engagementScore: number;
    campaignSuccessRate: number;
    weeklyPosts: { day: string; count: number }[];
    platformBreakdown: { platform: string; count: number; color: string }[];
    growthTrend: { week: string; score: number }[];
}

export interface Template {
    id: string;
    title: string;
    category: string;
    subCategory?: string;
    body: string;
    hashtags: string[];
    language: string;
    tone: string;
    isFeatured: boolean;
    isTrending: boolean;
    createdAt: string;
}

export interface UserBehavior {
    preferredPlatform: string;
    avgCaptionLength: 'short' | 'medium' | 'long';
    bestPostingHour: number;
    mostUsedCategory: string;
    lastActiveDate: string;
}

export type Language = 'English' | 'Telugu' | 'Hindi' | 'Tamil' | 'Kannada' | 'Malayalam';
export type Tone = 'Professional' | 'Friendly' | 'Aggressive' | 'Motivational';
export type Category = 'Insurance' | 'Real Estate' | 'Finance' | 'Health' | 'Education' | 'Business' | 'Lifestyle' | 'Motivation';
export type Platform = 'Instagram' | 'Facebook' | 'WhatsApp' | 'Telegram' | 'YouTube' | 'Threads';
