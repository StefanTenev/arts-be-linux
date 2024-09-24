import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21727129873887 implements MigrationInterface {
    name = 'Test21727129873887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop existing columns
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);

        // Add userName and password as nullable first
        await queryRunner.query(`ALTER TABLE "user" ADD "userName" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);

        // Update existing rows with default values
        await queryRunner.query(`UPDATE "user" SET "userName" = 'defaultUserName' WHERE "userName" IS NULL`);
        await queryRunner.query(`UPDATE "user" SET "password" = 'defaultPassword' WHERE "password" IS NULL`);

        // Make userName and password non-nullable
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);

        // Drop existing primary key
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);

        // Change the id column to uuid
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        // Re-add primary key
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
    }
}
