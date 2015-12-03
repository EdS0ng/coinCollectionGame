'use strict';

var gameBoardSvc = require('./grid');


var movementSvc = {
  this.score = 0;

  this.setNewPosition = function (move){
    var oldX = gameBoardSvc.currentPos[0];
    var oldY = gameBoardSvc.currentPos[1];
    var x = move[0];
    var y = move[1];
    gameBoardSvc.overlay[oldX][oldY] = false;
    gameBoardSvc.overlay[oldX+x][oldY+y] = true;
    gameBoardSvc.currentPos = [oldX+x, oldY+y];
  }

  this.checkForCoins = function (){
    var self = this;
    var x = gameBoardSvc.currentPos[0];
    var y = gameBoardSvc.currentPos[1];
    if (gameBoardSvc.grid[x][y]==='coin'){
      gameBoardSvc.grid[x][y]=null;
      self.score++;
    }
  }

}

  
