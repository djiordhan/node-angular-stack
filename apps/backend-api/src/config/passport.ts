import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { getUsersCollection } from '../models/User';

export const configurePassport = () => {
  passport.use(
    new LocalStrategy(async (username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
      try {
        const users = getUsersCollection();
        const user = await users.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done: (error: any, id?: any) => void) => {
    done(null, user._id?.toString?.() ?? user.id);
  });

  passport.deserializeUser(async (id: string, done: (error: any, user?: any) => void) => {
    try {
      const users = getUsersCollection();
      const user = await users.findOne({ _id: new ObjectId(id) });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
