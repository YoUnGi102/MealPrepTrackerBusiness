import { User } from "@src/database/entities";
import { TypeormUserRepository } from "@src/repositories/typeorm/user.repository";
import { DataSource } from "typeorm";
import { UserService } from "../interfaces/UserService";

export const createUserService = (dataSource: DataSource): UserService => {
    const userRepo = new TypeormUserRepository(dataSource);
    return {
        getUserByUsername: async (username: string): Promise<User | null> => {
            return await userRepo.getUserByUsername(username);
        },
    }
}