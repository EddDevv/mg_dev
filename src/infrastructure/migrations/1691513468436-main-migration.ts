import { MigrationInterface, QueryRunner } from "typeorm";

export class MainMigration1691513468436 implements MigrationInterface {
    name = 'MainMigration1691513468436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "postId" integer, "commentId" integer, CONSTRAINT "REL_cfd8e81fac09d7339a32e57d90" UNIQUE ("userId"), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "userId" integer NOT NULL, "postId" integer, "parentCommentId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "shareId" character varying NOT NULL, "text" character varying(5000) NOT NULL, "userId" integer NOT NULL, "views" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "records" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" character varying(5000) NOT NULL, "place" character varying NOT NULL, "meetType" character varying NOT NULL, "seatsNumber" integer NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "description" character varying NOT NULL, "businessId" integer NOT NULL, "categoryId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business_account" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "businessName" character varying NOT NULL, "registrationNumber" character varying, "userId" integer NOT NULL, CONSTRAINT "REL_4345bd4f80c5469fa21f832237" UNIQUE ("userId"), CONSTRAINT "PK_8ef555f5592ce1a2e91538490b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "subscriberId" integer NOT NULL, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying, "description" character varying, "dateOfBirth" TIMESTAMP, "gender" character varying NOT NULL DEFAULT 'not_specified', "role" character varying NOT NULL DEFAULT 'client', "email" character varying NOT NULL, "phoneNumber" character varying, "password" character varying NOT NULL, "websiteLink" character varying, "isVerified" boolean NOT NULL DEFAULT false, "receiveNotifications" boolean, "onlineStatus" boolean NOT NULL DEFAULT false, "lastOnline" TIMESTAMP NOT NULL DEFAULT '"2023-08-08T16:51:08.858Z"', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "country" character varying NOT NULL, "city" character varying NOT NULL, "metro" character varying NOT NULL, "street" character varying NOT NULL, "apartment" character varying NOT NULL, "entrance" character varying NOT NULL, "postalCode" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social_links" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_50d32c67ddd71c09d372b02167f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events_categories_categories" ("eventsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_cbafb88d0a713682a8354e21124" PRIMARY KEY ("eventsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ec1afd5bf48b617b478e86ea6" ON "events_categories_categories" ("eventsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_91500cdda8bef78e27a5fc795f" ON "events_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4875672591221a61ace66f2d4f9" FOREIGN KEY ("parentCommentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_034b52310c2d211bc979c3cc4e8" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_b392510e8a9898d395a871bd9cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_f1592764be189f6a7bd54fadbb4" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_7c801e3d313eab8d36da6a94ccf" FOREIGN KEY ("businessId") REFERENCES "business_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_2a2fe8c3cd8250ab167ff0e402a" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_1bed0ad594104fb562404d2808a" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business_account" ADD CONSTRAINT "FK_4345bd4f80c5469fa21f8322376" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_61d51ff73ec5afd7dc7c6c84309" FOREIGN KEY ("subscriberId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_categories_categories" ADD CONSTRAINT "FK_8ec1afd5bf48b617b478e86ea60" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events_categories_categories" ADD CONSTRAINT "FK_91500cdda8bef78e27a5fc795f8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_categories_categories" DROP CONSTRAINT "FK_91500cdda8bef78e27a5fc795f8"`);
        await queryRunner.query(`ALTER TABLE "events_categories_categories" DROP CONSTRAINT "FK_8ec1afd5bf48b617b478e86ea60"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_61d51ff73ec5afd7dc7c6c84309"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`ALTER TABLE "business_account" DROP CONSTRAINT "FK_4345bd4f80c5469fa21f8322376"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_1bed0ad594104fb562404d2808a"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_2a2fe8c3cd8250ab167ff0e402a"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_7c801e3d313eab8d36da6a94ccf"`);
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_f1592764be189f6a7bd54fadbb4"`);
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_b392510e8a9898d395a871bd9cf"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_034b52310c2d211bc979c3cc4e8"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4875672591221a61ace66f2d4f9"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91500cdda8bef78e27a5fc795f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ec1afd5bf48b617b478e86ea6"`);
        await queryRunner.query(`DROP TABLE "events_categories_categories"`);
        await queryRunner.query(`DROP TABLE "social_links"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "business_account"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "records"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
