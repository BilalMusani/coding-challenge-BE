CREATE TRIGGER set_public_jobs_title_updated
    BEFORE UPDATE 
    ON public.jobs
    FOR EACH ROW
    WHEN (old.title IS DISTINCT FROM new.title)
    EXECUTE FUNCTION public.set_job_title_updated_at();

COMMENT ON TRIGGER set_public_jobs_date_added ON public.jobs
    IS 'trigger to set value of column "title_lexeme" to updated title_lexeme on row update';
