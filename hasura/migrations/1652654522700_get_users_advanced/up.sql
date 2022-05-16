CREATE OR REPLACE view "public"."get_users_advanced" AS
SELECT   u.id,
         u.email,
         j.city,
         j.title     AS job_title,
         j.id        AS job_id,
         i.name      AS investor_name,
         c.name      AS company_name
FROM     public.user AS u
JOIN     user_to_keywords u_k
ON       u_k.user_id = u.id
JOIN     keywords k
ON       k.id = u_k.keyword_id
JOIN     jobs j
ON       cities ILIKE '%'
                  || j.city
                  || '%'
JOIN     companies c
ON       j.company_id = c.id
JOIN     company_investors ci
ON       ci.company_id = c.id
JOIN     investors i
ON       ci.investor_id = i.id
WHERE    title ILIKE '%'
                  || k.keyword
                  || '%'
AND      j.date_added > u.email_sent_date
AND      u.send_digest = TRUE
ORDER BY j.date_added DESC;
