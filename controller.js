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

    postUserInfo: function(req, res) {
      req.app.get('db').postUserInfo(req.params.user, req.params.score).then(function (currentGame) {
        return res.status(200).json(currentGame)
      }).catch(err => console.log( err ))
    },

    getFoods: function (req, res) {
      const search = req.query.item;
      const maxItems = '100';
      const url = `https://api.nal.usda.gov/ndb/search/?format=json&q=${search}&sort=n&max=${maxItems}&offset=0&api_key=${config.apiKey}`
      axios.get(url).then(resp => res.status(200).send(resp.data))
    },

    getNutritionData: function (req,  res) {
        const ndbno = req.query.ndbno;
        const url = `https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=b&format=json&api_key=${config.apiKey}`
        axios.get(url).then(resp => res.status(200).send(resp.data))

    },

}
