import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {User, Ingredient, MealIngredient, AuditableEntityUUID, AuditableEntity, Meal, Fridge} from './database/entities'

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production', // never true in production
    logging: true,
    entities: [
        User, Ingredient, MealIngredient, Meal, Fridge, AuditableEntityUUID, AuditableEntity
    ],
    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/database/migrations/**/*.js'
            : 'src/database/migrations/**/*.ts',
    ],
    subscribers: [],
});
export default AppDataSource;
