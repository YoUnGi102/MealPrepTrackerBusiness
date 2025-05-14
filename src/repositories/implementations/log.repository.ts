import { Log, Meal, User } from "@src/database/entities"
import { Between, DataSource } from "typeorm"
import { LogRepository } from "../interfaces/LogRepository"

export class TypeormLogRepository implements LogRepository {
    constructor(private dataSource: DataSource) {}

    async addLog(user: User, mealId: number): Promise<Log> {
        return await this.dataSource.transaction(async (manager) => {
            const mealRepo = manager.getRepository(Meal);
            const logRepo = manager.getRepository(Log);

            const meal = await mealRepo.findOneByOrFail({ id: mealId });

            // Check for and decrease portions
            if (meal.portions <= 0) {
                throw new Error('No portions left to log');
            }

            await mealRepo.update({id: meal.id}, {portions: meal.portions-1});

            // Create and save log
            const log = logRepo.create({
            meal,
            createdBy: user,
            });

            return await logRepo.save(log);
        });
    }

    async getLog(user: User, id: number): Promise<Log | null> {
        const log: Log | null = await this.dataSource.getRepository(Log).findOne({
            where: {
                id,
                createdBy: {
                    id: user.id
                }
            },
            relations: {
                meal: true
            }
        })
        return log;
    }

    async getTodayLogs(periodFrom: Date, periodUntil: Date, user: User): Promise<Log[]> {
        const logs: Log[] = await this.dataSource.getRepository(Log).find({
            where: {
                user: {
                    id: user.id
                },
                createdAt: Between(periodFrom, periodUntil)
            },
            relations: {
                meal: true
            }
        })
        return logs;
    }

}


export default {}