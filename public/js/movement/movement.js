'use strict';

angular.module('playerMovement', ['gameBoard'])
.service('movementSvc', function ($document, gameBoardSvc, $rootScope, scoreSvc){
  var keycodeObj = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

  var movementMap = {
    left: function (){
      return [0,-1];
    },
    right: function (){
      return [0,1];
    },
    up: function (){
      return [-1,0];
    },
    down: function (){
      return [1,0];
    }
  }

  this.setNewPosition = function (move){
    var oldX = gameBoardSvc.currentPos[0];
    var oldY = gameBoardSvc.currentPos[1];
    var x = move[0];
    var y = move[1];
    gameBoardSvc.overlay[oldX][oldY] = false;
    $rootScope.$apply(gameBoardSvc.overlay[oldX+x][oldY+y] = true);
    gameBoardSvc.currentPos = [oldX+x, oldY+y];
  }

  this.start = function (){
    self = this;
    $document.bind('keydown', function (e) {
      var arrowKey = keycodeObj[e.which];

      if (arrowKey) {
        e.preventDefault();
        var move = self.calculateMovement(arrowKey);
        self.setNewPosition(move);
        scoreSvc.checkForCoins();
      }
    });
  }

  this.calculateMovement = function (move){
    if (movementMap[move]){
      return movementMap[move]();
    }
  }

})
.service('scoreSvc', function (gameBoardSvc){
  this.score = 0;
  
  this.checkForCoins = function (){
    var self = this;
    var x = gameBoardSvc.currentPos[0];
    var y = gameBoardSvc.currentPos[1];
    if (gameBoardSvc.grid[x][y]==='coin'){
      gameBoardSvc.grid[x][y]=null;
      self.score++;
    }
  }
})