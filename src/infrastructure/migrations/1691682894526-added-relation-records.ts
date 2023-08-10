import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRelationRecords1691682894526 implements MigrationInterface {
    name = 'AddedRelationRecords1691682894526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "authorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-08-10T15:54:54.929Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-08-08 17:10:13.754'`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "authorId"`);
    }

}
