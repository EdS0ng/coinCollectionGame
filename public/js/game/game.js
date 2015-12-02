'use strict';

var app = angular.module('Game', []);

app.controller('gameCtrl', function (gameSvc, $scope, $document){
  $scope.matrix = gameSvc.buildGrid();
  $scope.overlayMatrix = gameSvc.buildOverlay();
  $scope.startingPos = gameSvc.setStartPosition();
})

app.service('gameSvc', function (){
  var gameSize = 5;
  var grid = [];
  var overlay = [];

  this.buildGrid = function (){
    for (var i=0;i<gameSize;i++){
      var row=[];
      for(var x=0;x<gameSize;x++){
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  this.buildOverlay = function (){
    for (var i=0;i<gameSize;i++){
      var row=[];
      for(var x=0;x<gameSize;x++){
        row.push(null);
      }
      overlay.push(row);
    }
    return overlay;
  }

  this.setStartPosition = function (){
    var x = Math.floor(Math.random()*gameSize);
    var y = Math.floor(Math.random()*gameSize);
    
    return position;
  }
})
