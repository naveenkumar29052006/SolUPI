import prisma from '../../../lib/prisma';
import { 
  generateToken, 
  sanitizeUser, 
  setTokenCookie
} from '../../../lib/auth';
const { sendWelcomeEmail } = require('../../../lib/emailService');

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

    // Find user with email and OTP
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: 'Account is already verified. Please login.'
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
        error: 'Verification code has expired. Please request a new one.'
      });
    }

    // Verify user and clear OTP
    const verifiedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        otp: null,
        otpExpiry: null
      }
    });

    // Generate JWT token
    const token = generateToken({
      id: verifiedUser.id,
      email: verifiedUser.email,
      name: verifiedUser.name
    });

    // Set HTTP-only cookie
    setTokenCookie(res, token);

    // Send welcome email
    try {
      await sendWelcomeEmail(verifiedUser.email, verifiedUser.name);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the verification if welcome email fails
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Account verified successfully! Welcome to SolUPI! 🎉',
      user: sanitizeUser(verifiedUser),
      token,
      isLoggedIn: true
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}