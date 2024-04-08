import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg11712569369738 implements MigrationInterface {
    name = 'Mg11712569369738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "physicalStreet" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "physicalCity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "physicalState" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "physicalPostalCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "physicalCountry" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingStreet" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingCity" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingState" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingPostalCode" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "billingCountry" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingCountry"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingPostalCode"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingState"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingCity"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "billingStreet"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "physicalCountry"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "physicalPostalCode"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "physicalState"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "physicalCity"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "physicalStreet"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "postalCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "street" character varying NOT NULL`);
    }

}
