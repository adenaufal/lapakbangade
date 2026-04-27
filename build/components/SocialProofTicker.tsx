import React, { useState } from 'react';
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
        <div className="relative overflow-hidden border-y border-slate-800 bg-slate-950 py-3">
            {/* Gradient overlays for fade effect */}
            <div className="absolute bottom-0 left-0 top-0 z-10 w-16 bg-slate-950 sm:w-24 lg:w-32"></div>
            <div className="absolute bottom-0 right-0 top-0 z-10 w-16 bg-slate-950 sm:w-24 lg:w-32"></div>

            <div className="flex animate-marquee gap-5 sm:gap-8 whitespace-nowrap">
                {/* Duplicate events for seamless loop */}
                {[...events, ...events].map((event, idx) => (
                    <div
                        key={`${event.id}-${idx}`}
                        className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 sm:gap-3 sm:px-4 sm:py-2"
                    >
                        <div className="flex size-6 items-center justify-center rounded-full bg-white/20">
                            {event.type === 'convert' ? (
                                <CheckCircle2 size={14} className="text-white" />
                            ) : (
                                <TrendingUp size={14} className="text-white" />
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white font-medium">
                            <User size={14} className="opacity-70" />
                            <span>User dari {event.location}</span>
                            <span className="hidden sm:inline opacity-50">|</span>
                            <span className="font-bold">${event.amount}</span>
                            <span className="hidden sm:inline opacity-50">|</span>
                            <span className="hidden sm:inline opacity-70 text-xs">{event.timeAgo}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
