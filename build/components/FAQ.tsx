import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { FAQS } from '../constants';
import { trackEvent } from '../services/analytics';

import { cn } from '../utils/cn';

// Local FAQ override to include specific Chatbot Q&A
const CUSTOM_FAQS = [
  ...FAQS,
  {
    question: 'Apakah ini dilayani Bot?',
    answer: 'Kami menggunakan Chatbot Cerdas untuk memberikan respons cepat 24/7 (info rate, cara transfer). Namun, untuk pengecekan dana masuk dan transfer Rupiah tetap dilakukan MANUAL oleh Admin asli demi keamanan.'
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    if (openIndex !== index) {
      trackEvent('faq_open_question', { question_index: index });
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-black uppercase text-brand-600">
            FAQ
          </p>
          <h2 className="text-balance text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            Pertanyaan yang <span className="text-brand-600">sering ditanya.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-8 text-slate-600">
            Jawaban simpel buat kamu yang baru pertama kali convert.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-2 shadow-sm md:px-8">
          {CUSTOM_FAQS.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              key={index}
              className="border-b border-slate-200 last:border-b-0"
            >
              <button
                className="w-full py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={cn(
                  'font-black text-base md:text-lg transition-colors',
                  openIndex === index ? 'text-brand-700' : 'text-slate-950',
                )}>
                  {faq.question}
                </span>
                <span className={cn(
                  'grid size-8 place-items-center rounded-full transition-colors',
                  openIndex === index ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500',
                )}>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-200 ease-out',
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                )}
              >
                <div className="pb-6 pr-10 text-pretty leading-7 text-slate-600">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
