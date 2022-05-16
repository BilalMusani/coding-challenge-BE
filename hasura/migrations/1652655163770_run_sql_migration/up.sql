-- DROP TRIGGER IF EXISTS set_public_jobs_date_added ON public.jobs


CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_date_added"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."date_added" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_jobs_date_added"
BEFORE UPDATE ON "public"."jobs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_date_added"();
COMMENT ON TRIGGER "set_public_jobs_date_added" ON "public"."jobs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
