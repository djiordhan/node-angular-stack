import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../config/db';

export interface UserDocument {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export const getUsersCollection = (): Collection<UserDocument> => {
  return getDb().collection<UserDocument>('users');
};
