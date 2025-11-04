'use client';

import { useState } from 'react';
import AuthCard from '../../components/auth/AuthCard';

export default function AppPage() {
  const [showAuth, setShowAuth] = useState(true);
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(true);
  };

  if (showAuth && !user) {
    return (
      <main className="min-h-screen bg-black">
        <AuthCard onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="container text-center py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="gradient-text">SolUPI</span>
        </h1>
        {user ? (
          <div className="space-y-4">
            <p className="text-gray-400 max-w-2xl mx-auto">
              Welcome back, {user.name || 'User'}! Ready to trade some SOL?
            </p>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-green-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400 max-w-2xl mx-auto">
              This is where the trading interface will be. Authentication required.
            </p>
            <button
              onClick={() => setShowAuth(true)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-green-500 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
