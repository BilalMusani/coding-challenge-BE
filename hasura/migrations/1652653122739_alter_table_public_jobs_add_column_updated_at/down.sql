DROP TRIGGER IF EXISTS "set_public_jobs_updated_at" ON "public"."jobs";
ALTER TABLE "public"."jobs" DROP COLUMN "updated_at";
