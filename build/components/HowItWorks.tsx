import React from 'react';
import { MessageCircle, Send, Upload, CreditCard } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      title: '1. Chat di Messenger',
      description: 'Klik tombol chat. Bot akan berikan info rate & instruksi otomatis.',
      icon: MessageCircle,
    },
    {
      title: '2. Kirim USD',
      description: 'Transfer saldo PayPal sesuai instruksi yang diberikan.',
      icon: Send,
    },
    {
      title: '3. Upload Bukti',
      description: 'Kirim screenshot transfer. Admin akan cek mutasi secara manual.',
      icon: Upload,
    },
    {
      title: '4. Terima Rupiah',
      description: 'Setelah valid, Admin langsung transfer IDR ke rekeningmu.',
      icon: CreditCard,
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cara kerjanya simpel banget</h2>
          <p className="text-gray-600">Gabungan sistem otomatis & pengecekan manual yang aman.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-brand-200 transition-all h-full z-10 relative">
                <div className="w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center mb-6 text-xl font-bold shadow-lg shadow-brand-200">
                    {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              
              {/* Connector Line for Desktop */}
              {index < steps.length - 1 && (
                 <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-100 -z-0"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
             <div className="inline-block px-6 py-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                Transaksi aman, hati tenang!
             </div>
        </div>
      </div>
    </section>
  );
};
