'use strict';

(function () {
  var showOffers = function () {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    window.data.similarOffers.forEach(function (offer) {
      fragment.appendChild(window.pin.createNew(pin, offer));
    });

    mapPinsField.appendChild(fragment);
  };

  var onWindowKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeOfferCard();
    }
  };

  var showOfferCard = function (number) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = window.card.createNew(cardTemplate, window.data.similarOffers[number]);
    var cardClose = card.querySelector('.popup__close');

    cardClose.addEventListener('click', closeOfferCard);
    window.addEventListener('keydown', onWindowKeydown);
    window.card.current = number;

    map.insertBefore(card, document.querySelector('.map__filters-container'));
  };

  var closeOfferCard = function () {
    var card = map.querySelector('.map__card');

    map.removeChild(card);

    window.card.isShown = false;
    window.removeEventListener('keydown', onWindowKeydown);
    window.card.current = -1;
  };

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  window.map = {
    field: map,
    pinsField: mapPinsField,
    mainPin: mainPin,
    getMainPinCurrentY: function () {
      return mainPin.offsetTop + window.constants.MAIN_PIN_HEIGHT;
    },
    getMainPinCurrentX: function () {
      return mainPin.offsetLeft + window.constants.MAIN_PIN_WIDTH / 2;
    },
    showOffers: showOffers,
    showOfferCard: showOfferCard,
    closeOfferCard: closeOfferCard
  };
})();
