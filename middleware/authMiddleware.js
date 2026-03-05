import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// 1. PROTECT ROUTE (Checks if user is logged in)
export const protect = async (req, res, next) => {
  let token;

  // Check if the token was sent in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Decode the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database and attach them to the request (minus the password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the actual route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// 2. ADMIN ROUTE (Checks if the logged-in user is an admin)
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Move on to the admin-only route
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};