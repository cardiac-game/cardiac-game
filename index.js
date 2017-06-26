const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const { dbConnectionString } = require('./config.js');

const port = 8000;

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

massive(dbConnectionString).then(db => {
    db.leaderboard_create_seed()
      .then().catch(err => console.log(err))
    app.set('db',db)
}).catch((err)=> console.log(err))

var controller = require('./controller');

app.get('/api/rank/top', function(req, res){
  controller.getTopScores(req, res)
})

app.get('/api/rank/:gameId', function(req, res){
  controller.getCurrentGameRank(req, res)
})

app.get('/api/foods', function(req, res) {
    controller.getFoods(req, res)
})

app.get('/api/nutrition', function(req, res) {
    controller.getNutritionData(req, res)
})

app.post('/api/userInfo/:user/:score', function(req, res) {
  // console.log(controller, " HEYYY")
  controller.postUserInfo(req, res)
})

app.listen(port, function(){
  console.log("Successfully listening on :",port)
})
