import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEventsFunc1691514613346 implements MigrationInterface {
    name = 'AddedEventsFunc1691514613346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "place"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-08-08T17:10:13.754Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-08-08 16:51:08.858'`);
        await queryRunner.query(`ALTER TABLE "events" ADD "place" character varying NOT NULL`);
    }

}
