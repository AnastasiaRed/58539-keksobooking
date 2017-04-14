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
