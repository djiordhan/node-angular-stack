import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { AuthResponse } from '@repo/shared-types';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User registered' });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user as any;
  const response: AuthResponse = {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    message: 'Login successful'
  };
  res.json(response);
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logged out' });
  });
});

router.get('/me', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const user = req.user as any;
  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  });
});

export default router;
