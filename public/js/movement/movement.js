'use strict';

angular.module('playerMovement', [])
.service('movementSvc', function ($document){
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

  this.start = function (cb){
    self = this;
    $document.bind('keydown', function (e) {
      var arrowKey = keycodeObj[e.which];

      if (arrowKey) {
        e.preventDefault();
        var move = self.calculateMovement(arrowKey);
        cb(move);
      }
    });
  }

})
