'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var gridSvc = require('./modules/grid');
var coin = require('./modules/coin');

var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('index');
});

gridSvc.buildGrid();
gridSvc.buildOverlay();


io.on('connection', function(socket) {
  console.log('connected')
  gridSvc.setStartPosition();
  socket.emit('init', {grid:gridSvc.grid, overlay:gridSvc.overlay});

  setInterval(function (){
      var coins = coin.createCoins();
      coin.dropCoins();
      io.emit('coinDrop', coins);
      setTimeout(function (){
        coin.removeCoins();
        io.emit('coinsRemoved');
      },2000);
    }, 5000);

  socket.on('move', function(coordinates) {
    console.log(coordinates);
  });
});

server.listen(PORT);
