'use strict';

var gridSvc = {};

gridSvc.gameSize = 10;
gridSvc.grid = [];
gridSvc.overlay = [];
gridSvc.currentPos;

gridSvc.buildGrid = function (){
  var self = this;
  for (var i=0;i<self.gameSize;i++){
    var row=[];
    for(var x=0;x<self.gameSize;x++){
      row.push(null);
    }
    self.grid.push(row);
  }
}

gridSvc.buildOverlay = function (){
  var self = this;
  for (var i=0;i<self.gameSize;i++){
    var row=[];
    for(var x=0;x<self.gameSize;x++){
      row.push(false);
    }
    self.overlay.push(row);
  }
}

gridSvc.setStartPosition = function (){
  var self = this;
  var x = Math.floor(Math.random()*self.gameSize);
  var y = Math.floor(Math.random()*self.gameSize);
  self.currentPos = [x,y];
  self.overlay[x][y] = true;
}

module.exports = gridSvc;