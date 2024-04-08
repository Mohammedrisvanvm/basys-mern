import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg31712610286353 implements MigrationInterface {
    name = 'Mg31712610286353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ADD "document_originalname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ADD "document_filename" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "document_filename"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "document_originalname"`);
    }

}
