import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './database/entities/User';
import { Ingredient } from './database/entities/Ingredient';
import { Fridge } from './database/entities/Fridge';
import { Log } from './database/entities/Log';
import { MacroEntity } from './database/entities/MacroEntity';
import { Meal } from './database/entities/Meal';
import { MealIngredient } from './database/entities/MealIngredient';
import { AuditableEntity } from './database/entities/AuditableEntity'

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV != 'production', // never true in production
    logging: true,
    entities: [User, Ingredient, AuditableEntity, Fridge, Log, MacroEntity, Meal, MealIngredient],
    // entities: ['./database/entities/**/*.ts'],
    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/database/migrations/**/*.js'
            : 'src/database/migrations/**/*.ts',
    ],
    subscribers: [],
});
export default AppDataSource;
