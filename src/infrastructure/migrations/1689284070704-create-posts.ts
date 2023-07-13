import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePosts1689284070704 implements MigrationInterface {
    name = 'CreatePosts1689284070704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "posts"
            (
                "id" SERIAL PRIMARY KEY,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP,
                "deletedAt" TIMESTAMP,
                "text" VARCHAR(5000) NOT NULL,
                "likes" INTEGER NOT NULL DEFAULT 0,
                "comments" INTEGER NOT NULL DEFAULT 0,
                "views" INTEGER NOT NULL DEFAULT 0,
                "shares" INTEGER NOT NULL DEFAULT 0,
                "userId" INTEGER NOT NULL REFERENCES "users"("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
