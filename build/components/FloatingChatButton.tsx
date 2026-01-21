import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../constants';

export const FloatingChatButton = () => {
    return (
        <a
            href={CONFIG.MESSENGER_URL}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-brand-600 text-white rounded-full shadow-lg hover:bg-brand-700 hover:scale-110 transition-all duration-300 group"
            aria-label="Chat with Admin"
        >
            <MessageCircle size={28} className="group-hover:animate-pulse" />
            <span className="absolute right-full mr-4 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Hubungi Admin
            </span>
        </a>
    );
};
