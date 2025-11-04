import prisma from '../../../lib/prisma';
import { 
  generateToken, 
  sanitizeUser, 
  setTokenCookie
} from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Email and OTP are required'
      });
    }

    // Find user with email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        error: 'Account not verified. Please complete signup verification first.'
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code'
      });
    }

    // Check if OTP has expired
    if (!user.otpExpiry || new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired. Please login again.'
      });
    }

    // Clear OTP and update last login
    const loggedInUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        otp: null,
        otpExpiry: null,
        updatedAt: new Date()
      }
    });

    // Generate JWT token
    const token = generateToken({
      id: loggedInUser.id,
      email: loggedInUser.email,
      name: loggedInUser.name
    });

    // Set HTTP-only cookie
    setTokenCookie(res, token);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Login successful! Welcome back to SolUPI! 🎉',
      user: sanitizeUser(loggedInUser),
      token,
      isLoggedIn: true
    });

  } catch (error) {
    console.error('Login OTP verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}