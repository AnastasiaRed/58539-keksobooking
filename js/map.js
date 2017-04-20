'use strict';

window.mapUtils = (function () {
  var map = document.querySelector('.tokyo__pin-map');

  var onLoad = function (data) {
    window.keksobookingData = data;
    var pinFragment = window.pinUtils.generatePins(window.keksobookingData);
    map.appendChild(pinFragment);
    map.querySelector('.pin:not(.pin__main)').click();
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);

})();
