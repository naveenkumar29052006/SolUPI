'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';

export default function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Handle successful signup
        console.log('Signup successful:', data);
        onSuccess?.(data);
      } else {
        setErrors({ general: data.error || 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General error */}
      {errors.general && (
        <motion.div
          className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errors.general}
        </motion.div>
      )}

      {/* Name field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg bg-white/5 border ${
              errors.name ? 'border-red-500/50' : 'border-white/10'
            } pl-10 pr-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
        </div>
        {errors.name && (
          <motion.p
            className="text-xs text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.name}
          </motion.p>
        )}
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg bg-white/5 border ${
              errors.email ? 'border-red-500/50' : 'border-white/10'
            } pl-10 pr-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <motion.p
            className="text-xs text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full rounded-lg bg-white/5 border ${
              errors.password ? 'border-red-500/50' : 'border-white/10'
            } pl-10 pr-12 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            placeholder="Create a strong password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <motion.p
            className="text-xs text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.password}
          </motion.p>
        )}
        <div className="text-xs text-gray-400">
          Password must contain uppercase, lowercase, and number
        </div>
      </div>

      {/* Confirm Password field */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full rounded-lg bg-white/5 border ${
              errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'
            } pl-10 pr-12 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.p
            className="text-xs text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.confirmPassword}
          </motion.p>
        )}
      </div>

      {/* Terms checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/20 focus:ring-2"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
          I agree to the{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
            Privacy Policy
          </a>
        </label>
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-purple-500 to-green-500 p-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              Creating account...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Create Account
            </>
          )}
        </span>
      </motion.button>
    </form>
  );
}
