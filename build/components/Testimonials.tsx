import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rian Saputra",
    avatar: "https://i.pravatar.cc/96?img=11",
    content: "Awalnya ragu karena baru pertama kali convert, eh ternyata cepet banget. 30 menit duit udah masuk DANA. Adminnya juga ramah banget jelasinnya.",
    platform: "Facebook"
  },
  {
    id: 2,
    name: "Siska Wijaya",
    avatar: "https://i.pravatar.cc/96?img=5",
    content: "Langganan di sini buat cairin hasil freelance. Rate-nya berani diadu sama lapak lain, dan yang paling penting fee-nya transparan ga ada potongan aneh2.",
    platform: "WhatsApp"
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "https://i.pravatar.cc/96?img=59",
    content: "Pas banget butuh cairin saldo malem-malem, ternyata masih dilayani. Recommended banget buat yang butuh urgent.",
    platform: "Facebook"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Kata Mereka</h2>
          <p className="text-gray-600">Pengalaman asli dari freelancer dan pengguna setia Lapak Bang Ade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
              <Quote className="absolute top-6 right-6 text-brand-100" size={40} />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-50"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                    via {item.platform}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 italic leading-relaxed">
                "{item.content}"
              </p>
              
              <div className="flex gap-1 mt-4">
                 {[1,2,3,4,5].map(star => (
                     <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
