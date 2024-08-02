import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: user.rememberMe ? '7d' : '1d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
