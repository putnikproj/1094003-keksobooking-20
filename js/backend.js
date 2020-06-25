'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT = 10000;

  var sendRequest = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка соединения: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос слишком долго выполнялся');
    });

    xhr.open('GET', url);
    xhr.send();
  };

  var load = function (onLoad, onError) {
    sendRequest(LOAD_URL, onLoad, onError);
  };

  window.backend = {
    load: load
  };
})();
