'use strict';

var app = angular.module('coinGame', ["ui.router", "Game"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: 'startCtrl'
  })
  .state('gameStart', {
    url:'/game',
    templateUrl:'game.html',
    controller:'gameCtrl'
  })
  // .state('search', {
  //   url:'/search',
  //   templateUrl:'search.html',
  //   controller:'searchCtrl'
  // })
});

app.controller('startCtrl', function ($scope, $state){
  $scope.startGame = function (){
    $state.go('gameStart');
  }
})

