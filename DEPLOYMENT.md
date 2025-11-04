# SolUPI - Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
1. [Vercel Account](https://vercel.com) 
2. GitHub repository with your SolUPI code
3. Production database (Neon, PlanetScale, or similar)
4. Gmail account with app password for emails

### Step-by-Step Deployment

#### 1. Prepare Your Database
- Create a production database on [Neon](https://neon.tech) or [PlanetScale](https://planetscale.com)
- Get your production DATABASE_URL

#### 2. Set Up Gmail for Production
- Enable 2-Factor Authentication on Gmail
- Generate an App Password for SolUPI
- Note: Use the same email configuration you used in development

#### 3. Deploy to Vercel

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:

   ```
   DATABASE_URL=your_production_database_url
   JWT_SECRET=your_super_secret_jwt_key_for_production
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your_gmail_email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   EMAIL_FROM=SolUPI <your_gmail_email@gmail.com>
   NODE_ENV=production
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   SOLANA_NETWORK=mainnet-beta
   PRIVATE_KEY=your_solana_private_key
   USDC_MINT_ADDRESS=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
   USD_TO_INR_RATE=83
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

#### 4. Post-Deployment

1. **Test Authentication**
   - Try signing up with a real email
   - Verify OTP functionality works
   - Test login flow

2. **Monitor**
   - Check Vercel Functions logs
   - Monitor email delivery
   - Test all API endpoints

### 🔧 Troubleshooting

**Common Issues:**

1. **Database Connection Fails**
   - Ensure DATABASE_URL is correct
   - Check if database allows external connections
   - Verify SSL settings

2. **Email Not Sending**
   - Verify Gmail app password is correct
   - Check EMAIL_* environment variables
   - Ensure 2FA is enabled on Gmail

3. **Build Fails**
   - Check if all dependencies are in package.json
   - Ensure Prisma schema is valid
   - Look at Vercel build logs

### 📝 Production Checklist

- [ ] Database configured and accessible
- [ ] All environment variables set in Vercel
- [ ] Gmail SMTP working with app password
- [ ] JWT secret is secure and random
- [ ] Solana RPC endpoint is correct
- [ ] Domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance monitoring set up

### 🌟 Features Included

✅ **Complete OTP Authentication**
- Email-based signup verification
- Secure login with OTP
- JWT session management
- Password hashing with bcrypt

✅ **Beautiful Email Templates**
- Professional signup confirmation
- Security-focused login codes  
- Welcome emails after verification

✅ **Modern UI/UX**
- Responsive design
- Smooth animations with Framer Motion
- Purple-green gradient branding
- Mobile-optimized forms

✅ **Production Ready**
- Database migrations
- Error handling
- Security best practices
- Performance optimizations

### 🔗 Important URLs

After deployment, these URLs will be available:
- **Main Site**: `https://your-app.vercel.app`
- **Welcome Page**: `https://your-app.vercel.app/welcome`
- **API Health**: `https://your-app.vercel.app/api/auth/me`

---

**Need Help?** Check Vercel docs or create an issue in the repository.