import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventsCategoriesRelation1690994084989 implements MigrationInterface {
    name = 'CreateEventsCategoriesRelation1690994084989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events_categories_categories" ("eventsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_cbafb88d0a713682a8354e21124" PRIMARY KEY ("eventsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ec1afd5bf48b617b478e86ea6" ON "events_categories_categories" ("eventsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_91500cdda8bef78e27a5fc795f" ON "events_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '"2023-08-02T16:34:46.549Z"'`);
        await queryRunner.query(`ALTER TABLE "events_categories_categories" ADD CONSTRAINT "FK_8ec1afd5bf48b617b478e86ea60" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events_categories_categories" ADD CONSTRAINT "FK_91500cdda8bef78e27a5fc795f8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_categories_categories" DROP CONSTRAINT "FK_91500cdda8bef78e27a5fc795f8"`);
        await queryRunner.query(`ALTER TABLE "events_categories_categories" DROP CONSTRAINT "FK_8ec1afd5bf48b617b478e86ea60"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastOnline" SET DEFAULT '2023-07-31 17:35:03.192'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91500cdda8bef78e27a5fc795f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ec1afd5bf48b617b478e86ea6"`);
        await queryRunner.query(`DROP TABLE "events_categories_categories"`);
    }

}
