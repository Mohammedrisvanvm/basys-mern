import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg31712612846210 implements MigrationInterface {
    name = 'Mg31712612846210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_9cc0437413776ee10222eb82c95"`);
        await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "entityId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingStreet"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingCity"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingState"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingPostalCode"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingCountry"`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd" FOREIGN KEY ("userId") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingCountry" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingPostalCode" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingState" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingCity" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingStreet" character varying`);
        await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "userId" TO "entityId"`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_9cc0437413776ee10222eb82c95" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
