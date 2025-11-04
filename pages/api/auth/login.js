import prisma from '../../../lib/prisma';
import { 
  comparePassword, 
  sanitizeUser, 
  validateEmail
} from '../../../lib/auth';
const { sendLoginOTP, generateOTP, generateOTPExpiry } = require('../../../lib/emailService');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        error: 'Please verify your email first. Check your inbox for verification code.'
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Generate OTP for login verification
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();

    // Update user with login OTP
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        otp: otp,
        otpExpiry: otpExpiry,
        updatedAt: new Date() 
      }
    });

    // Send login OTP email
    try {
      await sendLoginOTP(user.email, user.name, otp);
    } catch (emailError) {
      console.error('Failed to send login OTP email:', emailError);
      return res.status(500).json({
        success: false,
        error: 'Failed to send verification email. Please try again.'
      });
    }

    // Return success response (no token yet - user needs to verify OTP)
    return res.status(200).json({
      success: true,
      message: 'Check your email for a 6-digit security code to complete login.',
      requiresVerification: true,
      email: user.email,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: true
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}
