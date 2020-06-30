'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT = 10000;

  var sendRequest = function (method, url, data, onLoad, onError) {
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

    if (method === 'GET') {
      xhr.open('GET', url);
      xhr.send();
    } else if (method === 'POST') {
      xhr.open('POST', url);
      xhr.send(data);
    }

  };

  var load = function (onLoad, onError) {
    sendRequest('GET', LOAD_URL, '', onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    sendRequest('POST', SAVE_URL, data, onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
