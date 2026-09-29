import { Share2, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenChat: () => void;
  onShare: () => void;
}

export default function Footer({ onNavClick, onOpenChat, onShare }: FooterProps) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200" id="app-footer">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <button 
            onClick={() => onNavClick('explore')}
            className="text-lg font-bold text-[#00236f] hover:opacity-85 cursor-pointer"
          >
            GlobalFlights
          </button>
          <p className="text-xs text-slate-400 font-medium">
            © 2026 GlobalFlights Inc. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400">
          <button onClick={() => onNavClick('support')} className="hover:text-[#00236f] cursor-pointer">About</button>
          <button onClick={() => onNavClick('support')} className="hover:text-[#00236f] cursor-pointer">Privacy</button>
          <button onClick={() => onNavClick('support')} className="hover:text-[#00236f] cursor-pointer">Terms</button>
          <button onClick={() => onNavClick('support')} className="hover:text-[#00236f] cursor-pointer">Careers</button>
          <button onClick={() => onNavClick('support')} className="hover:text-[#00236f] cursor-pointer">Help</button>
        </nav>

        {/* Floating action buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onShare}
            title="Share GlobalFlights"
            className="p-2.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-400 hover:text-[#00236f] transition-all cursor-pointer hover:scale-105"
            id="footer-share-btn"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onOpenChat}
            title="Chat Support"
            className="p-2.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-400 hover:text-[#00236f] transition-all cursor-pointer hover:scale-105"
            id="footer-chat-btn"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
