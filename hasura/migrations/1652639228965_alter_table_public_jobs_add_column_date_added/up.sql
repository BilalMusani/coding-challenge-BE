ALTER TABLE "public"."jobs" ADD COLUMN "date_added" time NOT NULL DEFAULT now();
