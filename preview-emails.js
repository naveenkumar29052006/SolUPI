#!/usr/bin/env node

// Email template preview script
import { sendSignupOTP, sendLoginOTP, sendWelcomeEmail, testEmailConfig } from './lib/emailService.js';

async function previewEmails() {
  console.log('📧 SolUPI Email Templates Preview\n');

  try {
    // Test email configuration first
    console.log('1️⃣ Testing email configuration...');
    const configTest = await testEmailConfig();
    if (configTest.success) {
      console.log('✅ Email configuration is working!\n');
    } else {
      console.log('❌ Email configuration failed:', configTest.error);
      console.log('💡 Make sure to set up your EMAIL_* environment variables\n');
    }

    // Preview sample emails (you can send test emails here)
    console.log('2️⃣ Available email templates:');
    console.log('   📝 Signup OTP Email');
    console.log('   🔐 Login OTP Email'); 
    console.log('   🎉 Welcome Email\n');

    console.log('3️⃣ Template features:');
    console.log('   ✨ Responsive design for all devices');
    console.log('   🎨 SolUPI brand colors (Purple & Green gradients)');
    console.log('   🔒 Security-focused messaging');
    console.log('   📱 Mobile-optimized layout');
    console.log('   🚀 Call-to-action buttons');
    console.log('   💎 Professional typography\n');

    console.log('4️⃣ Email types:');
    console.log('   📧 Signup OTP: Welcome message + verification code');
    console.log('   🔐 Login OTP: Security-focused + access code');
    console.log('   🎉 Welcome: Account activation confirmation\n');

    console.log('💡 To send test emails, uncomment the lines below and add your test email:');
    console.log('   // await sendSignupOTP("test@example.com", "Test User", "123456");');
    console.log('   // await sendLoginOTP("test@example.com", "Test User", "654321");');
    console.log('   // await sendWelcomeEmail("test@example.com", "Test User");\n');

    // Uncomment these lines to send test emails to yourself:
    // const testEmail = 'your-email@example.com';
    // await sendSignupOTP(testEmail, 'Test User', '123456');
    // await sendLoginOTP(testEmail, 'Test User', '654321');
    // await sendWelcomeEmail(testEmail, 'Test User');

    console.log('🎨 Email templates are ready to use!');
    console.log('🔧 Configure your email settings in .env file');
    console.log('📧 Integrate with your signup/login flows');

  } catch (error) {
    console.error('❌ Preview failed:', error.message);
  }
}

previewEmails();