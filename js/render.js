'use strict';

window.render = (function (offers) {

  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var KEYCODE_ENTER = 13;
  var map = document.querySelector('.tokyo__pin-map');

  var removePin = function (pin) {
    map.removeChild(pin);
  };

  var renderPin = function (offer, index) {
    var newPin = document.createElement('div');
    newPin.className = 'pin';
    var pinLeftPosition = offer.location.x;
    var pinTopPosition = offer.location.y;
    newPin.setAttribute('style', 'left: ' + pinLeftPosition + 'px; top: ' + pinTopPosition + 'px;');
    newPin.setAttribute('tabindex', '0');
    newPin.setAttribute('data-index', index);

    var newPinImage = document.createElement('img');
    newPinImage.className = 'rounded';
    newPinImage.src = offer.author.avatar;
    newPinImage.width = PIN_WIDTH;
    newPinImage.height = PIN_HEIGHT;

    newPin.appendChild(newPinImage);
    newPin.addEventListener('click', window.pinUtils.onPinClick);
    newPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEYCODE_ENTER) {
        window.pinUtils.onPinClick(evt);
      }
    });

    return newPin;
  };

  var fragment = document.createDocumentFragment();

  var pinOnMaps = map.querySelectorAll('.pin:not(.pin__main)');
  if (pinOnMaps) {
    pinOnMaps.forEach(function (item) {
      removePin(item);
    });
  }
  offers.forEach(function (item) {
    var index = window.keksobookingData.indexOf(item);
    fragment.appendChild(renderPin(item, index));
  });
  map.appendChild(fragment);
});
