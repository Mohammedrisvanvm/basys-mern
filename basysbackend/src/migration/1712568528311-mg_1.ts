import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg11712568528311 implements MigrationInterface {
    name = 'Mg11712568528311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying NOT NULL, "nickName" character varying NOT NULL, "npi" character varying, "email" character varying NOT NULL, "accessRights" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "passwordIsTemporary" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postalCode" character varying NOT NULL, "country" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider_payer_details" ("id" SERIAL NOT NULL, "nameOfEntity" character varying NOT NULL, "personName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "taxID" character varying, "providerLicenseNumber" character varying, "NPI" character varying, "specialty" character varying, "payerPlansSupported" character varying, "providerNetworksCovered" character varying, CONSTRAINT "PK_7aaa0f168feeebd39e9f1081df3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document" ("document_id" SERIAL NOT NULL, "document_type" character varying NOT NULL, "document_file_path" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_78f5e16f1322a7b2b150364dddc" PRIMARY KEY ("document_id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "provider_payer_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd" FOREIGN KEY ("userId") REFERENCES "provider_payer_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TABLE "provider_payer_details"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
