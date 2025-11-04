import prisma from '../../../lib/prisma';
import { 
  hashPassword, 
  sanitizeUser, 
  validateEmail, 
  validatePassword
} from '../../../lib/auth';
const { sendSignupOTP, generateOTP, generateOTPExpiry } = require('../../../lib/emailService');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required'
      });
    }

    // Validate name
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Name must be at least 2 characters long'
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: passwordValidation.errors[0] // Return first error
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();

    // Create user with OTP (unverified)
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        isVerified: false,
        otp: otp,
        otpExpiry: otpExpiry
      }
    });

    // Send OTP email
    try {
      await sendSignupOTP(user.email, user.name, otp);
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      // Delete the user if email fails
      await prisma.user.delete({ where: { id: user.id } });
      return res.status(500).json({
        success: false,
        error: 'Failed to send verification email. Please try again.'
      });
    }

    // Return success response (no token yet - user needs to verify OTP)
    return res.status(201).json({
      success: true,
      message: 'Check your email for a 6-digit verification code to complete your registration.',
      requiresVerification: true,
      email: user.email,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: false
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle Prisma unique constraint violations
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: 'An account with this email already exists'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}