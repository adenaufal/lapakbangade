import React from 'react';
import { MessageCircle, Send, Upload, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks = () => {
  const steps = [
    {
      title: '1. Chat Bot di Messenger',
      description: 'Klik tombol chat. Bot otomatis akan tanya nama, email PayPal, bank/e-wallet, dan nominal convert.',
      icon: MessageCircle,
      color: 'bg-blue-500',
    },
    {
      title: '2. Pilih Nominal Convert',
      description: 'Input nominal yang mau diconvert. Bot akan hitung fee otomatis dan tampilkan total yang kamu terima.',
      icon: Send,
      color: 'bg-indigo-500',
    },
    {
      title: '3. Transfer & Upload Bukti',
      description: 'Transfer ke weiss.schrodinger@gmail.com (Ade Naufal Ammar) pakai Friends & Family, lalu kirim screenshot bukti.',
      icon: Upload,
      color: 'bg-purple-500',
    },
    {
      title: '4. Tunggu 30-60 Menit',
      description: 'Admin akan cek mutasi manual. Setelah valid, langsung transfer IDR ke rekening/e-wallet kamu. Selesai!',
      icon: CreditCard,
      color: 'bg-emerald-500',
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gray-50/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            Cara kerjanya <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">simpel banget</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Gabungan sistem otomatis & pengecekan manual yang aman.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full z-10 relative group-hover:-translate-y-1">

                  {/* Step Number Badge */}
                  <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center mb-6 text-xl font-bold shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -z-0 opacity-50"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-green-100 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Transaksi aman, hati tenang!
          </div>
        </motion.div>
      </div>
    </section>
  );
};
