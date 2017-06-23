// const app = require('./index');
// or
// req.app.get in req,res fn's when we need db

// var app = require('./index');
// const db = app.get('db');
const axios = require('axios');
const config = require('./config.js')

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
    },

    getFoodData: function (req, res) {
      var search = req.query.item;
      const url = `https://api.nal.usda.gov/ndb/search/?format=json&q=${search}&sort=n&max=100&offset=0&api_key=YRc0BEaFiPedkCcYvOsuFHJf3iI8DDlwGd1AddiX`
      axios.get(url).then(resp => resp.data).then(resp => res.status(200).send(resp))
    },
    getNutritionData: function (req,  res) {

    }
}
