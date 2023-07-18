import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFistName1689429310192 implements MigrationInterface {
    name = 'UserFistName1689429310192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "firstname" TO "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-07-15T13:55:10.973Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-07-14 14:47:20.597'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "firstName" TO "firstname"`);
    }

}
