'use strict';

window.cardUtils = (function () {

  var card = document.querySelector('.dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var cardClose = card.querySelector('.dialog__close');

  var getOfferLodgeType = function (offerLodgeType) {
    var offerLodgeTypeName;
    switch (offerLodgeType) {
      case 'flat':
        offerLodgeTypeName = 'Квартира';
        break;
      case 'bungalo':
        offerLodgeTypeName = 'Бунгало';
        break;
      case 'house':
        offerLodgeTypeName = 'Дом';
        break;
    }
    return offerLodgeTypeName;
  };

  var showCard = function () {
    card.style.display = 'block';
    document.addEventListener('keydown', onEscClick);
  };

  var hideCard = function () {
    card.style.display = 'none';
    window.pinUtils.removePinActive();
    document.removeEventListener('keydown', onEscClick);
  };

  var onEscClick = function (evt) {
    if (evt.keyCode === 27) {
      hideCard();
    }
  };

  cardClose.addEventListener('click', function (evt) {
    hideCard();
  });

  cardClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      hideCard();
    }
  });

  return {
    updateCard: function (currentOffer) {

      var lodge = lodgeTemplate.cloneNode(true);

      var lodgeTitle = lodge.querySelector('.lodge__title');
      lodgeTitle.textContent = currentOffer.offer.title;

      var lodgeAddress = lodge.querySelector('.lodge__address');
      lodgeAddress.textContent = currentOffer.offer.address();

      var lodgePrice = lodge.querySelector('.lodge__price');
      lodgePrice.innerHTML = currentOffer.offer.price + '&#x20bd;/ночь';

      var lodgeType = lodge.querySelector('.lodge__type');
      lodgeType.textContent = getOfferLodgeType(currentOffer.offer.type);

      var lodgeRoomsAndGuests = lodge.querySelector('.lodge__rooms-and-guests');
      lodgeRoomsAndGuests.textContent = 'Для ' + currentOffer.offer.guests + ' гостей в ' + currentOffer.offer.rooms + ' комнатах';

      var lodgeCheckin = lodge.querySelector('.lodge__checkin-time');
      lodgeCheckin.textContent = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;

      var lodgeFeatures = lodge.querySelector('.lodge__features');
      for (var i = 0; i < currentOffer.offer.features.length; i++) {
        var newOfferFeature = document.createElement('span');
        newOfferFeature.className = 'feature__image feature__image--' + currentOffer.offer.features[i];
        lodgeFeatures.appendChild(newOfferFeature);
      }

      var lodgeDescription = lodge.querySelector('.lodge__description');
      lodgeDescription.textContent = currentOffer.offer.description;

      var cardPanel = card.querySelector('.dialog__panel');
      card.replaceChild(lodge, cardPanel);

      var cardImage = card.querySelector('.dialog__title img[alt=Avatar]');
      cardImage.src = currentOffer.author.avatar;

    },
    showCard: showCard,
    hideCard: hideCard,
  };
})();
