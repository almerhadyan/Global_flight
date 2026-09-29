import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, CreditCard, Lock, Ticket, QrCode, Plane, User, Phone, Mail } from 'lucide-react';
import { Flight, Booking } from '../types';

interface BookingFlowProps {
  flight: Flight;
  passengers: number;
  user: { name: string; email: string } | null;
  onBookingComplete: (booking: Booking) => void;
  onCancel: () => void;
}

export default function BookingFlow({
  flight,
  passengers,
  user,
  onBookingComplete,
  onCancel
}: BookingFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Step 1: Passenger details
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [passport, setPassport] = useState('');

  // Step 2: Seat details
  const [selectedSeat, setSelectedSeat] = useState<string>('4C');
  
  // Step 3: Payment details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  // Mock occupied seats
  const occupiedSeats = ['1A', '2D', '3B', '5A', '5B', '7C', '8F', '9A', '9D'];

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getSeatClass = (seat: string) => {
    const rowNum = parseInt(seat);
    if (rowNum <= 3) return 'Business';
    return 'Economy';
  };

  const getSeatCost = () => {
    const seatClass = getSeatClass(selectedSeat);
    return seatClass === 'Business' ? 120 : 0;
  };

  const calculateTotal = () => {
    return (flight.price * passengers) + getSeatCost();
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setStep(2);
  };

  const handleStep2Submit = () => {
    if (!selectedSeat) return;
    setStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpiry || !cardCVC) return;
    
    // Simulate payment loading
    setStep(4);
  };

  const handleFinish = () => {
    const finalBooking: Booking = {
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      flight,
      passengerName: name,
      passengerEmail: email,
      passengerPhone: phone,
      seatNumber: selectedSeat,
      bookingDate: new Date().toISOString(),
      status: 'active',
      departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
      pricePaid: calculateTotal()
    };
    onBookingComplete(finalBooking);
  };

  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-6" id="booking-flow-section">
      
      {/* Checkout Progress Stepper */}
      <div className="flex justify-between items-center max-w-md mx-auto mb-12">
        {[
          { label: 'Details', stepNum: 1 },
          { label: 'Seat', stepNum: 2 },
          { label: 'Payment', stepNum: 3 },
          { label: 'Confirm', stepNum: 4 }
        ].map((s) => (
          <div key={s.stepNum} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= s.stepNum 
                ? 'bg-[#00236f] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}>
              {step > s.stepNum ? <Check className="w-4.5 h-4.5" /> : s.stepNum}
            </div>
            <span className={`text-xs font-bold hidden sm:inline ${
              step === s.stepNum ? 'text-[#00236f]' : 'text-slate-400'
            }`}>
              {s.label}
            </span>
            {s.stepNum < 4 && <div className="h-0.5 w-8 bg-slate-200 hidden sm:block mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Wizard Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs">
          
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-[#00236f] mb-1">Passenger Details</h3>
                <p className="text-slate-400 text-xs font-medium">Please enter details exactly as they appear in travel documents.</p>
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 019-2834"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passport Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="A12345678"
                    value={passport}
                    onChange={(e) => setPassport(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                  />
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-8">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                  <button
                    type="submit"
                    className="bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-3 px-8 rounded-xl text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Continue to Seat Selection
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 text-center"
            >
              <div className="text-left">
                <h3 className="text-xl font-bold text-[#00236f] mb-1">Select Seat</h3>
                <p className="text-slate-400 text-xs font-medium">Choose an available seat on the seat map. Business class seats incur a surcharge.</p>
              </div>

              {/* Simulated Airplane Seat Map */}
              <div className="max-w-md mx-auto py-6 bg-slate-50/70 border border-slate-200/50 rounded-2xl relative">
                {/* Nose of Plane */}
                <div className="w-16 h-8 bg-slate-200/60 rounded-t-full mx-auto mb-6 flex items-center justify-center">
                  <Plane className="w-4 h-4 text-slate-400" />
                </div>

                <div className="grid grid-cols-7 gap-y-3.5 gap-x-2.5 px-4 items-center">
                  {/* Grid Column Headers */}
                  <span />
                  {cols.map((c) => (
                    <span key={c} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c}</span>
                  ))}

                  {rows.map((row) => (
                    <>
                      {/* Row Label */}
                      <span className="text-[10px] font-bold text-slate-400">{row}</span>

                      {/* Seats */}
                      {cols.map((col) => {
                        const seatCode = `${row}${col}`;
                        const isOccupied = occupiedSeats.includes(seatCode);
                        const isSelected = selectedSeat === seatCode;
                        const isBusiness = row <= 3;

                        return (
                          <button
                            key={col}
                            type="button"
                            disabled={isOccupied}
                            onClick={() => setSelectedSeat(seatCode)}
                            className={`w-8 h-8 rounded-lg text-[10px] font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                              isOccupied 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                : isSelected 
                                  ? 'bg-[#00236f] text-white ring-2 ring-indigo-300 scale-105'
                                  : isBusiness
                                    ? 'bg-blue-100/70 text-blue-700 hover:bg-blue-200 border border-blue-200/60'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50'
                            }`}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </>
                  ))}
                </div>

                {/* Seat Map Legend */}
                <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-slate-200/60 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-[#00236f] rounded-xs" />
                    Selected
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-blue-100 border border-blue-200 rounded-xs" />
                    Business Class
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-emerald-50 border border-emerald-100 rounded-xs" />
                    Economy
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-slate-200 rounded-xs" />
                    Occupied
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-8 text-left">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 hover:underline cursor-pointer"
                >
                  Back to Passenger Details
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Seat Chosen</span>
                    <span className="font-extrabold text-slate-700 text-sm">{selectedSeat} ({getSeatClass(selectedSeat)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleStep2Submit}
                    disabled={!selectedSeat}
                    className="bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-3 px-8 rounded-xl text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-[#00236f] mb-1">Payment Method</h3>
                <p className="text-slate-400 text-xs font-medium">All billing is fully secure and instant. Secure SSL connection.</p>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      maxLength={19}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">CVC / CVV</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="123"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        maxLength={3}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 mt-6 flex gap-3 text-slate-500">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-[11px] leading-relaxed font-semibold">
                    Encrypted checkout powered by 256-bit SSL transaction certificates. Your financial details are safe and never stored.
                  </p>
                </div>

                {/* Submit button */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-700 hover:underline cursor-pointer"
                  >
                    Back to Seats
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                    id="submit-payment-btn"
                  >
                    Pay ${calculateTotal()} Securely
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-7 h-7 stroke-[3px]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#00236f]">Flight Booked Successfully!</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Your payment was approved and your boarding pass has been issued.</p>
              </div>

              {/* Ticket UI Pass */}
              <div className="max-w-md mx-auto bg-[#00236f] text-white rounded-2xl overflow-hidden shadow-md text-left">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest">GlobalFlights ticket</h4>
                    <p className="text-sm font-bold mt-0.5">{flight.airline}</p>
                  </div>
                  <Plane className="w-5 h-5 opacity-50" />
                </div>
                
                <div className="p-6 grid grid-cols-3 gap-6 items-center">
                  <div>
                    <span className="text-[10px] font-bold text-white/50 block uppercase">Departs</span>
                    <span className="text-xl font-extrabold block mt-0.5">{flight.origin}</span>
                    <span className="text-[10px] text-white/70 block">{flight.originCity}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-white/40 uppercase">{flight.duration}</span>
                    <div className="h-0.5 w-full bg-white/20 my-1.5 relative flex items-center justify-center">
                      <Plane className="w-3 h-3 text-white absolute rotate-90" />
                    </div>
                    <span className="text-[9px] font-bold text-white/60 uppercase">Seat {selectedSeat}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-white/50 block uppercase">Arrives</span>
                    <span className="text-xl font-extrabold block mt-0.5">{flight.destination}</span>
                    <span className="text-[10px] text-white/70 block">{flight.destinationCity}</span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-900/20 border-t border-white/10 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-white/40 font-bold block uppercase text-[8px]">Passenger</span>
                    <span className="font-bold">{name}</span>
                  </div>
                  <div>
                    <span className="text-white/40 font-bold block uppercase text-[8px]">Flight Date</span>
                    <span className="font-bold">{getTomorrowString()}</span>
                  </div>
                  <div className="bg-white text-[#00236f] px-2.5 py-1 rounded-sm font-bold text-[10px]">
                    GF-OK
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-3.5 px-8 rounded-xl text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  id="done-booking-btn"
                >
                  View My Trips Dashboard
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* Sidebar Flight Reservation Summary Card */}
        <div className="lg:col-span-1 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-xs h-fit space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1">Selected Flight</span>
            <h4 className="text-base font-extrabold text-[#00236f]">{flight.origin} to {flight.destination}</h4>
            <p className="text-xs text-slate-500 font-medium">{flight.airline} • {flight.flightNumber}</p>
          </div>

          <div className="space-y-3 pb-4 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Departure</span>
              <span className="text-slate-700">{flight.departureTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Duration</span>
              <span className="text-slate-700">{flight.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Class</span>
              <span className="text-slate-700">Economy Class</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs font-semibold text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-400">Base Ticket ({passengers}x)</span>
              <span>${flight.price * passengers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Seat Selection ({selectedSeat})</span>
              <span>${getSeatCost()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Taxes &amp; Service fees</span>
              <span className="text-emerald-600">Free</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-slate-200 text-sm font-extrabold text-[#00236f]">
              <span>Grand Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
