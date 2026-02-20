// WhatsApp deep-link builder + lead capture utilities

export function buildWhatsAppLink(phone: string, message: string): string {
    const cleanPhone = phone.replace(/\D/g, '');
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildLeadCaptureMessage(
    category: string,
    sourcePlatform: string,
    agentName: string
): string {
    return `Hi ${agentName}! 👋 I saw your post about ${category} on ${sourcePlatform} and I'm interested in learning more. Please share details.`;
}

export function openWhatsApp(phone: string, message: string): void {
    const link = buildWhatsAppLink(phone, message);
    window.open(link, '_blank');
}

export function buildShareUrls(caption: string, hashtags: string[]): Record<string, string> {
    const text = `${caption}\n\n${hashtags.join(' ')}`;
    const encoded = encodeURIComponent(text);
    return {
        WhatsApp: `https://wa.me/?text=${encoded}`,
        Facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encoded}`,
        Telegram: `https://t.me/share/url?url=https://krk.app&text=${encoded}`,
        Twitter: `https://twitter.com/intent/tweet?text=${encoded}`,
        Instagram: 'https://www.instagram.com/',
        Threads: 'https://www.threads.net/',
        YouTube: 'https://studio.youtube.com/',
    };
}

export function copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    }
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return Promise.resolve();
}
