import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagesIntegration1693591986488 implements MigrationInterface {
    name = 'ImagesIntegration1693591986488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "services" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "departureToClient" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "services" ADD "businessId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-09-01T18:13:06.904Z"'`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_b6f9b3d2818d75f5839d70cbb18" FOREIGN KEY ("businessId") REFERENCES "business_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_b6f9b3d2818d75f5839d70cbb18"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-08-10 15:54:54.929'`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "departureToClient"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "image"`);
    }

}
