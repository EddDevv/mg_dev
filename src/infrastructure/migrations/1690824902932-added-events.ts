import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEvents1690824902932 implements MigrationInterface {
    name = 'AddedEvents1690824902932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" character varying(5000) NOT NULL, "place" character varying NOT NULL, "meetType" character varying NOT NULL, "seatsNumber" integer NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-07-31T17:35:03.192Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-07-27 19:34:17.899'`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
