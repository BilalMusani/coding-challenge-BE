CREATE OR REPLACE FUNCTION public.set_job_title_updated_at()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."title_lexeme" = to_tsvector('english', _new."title");
  RETURN _new;
END;
$BODY$;

ALTER FUNCTION public.set_job_title_updated_at()
    OWNER TO postgres;
