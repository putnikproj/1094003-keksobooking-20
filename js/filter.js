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

  var showFilteredOffers = function () {
    if (window.card.isShown) {
      window.map.closeOfferCard();
    }

    window.main.similarOffersPins.forEach(function (elem) {
      elem.remove();
    });

    window.map.showOffers(window.map.filteredSimilarOffers);
    window.main.similarOffersPins = window.pin.addEventListeners();
  };

  var onFilterChange = function () {
    window.map.filteredSimilarOffers = window.map.similarOffers;

    window.map.filteredSimilarOffers = filterOffersByType(window.map.filteredSimilarOffers);
    window.map.filteredSimilarOffers = filterOffersByPrice(window.map.filteredSimilarOffers);
    window.map.filteredSimilarOffers = filterOffersByRooms(window.map.filteredSimilarOffers);
    window.map.filteredSimilarOffers = filterOffersByGuests(window.map.filteredSimilarOffers);
    window.map.filteredSimilarOffers = filterOffersByFeatures(window.map.filteredSimilarOffers);
    window.map.filteredSimilarOffers = filterOffersByAmount(window.map.filteredSimilarOffers);

    showFilteredOffers();
  };

  var addEventListenersOnFilterControls = function () {
    mapFilterType.addEventListener('change', window.debounce(onFilterChange));
    mapFilterPrice.addEventListener('change', window.debounce(onFilterChange));
    mapFilterRooms.addEventListener('change', window.debounce(onFilterChange));
    mapFilterGuests.addEventListener('change', window.debounce(onFilterChange));
    mapFilterFeatures.forEach(function (feature) {
      feature.addEventListener('change', window.debounce(onFilterChange));
    });
  };

  var filterOffersByAmount = function (offers) {
    var filteredOffers = [];
    for (var i = 0; i < offers.length; i++) {
      if (i >= window.constants.PinFilter.AMOUNT) {
        break;
      } else {
        filteredOffers.push(offers[i]);
      }
    }
    return filteredOffers;
  };

  var filterOffersByType = function (offers) {
    if (mapFilterType.value === 'any') {
      return offers;
    }
    return offers.filter(function (similarOffer) {
      return similarOffer.offer.type === mapFilterType.value;
    });
  };

  var filterOffersByPrice = function (offers) {
    if (mapFilterPrice.value === 'any') {
      return offers;
    }
    return offers.filter(function (similarOffer) {
      if (mapFilterPrice.value === 'low') {
        return similarOffer.offer.price < window.constants.PinFilter.Price.LOW;
      } else if (mapFilterPrice.value === 'middle') {
        return similarOffer.offer.price >= window.constants.PinFilter.Price.LOW && similarOffer.offer.price < window.constants.PinFilter.Price.HIGH;
      }
      return similarOffer.offer.price >= window.constants.PinFilter.Price.HIGH;
    });
  };

  var filterOffersByRooms = function (offers) {
    if (mapFilterRooms.value === 'any') {
      return offers;
    }
    return offers.filter(function (similarOffer) {
      return parseInt(mapFilterRooms.value, 10) === similarOffer.offer.rooms;
    });
  };

  var filterOffersByGuests = function (offers) {
    if (mapFilterGuests.value === 'any') {
      return offers;
    }
    return offers.filter(function (similarOffer) {
      return parseInt(mapFilterGuests.value, 10) === similarOffer.offer.guests;
    });
  };

  var filterOffersByFeatures = function (offers) {
    return offers.filter(function (similarOffer) {
      for (var i = 0; i < mapFilterFeatures.length; i++) {
        if (mapFilterFeatures[i].checked) {
          if (similarOffer.offer.features.indexOf(mapFilterFeatures[i].value) === -1) {
            return false;
          }
        }
      }
      return true;
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
