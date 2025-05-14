import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747213727546 implements MigrationInterface {
    name = 'Init1747213727546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "barcode" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_5ae1fc3eeb9269f0ac1899b7a77" UNIQUE ("barcode")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_5ae1fc3eeb9269f0ac1899b7a77"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "barcode"`);
    }

}
