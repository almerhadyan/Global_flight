import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Destinations from './components/Destinations';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import BookingFlow from './components/BookingFlow';
import MyTrips from './components/MyTrips';
import Deals from './components/Deals';
import Support from './components/Support';
import { Flight, Booking, SearchQuery } from './types';
import { generateFlights, Destination } from './data/flights';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore'); // 'explore', 'deals', 'my-trips', 'support', 'search-results', 'booking'
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Load and save bookings from local storage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('globalflights_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('globalflights_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const [searchParams, setSearchParams] = useState<SearchQuery | null>(null);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [prefilledSearch, setPrefilledSearch] = useState<Partial<SearchQuery> | null>(null);

  // Scroll smoothly to top on tab changes or results search
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: SearchQuery) => {
    setSearchParams(query);
    const results = generateFlights(query.from, query.to, query.departureDate);
    setSearchResults(results);
    setActiveTab('search-results');
    scrollToTop();
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setActiveTab('booking');
    scrollToTop();
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    setActiveTab('my-trips');
    scrollToTop();
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
  };

  const handleChangeBookingDate = (id: string, newDate: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, departureDate: newDate } : b));
  };

  const handleSelectDestination = (dest: Destination) => {
    const defaultQuery: SearchQuery = {
      from: 'JFK',
      to: dest.code,
      departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0],
      passengers: 1
    };
    setPrefilledSearch(defaultQuery);
    handleSearch(defaultQuery);
  };

  const handleSelectDeal = (fromCode: string, toCode: string) => {
    const defaultQuery: SearchQuery = {
      from: fromCode,
      to: toCode,
      departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0],
      passengers: 1
    };
    setPrefilledSearch(defaultQuery);
    handleSearch(defaultQuery);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-[#00236f]/10 selection:text-[#00236f] flex flex-col justify-between">
      
      {/* Top Navigation Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          scrollToTop();
        }} 
        user={user} 
        setUser={setUser} 
      />

      {/* Main Container Content */}
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'explore' && (
              <>
                {/* Landing page Hero & Form */}
                <Hero 
                  onSearch={handleSearch} 
                  prefilledSearch={prefilledSearch} 
                />

                {/* Sub Hero Spacing Grid */}
                <div className="h-44 md:h-24 pointer-events-none" />

                {/* Guarantees Section */}
                <WhyChoose />

                {/* Inspiration section */}
                <Destinations 
                  onSelectDestination={handleSelectDestination} 
                  onViewAll={() => {
                    setActiveTab('deals');
                    scrollToTop();
                  }}
                />

                {/* Steps to adventure diagram (HTML Mockup Section) */}
                <section className="py-20 bg-white" id="steps-adventure">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                      <h2 className="text-3xl font-extrabold text-[#00236f] tracking-tight">Three Steps to Adventure</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 text-[#00236f] font-extrabold text-2xl border border-slate-200">
                          1
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Search</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-xs">
                          Enter your origin, destination, and dates into our powerful search engine.
                        </p>
                      </div>

                      <div className="flex flex-col items-center relative">
                        <div className="hidden md:block absolute top-8 -left-1/4 w-1/2 h-0.5 bg-slate-200/60" />
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 text-[#00236f] font-extrabold text-2xl border border-slate-200">
                          2
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Compare</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-xs">
                          Filter by price, duration, or airline to find the route that fits your needs.
                        </p>
                        <div className="hidden md:block absolute top-8 -right-1/4 w-1/2 h-0.5 bg-slate-200/60" />
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 text-[#00236f] font-extrabold text-2xl border border-slate-200">
                          3
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Book</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-xs">
                          Secure your tickets instantly through our encrypted checkout system.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Customer Reviews Section */}
                <Testimonials />

                {/* FAQ section */}
                <FAQ />

                {/* Call to Action Banner */}
                <CTA onSearchClick={() => {
                  setPrefilledSearch(null);
                  scrollToTop();
                }} />
              </>
            )}

            {activeTab === 'search-results' && searchParams && (
              <SearchResults 
                flights={searchResults}
                origin={searchParams.from}
                destination={searchParams.to}
                date={searchParams.departureDate}
                passengers={searchParams.passengers}
                onSelectFlight={handleSelectFlight}
                onBack={() => setActiveTab('explore')}
              />
            )}

            {activeTab === 'booking' && selectedFlight && searchParams && (
              <BookingFlow 
                flight={selectedFlight}
                passengers={searchParams.passengers}
                user={user}
                onBookingComplete={handleBookingComplete}
                onCancel={() => setActiveTab('search-results')}
              />
            )}

            {activeTab === 'my-trips' && (
              <MyTrips 
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onChangeBookingDate={handleChangeBookingDate}
                onSearchClick={() => {
                  setActiveTab('explore');
                  scrollToTop();
                }}
              />
            )}

            {activeTab === 'deals' && (
              <Deals onSelectDeal={handleSelectDeal} />
            )}

            {activeTab === 'support' && (
              <Support />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Brand Footer */}
      <Footer 
        onNavClick={(tab) => {
          setActiveTab(tab);
          scrollToTop();
        }}
        onOpenChat={() => {
          setActiveTab('support');
          scrollToTop();
        }}
        onShare={() => {
          const shareText = "GlobalFlights — Fly Anywhere in the World — Easy, Fast & Affordable!";
          if (navigator.share) {
            navigator.share({
              title: 'GlobalFlights',
              text: shareText,
              url: window.location.href,
            }).catch(() => {});
          } else {
            navigator.clipboard.writeText(`${shareText} (${window.location.href})`);
            alert('App link and share details copied to clipboard!');
          }
        }}
      />
    </div>
  );
}
