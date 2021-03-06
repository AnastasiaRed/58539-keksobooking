'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  window.debounce = function (funс) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(funс, DEBOUNCE_INTERVAL);
  };
})();
