import React, { useMemo } from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Testimonial } from '../types';

// Extended list of testimonials
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
    content: "Langganan di sini buat cairin hasil freelance. Rate-nya berani diadu sama lapak lain, dan yang paling penting fee-nya transparan ga ada potongan aneh-aneh.",
    platform: "WhatsApp"
  },
  {
    id: 3,
    name: "Laras Putri",
    avatar: "https://i.pravatar.cc/96?img=47",
    content: "Admin detail verifikasi, jadi makin yakin aman. Cair ke BCA ga sampai 1 jam. Recommended banget buat yang cari tempat convert terpercaya.",
    platform: "WhatsApp"
  },
  {
    id: 4,
    name: "Budi Santoso",
    avatar: "https://i.pravatar.cc/96?img=59",
    content: "Pas banget butuh cairin saldo malem-malem, ternyata masih dilayani. Recommended banget buat yang butuh urgent.",
    platform: "Facebook"
  },
  {
    id: 5,
    name: "Dimas Hartono",
    avatar: "https://i.pravatar.cc/96?img=21",
    content: "Butuh top-up USD dadakan, di sini paling cepat responsnya. Rate juga oke dibanding tempat lain.",
    platform: "Facebook"
  },
  {
    id: 6,
    name: "Nadia Prameswari",
    avatar: "https://i.pravatar.cc/96?img=15",
    content: "Suka karena fee jelas di depan, ga ada biaya nyelip. CS bantuin step-by-step sampai saldo masuk.",
    platform: "WhatsApp"
  },
  {
    id: 7,
    name: "Andi Pratama",
    avatar: "https://i.pravatar.cc/96?img=33",
    content: "Penyelamat freelancer di tanggal tua! Proses convert PayPal ke DANA kilat banget.",
    platform: "Upwork"
  },
  {
    id: 8,
    name: "Maya Anggraini",
    avatar: "https://i.pravatar.cc/96?img=9",
    content: "Udah sering transaksi di sini, amanah banget. Rate bersaing dan pelayanan selalu ramah.",
    platform: "Fiverr"
  },
  {
    id: 9,
    name: "Eko Prasetyo",
    avatar: "https://i.pravatar.cc/96?img=60",
    content: "Solusi terbaik buat freelancer Indo. Ga perlu pusing mikirin WD PayPal yang lama.",
    platform: "Freelancer.com"
  },
  {
    id: 10,
    name: "Citra Lestari",
    avatar: "https://i.pravatar.cc/96?img=28",
    content: "Ramah banget adminnya, padahal saya bawel nanya terus. Tetap dilayani dengan sabar. Mantap!",
    platform: "WhatsApp"
  }
];

// Reusing the card component
const TestimonialCard = ({ item, className = "" }: { item: Testimonial; className?: string }) => (
  <div className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative h-full flex flex-col ${className}`}>
    <div className="absolute top-6 right-6 text-brand-100">
      <Quote size={40} />
    </div>

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

    <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow">
      "{item.content}"
    </p>

    <div className="flex gap-1 mt-auto">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
      ))}
    </div>
  </div>
);

export const Testimonials = () => {
  // Use ALL testimonials for the marquee now
  const allTestimonials = TESTIMONIALS;

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pengalaman Mereka Bersama Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lebih dari sekadar konversi, kami membangun kepercayaan. Inilah pengalaman asli dari freelancer dan pengguna setia LapakBangAde.
          </p>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full">
        {/* White Gradients for Seamless Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex overflow-hidden">
          {/* 
            Seamless Loop Logic:
            - Parent container has no gap.
            - Children sets have gap-8.
            - Children sets have padding-right-8 (equivalent to gap-8) to create space between the end of Set 1 and start of Set 2.
            - Wrapper moves -50% (exactly one Set width).
          */}
          <motion.div
            className="flex gap-0"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 80 // Slower speed
            }}
            initial={{ x: 0 }}
            style={{ width: "fit-content" }}
          >
            {/* First Set */}
            <div className="flex gap-8 pr-8 shrink-0">
              {allTestimonials.map((item) => (
                <div key={`set1-${item.id}`} className="w-[350px] md:w-[400px]">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>

            {/* Second Set (Duplicate) */}
            <div className="flex gap-8 pr-8 shrink-0">
              {allTestimonials.map((item) => (
                <div key={`set2-${item.id}`} className="w-[350px] md:w-[400px]">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
