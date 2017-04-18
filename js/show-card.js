'use strict';

window.showCard = (function () {
  window.card.style.display = 'block';
  document.addEventListener('keydown', window.cardUtils.onEscClick);
});
