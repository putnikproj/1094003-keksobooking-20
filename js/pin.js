'use strict';

(function () {
  var createNewPin = function (templateElement, offerInfo) {
    if (offerInfo.offer) {
      var element = templateElement.cloneNode(true);
      var elementImage = element.querySelector('img');

      element.style = 'left: ' + (offerInfo.location.x - window.constants.SimilarPin.WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - window.constants.SimilarPin.HEIGHT) + 'px;';
      elementImage.src = offerInfo.author.avatar;
      elementImage.alt = offerInfo.offer.title;

      return element;
    }
    return null;
  };

  var onSimilarOfferPinPress = function (number, mapPin) {
    if (window.card.current !== number) {
      window.map.closeOfferCard(mapPin);
      window.map.showOfferCard(number);
    }

    window.card.shownElement = mapPin;
    window.card.shownElement.classList.add('map__pin--active');
  };

  var addEventListenersOnPin = function (mapPin, i) {
    mapPin.addEventListener('click', function () {
      onSimilarOfferPinPress(i, mapPin);
    });
    mapPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        onSimilarOfferPinPress(i, mapPin);
      }
    });
  };

  var findPinsOnSite = function () {
    return window.map.pinsField.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  var addEventListenersOnPins = function () {
    window.main.similarOffersPins = findPinsOnSite();
    window.main.similarOffersPins.forEach(function (elem, index) {
      addEventListenersOnPin(elem, index);
    });
  };

  window.pin = {
    createNew: createNewPin,
    addEventListeners: addEventListenersOnPins
  };
})();
