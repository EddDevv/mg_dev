import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserBusinessRelation1689343687696 implements MigrationInterface {
    name = 'CreateUserBusinessRelation1689343687696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business_account" ADD CONSTRAINT "UQ_4345bd4f80c5469fa21f8322376" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "business_account" ADD CONSTRAINT "FK_4345bd4f80c5469fa21f8322376" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business_account" DROP CONSTRAINT "FK_4345bd4f80c5469fa21f8322376"`);
        await queryRunner.query(`ALTER TABLE "business_account" DROP CONSTRAINT "UQ_4345bd4f80c5469fa21f8322376"`);
    }

}
