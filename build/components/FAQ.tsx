import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { FAQS } from '../constants';
import { trackEvent } from '../services/analytics';

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
    <section id="faq" className="py-24 bg-gray-50 border-t border-gray-100/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Pertanyaan <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">Umum</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jawaban simpel buat kamu yang baru pertama kali convert.
          </p>
        </div>

        <div className="space-y-4">
          {CUSTOM_FAQS.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={index}
              className={`bg-white rounded-2xl border transition-all duration-300 ${openIndex === index ? 'shadow-md border-brand-200 ring-4 ring-brand-50' : 'shadow-sm border-transparent hover:border-gray-200'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={`font-bold text-base md:text-lg transition-colors ${openIndex === index ? 'text-brand-700' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 p-1 rounded-full transition-colors ${openIndex === index ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-400'}`}>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
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
