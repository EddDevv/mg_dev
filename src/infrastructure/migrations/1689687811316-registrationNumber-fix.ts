import { MigrationInterface, QueryRunner } from "typeorm";

export class RegistrationNumberFix1689687811316 implements MigrationInterface {
    name = 'RegistrationNumberFix1689687811316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-07-18T13:43:33.682Z"'`);
        await queryRunner.query(`ALTER TABLE "business_account" ALTER COLUMN "registrationNumber" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business_account" ALTER COLUMN "registrationNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-07-15 13:55:10.973'`);
    }

}
