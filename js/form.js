'use strict';

window.formUtils = (function () {
  var form = document.querySelector('.notice__form');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var flatTypeSelect = form.querySelector('#type');
  var timeSelect = form.querySelector('#time');
  var timeoutSelect = form.querySelector('#timeout');
  var roomNumberSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');

  var onTimeChange = function (evt) {
    var curSelectValue = evt.currentTarget.value;
    var syncElemId = evt.currentTarget.attributes['data-sync'].value;
    var syncElem = document.getElementById(syncElemId);
    syncElem.value = curSelectValue;
  };

  var updateMinPrice = function (minPrice) {
    price.setAttribute('min', minPrice);
  };

  var onFlatTypeSelectChange = function (evt) {
    switch (evt.currentTarget.value) {
      case 'flat':
        updateMinPrice(1000);
        break;
      case 'bungalo':
        updateMinPrice(0);
        break;
      case 'house':
        updateMinPrice(10000);
        break;
    }
  };

  var onRoomNumberChange = function (evt) {
    var curRoomNumber = Number(evt.currentTarget.value);
    var curCapacity = curRoomNumber > 1 ? 3 : 0;
    capacitySelect.value = curCapacity;
  };

  var onCapacitySelectChange = function (evt) {
    var curCapacity = Number(evt.currentTarget.value);
    var curRoomNumber = curCapacity === 0 ? 1 : 2;
    roomNumberSelect.value = curRoomNumber;
  };

  timeSelect.addEventListener('change', onTimeChange);
  timeoutSelect.addEventListener('change', onTimeChange);
  roomNumberSelect.addEventListener('change', onRoomNumberChange);
  capacitySelect.addEventListener('change', onCapacitySelectChange);
  flatTypeSelect.addEventListener('change', onFlatTypeSelectChange);

})();
