'use strict';

var app = angular.module('Game', ['gameBoard', 'playerMovement']);

app.controller('gameCtrl', function (gameBoardSvc, $scope, movementSvc, coinSvc, scoreSvc){
  gameBoardSvc.buildGrid();
  $scope.matrix = gameBoardSvc.grid;
  gameBoardSvc.buildOverlay();
  $scope.overlayMatrix = gameBoardSvc.overlay
  gameBoardSvc.setStartPosition();
  $scope.score = scoreSvc.score;
  movementSvc.start();
  coinSvc.startCoinInterval();
})

app.service('coinSvc', function ($interval, gameBoardSvc, $timeout){
  var numCoinDrops = 5;
  var totalCoinPos;

  this.startCoinInterval = function (){
    var self = this;
    $interval(function (){
      self.createCoins();
      self.dropCoins();
      $timeout(function (){
        self.removeCoins();
      },1000);
    }, 5000, 5);
  }

  this.removeCoins = function (){
    totalCoinPos.forEach(function (coin){
      var x = coin[0];
      var y = coin[1];
      gameBoardSvc.grid[x][y] = null;
    })
  }

  this.createCoins = function (){
    totalCoinPos = [];
    for (var i =0;i<numCoinDrops;i++){
      var x = Math.floor(Math.random()*gameBoardSvc.gameSize);
      var y = Math.floor(Math.random()*gameBoardSvc.gameSize);
      var coinPos = [x,y];
      totalCoinPos.push(coinPos);
    }
  }

  this.dropCoins = function (){
    totalCoinPos.forEach(function (coin){
      var x = coin[0];
      var y = coin[1];
      gameBoardSvc.grid[x][y] = 'coin';
    })
  }

})