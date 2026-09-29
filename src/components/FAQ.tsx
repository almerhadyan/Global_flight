import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: 'What is your refund policy?',
      a: 'Refund policies vary by airline and ticket type. Most tickets booked via GlobalFlights are refundable within 24 hours of booking. For cancellations after this period, airline-specific fees may apply.'
    },
    {
      q: 'Can I change my flight dates?',
      a: 'Yes, date changes are possible through your "My Trips" dashboard. Please note that airlines may charge a change fee plus any difference in fare price.'
    },
    {
      q: 'Are there hidden booking fees?',
      a: 'No. The price you see on the search results page includes all taxes and basic service fees. Optional add-ons like extra baggage or seat selection are clearly listed during the booking process.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto" id="faq-section">
      <h2 className="text-3xl font-extrabold text-[#00236f] text-center tracking-tight mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer outline-none group"
                id={`faq-btn-${idx}`}
              >
                <span className="font-bold text-slate-800 text-sm group-hover:text-[#00236f] transition-colors">
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 group-hover:text-[#00236f] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
