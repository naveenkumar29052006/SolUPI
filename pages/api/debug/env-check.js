// Test database connection and environment variables
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test environment variables
    const envCheck = {
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'MISSING',
      EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV,
    };

    // Test database connection
    await prisma.$connect();
    const userCount = await prisma.user.count();
    await prisma.$disconnect();

    res.status(200).json({
      message: 'Environment check successful',
      environment: envCheck,
      database: {
        connected: true,
        userCount: userCount
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Environment check error:', error);
    res.status(500).json({
      error: 'Environment check failed',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}