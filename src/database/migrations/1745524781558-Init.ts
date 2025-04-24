import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745524781558 implements MigrationInterface {
    name = 'Init1745524781558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "type" SET DEFAULT 'Other'`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "type" DROP DEFAULT`);
    }

}
