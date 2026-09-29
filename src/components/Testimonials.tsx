import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Verified Customer',
      initials: 'SJ',
      avatarColor: 'bg-[#00236f]/10 text-[#00236f]',
      text: '"GlobalFlights made my trip to Bali so easy. The price was significantly lower than other sites and the booking was seamless."'
    },
    {
      name: 'Mark Thompson',
      role: 'Business Traveler',
      initials: 'MT',
      avatarColor: 'bg-emerald-500/10 text-emerald-600',
      text: '"24/7 support is actually 24/7. They helped me rebook a cancelled flight in minutes at 3 AM. Lifesavers!"'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Digital Nomad',
      initials: 'ER',
      avatarColor: 'bg-amber-500/10 text-amber-600',
      text: '"Clean interface, no hidden fees. Exactly what a travel site should be. Will definitely use again."'
    }
  ];

  return (
    <section className="py-20 bg-white" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-[#00236f] tracking-tight mb-2"
          >
            Trusted by Millions of Travelers
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 bg-slate-50 border border-slate-200/40 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1.5 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm font-medium italic leading-relaxed mb-6">
                  {rev.text}
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${rev.avatarColor}`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{rev.name}</h4>
                  <p className="text-xs text-slate-400 font-semibold">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
