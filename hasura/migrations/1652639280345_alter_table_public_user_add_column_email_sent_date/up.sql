ALTER TABLE "public"."user" ADD COLUMN "email_sent_date" time NOT NULL DEFAULT now();
