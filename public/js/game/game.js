'use strict';

var app = angular.module('Game', ['gameBoard','playerMovement', 'btford.socket-js']);
app.factory('Socket', function (socketFactory) {
  var socket = io();
  return socketFactory({
    ioSocket: socket
  });
});

app.controller('gameCtrl', function ($scope, movementSvc, Socket, gridSvc, coinSvc){
  socket.on('init', function (obj){
    gridSvc.saveGrid(obj);
    $scope.matrix = gridSvc.gridObj.grid;
    $scope.overlayMatrix = gridSvc.gridObj.overlay;
  })

  socket.on('coinDrop', function (coins){
    coinSvc.saveCoinPos(coins);
    var totalCoins= coinSvc.returnCoins();
    console.log('coin');
    totalCoins.forEach(function (coin){
      var x = coin[0];
      var y = coin[1];
      gridSvc.gridObj.grid[x][y] = 'coin';
    }) 
  })

  $scope.score=0;

  movementSvc.start(function (move){
    socket.emit('move', {coord: move})
  });
})

app.service('gridSvc', function (){
  this.gridObj;

  this.saveGrid = function (obj){
    var self = this;
    self.gridObj = obj;
  }
})

app.service('coinSvc', function (){
  var totalCoinPos;

  this.saveCoinPos = function (coins){
    totalCoinPos = coins;
  }

  this.returnCoins = function (){
    return totalCoinPos;
  }

})