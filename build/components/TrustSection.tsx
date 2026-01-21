import React from 'react';
import { Users, UserCheck, MessageSquare, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const TrustSection = () => {
  const points = [
    {
      title: 'Sudah bantu banyak kreator',
      desc: 'Partner terpercaya freelancer & seller sejak 2020.',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Sistem sederhana',
      desc: 'Fokus ke kemudahan dan kenyamanan transaksi kamu.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'CS responsif & transparan',
      desc: 'Info rate dan fee jelas di awal, tanpa biaya gaib.',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Verifikasi Manual Admin',
      desc: 'Dibantu Bot untuk respon cepat, tapi dana tetap dicek manual oleh Admin.',
      icon: UserCheck,
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <section id="trust" className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background Decor: Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
          >
            Kenapa pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">Lapak Bang Ade?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-700"
          >
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-brand-600 font-bold">1000+</span> Transaksi Sukses
            </span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Star size={16} className="text-yellow-400 fill-yellow-400" /> 4.9/5 Kepuasan Pengguna
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
