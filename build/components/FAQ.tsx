import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
    <section id="faq" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">FAQ</h2>
          <p className="text-gray-600">Pertanyaan umum seputar convert PayPal.</p>
        </div>

        <div className="space-y-3">
          {CUSTOM_FAQS.map((faq, index) => (
            <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <span className="text-gray-400">
                  {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 mt-2">
                   <div className="pt-4">{faq.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};