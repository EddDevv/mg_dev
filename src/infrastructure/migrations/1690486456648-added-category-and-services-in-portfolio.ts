import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCategoryAndServicesInPortfolio1690486456648 implements MigrationInterface {
    name = 'AddedCategoryAndServicesInPortfolio1690486456648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "serviceId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-07-27T19:34:17.899Z"'`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_2a2fe8c3cd8250ab167ff0e402a" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_1bed0ad594104fb562404d2808a" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_1bed0ad594104fb562404d2808a"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_2a2fe8c3cd8250ab167ff0e402a"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-07-25 14:23:48.287'`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "categoryId"`);
    }

}
