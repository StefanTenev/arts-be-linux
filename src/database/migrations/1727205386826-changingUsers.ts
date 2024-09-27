import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingUsers1727205386826 implements MigrationInterface {
    name = 'ChangingUsers1727205386826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the new "food" table
        await queryRunner.query(`CREATE TABLE "food" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "name" character varying NOT NULL, 
            "carbohydrates" double precision, 
            "proteins" double precision, 
            "fats" double precision, 
            "saturated_fats" double precision, 
            "unsaturated_fats" double precision, 
            "calories" double precision, 
            "gi" double precision, 
            CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id")
        )`);

        // Drop the old columns
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);

        // Step 1: Add the new columns as nullable
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);

        // Step 2: Populate the new columns with unique default values
        await queryRunner.query(`UPDATE "user" SET "username" = COALESCE("username", 'default_username_' || id::text) WHERE "username" IS NULL`);
        await queryRunner.query(`UPDATE "user" SET "email" = COALESCE("email", 'default_email_' || id::text || '@example.com') WHERE "email" IS NULL`);
        await queryRunner.query(`UPDATE "user" SET "password_hash" = COALESCE("password_hash", 'default_password_hash') WHERE "password_hash" IS NULL`);

        // Step 3: Make the columns non-nullable after populating them
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password_hash" SET NOT NULL`);

        // Step 4: Add unique constraint
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE ("email", "username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse all the steps in the `up` method
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "food"`);
    }
}
