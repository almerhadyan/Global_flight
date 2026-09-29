import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Mail, MessageSquare, Send, CheckCircle, ShieldCheck, PhoneCall } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hello! I'm your GlobalFlights digital support agent. How can I help you with your travels today? You can ask me about refund policies, date changes, or baggage allowances!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSupportFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketMsg) return;
    setTicketSubmitted(true);
    setTicketName('');
    setTicketEmail('');
    setTicketMsg('');
    setTimeout(() => {
      setTicketSubmitted(false);
    }, 5000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputVal.trim();
    if (!cleanInput) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: cleanInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Dynamic responses based on keywords
    setTimeout(() => {
      const query = cleanInput.toLowerCase();
      let replyText = "I'm not quite sure about that. Could you please check our FAQ section below or submit a support ticket so our team can get back to you within the hour?";

      if (query.includes('refund') || query.includes('cancel')) {
        replyText = "Most tickets booked via GlobalFlights are fully refundable within 24 hours of purchase. After 24 hours, cancellations may incur fees from the operating airline. You can initiate a cancellation directly inside the 'My Trips' tab by clicking the 'Cancel' button next to your active booking.";
      } else if (query.includes('change') || query.includes('date') || query.includes('reschedule')) {
        replyText = "You can easily reschedule your flights! Go to the 'My Trips' page, locate your booking, and click the circular 'Reschedule' icon. You'll be prompted to pick a new date. Note that airline fare differences may apply.";
      } else if (query.includes('baggage') || query.includes('luggage') || query.includes('weight')) {
        replyText = "Standard Economy flight reservations include 1 complimentary carry-on baggage up to 10kg (22 lbs). Checked bags can be added during your booking checkout, or online directly on the airline's check-in portal up to 4 hours before departure.";
      } else if (query.includes('seat')) {
        replyText = "Yes! You can choose your seat (including aisle, window, or Business class upgrade) during the interactive Seat Map step of the booking checkout. To modify seats after a booking has been confirmed, please contact us with your reservation ID.";
      } else if (query.includes('hello') || query.includes('hi ') || query.includes('hey')) {
        replyText = "Hello! Hope you're having a wonderful day. How can I assist you with your flight reservations or cancellations?";
      } else if (query.includes('boarding') || query.includes('gate') || query.includes('pass')) {
        replyText = "Your digital Boarding Pass with an active QR code is issued instantly upon completing payment. You can view or print your active Boarding Pass anytime under the 'My Trips' dashboard tab.";
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 750);
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="support-section">
      <div className="border-b border-slate-200 pb-5 mb-10">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00236f] uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          Support Desk
        </div>
        <h2 className="text-3xl font-extrabold text-[#00236f] tracking-tight">Help Center &amp; Support Chat</h2>
        <p className="text-slate-400 text-xs font-medium mt-1">Get immediate answers to booking policies, or connect directly with our experts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chat Bot Terminal */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl flex flex-col h-[520px] shadow-xs overflow-hidden">
          {/* Chat Header */}
          <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center font-bold text-sm">
                GF
              </div>
              <div>
                <h4 className="text-xs font-bold">GlobalFlights Support Chat</h4>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  Online • Responds Instantly
                </p>
              </div>
            </div>
            <MessageSquare className="w-5 h-5 opacity-40" />
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col max-w-[80%] ${
                    m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                    m.sender === 'user' 
                      ? 'bg-[#00236f] text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 px-1">{m.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about refunds, date changes, or baggage..."
              className="flex-1 px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00236f] outline-none text-slate-800 font-semibold"
            />
            <button
              type="submit"
              className="bg-[#00236f] hover:bg-[#1e3a8a] text-white p-2.5 rounded-xl cursor-pointer transition-colors active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Email Ticket Form */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-xs h-fit">
          <div className="border-b border-slate-200 pb-4 mb-5">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#00236f]" />
              Submit Help Ticket
            </h3>
            <p className="text-slate-500 text-xs font-medium mt-1">If your issue is complex, drop us a line. Our agent will email you in 15 minutes.</p>
          </div>

          {ticketSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-3 bg-white border border-emerald-100 p-6 rounded-xl"
            >
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">Support Ticket Received!</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                Your support ticket has been registered. We have sent a confirmation copy to your email address. One of our human operators will be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSupportFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#00236f] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={ticketEmail}
                  onChange={(e) => setTicketEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#00236f] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Describe your issue</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you need help with (e.g. flight cancellation request, special meals assistance...)"
                  value={ticketMsg}
                  onChange={(e) => setTicketMsg(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#00236f] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-3 rounded-xl text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                id="support-submit-btn"
              >
                Send Help Request
              </button>
            </form>
          )}

          {/* Secure Trust Badge */}
          <div className="border-t border-slate-200 mt-6 pt-5 flex items-center justify-between text-xs text-slate-400 font-bold">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-500 animate-pulse" />
              1-800-GF-FLIGHT
            </span>
            <span className="flex items-center gap-1 text-slate-400 uppercase text-[10px]">
              <ShieldCheck className="w-4 h-4 text-[#00236f]" />
              Safe Verified
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
