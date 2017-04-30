'use strict';

window.cardUtils = (function () {

  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC= 27;

  window.card = document.querySelector('.dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var cardClose = window.card.querySelector('.dialog__close');

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

  var hideCard = function () {
    window.card.style.display = 'none';
    window.pinUtils.removePinActive();
    document.removeEventListener('keydown', onEscClick);
  };

  var onEscClick = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      hideCard();
    }
  };

  cardClose.addEventListener('click', function (evt) {
    hideCard();
  });

  cardClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      hideCard();
    }
  });

  var updateCard = function (currentOffer) {
    var OFFER_PHOTOS_WIDTH = 52;
    var OFFER_PHOTOS_HEIGHT = 42;
    var lodge = lodgeTemplate.cloneNode(true);

    var lodgeTitle = lodge.querySelector('.lodge__title');
    lodgeTitle.textContent = currentOffer.offer.title;

    var lodgeAddress = lodge.querySelector('.lodge__address');
    lodgeAddress.textContent = currentOffer.offer.address;

    var lodgePrice = lodge.querySelector('.lodge__price');
    lodgePrice.innerHTML = currentOffer.offer.price + '&#x20bd;/ночь';

    var lodgeType = lodge.querySelector('.lodge__type');
    lodgeType.textContent = getOfferLodgeType(currentOffer.offer.type);

    var lodgeRoomsAndGuests = lodge.querySelector('.lodge__rooms-and-guests');
    lodgeRoomsAndGuests.textContent = 'Для ' + currentOffer.offer.guests + ' гостей в ' + currentOffer.offer.rooms + ' комнатах';

    var lodgeCheckin = lodge.querySelector('.lodge__checkin-time');
    lodgeCheckin.textContent = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;

    var lodgeFeatures = lodge.querySelector('.lodge__features');
    currentOffer.offer.features.forEach(function (featureItem) {
      var newOfferFeature = document.createElement('span');
      newOfferFeature.className = 'feature__image feature__image--' + featureItem;
      lodgeFeatures.appendChild(newOfferFeature);
    });

    var lodgePhotos = lodge.querySelector('.lodge__photos');
    currentOffer.offer.photos.forEach(function (photoItem) {
      var newOfferPhoto = document.createElement('img');
      newOfferPhoto.setAttribute('src', photoItem);
      newOfferPhoto.setAttribute('alt', 'Lodge photo');
      newOfferPhoto.width = OFFER_PHOTOS_WIDTH;
      newOfferPhoto.height = OFFER_PHOTOS_HEIGHT;
      lodgePhotos.appendChild(newOfferPhoto);
    });

    var lodgeDescription = lodge.querySelector('.lodge__description');
    lodgeDescription.textContent = currentOffer.offer.description;

    var cardPanel = window.card.querySelector('.dialog__panel');
    window.card.replaceChild(lodge, cardPanel);

    var cardImage = window.card.querySelector('.dialog__title img[alt=Avatar]');
    cardImage.src = currentOffer.author.avatar;
  };

  return {
    updateCard: updateCard,
    hideCard: hideCard,
    onEscClick: onEscClick,
  };
})();
