ALTER TABLE jobs ADD COLUMN title_lexeme tsvector
    GENERATED ALWAYS AS (to_tsvector('english', title)) STORED;
