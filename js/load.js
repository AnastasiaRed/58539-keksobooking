'use strict';

window.load = (function (url, onLoad) {

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 999; margin: 0 auto; padding: 15px 0; text-align: center; background-color: #bd0b0b; color: #fff;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;

      case 400:
        onError('Неверный запрос');
        break;
      case 401:
        onError('Пользователь не авторизован');
        break;
      case 404:
        onError('Ничего не найдено');
        break;

      default:
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000; // 10s

  xhr.open('GET', url);
  xhr.send();

});
