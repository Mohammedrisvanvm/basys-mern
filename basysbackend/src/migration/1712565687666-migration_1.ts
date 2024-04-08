import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11712565687666 implements MigrationInterface {
    name = 'Migration11712565687666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying NOT NULL, "nickName" character varying NOT NULL, "npi" character varying, "email" character varying NOT NULL, "accessRights" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "passwordIsTemporary" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
