import { Db, MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let database: Db | null = null;

export const connectToDatabase = async (uri: string) => {
  if (database) {
    return database;
  }

  client = new MongoClient(uri);
  await client.connect();
  database = client.db();
  return database;
};

export const getDb = () => {
  if (!database) {
    throw new Error('Database connection has not been initialized.');
  }
  return database;
};

export const closeDatabase = async () => {
  if (client) {
    await client.close();
  }
  client = null;
  database = null;
};
