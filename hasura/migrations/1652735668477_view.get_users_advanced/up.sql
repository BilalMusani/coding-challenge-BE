CREATE OR REPLACE VIEW public.get_users_advanced
 AS
 SELECT u.id,
    u.email,
    j.city,
    j.title AS job_title,
    j.id AS job_id,
    j.date_added,
    i.name AS investor_name,
    c.name AS company_name
   FROM "user" u
     JOIN user_to_keywords u_k ON u_k.user_id = u.id
     JOIN keywords k ON k.id = u_k.keyword_id
     JOIN jobs j ON u.cities ~~* (('%'::text || j.city) || '%'::text)
     JOIN companies c ON j.company_id = c.id
     JOIN company_investors ci ON ci.company_id = c.id
     JOIN investors i ON ci.investor_id = i.id
  WHERE j.title_lexeme @@ to_tsquery('english', REPLACE(k.keyword, ' ','<->')) 
  AND u.send_digest = true 
  AND j.date_added >= (now() - '24:00:00'::interval)::timestamp without time zone
  ORDER BY u.id ASC;
