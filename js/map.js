'use strict';

window.mapUtils = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var pinFragment = window.pinUtils.generatePins(window.keksobookingData);
  map.appendChild(pinFragment);
  map.querySelector('.pin:not(.pin__main)').click();
})();
