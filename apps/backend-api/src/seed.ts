import bcrypt from 'bcryptjs';
import { getUsersCollection } from './models/User';

export const seedDatabase = async () => {
  try {
    const users = getUsersCollection();
    const adminExists = await users.findOne({ username: 'admin' });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await users.insertOne({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Seed: Admin user created');
    } else {
      console.log('ℹ️ Seed: Admin user already exists');
    }

    const testUserExists = await users.findOne({ username: 'jordan' });
    if (!testUserExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await users.insertOne({
        username: 'jordan',
        email: 'jordan@example.com',
        password: hashedPassword,
        role: 'user',
      });
      console.log('✅ Seed: Test user "jordan" created');
    } else {
      console.log('ℹ️ Seed: Test user already exists');
    }
  } catch (error) {
    console.error('❌ Seed: Error seeding database', error);
  }
};
