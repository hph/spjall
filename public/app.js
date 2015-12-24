(function () {
  'use strict';

  var ws;
  var url = window.location.href.replace('http\:\/\/', 'ws://');
  var input = document.querySelector('input');
  var button = document.querySelector('button');
  var messages = document.querySelector('#messages');

  function sendMessage (message) {
    ws.send(input.value);
    input.value = '';
  }

  function createWebSocket () {
    ws = new WebSocket(url);

    ws.onmessage = function (event) {
      var p = document.createElement('p');
      p.innerText = event.data;
      messages.appendChild(p);
    };

    ws.onclose = function () {
      setTimeout(function () {
        createWebSocket();
      }, 1000);
    };
  }

  input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  });

  button.addEventListener('click', function () {
    sendMessage();
  });

  createWebSocket();
})();
