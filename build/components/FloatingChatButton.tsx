import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../constants';

export const FloatingChatButton = () => {
    return (
        <a
            href={CONFIG.MESSENGER_URL}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-50 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700 group"
            aria-label="Chat with Admin"
        >
            <MessageCircle size={28} />
            <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1 text-sm font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Hubungi Admin
            </span>
        </a>
    );
};
