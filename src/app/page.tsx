'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import AppShell from '@/components/navigation/AppShell';
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function Home() {
    const { theme } = useAppStore();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <AppShell>
            <DashboardPage />
        </AppShell>
    );
}
