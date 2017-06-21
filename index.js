const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const database = require('./config.js');

const port = 8000;
const connString = database;

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static('dist'));

massive(connString).then(db => {
    db.user_create_seed(()=>{});
    app.set('db',db)
})

app.listen(port, function(){
  console.log("Successfully listening on :",port)
})