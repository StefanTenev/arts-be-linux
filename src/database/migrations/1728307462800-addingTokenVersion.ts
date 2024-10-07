import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingTokenVersion1728307462800 implements MigrationInterface {
    name = 'AddingTokenVersion1728307462800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "tokenVersion" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tokenVersion"`);
    }

}
