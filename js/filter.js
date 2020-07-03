'use strict';

(function () {
  var disableMapFilters = function () {
    mapFiltersFormControls.forEach(function (control) {
      control.disabled = true;
    });
  };

  var enableMapFilters = function () {
    mapFiltersFormControls.forEach(function (control) {
      control.disabled = false;
    });
  };

  var tryToCloseOfferCard = function () {
    if (window.card.isShown) {
      window.map.closeOfferCard();
    }
  };

  var addEventListenersOnFilterControls = function () {
    mapFilterType.addEventListener('change', function () {
      tryToCloseOfferCard();
      window.main.similarOffersPins.forEach(function (elem) {
        elem.remove();
      });

      window.map.filteredSimilarOffers = filterOffersByAmount(filterOffersByType(window.map.similarOffers));
      window.map.showOffers(window.map.filteredSimilarOffers);
      window.main.similarOffersPins = window.pin.addEventListeners();
    });
    mapFilterPrice.addEventListener('change', tryToCloseOfferCard);
    mapFilterRooms.addEventListener('change', tryToCloseOfferCard);
    mapFilterGuests.addEventListener('change', tryToCloseOfferCard);
    mapFilterFeatures.forEach(function (feature) {
      feature.addEventListener('change', tryToCloseOfferCard);
    });
  };

  var filterOffersByAmount = function (offers) {
    return offers.filter(function (offer, index) {
      return index < window.constants.SimilarPin.AMOUNT;
    });
  };

  var filterOffersByType = function (offers) {
    if (mapFilterType.value === 'any') {
      return offers;
    }
    return offers.filter(function (similarOffer) {
      return similarOffer.offer.type === mapFilterType.value;
    });
  };

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormControls = mapFiltersForm.querySelectorAll('select, input');
  var mapFilterType = mapFiltersForm.querySelector('#housing-type');
  var mapFilterPrice = mapFiltersForm.querySelector('#housing-price');
  var mapFilterRooms = mapFiltersForm.querySelector('#housing-rooms');
  var mapFilterGuests = mapFiltersForm.querySelector('#housing-guests');
  var mapFilterFeatures = mapFiltersForm.querySelectorAll('input');

  window.filter = {
    disable: disableMapFilters,
    enable: enableMapFilters,
    addEventListeners: addEventListenersOnFilterControls,
    offers: {
      byAmount: filterOffersByAmount
    }
  };
})();
