import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728491879584 implements MigrationInterface {
    name = 'Migrations1728491879584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_food_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "foodId" uuid, CONSTRAINT "PK_709087a098fb531c8f9d12abf14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "saturated_fats"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "unsaturated_fats"`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "carbohydrates" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "proteins" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "fats" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "calories" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_food_list" ADD CONSTRAINT "FK_26129e037d440bcc5f2223984b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_food_list" ADD CONSTRAINT "FK_409fcf4f7b8c87d08e4271a3af0" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_food_list" DROP CONSTRAINT "FK_409fcf4f7b8c87d08e4271a3af0"`);
        await queryRunner.query(`ALTER TABLE "user_food_list" DROP CONSTRAINT "FK_26129e037d440bcc5f2223984b6"`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "calories" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "fats" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "proteins" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ALTER COLUMN "carbohydrates" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ADD "unsaturated_fats" double precision`);
        await queryRunner.query(`ALTER TABLE "food" ADD "saturated_fats" double precision`);
        await queryRunner.query(`DROP TABLE "user_food_list"`);
    }

}
