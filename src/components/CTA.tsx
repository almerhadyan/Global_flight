import { motion } from 'motion/react';

interface CTAProps {
  onSearchClick: () => void;
}

export default function CTA({ onSearchClick }: CTAProps) {
  return (
    <section className="py-16 px-6" id="cta-section">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-[#00236f] rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden"
      >
        {/* Dynamic circular background design shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 pointer-events-none" />
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 relative z-10 tracking-tight leading-tight">
          Ready to explore the world?
        </h2>
        <p className="text-white/80 text-base md:text-lg mb-8 relative z-10 max-w-xl mx-auto font-medium">
          Join over 10 million travelers who find their best flights with GlobalFlights every year.
        </p>
        <button 
          onClick={onSearchClick}
          className="bg-white text-[#00236f] hover:bg-slate-100 px-10 py-4 rounded-full font-bold text-base hover:scale-105 active:scale-95 shadow-sm hover:shadow-md transition-all relative z-10 cursor-pointer"
          id="cta-search-btn"
        >
          Find Your Flight Now
        </button>
      </motion.div>
    </section>
  );
}
