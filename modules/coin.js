'use strict';

var gameBoardSvc = require('./grid');

var numCoinDrops = 5;
var totalCoinPos;

var coin = {};

coin.removeCoins = function (){
  totalCoinPos.forEach(function (coin){
    var x = coin[0];
    var y = coin[1];
    gameBoardSvc.grid[x][y] = null;
  })
}

coin.createCoins = function (){
  totalCoinPos = [];
  for (var i =0;i<numCoinDrops;i++){
    var x = Math.floor(Math.random()*gameBoardSvc.gameSize);
    var y = Math.floor(Math.random()*gameBoardSvc.gameSize);
    var coinPos = [x,y];
    totalCoinPos.push(coinPos);
  }
  return totalCoinPos;
}

coin.dropCoins = function (){
  totalCoinPos.forEach(function (coin){
    var x = coin[0];
    var y = coin[1];
    gameBoardSvc.grid[x][y] = 'coin';
  })
}

module.exports = coin;