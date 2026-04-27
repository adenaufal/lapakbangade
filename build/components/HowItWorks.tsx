import React from 'react';
import { CreditCard, MessageCircle, Send, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

export const HowItWorks = () => {
  const steps = [
    {
      title: '1. Chat Bot di Messenger',
      description: 'Klik tombol chat. Bot otomatis akan tanya nama, email PayPal, bank/e-wallet, dan nominal convert.',
      icon: MessageCircle,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      title: '2. Pilih Nominal Convert',
      description: 'Input nominal yang mau diconvert. Bot akan hitung fee otomatis dan tampilkan total yang kamu terima.',
      icon: Send,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      title: '3. Transfer & Upload Bukti',
      description: 'Transfer ke weiss.schrodinger@gmail.com (Ade Naufal Ammar) pakai Friends & Family, lalu kirim screenshot bukti.',
      icon: Upload,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      title: '4. Tunggu 30-60 Menit',
      description: 'Admin akan cek mutasi manual. Setelah valid, langsung transfer IDR ke rekening/e-wallet kamu. Selesai!',
      icon: CreditCard,
      color: 'bg-brand-50 text-brand-600',
    }
  ];

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-slate-50 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase text-brand-600">
            Cara Convert
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="text-balance text-3xl font-black leading-tight text-slate-950 md:text-5xl"
          >
            4 langkah, <span className="text-brand-600">nggak ada yang bikin pusing.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-8 text-slate-600"
          >
            Sebagian besar transaksi selesai dalam satu chat. Pertama kali pakai? Bot bakal nuntun step-by-step, lalu admin verifikasi manual.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex gap-5">
                  <div className={cn('grid size-14 shrink-0 place-items-center rounded-2xl', step.color)}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-slate-400 tabular-nums">STEP {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-1 text-lg font-black text-slate-950">{step.title}</h3>
                    <p className="mt-2 text-pretty text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
