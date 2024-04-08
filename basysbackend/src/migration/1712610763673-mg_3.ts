import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg31712610763673 implements MigrationInterface {
    name = 'Mg31712610763673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_e57d3357f83f3cdc0acffc3d777"`);
        await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "id" TO "entityId"`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_9cc0437413776ee10222eb82c95" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_9cc0437413776ee10222eb82c95"`);
        await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "entityId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_e57d3357f83f3cdc0acffc3d777" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
