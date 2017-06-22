// const app = require('./index');
// or
// req.app.get in req,res fn's when we need db

// var app = require('./index');
// const db = app.get('db');

module.exports = {
    
    getCurrentGameRank: function(req, res){
        const gameId = +req.params.gameId;

        req.app.get('db').getCurrentGameRank(gameId).then(function (currentGame){
            return res.status(200).json(currentGame);
        })
    },

    getTopScores: function(req, res){

        req.app.get('db').getTopScores().then(function(leaderboard){
            return res.status(200).json(leaderboard)
        })
    }
}