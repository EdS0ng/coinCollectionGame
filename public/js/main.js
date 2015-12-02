'use strict';

var app = app.module('coinGame', [ui.router]);

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

