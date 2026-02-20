import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContentPost, Lead, Campaign, GamificationStats, AnalyticsData, User, UserBehavior } from '@/types';

interface AppState {
    // Auth
    user: User | null;
    setUser: (user: User | null) => void;

    // Theme
    theme: 'light' | 'dark';
    toggleTheme: () => void;

    // Content
    generatedPosts: ContentPost[];
    addPost: (post: ContentPost) => void;
    clearPosts: () => void;
    markShared: (postId: string, platform: string) => void;

    // Leads
    leads: Lead[];
    addLead: (lead: Lead) => void;
    updateLeadStatus: (leadId: string, status: Lead['status']) => void;

    // Campaigns
    campaigns: Campaign[];
    addCampaign: (campaign: Campaign) => void;
    updateCampaign: (campaign: Campaign) => void;

    // Gamification
    gamification: GamificationStats;
    incrementStreak: () => void;
    addScore: (points: number) => void;
    earnBadge: (badgeId: string) => void;

    // Analytics
    analytics: AnalyticsData;
    updateAnalytics: (data: Partial<AnalyticsData>) => void;

    // User Behavior
    behavior: UserBehavior;
    updateBehavior: (data: Partial<UserBehavior>) => void;

    // UI State
    isLoading: boolean;
    setLoading: (v: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    toast: { message: string; type: string } | null;
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const defaultGamification: GamificationStats = {
    streak: 5,
    growthScore: 1240,
    totalPosts: 18,
    totalLeads: 34,
    totalShares: 67,
    weeklyLevel: 'Pro',
    badges: [
        { id: 'first-post', name: 'First Post', description: 'Created your first post', icon: '🚀', earned: true, earnedAt: '2024-01-10' },
        { id: 'streak-7', name: 'Week Warrior', description: '7-day posting streak', icon: '🔥', earned: true, earnedAt: '2024-01-15' },
        { id: 'lead-magnet', name: 'Lead Magnet', description: 'Generated 10+ leads', icon: '🧲', earned: true, earnedAt: '2024-01-18' },
        { id: 'campaign-king', name: 'Campaign King', description: 'Completed a full campaign', icon: '👑', earned: false },
        { id: 'viral-post', name: 'Viral Star', description: 'Viral score 90+', icon: '⭐', earned: false },
        { id: 'legend', name: 'Legend', description: 'Reach Legend level', icon: '🏆', earned: false },
    ],
};

const defaultAnalytics: AnalyticsData = {
    totalShares: 67,
    totalLeads: 34,
    bestPlatform: 'WhatsApp',
    engagementScore: 78,
    campaignSuccessRate: 82,
    weeklyPosts: [
        { day: 'Mon', count: 3 }, { day: 'Tue', count: 5 }, { day: 'Wed', count: 2 },
        { day: 'Thu', count: 6 }, { day: 'Fri', count: 4 }, { day: 'Sat', count: 7 }, { day: 'Sun', count: 1 },
    ],
    platformBreakdown: [
        { platform: 'WhatsApp', count: 28, color: '#25d366' },
        { platform: 'Instagram', count: 18, color: '#e1306c' },
        { platform: 'Facebook', count: 12, color: '#1877f2' },
        { platform: 'Telegram', count: 6, color: '#2ca5e0' },
        { platform: 'YouTube', count: 3, color: '#ff0000' },
    ],
    growthTrend: [
        { week: 'W1', score: 320 }, { week: 'W2', score: 580 }, { week: 'W3', score: 890 },
        { week: 'W4', score: 1240 },
    ],
};

const defaultBehavior: UserBehavior = {
    preferredPlatform: 'WhatsApp',
    avgCaptionLength: 'medium',
    bestPostingHour: 9,
    mostUsedCategory: 'Insurance',
    lastActiveDate: new Date().toISOString(),
};

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),

            theme: 'dark',
            toggleTheme: () => {
                const next = get().theme === 'dark' ? 'light' : 'dark';
                set({ theme: next });
                document.documentElement.setAttribute('data-theme', next);
            },

            generatedPosts: [],
            addPost: (post) => set((s) => ({ generatedPosts: [post, ...s.generatedPosts] })),
            clearPosts: () => set({ generatedPosts: [] }),
            markShared: (postId, platform) =>
                set((s) => ({
                    generatedPosts: s.generatedPosts.map((p) =>
                        p.id === postId
                            ? { ...p, shared: true, sharedPlatforms: [...(p.sharedPlatforms || []), platform] }
                            : p
                    ),
                    analytics: { ...s.analytics, totalShares: s.analytics.totalShares + 1 },
                })),

            leads: [],
            addLead: (lead) => set((s) => ({ leads: [lead, ...s.leads] })),
            updateLeadStatus: (leadId, status) =>
                set((s) => ({ leads: s.leads.map((l) => (l.id === leadId ? { ...l, status } : l)) })),

            campaigns: [],
            addCampaign: (campaign) => set((s) => ({ campaigns: [campaign, ...s.campaigns] })),
            updateCampaign: (campaign) =>
                set((s) => ({ campaigns: s.campaigns.map((c) => (c.id === campaign.id ? campaign : c)) })),

            gamification: defaultGamification,
            incrementStreak: () =>
                set((s) => ({ gamification: { ...s.gamification, streak: s.gamification.streak + 1 } })),
            addScore: (points) =>
                set((s) => ({ gamification: { ...s.gamification, growthScore: s.gamification.growthScore + points } })),
            earnBadge: (badgeId) =>
                set((s) => ({
                    gamification: {
                        ...s.gamification,
                        badges: s.gamification.badges.map((b) =>
                            b.id === badgeId ? { ...b, earned: true, earnedAt: new Date().toISOString() } : b
                        ),
                    },
                })),

            analytics: defaultAnalytics,
            updateAnalytics: (data) => set((s) => ({ analytics: { ...s.analytics, ...data } })),

            behavior: defaultBehavior,
            updateBehavior: (data) => set((s) => ({ behavior: { ...s.behavior, ...data } })),

            isLoading: false,
            setLoading: (v) => set({ isLoading: v }),
            activeTab: 'dashboard',
            setActiveTab: (tab) => set({ activeTab: tab }),
            toast: null,
            showToast: (message, type = 'success') => {
                set({ toast: { message, type } });
                setTimeout(() => set({ toast: null }), 3500);
            },
        }),
        { name: 'krk-store', partialize: (s) => ({ theme: s.theme, behavior: s.behavior, gamification: s.gamification, analytics: s.analytics }) }
    )
);
