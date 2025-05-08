import { createAuthService } from '../../../src/logic/services/auth.service.factory';
import * as userRepo from '../../../src/repositories/user.repository';
import { TestDataSource } from '../../test-data-source';
import { ERRORS } from '../../../src/logic/utils/errorMessages';

let authService: ReturnType<typeof createAuthService>;

beforeEach(async () => {
  await TestDataSource.initialize();
  authService = createAuthService(TestDataSource);
});

afterEach(async () => {
  await TestDataSource.destroy();
});

describe('User Repository', () => {
  it('should create and fetch a user by username', async () => {
    const username = 'testuser';
    const password = 'password123';

    // Create user via service
    const newUser = await authService.register(username, password);

    expect(newUser).toBeDefined();
    expect(newUser.username).toBe(username);

    // Fetch user by username via service
    const found = await userRepo.getUserByUsername(username, TestDataSource);
    expect(found?.username).toBe(username);
    expect(found?.fridge).toBeDefined();
  });

  it('should throw an error if username already exists', async () => {
    const username = 'testuser';
    const password = 'password123';

    // Create user
    await authService.register(username, password);

    await expect(authService.register(username, password)).rejects.toThrow(
      ERRORS.USER.ALREADY_EXISTS(
        `User with username ${username} already exists`,
      ),
    );
  });
});
