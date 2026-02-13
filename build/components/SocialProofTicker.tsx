import React, { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, User } from 'lucide-react';

interface ProofEvent {
    id: number;
    location: string;
    amount: number;
    timeAgo: string;
    type: 'convert' | 'topup';
}

const generateProofEvents = (): ProofEvent[] => {
    const locations = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Yogyakarta', 'Semarang', 'Bali', 'Makassar'];
    const amounts = [25, 50, 75, 100, 150, 200, 250, 300];
    const timeAgos = ['2 menit lalu', '5 menit lalu', '10 menit lalu', '15 menit lalu', '30 menit lalu', '1 jam lalu'];

    return Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        location: locations[Math.floor(Math.random() * locations.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        timeAgo: timeAgos[Math.floor(Math.random() * timeAgos.length)],
        type: Math.random() > 0.5 ? 'convert' : 'topup'
    }));
};

export const SocialProofTicker = () => {
    const [events] = useState<ProofEvent[]>(generateProofEvents());

    return (
        <div className="bg-gradient-to-r from-brand-600 to-blue-500 py-3 overflow-hidden relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-600 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-500 to-transparent z-10"></div>

            <div className="flex animate-marquee gap-8 whitespace-nowrap">
                {/* Duplicate events for seamless loop */}
                {[...events, ...events].map((event, idx) => (
                    <div
                        key={`${event.id}-${idx}`}
                        className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex-shrink-0"
                    >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            {event.type === 'convert' ? (
                                <CheckCircle2 size={14} className="text-white" />
                            ) : (
                                <TrendingUp size={14} className="text-white" />
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                            <User size={14} className="opacity-70" />
                            <span>User dari {event.location}</span>
                            <span className="opacity-50">•</span>
                            <span className="font-bold">${event.amount}</span>
                            <span className="opacity-50">•</span>
                            <span className="opacity-70 text-xs">{event.timeAgo}</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};
