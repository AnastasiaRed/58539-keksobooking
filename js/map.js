'use strict';

var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offers = [];

var getRandomArray = function (array) {
  return array.slice(0, Math.floor(Math.random() * array.length));
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate array with data
for (var i = 0; i < 8; i++) {
  var newOffer = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    'offer': {
      'title': OFFER_TITLE[i],
      'address': function () {
        return newOffer.location.x + ', ' + newOffer.location.y;
      },
      'price': getRandomInt(1000, 1000000),
      'type': OFFER_TYPE[Math.floor(Math.random() * OFFER_TYPE.length)],
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 10),
      'checkin': OFFER_CHECKIN[Math.floor(Math.random() * OFFER_CHECKIN.length)],
      'checkout': OFFER_CHECKOUT[Math.floor(Math.random() * OFFER_CHECKOUT.length)],
      'features': getRandomArray(OFFER_FEATURES),
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandomInt(300, 900),
      'y': getRandomInt(100, 500)
    }
  };

  offers[i] = newOffer;
}

// Generate and show pins on the map (according to previously generated data)
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var fragment = document.createDocumentFragment();

for (i = 0; i < 8; i++) {

  var newPin = document.createElement('div');
  newPin.className = 'pin';
  var pinLeftPosition = offers[i].location.x + PIN_WIDTH / 2;
  var pinTopPosition = offers[i].location.y + PIN_HEIGHT;
  newPin.setAttribute('style', 'left: ' + pinLeftPosition + 'px; top: ' + pinTopPosition + 'px;');

  var newPinImage = document.createElement('img');
  newPinImage.className = 'rounded';
  newPinImage.src = offers[i].author.avatar;
  newPinImage.width = PIN_WIDTH;
  newPinImage.height = PIN_HEIGHT;

  newPin.appendChild(newPinImage);
  fragment.appendChild(newPin);
}

var map = document.querySelector('.tokyo__pin-map');
map.appendChild(fragment);

// Configurate dialog window for chosen offer
var lodgeTemplate = document.querySelector('#lodge-template').content;

var updateDialogPanel = function (currentOffer) {

  var lodge = lodgeTemplate.cloneNode(true);

  var lodgeTitle = lodge.querySelector('.lodge__title');
  lodgeTitle.textContent = currentOffer.offer.title;

  var lodgeAddress = lodge.querySelector('.lodge__address');
  lodgeAddress.textContent = currentOffer.offer.address();

  var lodgePrice = lodge.querySelector('.lodge__price');
  lodgePrice.innerHTML = currentOffer.offer.price + '&#x20bd;/ночь';

  var lodgeType = lodge.querySelector('.lodge__type');

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
  lodgeType.textContent = getOfferLodgeType(currentOffer.offer.type);

  var lodgeRoomsAndGuests = lodge.querySelector('.lodge__rooms-and-guests');
  lodgeRoomsAndGuests.textContent = 'Для ' + currentOffer.offer.guests + ' гостей в ' + currentOffer.offer.rooms + ' комнатах';

  var lodgeCheckin = lodge.querySelector('.lodge__checkin-time');
  lodgeCheckin.textContent = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;

  var lodgeFeatures = lodge.querySelector('.lodge__features');

  for (i = 0; i < currentOffer.offer.features.length; i++) {
    var newOfferFeature = document.createElement('span');
    newOfferFeature.className = 'feature__image feature__image--' + currentOffer.offer.features[i];
    lodgeFeatures.appendChild(newOfferFeature);
  }

  var lodgeDescription = lodge.querySelector('.lodge__description');
  lodgeDescription.textContent = currentOffer.offer.description;

  var dialog = document.querySelector('.dialog');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  dialog.replaceChild(lodge, dialogPanel);

  var dialogTitle = dialog.querySelector('.dialog__title');
  var dialogImage = dialogTitle.querySelector('img[alt=Avatar]');
  dialogImage.src = currentOffer.author.avatar;

};

updateDialogPanel(offers[0]);
