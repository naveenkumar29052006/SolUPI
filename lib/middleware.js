import { verifyToken, extractTokenFromHeader } from './auth';
import prisma from './prisma';

/**
 * Authentication middleware for API routes
 * Verifies JWT token and attaches user to request
 * @param {function} handler - API route handler
 * @returns {function} - Wrapped handler with auth
 */
export function withAuth(handler) {
  return async (req, res) => {
    try {
      // Extract token from Authorization header or cookies
      let token = extractTokenFromHeader(req.headers.authorization);
      
      // If no token in header, try to get from cookies
      if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        token = cookies['auth-token'];
      }

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      // Verify token
      const decoded = verifyToken(token);

      // Get user from database to ensure they still exist
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          walletAddr: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      // Attach user to request object
      req.user = user;
      req.userId = user.id;

      // Call the original handler
      return handler(req, res);

    } catch (error) {
      console.error('Auth middleware error:', error);
      
      if (error.message === 'Invalid token' || error.message === 'Token expired') {
        return res.status(401).json({
          success: false,
          error: error.message
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Authentication error'
      });
    }
  };
}

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't fail if no token
 * @param {function} handler - API route handler
 * @returns {function} - Wrapped handler with optional auth
 */
export function withOptionalAuth(handler) {
  return async (req, res) => {
    try {
      // Extract token from Authorization header or cookies
      let token = extractTokenFromHeader(req.headers.authorization);
      
      // If no token in header, try to get from cookies
      if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        token = cookies['auth-token'];
      }

      if (token) {
        try {
          // Verify token
          const decoded = verifyToken(token);

          // Get user from database
          const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
              id: true,
              name: true,
              email: true,
              walletAddr: true,
              isVerified: true,
              createdAt: true,
              updatedAt: true
            }
          });

          if (user) {
            req.user = user;
            req.userId = user.id;
          }
        } catch (error) {
          // Token is invalid, but we don't fail the request
          console.log('Optional auth token invalid:', error.message);
        }
      }

      // Call the original handler regardless of auth status
      return handler(req, res);

    } catch (error) {
      console.error('Optional auth middleware error:', error);
      // Don't fail the request for optional auth
      return handler(req, res);
    }
  };
}

/**
 * Role-based authorization middleware
 * Requires user to have specific role or permission
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {function} - Middleware function
 */
export function withRole(allowedRoles = []) {
  return function(handler) {
    return withAuth(async (req, res) => {
      // For now, we don't have roles in the schema
      // This is a placeholder for future role-based access control
      
      // You can extend this to check user roles from database
      // const userRoles = req.user.roles || [];
      // const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));
      
      // if (!hasRequiredRole) {
      //   return res.status(403).json({
      //     success: false,
      //     error: 'Insufficient permissions'
      //   });
      // }

      return handler(req, res);
    });
  };
}

/**
 * Rate limiting middleware (basic implementation)
 * @param {number} maxRequests - Maximum requests per window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {function} - Middleware function
 */
export function withRateLimit(maxRequests = 10, windowMs = 60000) {
  const requests = new Map();

  return function(handler) {
    return async (req, res) => {
      const clientId = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
      const now = Date.now();
      
      // Clean old entries
      for (const [id, data] of requests.entries()) {
        if (now - data.firstRequest > windowMs) {
          requests.delete(id);
        }
      }

      // Check current client requests
      const clientRequests = requests.get(clientId);
      
      if (!clientRequests) {
        requests.set(clientId, { count: 1, firstRequest: now });
      } else {
        if (now - clientRequests.firstRequest > windowMs) {
          // Reset window
          requests.set(clientId, { count: 1, firstRequest: now });
        } else {
          // Increment count
          clientRequests.count++;
          
          if (clientRequests.count > maxRequests) {
            return res.status(429).json({
              success: false,
              error: 'Too many requests. Please try again later.'
            });
          }
        }
      }

      return handler(req, res);
    };
  };
}