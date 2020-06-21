'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var createNewPin = function (templateElement, offerInfo) {
    var element = templateElement.cloneNode(true);
    var elementImage = element.querySelector('img');

    element.style = 'left: ' + (offerInfo.location.x - PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - PIN_HEIGHT) + 'px;';
    elementImage.src = offerInfo.author.avatar;
    elementImage.alt = offerInfo.offer.title;

    return element;
  };

  var onSimilarOfferPinClick = function (number) {
    if (window.card.isShown && window.card.current !== number) {
      window.map.closeOfferCard();
      window.map.showOfferCard(number);
    } else if (!window.card.isShown) {
      window.map.showOfferCard(number);
    }
    window.card.isShown = true;
  };

  var addEventListenersOnSimilarOffer = function (mapPin, i) {
    mapPin.addEventListener('click', function () {
      onSimilarOfferPinClick(i);
    });
    mapPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        onSimilarOfferPinClick(i);
      }
    });
  };

  var addEventListenersOnSimilarOffers = function () {
    var mapPins = window.map.pinsField.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (elem, index) {
      addEventListenersOnSimilarOffer(elem, index);
    });
  };

  window.pin = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    createNew: createNewPin,
    addEventListeners: addEventListenersOnSimilarOffers
  };
})();
