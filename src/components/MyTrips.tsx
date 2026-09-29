import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, QrCode, AlertTriangle, CheckCircle, HelpCircle, RefreshCw, XCircle } from 'lucide-react';
import { Booking } from '../types';

interface MyTripsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onChangeBookingDate: (id: string, newDate: string) => void;
  onSearchClick: () => void;
}

export default function MyTrips({
  bookings,
  onCancelBooking,
  onChangeBookingDate,
  onSearchClick
}: MyTripsProps) {
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<string | null>(null);

  const handleCancelConfirm = (id: string) => {
    onCancelBooking(id);
    setShowCancelModal(null);
  };

  const handleRescheduleConfirm = (id: string) => {
    if (!newDate) return;
    onChangeBookingDate(id, newDate);
    setShowRescheduleModal(null);
    setNewDate('');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 min-h-[60vh]" id="my-trips-section">
      <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#00236f] tracking-tight">My Trips</h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Manage, reschedule, or cancel your active airline reservations.</p>
        </div>
        {bookings.length > 0 && (
          <button
            onClick={onSearchClick}
            className="text-xs font-bold bg-[#00236f]/5 hover:bg-[#00236f]/10 text-[#00236f] py-2 px-4 rounded-xl transition-all cursor-pointer"
          >
            + Book Another Flight
          </button>
        )}
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs max-w-xl mx-auto mt-8">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">No active trips found</h3>
          <p className="text-slate-500 text-sm font-medium mt-1 leading-relaxed max-w-sm mx-auto">
            You don't have any upcoming trips scheduled. Start your next adventure by searching and booking flights today!
          </p>
          <button
            onClick={onSearchClick}
            className="bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-3 px-8 rounded-xl text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98] mt-6 cursor-pointer"
            id="empty-trips-search-btn"
          >
            Find Your Flight Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const isCancelled = booking.status === 'cancelled';
            const isActivePass = selectedBookingForPass === booking.id;

            return (
              <motion.div
                key={booking.id}
                layout
                className={`bg-white border rounded-2xl overflow-hidden shadow-xs transition-colors ${
                  isCancelled ? 'border-red-100 opacity-80' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header info */}
                <div className={`px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b ${
                  isCancelled ? 'bg-red-50/50 border-red-100/60' : 'bg-slate-50/50 border-slate-100'
                }`}>
                  <div className="flex items-center gap-2.5 text-xs font-bold">
                    <span className="text-slate-400">Reservation:</span>
                    <span className="text-slate-700 uppercase">{booking.id}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">Booked:</span>
                    <span className="text-slate-500">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                    isCancelled 
                      ? 'bg-red-50 text-red-600 border border-red-100' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    {isCancelled ? 'Cancelled' : 'Confirmed'}
                  </span>
                </div>

                {/* Ticket Details */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    
                    {/* Depart */}
                    <div className="text-left">
                      <span className="text-2xl font-extrabold text-slate-800">{booking.flight.origin}</span>
                      <p className="text-xs text-slate-400 font-bold uppercase mt-0.5">{booking.flight.originCity}</p>
                      <p className="text-xs text-slate-600 font-semibold mt-2">{booking.flight.departureTime}</p>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-slate-400">{booking.flight.duration}</span>
                      <div className="h-0.5 w-24 bg-slate-100 my-1.5 relative flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#00236f]/30 rounded-full" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        {booking.flight.airline}
                      </span>
                    </div>

                    {/* Arrive */}
                    <div className="text-right md:text-right">
                      <span className="text-2xl font-extrabold text-slate-800">{booking.flight.destination}</span>
                      <p className="text-xs text-slate-400 font-bold uppercase mt-0.5">{booking.flight.destinationCity}</p>
                      <p className="text-xs text-slate-600 font-semibold mt-2">{booking.flight.arrivalTime}</p>
                    </div>

                  </div>

                  {/* Metadata and Action */}
                  <div className="flex flex-wrap md:flex-col justify-between md:justify-center items-center md:items-end gap-4 w-full md:w-auto pt-5 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Passenger / Seat</span>
                      <span className="text-sm font-bold text-slate-700 block">{booking.passengerName}</span>
                      <span className="text-xs font-semibold text-slate-500 block mt-0.5">Seat {booking.seatNumber}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isCancelled && (
                        <>
                          <button
                            onClick={() => setSelectedBookingForPass(isActivePass ? null : booking.id)}
                            className="bg-slate-100 hover:bg-[#00236f]/10 text-slate-600 hover:text-[#00236f] font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer"
                          >
                            Boarding Pass
                          </button>
                          <button
                            onClick={() => { setShowRescheduleModal(booking.id); setNewDate(booking.departureDate); }}
                            className="bg-slate-100 hover:bg-amber-50 text-slate-500 hover:text-amber-600 border border-transparent hover:border-amber-100 font-bold py-2 px-3.5 rounded-xl text-xs transition-all cursor-pointer"
                            title="Reschedule Date"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setShowCancelModal(booking.id)}
                            className="bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 font-bold py-2 px-3.5 rounded-xl text-xs transition-all cursor-pointer"
                            title="Cancel Reservation"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Simulated Expandable Boarding Pass */}
                <AnimatePresence>
                  {isActivePass && !isCancelled && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 bg-[#00236f]/5 p-6 flex flex-col sm:flex-row items-center gap-6"
                    >
                      {/* Pass details */}
                      <div className="flex-1 space-y-4 text-xs font-semibold text-slate-600">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Flight Code</span>
                            <span className="text-sm font-bold text-slate-800 block">{booking.flight.flightNumber}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Departure Date</span>
                            <span className="text-sm font-bold text-slate-800 block">{formatDate(booking.departureDate)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Boarding Zone</span>
                            <span className="text-sm font-bold text-slate-800 block">Zone 3</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Gate Number</span>
                            <span className="text-sm font-bold text-slate-800 block">Gate B14</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Seat Number</span>
                            <span className="text-sm font-bold text-[#00236f] block">Seat {booking.seatNumber}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Class Category</span>
                            <span className="text-sm font-bold text-slate-800 block">Standard Cabin</span>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200/50 p-3 rounded-xl flex gap-2.5 items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-[10px] text-slate-500 font-medium">
                            Your reservation is active. Please arrive at the gate at least 45 minutes prior to departure.
                          </span>
                        </div>
                      </div>

                      {/* Barcode QR */}
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
                        <QrCode className="w-24 h-24 text-[#00236f]" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Boarding Pass QR</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center z-10 border border-slate-100"
            >
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Cancel Flight Booking?</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6">
                Are you sure you want to cancel this flight reservation? A full flight credit of refund will be issued to your account. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleCancelConfirm(showCancelModal)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rescheduling Date Picker Modal */}
      <AnimatePresence>
        {showRescheduleModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRescheduleModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full z-10 border border-slate-100"
            >
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 text-center mb-1">Reschedule Departure</h3>
              <p className="text-slate-500 text-xs text-center leading-relaxed font-medium mb-6">
                Choose your new flight date. Rescheduling is subject to airline seat availability.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">New Departure Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] focus:bg-white focus:border-transparent outline-none transition-all text-xs font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRescheduleModal(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRescheduleConfirm(showRescheduleModal)}
                  className="flex-1 bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Change Date
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
