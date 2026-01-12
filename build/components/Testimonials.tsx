import React, { useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../constants';
import type { Testimonial } from '../types';

// Reusing the card component with mobile-optimized padding
const TestimonialCard = ({ item, className = "" }: { item: Testimonial; className?: string }) => (
  <div className={`bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative h-full flex flex-col ${className}`}>
    <div className="absolute top-4 md:top-6 right-4 md:right-6 text-brand-100">
      <Quote size={32} className="md:w-10 md:h-10" />
    </div>

    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
      <img
        src={item.avatar}
        alt={item.name}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-brand-50"
        width="48"
        height="48"
        loading="lazy"
        decoding="async"
      />
      <div>
        <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.name}</h3>
        <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
          via {item.platform}
        </span>
      </div>
    </div>

    <p className="text-gray-600 italic leading-relaxed mb-4 md:mb-6 flex-grow text-sm md:text-base line-clamp-4 md:line-clamp-none">
      "{item.content}"
    </p>

    <div className="flex gap-1 mt-auto">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
      ))}
    </div>
  </div>
);

export const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  // Use ALL testimonials for the marquee now
  const allTestimonials = TESTIMONIALS;

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Pengalaman Mereka Bersama Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Lebih dari sekadar konversi, kami membangun kepercayaan. Inilah pengalaman asli dari freelancer dan pengguna setia LapakBangAde.
          </p>
        </div>
      </div>

      {/* Marquee Section with Pause on Hover */}
      <div
        className="relative w-full cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* White Gradients for Seamless Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

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
            animate={{ x: isPaused ? undefined : "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 80 // Slower speed
            }}
            initial={{ x: 0 }}
            style={{ width: "fit-content" }}
          >
            {/* First Set */}
            <div className="flex gap-4 md:gap-8 pr-4 md:pr-8 shrink-0">
              {allTestimonials.map((item) => (
                <div key={`set1-${item.id}`} className="w-[280px] md:w-[400px]">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>

            {/* Second Set (Duplicate) */}
            <div className="flex gap-4 md:gap-8 pr-4 md:pr-8 shrink-0">
              {allTestimonials.map((item) => (
                <div key={`set2-${item.id}`} className="w-[280px] md:w-[400px]">
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

