DROP TABLE IF EXISTS leaderboard;

CREATE TABLE leaderboard(
    gameid serial primary key,
    nickname VARCHAR(20) NOT NULL,
    score INTEGER NOT NULL,
    enemies_killed INTEGER
);

INSERT INTO leaderboard (nickname, score)
VALUES ('PsymonAndGarfunkel', 1000)
        , ('RickandMorticia', 1001)
        , ('Testytest', 1002)
        , ('Sphynx', 1003)
        , ('ViagraFalls', 1004)
        , ('Biggiesmalls', 1005)
        , ('Nostraldomus', 1006)
        , ('MarryPoppins', 1007)
        , ('SantaPaws', 1008)
        , ('Elbowandarrow', 1009)
        , ('AppleJacks', 1010);


-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users(
--     id serial primary key,
--     username VARCHAR(255),
--     passphrase VARCHAR(255),
--     email VARCHAR(255),
--     highestscore VARCHAR(255)
-- );

-- INSERT INTO users (username, passphrase, email)
-- VALUES ('PsymonAndGarfunkel','HaulingOats','test@test.com')