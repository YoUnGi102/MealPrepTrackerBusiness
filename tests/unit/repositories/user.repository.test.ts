import bcrypt from 'bcryptjs';
import { createUserService } from '../../../src/services/user.service.factory';
import { TestDataSource } from '../../test-data-source';
import { User } from '../../../src/database/entities/User';
import { ERRORS } from '../../../../src/utils/errorMessages';

let userService: ReturnType<typeof createUserService>;

beforeAll(async () => {
  await TestDataSource.initialize();
  // Create service instance with test data source injected
  userService = createUserService(TestDataSource);
});

afterAll(async () => {
  await TestDataSource.destroy();
});

describe('User Service', () => {
  it('should create and fetch a user by username', async () => {
    const username = 'testuser';
    const password = 'password123';

    // Create user via service
    const newUser = await userService.createUser(username, password);

    expect(newUser).toBeDefined();
    expect(newUser.username).toBe(username);

    // Fetch user by username via service
    const found = await userService.getUserByUsername(username);
    expect(found?.username).toBe(username);
    expect(found?.fridge).toBeDefined();
  });

  it('should throw an error if username already exists', async () => {
    const username = 'testuser';
    const password = 'password123';

    // Create user
    await userService.createUser(username, password);

    // Try to create the same user again and expect error
    await expect(userService.createUser(username, password))
      .rejects
      .toThrowError(ERRORS.USER.ALREADY_EXISTS(`User with username ${username} already exists`));
  });
});
