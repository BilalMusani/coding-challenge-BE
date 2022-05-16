CREATE TRIGGER set_public_jobs_date_added
    BEFORE UPDATE 
    ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_date_added();

COMMENT ON TRIGGER set_public_jobs_date_added ON public.jobs
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';
