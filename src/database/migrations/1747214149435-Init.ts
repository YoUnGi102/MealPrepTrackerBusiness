import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747214149435 implements MigrationInterface {
    name = 'Init1747214149435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "defaultAmount" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "defaultAmount"`);
    }

}
