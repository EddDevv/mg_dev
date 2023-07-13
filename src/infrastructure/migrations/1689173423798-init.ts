import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1689173423798 implements MigrationInterface {
    name = 'Init1689173423798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "firstname" character varying NOT NULL, "lastName" character varying, "description" character varying, "dateOfBirth" TIMESTAMP, "gender" character varying NOT NULL DEFAULT 'not_specified', "role" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying, "password" character varying NOT NULL, "websiteLink" character varying, "isVerified" boolean NOT NULL DEFAULT false, "receiveNotifications" boolean NOT NULL, "onlineStatus" boolean NOT NULL, "lastOnline" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "country" character varying NOT NULL, "city" character varying NOT NULL, "metro" character varying NOT NULL, "street" character varying NOT NULL, "apartment" character varying NOT NULL, "entrance" character varying NOT NULL, "postalCode" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business_account" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "businessName" character varying NOT NULL, "registrationNumber" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8ef555f5592ce1a2e91538490b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social_links" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_50d32c67ddd71c09d372b02167f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "social_links"`);
        await queryRunner.query(`DROP TABLE "business_account"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
