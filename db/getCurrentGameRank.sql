SELECT rank, nickname, score FROM (SELECT ROW_NUMBER() OVER(ORDER BY score desc) as rank, gameid, nickname, score FROM leaderboard ) ranking
WHERE ranking.gameid = $1