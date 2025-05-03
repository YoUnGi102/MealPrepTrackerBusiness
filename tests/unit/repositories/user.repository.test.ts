import {
  createUser,
  getUserByUsername,
} from '../../../src/repositories/user.repository';
import bcrypt from 'bcryptjs';
import { TestDataSource } from '../../test-data-source';
import { User } from '../../../src/database/entities';

beforeAll(async () => {
  await TestDataSource.initialize();
});

afterAll(async () => {
  await TestDataSource.destroy();
});

describe('User Repository', () => {
  it('should create and fetch a user by username', async () => {
    const password = await bcrypt.hash('password123', 10);
    const user: User = await createUser('testuser', password);

    expect(user).toBeDefined();
    expect(user.username).toBe('testuser');

    const found = await getUserByUsername('testuser');
    expect(found?.username).toBe('testuser');
    expect(found?.fridge).toBeDefined();
  });
});
