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
   .state('register', {
    url: '/register',
    templateUrl: 'register.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login.html'
  })

});

app.controller('startCtrl', function ($scope, $state){
  $scope.startGame = function (){
    $state.go('gameStart');
  }
  $scope.goRegister = function(){
    $state.go('register');
  }
  $scope.goLogin = function(){
    $state.go('login');
  }
})

app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:3000');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});


// $(function() {
//   $('#send').click(sendMessage);
// });

// function sendMessage() {
//   var $message = $('#message');
//   var $name = $('#name');

//   var name = $name.val();
//   var message = $message.val();
//   $message.val('');

//   socket.emit('newMessage', {
//     text: message,
//     name: name
//   });
// }

// socket.on('history', function(history) {
//   var $messages = history.map(function(message) {
//     var text = `${message.name} - ${message.text}`;
//     var $li = $('<li>').text(text);
//     return $li;
//   });
//   $('#messages').append($messages);
// });


// socket.on('message', function(message) {
//   var text = `${message.name} - ${message.text}`;
//   var $message = $('<li>').text(text);
//   $('#messages').append($message);
// });

