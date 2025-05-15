// /// <reference types="jest" />
// import * as userRepo from '../../../src/repositories/user.repository';
// import { TestDataSource } from '../../test-data-source';
// import { ERRORS } from '../../../src/logic/utils/errorMessages';
// import '../../setup/setupTestDB';

// const TEST_USER = {
//   username: 'test',
//   password: 'test',
// };

// describe('User Repository', () => {
//   it('should create and fetch a user by username', async () => {
//     const { username, password } = TEST_USER;

//     // Create user with user repository
//     const newUser = await userRepo.createUser(
//       username,
//       password,
//       TestDataSource,
//     );

//     expect(newUser).toBeDefined();
//     expect(newUser.username).toBe(username);

//     // Fetch user by username via service
//     const found = await userRepo.getUserByUsername(username, TestDataSource);
//     expect(found?.username).toBe(username);
//     expect(found?.fridge).toBeDefined();
//   });

//   it('should throw an error if username already exists', async () => {
//     const { username, password } = TEST_USER;

//     await userRepo.createUser(username, password, TestDataSource);

//     await expect(
//       userRepo.createUser(username, password, TestDataSource),
//     ).rejects.toThrow(
//       ERRORS.USER.ALREADY_EXISTS(
//         `User with username ${username} already exists`,
//       ),
//     );
//   });
//   it('should not create a valid user when username missing', async () => {
//     const { password } = TEST_USER;
//     const username = '';

//     await expect(
//       userRepo.createUser(username, password, TestDataSource),
//     ).rejects.toThrow(ERRORS.USER.USERNAME_MISSING());
//   });
//   it('should not create a valid user when password missing', async () => {
//     const { username } = TEST_USER;
//     const password = '';

//     await expect(
//       userRepo.createUser(username, password, TestDataSource),
//     ).rejects.toThrow(ERRORS.USER.PASSWORD_MISSING());
//   });
// });
