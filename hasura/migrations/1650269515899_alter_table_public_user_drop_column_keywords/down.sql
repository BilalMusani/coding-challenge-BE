ALTER TABLE "public"."user" ADD COLUMN "keywords" text;
ALTER TABLE "public"."user" ALTER COLUMN "keywords" DROP NOT NULL;
