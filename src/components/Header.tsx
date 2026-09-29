import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, RefreshCw, LogIn, User, LogOut, X, Menu, Ticket } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
}

export default function Header({ activeTab, setActiveTab, user, setUser }: HeaderProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginName, setLoginName] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (!loginName || !loginEmail) return;
      setUser({ name: loginName, email: loginEmail });
    } else {
      if (!loginEmail) return;
      setUser({ name: loginEmail.split('@')[0], email: loginEmail });
    }
    setShowLoginModal(false);
    setLoginName('');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto w-full">
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('explore')}
            className="text-2xl font-extrabold tracking-tight text-[#00236f] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
            id="logo-button"
          >
            GlobalFlights
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            {[
              { id: 'explore', label: 'Explore' },
              { id: 'deals', label: 'Deals' },
              { id: 'my-trips', label: 'My Trips', badge: true },
              { id: 'support', label: 'Support' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-2 px-1 transition-colors duration-150 cursor-pointer ${
                  activeTab === item.id 
                    ? 'text-[#00236f] font-semibold' 
                    : 'text-slate-500 hover:text-[#00236f]'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00236f]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Items */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-slate-500 mr-2">
              <button 
                title="Change Language"
                className="hover:text-[#00236f] transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
                id="lang-selector"
              >
                <Globe className="w-[18px] h-[18px]" />
              </button>
              <button 
                title="Change Currency"
                className="hover:text-[#00236f] transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
                id="curr-selector"
              >
                <RefreshCw className="w-[18px] h-[18px]" />
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveTab('my-trips')}
                  className="hidden md:flex items-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-full transition-colors cursor-pointer"
                  id="header-my-trips-btn"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#00236f]" />
                  My Trips
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00236f]/10 text-[#00236f] flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-slate-700">
                    {user.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    title="Log Out"
                    className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50 cursor-pointer"
                    id="logout-btn"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button 
                  onClick={() => { setIsSignUp(false); setShowLoginModal(true); }}
                  className="text-slate-600 hover:text-[#00236f] font-semibold text-sm py-2 px-3.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  id="login-trigger"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setIsSignUp(true); setShowLoginModal(true); }}
                  className="bg-[#00236f] hover:bg-[#1e3a8a] text-white px-4 py-2 rounded-lg text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                  id="signup-trigger"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-slate-600 hover:text-[#00236f] p-1 rounded-md cursor-pointer"
              id="mobile-menu-toggle"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
              id="mobile-nav-menu"
            >
              <div className="px-6 py-4 flex flex-col gap-3.5 font-medium text-sm">
                {[
                  { id: 'explore', label: 'Explore' },
                  { id: 'deals', label: 'Deals' },
                  { id: 'my-trips', label: 'My Trips' },
                  { id: 'support', label: 'Support' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`text-left py-2 px-1 transition-colors ${
                      activeTab === item.id 
                        ? 'text-[#00236f] font-semibold' 
                        : 'text-slate-500 hover:text-[#00236f]'
                    } cursor-pointer`}
                    id={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-8 z-10"
              id="auth-modal"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
                id="close-auth-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#00236f] mb-1">
                  {isSignUp ? 'Create your Account' : 'Welcome Back'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {isSignUp ? 'Sign up for exclusive deals and trip tracking' : 'Login to manage your bookings and trips'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#00236f] focus:border-transparent text-sm text-slate-800"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#00236f] focus:border-transparent text-sm text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
                    {!isSignUp && (
                      <button type="button" className="text-xs text-[#00236f] hover:underline">Forgot?</button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#00236f] focus:border-transparent text-sm text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold py-3 rounded-lg mt-2 active:scale-[0.98] transition-all cursor-pointer"
                  id="auth-submit-btn"
                >
                  {isSignUp ? 'Sign Up' : 'Log In'}
                </button>
              </form>

              <div className="text-center mt-6 pt-4 border-t border-slate-100 text-sm">
                <span className="text-slate-400">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </span>{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#00236f] font-semibold hover:underline cursor-pointer"
                  id="toggle-auth-mode"
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
