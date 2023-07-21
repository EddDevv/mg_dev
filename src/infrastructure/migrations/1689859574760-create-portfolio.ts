import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePortfolio1689859574760 implements MigrationInterface {
    name = 'CreatePortfolio1689859574760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "description" character varying NOT NULL, "businessId" integer NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-07-20T13:26:18.851Z"'`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_7c801e3d313eab8d36da6a94ccf" FOREIGN KEY ("businessId") REFERENCES "business_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_7c801e3d313eab8d36da6a94ccf"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-07-18 13:32:34.889'`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
    }

}
