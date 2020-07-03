'use strict';

(function () {
  var sendRequest = function (method, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.constants.Requests.TIMEOUT;

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
    sendRequest('GET', window.constants.Requests.Url.LOAD, '', onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    sendRequest('POST', window.constants.Requests.Url.SAVE, data, onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
