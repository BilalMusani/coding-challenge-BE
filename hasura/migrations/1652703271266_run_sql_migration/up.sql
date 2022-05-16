CREATE INDEX title_lexeme_idx ON jobs USING GIN (title_lexeme);
