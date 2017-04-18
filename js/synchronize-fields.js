'use strict';

window.syncFields = (function (elemSelected, elemSync, elemSyncValues, syncFunc) {
  if (typeof syncFunc === 'function') {
    syncFunc(elemSync, elemSyncValues[elemSelected.selectedIndex]);
  }
});
