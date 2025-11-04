const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create transporter for Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    family: 4, // Force IPv4
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password, not regular password
    },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates for development
    }
  });
};

// Generate 6-digit OTP
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

// Generate OTP expiration time (10 minutes from now)
function generateOTPExpiry() {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
}

// Verify if OTP is still valid
function isOTPValid(otpExpiresAt) {
  return new Date() < new Date(otpExpiresAt);
}

// Send signup OTP email
async function sendSignupOTP(email, name, otp) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '� Welcome to SolUPI - Verify Your Account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to SolUPI</title>
        </head>
        <body style="margin: 0; padding: 20px; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(153, 69, 255, 0.1);">
            
            <!-- Animated Header -->
            <div style="background: linear-gradient(135deg, #9945FF 0%, #14F195 50%, #9945FF 100%); background-size: 200% 200%; padding: 40px 30px; text-align: center; position: relative;">
              <div style="position: relative; z-index: 1;">
                <h1 style="margin: 0; font-size: 32px; font-weight: 900; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  Welcome to SolUPI!
                </h1>
                <p style="margin: 15px 0 0 0; font-size: 18px; color: rgba(255,255,255,0.9); font-weight: 500;">
                  The fastest way to buy Solana with UPI
                </p>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 50px 40px;">
              <!-- Greeting -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #14F195; margin: 0 0 15px 0; font-size: 24px; font-weight: 700;">
                  Hi ${name || 'there'}! 👋
                </h2>
                <p style="font-size: 17px; line-height: 1.6; margin: 0; color: #e1e1e1;">
                  Thanks for joining SolUPI! You're just one step away from buying Solana instantly.
                </p>
              </div>
              
              <!-- OTP Section -->
              <div style="text-align: center; margin: 40px 0;">
                <p style="font-size: 16px; color: #b3b3b3; margin-bottom: 20px;">
                  Enter this verification code to activate your account:
                </p>
                
                <!-- Enhanced OTP Box -->
                <div style="background: linear-gradient(135deg, #9945FF 0%, #14F195 100%); padding: 4px; border-radius: 16px; margin: 30px auto; width: fit-content; box-shadow: 0 8px 32px rgba(153, 69, 255, 0.3);">
                  <div style="background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%); padding: 30px 40px; border-radius: 14px;">
                    <div style="font-size: 48px; font-weight: 900; letter-spacing: 12px; color: #14F195; font-family: 'Courier New', monospace; text-shadow: 0 0 20px rgba(20, 241, 149, 0.5);">
                      ${otp}
                    </div>
                  </div>
                </div>
                
                <div style="background: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.3); border-radius: 12px; padding: 16px; margin-top: 30px;">
                  <p style="margin: 0; font-size: 14px; color: #ffc107; display: flex; align-items: center; justify-content: center;">
                    <span style="margin-right: 8px;">⏰</span>
                    <strong>Expires in 10 minutes</strong>
                  </p>
                </div>
              </div>
              
              <!-- Features Grid -->
              <div style="margin: 50px 0; padding: 30px; background: linear-gradient(135deg, rgba(153, 69, 255, 0.05) 0%, rgba(20, 241, 149, 0.05) 100%); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <h3 style="color: #9945FF; margin: 0 0 25px 0; text-align: center; font-size: 20px; font-weight: 700;">
                  ✨ Why traders choose SolUPI
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">⚡</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">~2 Minutes</div>
                      <div style="color: #888; font-size: 12px;">Lightning fast</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">💰</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">No Hidden Fees</div>
                      <div style="color: #888; font-size: 12px;">Transparent pricing</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">🔒</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">No KYC</div>
                      <div style="color: #888; font-size: 12px;">For small amounts</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">🇮🇳</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">UPI Payments</div>
                      <div style="color: #888; font-size: 12px;">Direct integration</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Security Notice -->
              <div style="background: rgba(255, 69, 90, 0.1); border: 1px solid rgba(255, 69, 90, 0.2); border-radius: 12px; padding: 20px; margin-top: 30px;">
                <p style="margin: 0; font-size: 14px; color: #ff6b7a; text-align: center;">
                  <strong>🛡️ Security:</strong> Never share this code with anyone. SolUPI will never ask for your OTP.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #111 0%, #000 100%); padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="margin-bottom: 20px;">
                <div style="color: #14F195; font-size: 24px; font-weight: 900; margin-bottom: 5px;">SolUPI</div>
                <div style="color: #666; font-size: 14px;">Making crypto accessible for everyone in India</div>
              </div>
              <div style="color: #444; font-size: 12px;">
                © 2025 SolUPI. All rights reserved.
              </div>
            </div>
            
          </div>
        </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Signup OTP email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending signup OTP email:', error);
    return { success: false, error: error.message };
  }
}

// Send OTP email for login
// Send login OTP email
async function sendLoginOTP(email, name, otp) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '🔐 Your SolUPI Login Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SolUPI Login Code</title>
        </head>
        <body style="margin: 0; padding: 20px; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(20, 241, 149, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #14F195 0%, #9945FF 50%, #14F195 100%); background-size: 200% 200%; padding: 40px 30px; text-align: center; position: relative;">
              <div style="position: relative; z-index: 1;">
                <h1 style="margin: 0; font-size: 32px; font-weight: 900; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  Welcome Back!
                </h1>
                <p style="margin: 15px 0 0 0; font-size: 18px; color: rgba(255,255,255,0.9); font-weight: 500;">
                  Secure access to your SolUPI account
                </p>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 50px 40px;">
              <!-- Greeting -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #14F195; margin: 0 0 15px 0; font-size: 24px; font-weight: 700;">
                  Hi ${name || 'there'}! 👋
                </h2>
                <p style="font-size: 17px; line-height: 1.6; margin: 0; color: #e1e1e1;">
                  Someone is trying to access your SolUPI account. If this was you, use the code below:
                </p>
              </div>
              
              <!-- OTP Section -->
              <div style="text-align: center; margin: 40px 0;">
                <p style="font-size: 16px; color: #b3b3b3; margin-bottom: 20px;">
                  Your secure login verification code:
                </p>
                
                <!-- Enhanced OTP Box -->
                <div style="background: linear-gradient(135deg, #14F195 0%, #9945FF 100%); padding: 4px; border-radius: 16px; margin: 30px auto; width: fit-content; box-shadow: 0 8px 32px rgba(20, 241, 149, 0.3);">
                  <div style="background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%); padding: 30px 40px; border-radius: 14px;">
                    <div style="font-size: 48px; font-weight: 900; letter-spacing: 12px; color: #14F195; font-family: 'Courier New', monospace; text-shadow: 0 0 20px rgba(20, 241, 149, 0.5);">
                      ${otp}
                    </div>
                  </div>
                </div>
                
                <div style="background: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.3); border-radius: 12px; padding: 16px; margin-top: 30px;">
                  <p style="margin: 0; font-size: 14px; color: #ffc107; display: flex; align-items: center; justify-content: center;">
                    <span style="margin-right: 8px;">⏰</span>
                    <strong>Expires in 10 minutes</strong>
                  </p>
                </div>
              </div>
              
              <!-- Security Features -->
              <div style="margin: 50px 0; padding: 30px; background: linear-gradient(135deg, rgba(20, 241, 149, 0.05) 0%, rgba(153, 69, 255, 0.05) 100%); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <h3 style="color: #9945FF; margin: 0 0 25px 0; text-align: center; font-size: 20px; font-weight: 700;">
                  🔐 Your account is protected
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">🛡️</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">End-to-End Security</div>
                      <div style="color: #888; font-size: 12px;">Bank-grade encryption</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">⚡</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">Instant Access</div>
                      <div style="color: #888; font-size: 12px;">No delays</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">🔒</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">Private Keys</div>
                      <div style="color: #888; font-size: 12px;">You own your crypto</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px;">
                    <span style="font-size: 24px; margin-right: 12px;">📱</span>
                    <div>
                      <div style="color: #14F195; font-weight: 600; font-size: 14px;">Multi-Device</div>
                      <div style="color: #888; font-size: 12px;">Sync everywhere</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Security Alert -->
              <div style="background: linear-gradient(135deg, rgba(255, 69, 90, 0.1) 0%, rgba(255, 107, 122, 0.1) 100%); border: 1px solid rgba(255, 69, 90, 0.3); border-radius: 12px; padding: 25px; margin-top: 30px;">
                <div style="display: flex; align-items: flex-start;">
                  <span style="font-size: 24px; margin-right: 15px; margin-top: 2px;">🚨</span>
                  <div>
                    <div style="color: #ff6b7a; font-weight: 700; font-size: 16px; margin-bottom: 8px;">
                      Security Alert
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #ff9aa2; line-height: 1.5;">
                      If you didn't request this login, someone may be trying to access your account. 
                      <strong>Never share this code</strong> and consider changing your password immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #111 0%, #000 100%); padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="margin-bottom: 20px;">
                <div style="color: #14F195; font-size: 24px; font-weight: 900; margin-bottom: 5px;">SolUPI</div>
                <div style="color: #666; font-size: 14px;">Your secure gateway to Solana</div>
              </div>
              <div style="color: #444; font-size: 12px;">
                © 2025 SolUPI. All rights reserved. | Need help? Contact support@solupi.com
              </div>
            </div>
            
          </div>
        </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Login OTP email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending login OTP email:', error);
    return { success: false, error: error.message };
  }
}

// Test email configuration
// Test email configuration
async function testEmailConfig() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return { success: true };
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return { success: false, error: error.message };
  }
}

// Send welcome email after successful verification
// Send welcome email after successful verification
async function sendWelcomeEmail(email, name) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '🎉 Welcome to SolUPI - Your Account is Ready!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to SolUPI</title>
        </head>
        <body style="margin: 0; padding: 20px; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(153, 69, 255, 0.15);">
            
            <!-- Celebration Header -->
            <div style="background: linear-gradient(135deg, #9945FF 0%, #14F195 50%, #9945FF 100%); background-size: 200% 200%; padding: 50px 30px; text-align: center; position: relative;">
              <div style="position: relative; z-index: 1;">
                <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
                <h1 style="margin: 0; font-size: 36px; font-weight: 900; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  Account Verified!
                </h1>
                <p style="margin: 15px 0 0 0; font-size: 20px; color: rgba(255,255,255,0.9); font-weight: 500;">
                  Welcome to the future of crypto trading
                </p>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 50px 40px;">
              <!-- Personal Greeting -->
              <div style="text-align: center; margin-bottom: 50px;">
                <h2 style="color: #14F195; margin: 0 0 20px 0; font-size: 28px; font-weight: 700;">
                  Hey ${name}! 🚀
                </h2>
                <p style="font-size: 18px; line-height: 1.6; margin: 0; color: #e1e1e1;">
                  Your SolUPI account is now <strong style="color: #14F195;">fully activated</strong>! 
                  You're ready to start buying Solana with lightning speed.
                </p>
              </div>
              
              <!-- Quick Start Guide -->
              <div style="background: linear-gradient(135deg, rgba(153, 69, 255, 0.1) 0%, rgba(20, 241, 149, 0.1) 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 40px; margin: 40px 0;">
                <h3 style="color: #9945FF; margin: 0 0 30px 0; text-align: center; font-size: 24px; font-weight: 700;">
                  🚀 How to get started
                </h3>
                
                <div style="display: grid; gap: 25px;">
                  <div style="display: flex; align-items: flex-start; padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 16px; border-left: 4px solid #14F195;">
                    <div style="background: linear-gradient(135deg, #14F195, #9945FF); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; margin-right: 20px; flex-shrink: 0;">1</div>
                    <div>
                      <div style="color: #14F195; font-weight: 700; font-size: 16px; margin-bottom: 8px;">Enter Amount</div>
                      <div style="color: #ccc; font-size: 14px; line-height: 1.5;">Choose how much SOL you want to buy (minimum ₹100)</div>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: flex-start; padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 16px; border-left: 4px solid #9945FF;">
                    <div style="background: linear-gradient(135deg, #9945FF, #14F195); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; margin-right: 20px; flex-shrink: 0;">2</div>
                    <div>
                      <div style="color: #9945FF; font-weight: 700; font-size: 16px; margin-bottom: 8px;">Scan QR Code</div>
                      <div style="color: #ccc; font-size: 14px; line-height: 1.5;">Get instant UPI QR code - pay with any UPI app</div>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: flex-start; padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 16px; border-left: 4px solid #14F195;">
                    <div style="background: linear-gradient(135deg, #14F195, #9945FF); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; margin-right: 20px; flex-shrink: 0;">3</div>
                    <div>
                      <div style="color: #14F195; font-weight: 700; font-size: 16px; margin-bottom: 8px;">Receive SOL</div>
                      <div style="color: #ccc; font-size: 14px; line-height: 1.5;">SOL arrives in your wallet within 2 minutes!</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 50px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://solupi.com'}/app" style="display: inline-block; background: linear-gradient(135deg, #9945FF 0%, #14F195 100%); color: white; text-decoration: none; padding: 20px 40px; border-radius: 16px; font-weight: 700; font-size: 18px; box-shadow: 0 8px 32px rgba(153, 69, 255, 0.3); transition: all 0.3s ease;">
                  🚀 Start Trading Now
                </a>
              </div>
              
              <!-- Support Info -->
              <div style="background: rgba(20, 241, 149, 0.05); border: 1px solid rgba(20, 241, 149, 0.2); border-radius: 16px; padding: 25px; margin-top: 40px;">
                <div style="text-align: center;">
                  <div style="color: #14F195; font-weight: 700; font-size: 18px; margin-bottom: 15px;">
                    💬 Need Help?
                  </div>
                  <p style="margin: 0; font-size: 14px; color: #ccc; line-height: 1.5;">
                    Our support team is available 24/7 to help you with any questions.<br>
                    <a href="mailto:support@solupi.com" style="color: #14F195; text-decoration: none; font-weight: 600;">support@solupi.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #111 0%, #000 100%); padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="margin-bottom: 20px;">
                <div style="color: #14F195; font-size: 24px; font-weight: 900; margin-bottom: 5px;">SolUPI</div>
                <div style="color: #666; font-size: 14px;">Making crypto accessible for everyone in India</div>
              </div>
              <div style="color: #444; font-size: 12px;">
                © 2025 SolUPI. All rights reserved.
              </div>
            </div>
            
          </div>
        </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
}

// Export all functions
module.exports = {
  generateOTP,
  generateOTPExpiry,
  isOTPValid,
  sendSignupOTP,
  sendLoginOTP,
  testEmailConfig,
  sendWelcomeEmail
};