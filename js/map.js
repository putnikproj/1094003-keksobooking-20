'use strict';

(function () {
  var addOffersOnSite = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      var newPin = window.pin.createNew(pin, offer);
      if (newPin) {
        fragment.appendChild(newPin);
      }
    });

    mapPinsField.appendChild(fragment);
  };

  var showOffers = function (isFilterEnabled) {
    addOffersOnSite(window.map.filteredSimilarOffers);
    if (!isFilterEnabled) {
      window.filter.enable();
    }
    window.pin.addEventListeners();
  };

  var removeOffers = function () {
    window.main.similarOffersPins.forEach(function (elem) {
      elem.remove();
    });
    window.main.similarOffersPins = [];
  };

  var onWindowKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeOfferCard();
    }
  };

  var showOfferCard = function (number) {
    if (!isCardShown) {
      var card = window.card.createNew(cardTemplate, window.map.filteredSimilarOffers[number]);
      var cardClose = card.querySelector('.popup__close');

      cardClose.addEventListener('click', closeOfferCard);
      window.addEventListener('keydown', onWindowKeydown);
      map.insertBefore(card, document.querySelector('.map__filters-container'));

      window.card.current = number;
      isCardShown = true;
    }
  };

  var closeOfferCard = function () {
    if (isCardShown) {
      var card = map.querySelector('.map__card');

      map.removeChild(card);

      window.removeEventListener('keydown', onWindowKeydown);
      window.card.shownElement.classList.remove('map__pin--active');
      window.card.shownElement = null;

      window.card.current = -1;
      isCardShown = false;
    }
  };

  var resetMainPinToDefault = function () {
    mainPin.style.left = window.constants.MainPin.DefaultCoords.X + 'px';
    mainPin.style.top = window.constants.MainPin.DefaultCoords.Y + 'px';
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
  };

  var disableMap = function () {
    map.classList.add('map--faded');
  };

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var isCardShown = false;

  window.map = {
    field: map,
    pinsField: mapPinsField,
    mainPin: mainPin,
    similarOffers: [],
    filteredSimilarOffers: [],
    getMainPinCurrentY: function () {
      return mainPin.offsetTop + window.constants.MainPin.Height.SHARP;
    },
    getMainPinCurrentX: function () {
      return mainPin.offsetLeft + window.constants.MainPin.WIDTH / 2;
    },
    enable: enableMap,
    disable: disableMap,
    resetMainPinToDefault: resetMainPinToDefault,
    showOffers: showOffers,
    removeOffers: removeOffers,
    showOfferCard: showOfferCard,
    closeOfferCard: closeOfferCard
  };
})();
