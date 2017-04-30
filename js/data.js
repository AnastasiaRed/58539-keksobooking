'use strict';

window.keksobookingData = (function () {
  var OFFER_NUMBER = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
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

  for (var i = 0; i < OFFER_NUMBER; i++) {
    var newOffer = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': OFFER_TITLES[i],
        'address': function () {
          return newOffer.location.x + ', ' + newOffer.location.y;
        },
        'price': getRandomInt(1000, 1000000),
        'type': OFFER_TYPE[Math.floor(Math.random() * OFFER_TYPES.length)],
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
  return offers;
});
