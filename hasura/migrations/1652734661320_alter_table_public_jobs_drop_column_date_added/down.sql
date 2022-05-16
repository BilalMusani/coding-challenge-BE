ALTER TABLE "public"."jobs" ADD COLUMN "date_added" time;
ALTER TABLE "public"."jobs" ALTER COLUMN "date_added" DROP NOT NULL;
ALTER TABLE "public"."jobs" ALTER COLUMN "date_added" SET DEFAULT now();
