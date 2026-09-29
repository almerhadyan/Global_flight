import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowRightLeft, MapPin } from 'lucide-react';
import { AIRPORTS, searchAirports, Airport } from '../data/flights';
import { SearchQuery } from '../types';

interface HeroProps {
  onSearch: (query: SearchQuery) => void;
  prefilledSearch: Partial<SearchQuery> | null;
}

export default function Hero({ onSearch, prefilledSearch }: HeroProps) {
  const [fromQuery, setFromQuery] = useState('New York (JFK)');
  const [fromAirport, setFromAirport] = useState<Airport | null>(
    AIRPORTS.find(a => a.code === 'JFK') || AIRPORTS[0]
  );
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);

  const [toQuery, setToQuery] = useState('Paris (CDG)');
  const [toAirport, setToAirport] = useState<Airport | null>(
    AIRPORTS.find(a => a.code === 'CDG') || AIRPORTS[3]
  );
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Set default dates: tomorrow and 7 days after tomorrow
  const getTomorrowString = (offset = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  const [departureDate, setDepartureDate] = useState(getTomorrowString(1));
  const [returnDate, setReturnDate] = useState(getTomorrowString(8));
  const [passengers, setPassengers] = useState(1);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Apply pre-filled searches (like clicking a destination card)
  useEffect(() => {
    if (prefilledSearch) {
      if (prefilledSearch.from) {
        const port = AIRPORTS.find(a => a.code === prefilledSearch.from || a.city.toLowerCase() === prefilledSearch.from?.toLowerCase());
        if (port) {
          setFromAirport(port);
          setFromQuery(`${port.city} (${port.code})`);
        } else {
          setFromQuery(prefilledSearch.from);
        }
      }
      if (prefilledSearch.to) {
        const port = AIRPORTS.find(a => a.code === prefilledSearch.to || a.city.toLowerCase() === prefilledSearch.to?.toLowerCase());
        if (port) {
          setToAirport(port);
          setToQuery(`${port.city} (${port.code})`);
        } else {
          setToQuery(prefilledSearch.to);
        }
      }
      if (prefilledSearch.departureDate) setDepartureDate(prefilledSearch.departureDate);
      if (prefilledSearch.returnDate) setReturnDate(prefilledSearch.returnDate);
      if (prefilledSearch.passengers) setPassengers(prefilledSearch.passengers);
    }
  }, [prefilledSearch]);

  // Handle outside clicks to close suggestion dropdowns
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSwap = () => {
    const tempAirport = fromAirport;
    const tempQuery = fromQuery;

    setFromAirport(toAirport);
    setFromQuery(toQuery);

    setToAirport(tempAirport);
    setToQuery(tempQuery);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAirport || !toAirport) return;
    
    onSearch({
      from: fromAirport.code,
      to: toAirport.code,
      departureDate,
      returnDate,
      passengers
    });
  };

  const fromSuggestions = searchAirports(fromQuery.split(' (')[0]);
  const toSuggestions = searchAirports(toQuery.split(' (')[0]);

  return (
    <section className="relative h-[640px] flex items-center justify-center pt-16 overflow-hidden">
      {/* Immersive airplane travel background with dusk soft blue gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=cover" 
          alt="Panoramic flight skyline at dusk" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00236f]/60 via-[#00236f]/40 to-[#f7f9fb]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
        >
          Fly Anywhere in the World — Easy, Fast & Affordable
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto"
        >
          Discover seamless travel with real-time pricing, global connections, and premium support at your fingertips.
        </motion.p>
      </div>

      {/* Flight Search Widget Container overlapping the Hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200/60"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-end">
              
              {/* Origin Field */}
              <div ref={fromRef} className="relative lg:col-span-3 space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">From</label>
                <div className="relative">
                  <PlaneTakeoff className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Origin City or Airport"
                    value={fromQuery}
                    onChange={(e) => {
                      setFromQuery(e.target.value);
                      setShowFromSuggestions(true);
                    }}
                    onFocus={() => setShowFromSuggestions(true)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium text-slate-800"
                    id="search-from-input"
                  />
                </div>

                {/* Autocomplete List */}
                <AnimatePresence>
                  {showFromSuggestions && fromSuggestions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200/80 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                    >
                      {fromSuggestions.map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          onClick={() => {
                            setFromAirport(airport);
                            setFromQuery(`${airport.city} (${airport.code})`);
                            setShowFromSuggestions(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left text-xs cursor-pointer border-b border-slate-50 last:border-0"
                        >
                          <MapPin className="w-4 h-4 text-[#00236f] flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-bold text-slate-700">{airport.city} ({airport.code})</div>
                            <div className="text-slate-400 font-medium text-[10px]">{airport.name}</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center items-center lg:col-span-1 h-11">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="bg-slate-100 hover:bg-[#00236f] text-slate-500 hover:text-white p-2.5 rounded-full border border-slate-200/60 shadow-xs hover:shadow-md cursor-pointer transition-all active:scale-90"
                  title="Swap Origin and Destination"
                  id="swap-airports-btn"
                >
                  <ArrowRightLeft className="w-4 h-4 rotate-90 lg:rotate-0" />
                </button>
              </div>

              {/* Destination Field */}
              <div ref={toRef} className="relative lg:col-span-3 space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">To</label>
                <div className="relative">
                  <PlaneLanding className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Destination City or Airport"
                    value={toQuery}
                    onChange={(e) => {
                      setToQuery(e.target.value);
                      setShowToSuggestions(true);
                    }}
                    onFocus={() => setShowToSuggestions(true)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium text-slate-800"
                    id="search-to-input"
                  />
                </div>

                {/* Autocomplete List */}
                <AnimatePresence>
                  {showToSuggestions && toSuggestions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200/80 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                    >
                      {toSuggestions.map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          onClick={() => {
                            setToAirport(airport);
                            setToQuery(`${airport.city} (${airport.code})`);
                            setShowToSuggestions(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left text-xs cursor-pointer border-b border-slate-50 last:border-0"
                        >
                          <MapPin className="w-4 h-4 text-[#00236f] flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-bold text-slate-700">{airport.city} ({airport.code})</div>
                            <div className="text-slate-400 font-medium text-[10px]">{airport.name}</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Departure Date */}
              <div className="lg:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full pl-11 pr-3 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-xs font-medium text-slate-800"
                    id="search-departure-input"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div className="lg:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full pl-11 pr-3 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-xs font-medium text-slate-800"
                    id="search-return-input"
                  />
                </div>
              </div>

              {/* Passengers Selection */}
              <div className="lg:col-span-1 space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full pl-9 pr-2 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-xs font-semibold text-slate-800 appearance-none cursor-pointer"
                    id="search-passengers-select"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Find Flight CTA Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!fromAirport || !toAirport}
                className="w-full sm:w-auto bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                id="search-submit-btn"
              >
                Find My Flight
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
