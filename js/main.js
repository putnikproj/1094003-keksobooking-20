'use strict';

(function () {
  window.main = {
    isSiteActivated: false,
    similarOffersPins: null
  };

  var disableSite = function () {
    window.map.mainPin.style.left = window.constants.MainPin.DefaultCoords.X + 'px';
    window.map.mainPin.style.top = window.constants.MainPin.DefaultCoords.Y + 'px';

    window.form.resetToDefault();
    window.form.disable();
    window.filter.disable();

    if (window.main.similarOffersPins) {
      window.main.similarOffersPins.forEach(function (elem) {
        elem.remove();
      });
      window.main.similarOffersPins = null;
    }
    if (window.card.isShown) {
      window.map.closeOfferCard();
    }

    window.map.field.classList.add('map--faded');
    window.form.section.classList.add('ad-form--disabled');

    window.main.isSiteActivated = false;
  };

  var activateSite = function () {
    window.map.field.classList.remove('map--faded');
    window.form.section.classList.remove('ad-form--disabled');

    window.form.enable();

    if (window.map.similarOffers.length !== 0) {
      window.responseProcessing.loadOffers.afterSuccess();
    }

    window.main.isSiteActivated = true;
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
