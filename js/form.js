'use strict';

window.formUtils = (function () {
  var form = document.querySelector('.notice__form');

  // Синхронизация полей времени заезда и выезда
  var timeSelect = form.querySelector('#time');
  var timeoutSelect = form.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  timeSelect.addEventListener('change', function (evt) {
    window.syncFields(evt.currentTarget, timeoutSelect, ['12', '13', '14'], syncValues);
  });
  timeoutSelect.addEventListener('change', function (evt) {
    window.syncFields(evt.currentTarget, timeSelect, ['12', '13', '14'], syncValues);
  });

  // Синхронизация количества комнат и количества гостей
  var roomNumberSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');

  roomNumberSelect.addEventListener('change', function (evt) {
    window.syncFields(evt.currentTarget, capacitySelect, ['0', '3', '3'], syncValues);
  });
  capacitySelect.addEventListener('change', function (evt) {
    window.syncFields(evt.currentTarget, roomNumberSelect, ['1', '2', '100'], syncValues);
  });

  // Синхронизация типа жилья и минимальной цены
  var price = document.querySelector('#price');
  var flatTypeSelect = form.querySelector('#type');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  flatTypeSelect.addEventListener('change', function (evt) {
    window.syncFields(evt.currentTarget, price, ['1000', '0', '10000'], syncValueWithMin);
  });

})();
