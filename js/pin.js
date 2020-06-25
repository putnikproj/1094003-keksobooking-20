'use strict';

(function () {
  var createNewPin = function (templateElement, offerInfo) {
    if (offerInfo.offer) {
      var element = templateElement.cloneNode(true);
      var elementImage = element.querySelector('img');

      element.style = 'left: ' + (offerInfo.location.x - window.constants.SIMILAR_PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - window.constants.SIMILAR_PIN_HEIGHT) + 'px;';
      elementImage.src = offerInfo.author.avatar;
      elementImage.alt = offerInfo.offer.title;

      return element;
    } else {
      return null;
    }
  };

  var onSimilarOfferPinClick = function (number, mapPin) {
    if (window.card.isShown && window.card.current !== number) {
      window.map.closeOfferCard(mapPin);
      window.map.showOfferCard(number);
    } else if (!window.card.isShown) {
      window.map.showOfferCard(number);
    }
    mapPin.classList.add('map__pin--active');
    window.card.shownElement = mapPin;
    window.card.isShown = true;
  };

  var addEventListenersOnSimilarOffer = function (mapPin, i) {
    mapPin.addEventListener('click', function () {
      onSimilarOfferPinClick(i, mapPin);
    });
    mapPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        onSimilarOfferPinClick(i, mapPin);
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
    createNew: createNewPin,
    addEventListeners: addEventListenersOnSimilarOffers
  };
})();
