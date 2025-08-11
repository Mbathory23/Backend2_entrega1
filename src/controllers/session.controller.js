import User from '../models/User.js';
import { createHash, isValidPassword } from '../utils/createHash.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = createHash(password);
    const user = await User.create({ first_name, last_name, email, age, password: hashedPassword });

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !isValidPassword(user, password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.toObject());
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const currentUser = (req, res) => {
  res.json({ user: req.user });
};
