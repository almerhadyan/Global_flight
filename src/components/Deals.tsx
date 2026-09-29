import { motion } from 'motion/react';
import { Tag, Calendar, ShieldCheck, Flame, Compass, ChevronRight } from 'lucide-react';
import { Destination } from '../data/flights';

interface DealsProps {
  onSelectDeal: (origin: string, destCode: string) => void;
}

export default function Deals({ onSelectDeal }: DealsProps) {
  const flightDeals = [
    {
      from: 'JFK',
      fromCity: 'New York',
      to: 'CDG',
      toCity: 'Paris',
      price: 349,
      originalPrice: 499,
      discount: '30% OFF',
      tag: 'Cheapest on Web',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=cover'
    },
    {
      from: 'LAX',
      fromCity: 'Los Angeles',
      to: 'NRT',
      toCity: 'Tokyo',
      price: 589,
      originalPrice: 720,
      discount: '18% OFF',
      tag: 'Trending Destination',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=2070&auto=format&fit=cover'
    },
    {
      from: 'SFO',
      fromCity: 'San Francisco',
      to: 'DPS',
      toCity: 'Bali',
      price: 499,
      originalPrice: 580,
      discount: '14% OFF',
      tag: 'Limited Seats Left',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=cover'
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="deals-section">
      <div className="border-b border-slate-200 pb-5 mb-10">
        <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
          <Flame className="w-4 h-4 fill-red-500" />
          Hot Deals
        </div>
        <h2 className="text-3xl font-extrabold text-[#00236f] tracking-tight">Active Flight Promotions</h2>
        <p className="text-slate-400 text-xs font-medium mt-1">Exclusive prices and limited-time discounts on premium flights.</p>
      </div>

      {/* Promos grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {flightDeals.map((deal, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            {/* Image Header with Badge */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={deal.image} 
                alt={`${deal.fromCity} to ${deal.toCity}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                {deal.discount}
              </div>

              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">Flight Route</span>
                <span className="text-base font-bold">{deal.fromCity} ({deal.from}) to {deal.toCity} ({deal.to})</span>
              </div>
            </div>

            {/* Deal content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {deal.tag}
                </span>
                <span className="text-slate-400">Round-trip Ticket</span>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Book this promo flight with our Best Price Guarantee. Includes carry-on baggage and flexible cancellation options.
              </p>

              <div className="flex justify-between items-end pt-4 border-t border-slate-100 mt-2">
                <div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Starting at</span>
                  <span className="text-slate-400 text-xs font-bold line-through">${deal.originalPrice}</span>
                  <span className="text-2xl font-extrabold text-[#00236f] block -mt-1">${deal.price}</span>
                </div>

                <button
                  onClick={() => onSelectDeal(deal.from, deal.to)}
                  className="bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  Book Deal
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promos Banner card */}
      <div className="bg-slate-50 border border-slate-200/80 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-800 flex items-center justify-center md:justify-start gap-1.5">
            <Tag className="w-5 h-5 text-[#00236f]" />
            Register for Promo Code Alerts
          </h3>
          <p className="text-slate-500 text-xs font-medium leading-relaxed">
            Join the GlobalFlights newsletter club to receive private flight promo coupons directly in your inbox. Save up to 40% on international flight fares!
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto max-w-sm">
          <input 
            type="email" 
            placeholder="you@example.com" 
            className="flex-1 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] outline-none"
          />
          <button 
            onClick={() => alert('Thanks for subscribing! Check your email for a 10% discount welcome coupon.')}
            className="bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold text-xs px-5 py-2.5 rounded-xl whitespace-nowrap cursor-pointer transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
