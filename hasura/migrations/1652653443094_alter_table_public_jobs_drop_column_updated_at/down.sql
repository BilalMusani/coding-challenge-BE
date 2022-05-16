ALTER TABLE "public"."jobs" ADD COLUMN "updated_at" timestamptz;
ALTER TABLE "public"."jobs" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "public"."jobs" ALTER COLUMN "updated_at" SET DEFAULT now();
