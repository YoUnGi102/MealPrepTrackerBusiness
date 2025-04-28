import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745570260872 implements MigrationInterface {
    name = 'Init1745570260872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "calories" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "calories"`);
    }

}
