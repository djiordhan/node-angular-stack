import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../config/db';

export type GisLocation = {
  _id?: ObjectId;
  name: string;
  type: string;
  status: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getLocationsCollection = (): Collection<GisLocation> => {
  const db = getDb();
  return db.collection<GisLocation>('locations');
};
