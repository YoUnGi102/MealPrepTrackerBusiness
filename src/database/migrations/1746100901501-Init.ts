import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746100901501 implements MigrationInterface {
    name = 'Init1746100901501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '1', "name" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'Other', "protein" double precision NOT NULL, "fat" double precision NOT NULL, "carbs" double precision NOT NULL, "sugar" double precision NOT NULL, "calories" double precision NOT NULL, "image" character varying, "createdById" integer, "updatedById" integer, "deletedById" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal_ingredient" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '1', "quantity" double precision NOT NULL, "createdById" integer, "updatedById" integer, "deletedById" integer, "mealId" integer, "ingredientId" integer, CONSTRAINT "PK_a04f71e53e3b7e61820902c5fa2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '1', "name" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'Other', "protein" double precision NOT NULL, "fat" double precision NOT NULL, "carbs" double precision NOT NULL, "sugar" double precision NOT NULL, "calories" double precision NOT NULL, "image" character varying, "portions" integer NOT NULL, "createdById" integer, "updatedById" integer, "deletedById" integer, "fridgeId" integer, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fridge" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '1', "createdById" integer, "updatedById" integer, "deletedById" integer, CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '1', "uuid" uuid NOT NULL, "username" character varying NOT NULL, "password" character varying(255) NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdById" integer, "updatedById" integer, "deletedById" integer, "fridgeId" integer, CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_35789aa893276fa75ddb1f8aea4" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_aea1200eb1eb4346f5e190c54a6" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_147617c8a7a249744e9133ba5d5" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" ADD CONSTRAINT "FK_e8730c32a960eb5e6943d924d9c" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" ADD CONSTRAINT "FK_76579c1097b9f33ab995e95712f" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" ADD CONSTRAINT "FK_31bb2e051a8e6e08181c87d51a2" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" ADD CONSTRAINT "FK_89cc943d236c66c6a19d84401cc" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" ADD CONSTRAINT "FK_e2693d28fe730d0681b99c77419" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_54f6e119c344084f55fd81cb33e" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_e858635a25772389e6f63c583e3" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_3e989158e9f29c9858cd8737eda" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_aa2482036166efc36d2dd963066" FOREIGN KEY ("fridgeId") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "FK_740ed43ff0665a428ce89b1f0c5" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "FK_9baed0bec4653ae354ee6afa8ba" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "FK_d534e8810bb612c881215591643" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_9baa67dcc2878f9a1ec5b9e8e27" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_19b27fe58d99dbbb3f3597e2d86" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_8b4009b337ec3d37c0ef31bc2ba" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_31181ad6f77c04629bb275a8dce" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_db5173f7d27aa8a98a9fe6113df" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c3062c4102a912dfe7195a72bfb" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7522f14622518f2125476192d25" FOREIGN KEY ("fridgeId") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7522f14622518f2125476192d25"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c3062c4102a912dfe7195a72bfb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_db5173f7d27aa8a98a9fe6113df"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_31181ad6f77c04629bb275a8dce"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_8b4009b337ec3d37c0ef31bc2ba"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_19b27fe58d99dbbb3f3597e2d86"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_9baa67dcc2878f9a1ec5b9e8e27"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "FK_d534e8810bb612c881215591643"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "FK_9baed0bec4653ae354ee6afa8ba"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "FK_740ed43ff0665a428ce89b1f0c5"`);
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_aa2482036166efc36d2dd963066"`);
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_3e989158e9f29c9858cd8737eda"`);
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_e858635a25772389e6f63c583e3"`);
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_54f6e119c344084f55fd81cb33e"`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" DROP CONSTRAINT "FK_e2693d28fe730d0681b99c77419"`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" DROP CONSTRAINT "FK_89cc943d236c66c6a19d84401cc"`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" DROP CONSTRAINT "FK_31bb2e051a8e6e08181c87d51a2"`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" DROP CONSTRAINT "FK_76579c1097b9f33ab995e95712f"`);
        await queryRunner.query(`ALTER TABLE "meal_ingredient" DROP CONSTRAINT "FK_e8730c32a960eb5e6943d924d9c"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_147617c8a7a249744e9133ba5d5"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_aea1200eb1eb4346f5e190c54a6"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_35789aa893276fa75ddb1f8aea4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "fridge"`);
        await queryRunner.query(`DROP TABLE "meal"`);
        await queryRunner.query(`DROP TABLE "meal_ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
