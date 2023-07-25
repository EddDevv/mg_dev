import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServices1690295024384 implements MigrationInterface {
    name = 'CreateServices1690295024384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "categoryName" TO "title"`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-07-25T14:23:48.287Z"'`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_034b52310c2d211bc979c3cc4e8" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_034b52310c2d211bc979c3cc4e8"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-07-23 14:59:35.231'`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "title" TO "categoryName"`);
    }

}
