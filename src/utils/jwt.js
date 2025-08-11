import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;

export const generateToken = (user) =>
  jwt.sign(user, SECRET, { expiresIn: '1h' });

export const verifyToken = (token) =>
  jwt.verify(token, SECRET);
