import { DataSource } from 'typeorm';
import { seedTestDB } from './seedTestDB';
import { TestDataSource } from '../test-data-source';

let testDataSource: DataSource;

beforeEach(async () => {
  testDataSource = await TestDataSource.initialize();
  await seedTestDB(testDataSource);
});

afterEach(async () => {
  if (testDataSource && testDataSource.isInitialized) {
    await testDataSource.destroy();
  }
});
