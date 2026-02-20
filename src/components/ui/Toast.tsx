'use client';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface ToastProps { message: string; type: 'success' | 'error' | 'info'; }

export default function Toast({ message, type }: ToastProps) {
    const icons = { success: <CheckCircle2 size={16} color="var(--accent2)" />, error: <AlertCircle size={16} color="var(--danger)" />, info: <Info size={16} color="var(--primary)" /> };
    return (
        <div className="toast-container">
            <div className="toast animate-slide-up">
                {icons[type]}
                <span style={{ fontSize: '0.875rem' }}>{message}</span>
            </div>
        </div>
    );
}
