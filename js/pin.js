'use strict';

window.pinUtils = (function () {

  var setPinActive = function (target) {
    target.classList.add('pin--active');
  };

  var removePinActive = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive !== null) {
      pinActive.classList.remove('pin--active');
    }
  };

  var onPinClick = function (evt) {
    window.cardUtils.hideCard();
    setPinActive(evt.currentTarget);
    var currentPinIndex = Number(evt.currentTarget.getAttribute('data-index'));
    window.cardUtils.updateCard(window.keksobookingData[currentPinIndex]);
    window.showCard();
  };

  var PIN_MAIN_WIDTH = 75;
  var PIN_MAIN_HEIGHT = 94;
  var mapWrap = document.querySelector('.tokyo');
  var mapWrapHeight = mapWrap.offsetHeight;
  var mapWrapWidth = mapWrap.offsetWidth;
  var pinMain = document.querySelector('.pin__main');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var adressInput = document.querySelector('#address');
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinShiftTop = pinMain.offsetTop - shift.y;
      var pinShiftLeft = pinMain.offsetLeft - shift.x;

      if ((pinShiftTop < 0) || ((pinShiftTop + PIN_MAIN_HEIGHT) > mapWrapHeight) || (pinShiftLeft < 0) || ((pinShiftLeft + PIN_MAIN_WIDTH) > mapWrapWidth)) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      } else {
        pinMain.style.top = pinShiftTop + 'px';
        pinMain.style.left = pinShiftLeft + 'px';

        var adressX = pinShiftTop + PIN_MAIN_HEIGHT;
        var adressY = pinShiftLeft + PIN_MAIN_WIDTH / 2;
        adressInput.value = 'x: ' + adressX + ', y: ' + adressY;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {
    onPinClick: onPinClick,
    removePinActive: removePinActive
  };
})();
