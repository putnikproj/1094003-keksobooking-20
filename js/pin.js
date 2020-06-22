'use strict';

(function () {
  var createNewPin = function (templateElement, offerInfo) {
    var element = templateElement.cloneNode(true);
    var elementImage = element.querySelector('img');

    element.style = 'left: ' + (offerInfo.location.x - window.constants.SIMILAR_PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - window.constants.SIMILAR_PIN_HEIGHT) + 'px;';
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
    createNew: createNewPin,
    addEventListeners: addEventListenersOnSimilarOffers
  };
})();
