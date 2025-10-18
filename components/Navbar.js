'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl font-bold gradient-text drop-shadow-lg">SolUPI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#home" className="text-gray-200 hover:text-white transition-all duration-300 px-5 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm font-medium">
              Home
            </a>
            <a href="#features" className="text-gray-200 hover:text-white transition-all duration-300 px-5 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-200 hover:text-white transition-all duration-300 px-5 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm font-medium">
              How It Works
            </a>
            <a href="#faq" className="text-gray-200 hover:text-white transition-all duration-300 px-5 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm font-medium">
              FAQ
            </a>
            <button className="px-8 py-3 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-bold rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60 backdrop-blur-sm">
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col space-y-2 bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <a href="#home" className="text-gray-200 hover:text-white transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/10 font-medium">
                Home
              </a>
              <a href="#features" className="text-gray-200 hover:text-white transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/10 font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-200 hover:text-white transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/10 font-medium">
                How It Works
              </a>
              <a href="#faq" className="text-gray-200 hover:text-white transition-all duration-300 px-4 py-3 rounded-lg hover:bg-white/10 font-medium">
                FAQ
              </a>
              <button className="px-6 py-3 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-bold rounded-lg hover:opacity-90 transition-all mt-3 shadow-lg shadow-purple-500/30">
                Launch App
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

