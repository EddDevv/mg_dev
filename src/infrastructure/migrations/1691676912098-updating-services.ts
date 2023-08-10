import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingServices1691676912098 implements MigrationInterface {
    name = 'UpdatingServices1691676912098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "departureToClient" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "services" ADD "businessId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-08-10T14:15:13.610Z"'`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_b6f9b3d2818d75f5839d70cbb18" FOREIGN KEY ("businessId") REFERENCES "business_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_b6f9b3d2818d75f5839d70cbb18"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-08-08 17:10:13.754'`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "departureToClient"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "price"`);
    }

}
