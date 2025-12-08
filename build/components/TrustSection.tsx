import React from 'react';
import { Users, UserCheck, MessageSquare, ShieldCheck, Star } from 'lucide-react';

export const TrustSection = () => {
  const points = [
    {
      title: 'Sudah bantu banyak kreator',
      desc: 'Partner terpercaya freelancer & seller sejak 2020.',
      icon: Users
    },
    {
      title: 'Sistem sederhana',
      desc: 'Fokus ke kemudahan dan kenyamanan transaksi kamu.',
      icon: ShieldCheck
    },
    {
      title: 'CS responsif & transparan',
      desc: 'Info rate dan fee jelas di awal, tanpa biaya gaib.',
      icon: MessageSquare
    },
    {
      title: 'Verifikasi Manual Admin',
      desc: 'Dibantu Bot untuk respon cepat, tapi dana tetap dicek manual oleh Admin.',
      icon: UserCheck
    }
  ];

  return (
    <section id="trust" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Kenapa pilih Lapak Bang Ade?</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                    <span className="text-brand-600 font-bold">1000+</span> Transaksi Sukses
                </span>
                <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                     <Star size={16} className="text-yellow-400 fill-yellow-400"/> 4.9/5 Kepuasan Pengguna
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {points.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-4">
                        <item.icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
