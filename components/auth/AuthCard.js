'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthCard({ onClose }) {
  const [activeTab, setActiveTab] = useState('login');
  const [currentStep, setCurrentStep] = useState('auth'); // 'auth', 'otp-verification', 'success'
  const [otpData, setOtpData] = useState(null); // { email, isSignup, user }
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleAuthSuccess = (data) => {
    if (data.requiresVerification) {
      setOtpData({ 
        email: data.email, 
        isSignup: activeTab === 'signup',
        user: data.user 
      });
      setCurrentStep('otp-verification');
      setMessage(data.message);
    } else if (data.isLoggedIn) {
      setMessage(data.message);
      setCurrentStep('success');
      setTimeout(() => {
        router.push('/welcome');
      }, 2000);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const endpoint = otpData.isSignup ? '/api/auth/verify-signup-otp' : '/api/auth/verify-login-otp';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: otpData.email, 
          otp: otp.replace(/\s/g, '') 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setCurrentStep('success');
        setTimeout(() => {
          router.push('/welcome');
        }, 2000);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatOtp = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{3})(\d{0,3})/, '$1 $2').trim();
    return formatted;
  };

  const handleOtpChange = (e) => {
    const formatted = formatOtp(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 6) {
      setOtp(formatted);
    }
  };

  const goBack = () => {
    setCurrentStep('auth');
    setOtpData(null);
    setOtp('');
    setMessage('');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -inset-[100%] opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(20, 241, 149, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Close button */}
          <motion.button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-all duration-200 hover:bg-white/20 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4" />
          </motion.button>

          {/* Back button for OTP step */}
          {currentStep === 'otp-verification' && (
            <motion.button
              onClick={goBack}
              className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-all duration-200 hover:bg-white/20 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.button>
          )}

          {/* Header */}
          <div className="relative z-10 px-6 pt-8 pb-6 text-center">
            <AnimatePresence mode="wait">
              {currentStep === 'auth' && (
                <motion.div
                  key="auth-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl font-black gradient-text mb-2">
                    Welcome to SolUPI
                  </h1>
                  <p className="text-sm text-gray-400 mb-6">
                    {activeTab === 'login' 
                      ? 'Sign in to your account to continue trading'
                      : 'Create your account to start trading SOL'
                    }
                  </p>
                  
                  {/* Tab switcher */}
                  <div className="relative mx-auto w-fit">
                    <div className="flex rounded-lg bg-white/5 p-1">
                      <motion.button
                        className={`relative px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                          activeTab === 'login' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                        onClick={() => setActiveTab('login')}
                        whileTap={{ scale: 0.98 }}
                      >
                        {activeTab === 'login' && (
                          <motion.div
                            className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/30 to-green-500/30"
                            layoutId="activeTab"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative">Sign In</span>
                      </motion.button>
                      <motion.button
                        className={`relative px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                          activeTab === 'signup' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                        onClick={() => setActiveTab('signup')}
                        whileTap={{ scale: 0.98 }}
                      >
                        {activeTab === 'signup' && (
                          <motion.div
                            className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/30 to-green-500/30"
                            layoutId="activeTab"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative">Sign Up</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {currentStep === 'otp-verification' && (
                <motion.div
                  key="otp-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h1 className="text-2xl font-black gradient-text mb-2">
                    Check Your Email
                  </h1>
                  <p className="text-sm text-gray-400">
                    We sent a 6-digit code to
                    <br />
                    <span className="text-green-400 font-medium">{otpData?.email}</span>
                  </p>
                </motion.div>
              )}
              
              {currentStep === 'success' && (
                <motion.div
                  key="success-header"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                  <h1 className="text-2xl font-black gradient-text mb-2">
                    {otpData?.isSignup ? 'Welcome to SolUPI! 🎉' : 'Welcome Back! 🎉'}
                  </h1>
                  <p className="text-sm text-gray-400">
                    {message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 pb-8">
            <AnimatePresence mode="wait">
              {currentStep === 'auth' && (
                <motion.div
                  key="auth-forms"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'login' ? (
                    <LoginForm onSuccess={handleAuthSuccess} />
                  ) : (
                    <SignupForm onSuccess={handleAuthSuccess} />
                  )}
                </motion.div>
              )}
              
              {currentStep === 'otp-verification' && (
                <motion.div
                  key="otp-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="123 456"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all text-center text-2xl font-mono tracking-widest"
                        autoFocus
                        required
                      />
                      <p className="text-xs text-gray-400 mt-2 text-center">
                        Enter the 6-digit code sent to your email
                      </p>
                    </div>
                    
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-sm text-red-400"
                      >
                        {message}
                      </motion.div>
                    )}
                    
                    <motion.button
                      type="submit"
                      disabled={isLoading || otp.replace(/\s/g, '').length !== 6}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-green-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-green-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Verifying...
                        </div>
                      ) : (
                        'Verify Code'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
              
              {currentStep === 'success' && (
                <motion.div
                  key="success-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm mb-4">
                    Taking you to your welcome page...
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-600 to-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer - only show during auth step */}
          {currentStep === 'auth' && (
            <div className="relative z-10 border-t border-white/10 px-6 py-4 text-center">
              <p className="text-xs text-gray-400">
                By continuing, you agree to our{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}