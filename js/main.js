'use strict';

(function () {
  window.main = {
    isSiteActivated: false,
    similarOffersPins: []
  };

  var disableSite = function () {
    window.main.isSiteActivated = false;

    window.map.resetMainPinToDefault();

    window.form.resetToDefault();
    window.filter.resetToDefault();
    window.form.disable();
    window.filter.disable();

    if (window.main.similarOffersPins.length !== 0) {
      window.map.removeOffers();
    }

    window.map.closeOfferCard();
    window.map.disable();
  };

  var activateSite = function () {
    window.main.isSiteActivated = true;

    window.map.enable();
    window.form.enable();

    if (window.map.similarOffers.length !== 0) {
      window.map.showOffers(false);
    }
  };

  var onMainPinKeydown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter' && !window.main.isSiteActivated) {
      activateSite();
    }
  };


  disableSite();

  window.map.mainPin.addEventListener('mousedown', window.move.onMainPinMousedown);
  window.map.mainPin.addEventListener('keydown', onMainPinKeydown);

  window.form.addEventListeners();
  window.filter.addEventListeners();

  window.backend.load(window.responseProcessing.loadOffers.onSuccess, window.responseProcessing.loadOffers.onError);

  window.main.activateSite = activateSite;
  window.main.disableSite = disableSite;
})();
