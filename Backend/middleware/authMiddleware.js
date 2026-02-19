import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id);
      
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User not found' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: `Role ${req.user.role} not authorized` });
    }
    next();
  };
};