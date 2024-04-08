import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg31712610370570 implements MigrationInterface {
    name = 'Mg31712610370570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd"`);
        await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "userId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_e57d3357f83f3cdc0acffc3d777" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_e57d3357f83f3cdc0acffc3d777"`);
        await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd" FOREIGN KEY ("userId") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
