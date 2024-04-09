import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg31712647493241 implements MigrationInterface {
    name = 'Mg31712647493241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying NOT NULL, "nickName" character varying NOT NULL, "npi" character varying, "email" character varying NOT NULL, "accessRights" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "passwordIsTemporary" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "physicalStreet" character varying NOT NULL, "physicalCity" character varying NOT NULL, "physicalState" character varying NOT NULL, "physicalPostalCode" character varying NOT NULL, "physicalCountry" character varying NOT NULL, "entityId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document" ("document_id" SERIAL NOT NULL, "document_type" character varying NOT NULL, "document_originalname" character varying NOT NULL, "document_filename" character varying NOT NULL, "document_file_path" character varying NOT NULL, "entityId" integer, CONSTRAINT "PK_78f5e16f1322a7b2b150364dddc" PRIMARY KEY ("document_id"))`);
        await queryRunner.query(`CREATE TABLE "entity" ("id" SERIAL NOT NULL, "nameOfEntity" character varying NOT NULL, "personName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "age" character varying NOT NULL, "gender" character varying NOT NULL, "password" character varying NOT NULL, "taxID" character varying, "providerLicenseNumber" character varying, "NPI" character varying, "specialty" character varying, "payerPlansSupported" character varying, "providerNetworksCovered" character varying, "nextStep" character varying, CONSTRAINT "UQ_5751d8572f46fe138361474bd67" UNIQUE ("email"), CONSTRAINT "UQ_5b673d3772d8d6858b055b697a9" UNIQUE ("taxID"), CONSTRAINT "UQ_8064842def03ff7df7d206d66e1" UNIQUE ("providerLicenseNumber"), CONSTRAINT "UQ_3c6a591b59a32a69d8d7b48fcec" UNIQUE ("NPI"), CONSTRAINT "PK_50a7741b415bc585fcf9c984332" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Admin" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fca5840681c3854ea15e03e4a2b" UNIQUE ("email"), CONSTRAINT "PK_3a489f4a44372ff150d7924dc3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_b81215cfcc4ebe28cdbfa3da957" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_9cc0437413776ee10222eb82c95" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_9cc0437413776ee10222eb82c95"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_b81215cfcc4ebe28cdbfa3da957"`);
        await queryRunner.query(`DROP TABLE "Admin"`);
        await queryRunner.query(`DROP TABLE "entity"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
