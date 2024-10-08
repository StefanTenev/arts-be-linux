import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingDiet1728402232211 implements MigrationInterface {
    name = 'AddingDiet1728402232211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "diet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "calories" integer NOT NULL DEFAULT '0', "fats" integer NOT NULL, "proteins" integer NOT NULL, "carbohydrates" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_f9d0f2b67d1c9bcaa6736f4cebd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "diet" ADD CONSTRAINT "FK_aefcfd088376415c48f14e27011" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diet" DROP CONSTRAINT "FK_aefcfd088376415c48f14e27011"`);
        await queryRunner.query(`DROP TABLE "diet"`);
    }

}
