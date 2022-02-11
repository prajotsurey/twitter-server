CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  passwordHash TEXT,
);

CREATE TABLE posts (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INT,
  CONSTRAINT fk_users
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);
