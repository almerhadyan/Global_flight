import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { POPULAR_DESTINATIONS, Destination } from '../data/flights';

interface DestinationsProps {
  onSelectDestination: (dest: Destination) => void;
  onViewAll: () => void;
}

export default function Destinations({ onSelectDestination, onViewAll }: DestinationsProps) {
  return (
    <section className="py-20 bg-slate-50/70" id="destinations-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00236f] uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              Inspiration
            </div>
            <h2 className="text-3xl font-extrabold text-[#00236f] tracking-tight">Explore Top Destinations</h2>
            <p className="text-slate-500 text-sm font-medium mt-1">Hand-picked adventures for every type of traveler.</p>
          </div>
          <button 
            onClick={onViewAll}
            className="text-sm font-bold text-[#00236f] hover:text-[#1e3a8a] flex items-center gap-1.5 group cursor-pointer hover:underline transition-all"
            id="view-all-destinations-btn"
          >
            View All Destinations 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => onSelectDestination(dest)}
              className="group relative overflow-hidden rounded-2xl h-96 shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Background Image */}
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dest.image} 
                alt={dest.name} 
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white w-full flex flex-col justify-end">
                <h4 className="text-2xl font-bold tracking-tight mb-1">{dest.name}</h4>
                <p className="text-xs font-medium text-slate-200/90 mb-3">{dest.tagline}</p>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Starting From</span>
                    <span className="font-extrabold text-lg text-white">${dest.minPrice}</span>
                  </div>
                  <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md group-hover:bg-[#00236f] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
