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
    window.cardUtils.showCard();
  };

  var mapWrap = document.querySelector('.tokyo');
  var mapWrapHeight = mapWrap.offsetHeight;
  var mapWrapWidth = mapWrap.offsetWidth;

  var PIN_MAIN_WIDTH = 75;
  var PIN_MAIN_HEIGHT = 94;
  var pinMain = document.querySelector('.pin__main');
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

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
      }
      else{
        pinMain.style.top = pinShiftTop + 'px';
        pinMain.style.left = pinShiftLeft + 'px';

        var adressX = (pinMain.offsetTop - shift.y) - PIN_MAIN_WIDTH;
        var adressY = (pinMain.offsetLeft - shift.x) - PIN_MAIN_HEIGHT/2;
        var adressInput = document.querySelector('#address');
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
    generatePins: function (offers) {

      var PIN_WIDTH = 40;
      var PIN_HEIGHT = 40;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offers.length; i++) {

        var newPin = document.createElement('div');
        newPin.className = 'pin';
        var pinLeftPosition = offers[i].location.x + PIN_WIDTH / 2;
        var pinTopPosition = offers[i].location.y + PIN_HEIGHT;
        newPin.setAttribute('style', 'left: ' + pinLeftPosition + 'px; top: ' + pinTopPosition + 'px;');
        newPin.setAttribute('tabindex', '0');
        newPin.setAttribute('data-index', i);

        var newPinImage = document.createElement('img');
        newPinImage.className = 'rounded';
        newPinImage.src = offers[i].author.avatar;
        newPinImage.width = PIN_WIDTH;
        newPinImage.height = PIN_HEIGHT;

        newPin.appendChild(newPinImage);
        newPin.addEventListener('click', onPinClick);
        newPin.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 13) {
            onPinClick(evt);
          }
        });
        fragment.appendChild(newPin);
      }
      return fragment;
    },
    removePinActive: removePinActive
  };
})();
