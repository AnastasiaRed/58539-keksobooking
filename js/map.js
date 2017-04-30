'use strict';

(function () {

  var onLoad = function (data) {
    window.keksobookingData = data;
    window.render(window.keksobookingData.slice(0, 3));
    document.querySelector('.pin:not(.pin__main)').click();
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);
})();
