import { motion } from 'motion/react';
import { ShieldCheck, Globe2, HeartHandshake } from 'lucide-react';

export default function WhyChoose() {
  const cards = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#00236f]" />,
      title: 'Best Price Guarantee',
      desc: "Find a cheaper flight elsewhere within 24 hours and we'll match the price and give you a travel credit."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#00236f]" />,
      title: 'Global Coverage',
      desc: 'Access over 500 airlines and thousands of destinations worldwide, from busy hubs to remote paradises.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#00236f]" />,
      title: '24/7 Support',
      desc: 'Our dedicated team is always here to help you with cancellations, rebookings, or any travel emergencies.'
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="why-choose-section">
      <div className="text-center mb-14">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold text-[#00236f] tracking-tight mb-4"
        >
          Why Choose GlobalFlights?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-xl mx-auto text-sm font-medium"
        >
          We combine technology with expert travel knowledge to give you the smoothest booking experience possible.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-8 bg-slate-50 border border-slate-200/50 rounded-2xl hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200/60 shadow-xs mb-6 group-hover:bg-[#00236f]/5 transition-colors">
              {card.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
