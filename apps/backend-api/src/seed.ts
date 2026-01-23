import bcrypt from 'bcryptjs';
import { User } from './models/User';

export const seedDatabase = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log('✅ Seed: Admin user created');
    } else {
      console.log('ℹ️ Seed: Admin user already exists');
    }

    const testUserExists = await User.findOne({ username: 'jordan' });
    if (!testUserExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const testUser = new User({
        username: 'jordan',
        email: 'jordan@example.com',
        password: hashedPassword,
        role: 'user'
      });
      await testUser.save();
      console.log('✅ Seed: Test user "jordan" created');
    } else {
      console.log('ℹ️ Seed: Test user already exists');
    }
  } catch (error) {
    console.error('❌ Seed: Error seeding database', error);
  }
};
