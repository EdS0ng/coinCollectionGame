'use strict';

angular.module('gameBoard', [])
.service('gameBoardSvc', function (){
  this.gameSize = 10;
  this.grid = [];
  this.overlay = [];
  this.currentPos;

  this.buildGrid = function (){
    var self = this;
    for (var i=0;i<self.gameSize;i++){
      var row=[];
      for(var x=0;x<self.gameSize;x++){
        row.push(null);
      }
      self.grid.push(row);
    }
  }

  this.buildOverlay = function (){
    var self = this;
    for (var i=0;i<self.gameSize;i++){
      var row=[];
      for(var x=0;x<self.gameSize;x++){
        row.push(false);
      }
      self.overlay.push(row);
    }
  }

  this.setStartPosition = function (){
    var self = this;
    var x = Math.floor(Math.random()*self.gameSize);
    var y = Math.floor(Math.random()*self.gameSize);
    self.currentPos = [x,y];
    self.overlay[x][y] = true;
  }
})