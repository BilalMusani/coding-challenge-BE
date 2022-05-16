CREATE OR REPLACE FUNCTION get_users_matching_job(title text, city text) 
returns setof public.user AS
$$
    SELECT   distinct u.id, u.email, u.cities, u.send_digest
    FROM     public.user u
    JOIN user_to_keywords uk
    ON uk.user_id = u.id
    JOIN keywords k
    ON k.id = uk.keyword_id
    WHERE to_tsvector(title) @@ to_tsquery('english', REPLACE(k.keyword, ' ','<->'))
    AND u.cities ILIKE '%' || city || '%'
    AND u.send_digest = False;
$$ language sql stable;
;
