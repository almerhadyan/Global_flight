import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, SlidersHorizontal, Shield, ChevronDown, Tag, Plane, HelpCircle } from 'lucide-react';
import { Flight } from '../types';
import { getAirportByCode } from '../data/flights';

interface SearchResultsProps {
  flights: Flight[];
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  onSelectFlight: (flight: Flight) => void;
  onBack: () => void;
}

type SortOption = 'price' | 'duration' | 'departure';

export default function SearchResults({
  flights,
  origin,
  destination,
  date,
  passengers,
  onSelectFlight,
  onBack
}: SearchResultsProps) {
  const [selectedStops, setSelectedStops] = useState<string>('all'); // 'all', 'direct', '1stop'
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('price');
  
  const fromAirport = getAirportByCode(origin);
  const toAirport = getAirportByCode(destination);

  // Dynamic limits for price slider
  const prices = flights.map(f => f.price);
  const minPrice = useMemo(() => (prices.length ? Math.min(...prices) : 0), [prices]);
  const maxPrice = useMemo(() => (prices.length ? Math.max(...prices) : 1000), [prices]);
  const [priceLimit, setPriceLimit] = useState<number>(maxPrice);

  // Get unique airlines from results
  const airlinesList = useMemo(() => {
    const list = flights.map(f => f.airline);
    return Array.from(new Set(list));
  }, [flights]);

  // Sync price limit if flights change
  useMemo(() => {
    setPriceLimit(maxPrice);
  }, [maxPrice]);

  const toggleAirline = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  const parseDurationInMinutes = (durStr: string): number => {
    const hoursMatch = durStr.match(/(\d+)h/);
    const minsMatch = durStr.match(/(\d+)m/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const mins = minsMatch ? parseInt(minsMatch[1]) : 0;
    return (hours * 60) + mins;
  };

  const parseTimeInMinutes = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Filtered and Sorted flights
  const processedFlights = useMemo(() => {
    let result = [...flights];

    // Stops filter
    if (selectedStops === 'direct') {
      result = result.filter(f => f.stops === 0);
    } else if (selectedStops === '1stop') {
      result = result.filter(f => f.stops === 1);
    }

    // Price limit
    result = result.filter(f => f.price <= priceLimit);

    // Airline filter
    if (selectedAirlines.length > 0) {
      result = result.filter(f => selectedAirlines.includes(f.airline));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      if (sortBy === 'duration') {
        return parseDurationInMinutes(a.duration) - parseDurationInMinutes(b.duration);
      }
      if (sortBy === 'departure') {
        return parseTimeInMinutes(a.departureTime) - parseTimeInMinutes(b.departureTime);
      }
      return 0;
    });

    return result;
  }, [flights, selectedStops, selectedAirlines, priceLimit, sortBy]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="search-results-section">
      {/* Back & Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-[#00236f] text-sm font-bold transition-all cursor-pointer bg-slate-100 hover:bg-slate-200/80 py-2 px-4 rounded-xl"
          id="back-to-home-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </button>

        <div className="text-right">
          <h2 className="text-xl font-extrabold text-[#00236f]" id="results-route-header">
            {fromAirport.city} ({origin}) to {toAirport.city} ({destination})
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {formatDate(date)} • {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white border border-slate-200/75 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <span className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#00236f]" />
                Filters
              </span>
              <button 
                onClick={() => {
                  setSelectedStops('all');
                  setSelectedAirlines([]);
                  setPriceLimit(maxPrice);
                }}
                className="text-xs text-slate-400 hover:text-[#00236f] font-semibold hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Stops Filter */}
            <div className="space-y-3 pb-5 border-b border-slate-100 mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Stops</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'direct', label: 'Direct' },
                  { id: '1stop', label: '1 Stop' }
                ].map(stop => (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => setSelectedStops(stop.id)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedStops === stop.id 
                        ? 'bg-[#00236f] text-white border-transparent' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {stop.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Limit Slider */}
            <div className="space-y-3 pb-5 border-b border-slate-100 mb-5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Max Price</label>
                <span className="text-sm font-extrabold text-[#00236f]">${priceLimit}</span>
              </div>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#00236f]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>

            {/* Airlines Checkboxes */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Airlines</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {airlinesList.map((airline) => (
                  <label key={airline} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer py-0.5 hover:text-[#00236f]">
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => toggleAirline(airline)}
                      className="rounded border-slate-300 text-[#00236f] focus:ring-[#00236f] w-3.5 h-3.5"
                    />
                    {airline}
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Secure Trust Badge */}
          <div className="bg-[#00236f]/5 rounded-2xl p-5 border border-[#00236f]/10 flex gap-3.5">
            <Shield className="w-5 h-5 text-[#00236f] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#00236f]">Secure Checkout</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                All flight tickets are encrypted and protected by the GlobalFlights safe booking system. No hidden credit card fees.
              </p>
            </div>
          </div>
        </div>

        {/* Results list */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Sorting Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-400">
              Showing <span className="font-bold text-slate-700">{processedFlights.length}</span> flight matches
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Sort by:</span>
              <div className="flex gap-1">
                {[
                  { id: 'price', label: 'Cheapest' },
                  { id: 'duration', label: 'Fastest' },
                  { id: 'departure', label: 'Departure' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id as SortOption)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sortBy === opt.id 
                        ? 'bg-slate-100 text-[#00236f]' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Flights list */}
          <div className="space-y-4">
            {processedFlights.length > 0 ? (
              processedFlights.map((flight) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200 hover:border-[#00236f]/50 hover:shadow-md rounded-2xl p-6 transition-all"
                >
                  <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
                    
                    {/* Airline details */}
                    <div className="flex items-center gap-3.5 self-start md:self-center w-full md:w-auto">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-[#00236f]">
                        {flight.airlineCode}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{flight.airline}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{flight.flightNumber} • Economy</p>
                      </div>
                    </div>

                    {/* Flight Timeline Route */}
                    <div className="flex-1 w-full grid grid-cols-3 items-center max-w-sm">
                      {/* Departure */}
                      <div className="text-left">
                        <span className="text-base font-extrabold text-slate-800 block">{flight.departureTime}</span>
                        <span className="text-[11px] text-slate-400 font-bold block mt-0.5">{flight.origin}</span>
                      </div>

                      {/* Flight Path Indicator */}
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {flight.duration}
                        </span>
                        
                        <div className="relative w-full flex items-center justify-center py-2">
                          <div className="absolute h-0.5 w-full bg-slate-100" />
                          {flight.stops === 1 && (
                            <div className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full hover:scale-125 transition-transform" title="1 stop layover" />
                          )}
                          <Plane className="w-3.5 h-3.5 text-[#00236f] bg-white absolute" />
                        </div>

                        <span className={`text-[9px] font-extrabold uppercase tracking-widest ${flight.stops === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {flight.stops === 0 ? 'Direct' : '1 Stop'}
                        </span>
                      </div>

                      {/* Arrival */}
                      <div className="text-right">
                        <span className="text-base font-extrabold text-slate-800 block">{flight.arrivalTime}</span>
                        <span className="text-[11px] text-slate-400 font-bold block mt-0.5">{flight.destination}</span>
                      </div>
                    </div>

                    {/* Booking price and action */}
                    <div className="flex justify-between md:justify-end items-center gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-left md:text-right">
                        <span className="text-2xl font-extrabold text-[#00236f]">${flight.price * passengers}</span>
                        <p className="text-[10px] text-slate-400 font-semibold">Total for {passengers} guest{passengers > 1 ? 's' : ''}</p>
                      </div>
                      <button
                        onClick={() => onSelectFlight(flight)}
                        className="bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.97] cursor-pointer"
                        id={`select-flight-${flight.flightNumber}`}
                      >
                        Select Flight
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">No flights match your filters</h3>
                <p className="text-slate-400 text-sm font-medium mt-1">Try adjusting the price slider or checking for other airlines.</p>
                <button
                  onClick={() => {
                    setSelectedStops('all');
                    setSelectedAirlines([]);
                    setPriceLimit(maxPrice);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs mt-4 cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
