DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id serial primary key,
    username VARCHAR(255),
    passphrase VARCHAR(255),
    email VARCHAR(255),
    highestscore VARCHAR(255)
);

INSERT INTO users (username, passphrase, email)
VALUES ('PsymonAndGarfunkel','HaulingOats','test@test.com')