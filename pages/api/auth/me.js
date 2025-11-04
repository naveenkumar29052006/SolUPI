import { withAuth } from '../../../lib/middleware';
import prisma from '../../../lib/prisma';
import { sanitizeUser } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method === 'GET') {
    // Get current user profile
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: {
          orders: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              amount: true,
              status: true,
              createdAt: true
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      return res.status(200).json({
        success: true,
        user: sanitizeUser(user)
      });

    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch profile'
      });
    }
  }

  else if (req.method === 'PUT') {
    // Update user profile
    try {
      const { name, walletAddr } = req.body;
      const updateData = {};

      if (name && name.trim().length >= 2) {
        updateData.name = name.trim();
      }

      if (walletAddr) {
        updateData.walletAddr = walletAddr.trim();
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No valid fields to update'
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.userId },
        data: updateData
      });

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: sanitizeUser(updatedUser)
      });

    } catch (error) {
      console.error('Update profile error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }
  }

  else {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }
}

export default withAuth(handler);