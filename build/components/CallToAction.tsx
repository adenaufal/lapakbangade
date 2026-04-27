import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { CONFIG } from '../constants';
import { trackEvent } from '../services/analytics';

export const CallToAction = () => {
    const handleClick = () => {
        trackEvent('cta_footer_click');
    };

    return (
        <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-slate-100 sm:px-6 md:py-24 lg:px-8">
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/30 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/15 px-4 py-1.5 text-xs font-bold uppercase text-green-300">
                    <span className="size-1.5 rounded-full bg-green-500" />
                    Bot online · Admin standby
                </div>
                <h2 className="mt-5 text-balance text-5xl font-extrabold leading-none text-white md:text-6xl">
                    Siap convert <br />
                    <span className="text-brand-400">PayPal kamu?</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-8 text-slate-300">
                    Buka chat sekarang, bot bakal langsung balas. Admin standby sampai 20:00 WIB.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href={CONFIG.MESSENGER_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleClick}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-extrabold text-slate-950 transition duration-200 hover:-translate-y-0.5"
                    >
                        <MessageCircle size={20} />
                        Chat di Messenger
                        <ArrowRight size={16} />
                    </a>

                    <a
                        href={`https://wa.me/${CONFIG.WHATSAPP_SUPPORT}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleClick}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-base font-extrabold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};
