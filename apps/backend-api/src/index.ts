import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { configurePassport } from './config/passport';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4200', credentials: true }));
app.use(express.json());

// Redis Setup
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
});

// Session
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Passport
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
