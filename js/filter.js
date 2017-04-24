'use strict';

(function () {
  var offerType;
  var offerPriceMin;
  var offerPriceMax;
  var offerRoomNumber;
  var offerGuestNumber;
  var activeFeatures;

  var updatePinArray = function () {
    window.cardUtils.hideCard();
    var curPinArray = window.keksobookingData.slice();

    if (offerType) {
      if (offerType !== 'any') {
        curPinArray = curPinArray.filter(function (it) {
          return it.offer.type === offerType;
        });
      }
    }
    if (offerPriceMax) {
      curPinArray = curPinArray.filter(function (it) {
        return (it.offer.price >= offerPriceMin) && (it.offer.price <= offerPriceMax);
      });
    }
    if (offerRoomNumber) {
      if (offerRoomNumber !== 'any') {
        curPinArray = curPinArray.filter(function (it) {
          return it.offer.rooms === +offerRoomNumber;
        });
      }
    }
    if (offerGuestNumber) {
      if (offerGuestNumber !== 'any') {
        curPinArray = curPinArray.filter(function (it) {
          return it.offer.guests === +offerGuestNumber;
        });
      }
    }
    if (activeFeatures && activeFeatures.length > 0) {
      activeFeatures.forEach(function (item, index, array) {
        curPinArray = curPinArray.filter(function (it) {
          return it.offer.features.indexOf(item) !== -1;
        });
      });
    }
    window.render(curPinArray);
  };

  var filters = document.querySelector('.tokyo__filters');

  var filterType = filters.querySelector('#housing_type');
  filterType.addEventListener('change', function (evt) {
    offerType = evt.currentTarget.value;
    window.debounce(updatePinArray);
  });

  var filterPrice = filters.querySelector('#housing_price');
  filterPrice.addEventListener('change', function (evt) {
    var offerPrice = evt.currentTarget.value;
    switch (offerPrice) {
      case 'low':
        offerPriceMin = 0;
        offerPriceMax = 10000;
        break;
      case 'high':
        offerPriceMin = 50000;
        offerPriceMax = 10000000;
        break;
      default:
        offerPriceMin = 10000;
        offerPriceMax = 50000;
        break;
    }
    window.debounce(updatePinArray);
  });

  var filterRoomNumber = filters.querySelector('#housing_room-number');
  filterRoomNumber.addEventListener('change', function (evt) {
    offerRoomNumber = evt.currentTarget.value;
    window.debounce(updatePinArray);
  });

  var filterGuestNumber = filters.querySelector('#housing_guests-number');
  filterGuestNumber.addEventListener('change', function (evt) {
    offerGuestNumber = evt.currentTarget.value;
    window.debounce(updatePinArray);
  });

  var filterFeatures = filters.querySelector('#housing_features');
  var filterFeaturesList = filterFeatures.querySelectorAll('input[name=feature]');
  filterFeatures.addEventListener('change', function (evt) {
    activeFeatures = [].filter.call(filterFeaturesList, function (it) {
      return it.checked === true;
    })
    .map(function (it) {
      return it.value;
    });
    window.debounce(updatePinArray);
  });
})();
