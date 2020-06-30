'use strict';

(function () {
  var disableSite = function () {
    window.map.mainPin.style.left = window.constants.MAIN_PIN_DEFAULT_X + 'px';
    window.map.mainPin.style.top = window.constants.MAIN_PIN_DEFAULT_Y + 'px';
    window.form.resetToDefault();
    window.form.controls.forEach(function (control) {
      control.disabled = true;
    });

    if (similarOffersPins) {
      similarOffersPins.forEach(function (elem) {
        elem.remove();
      });
      similarOffersPins = null;
    }
    if (window.card.isShown) {
      window.map.closeOfferCard();
    }

    window.map.field.classList.add('map--faded');
    window.form.section.classList.add('ad-form--disabled');
  };

  var activateSite = function () {
    window.map.field.classList.remove('map--faded');
    window.form.section.classList.remove('ad-form--disabled');

    window.form.controls.forEach(function (control) {
      control.disabled = false;
    });

    window.form.address.readOnly = true;
    window.form.writeAddress();
    window.form.addEventListeners();

    if (window.map.similarOffers.length !== 0) {
      window.map.showOffers();
      similarOffersPins = window.pin.addEventListeners();
    }
  };

  var onMainPinKeydown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter' && !window.main.isSiteActivated) {
      activateSite();
      window.main.isSiteActivated = true;
    }
  };


  var similarOffersPins = null;
  disableSite();

  window.map.mainPin.addEventListener('mousedown', window.move.onMainPinMousedown);
  window.map.mainPin.addEventListener('keydown', onMainPinKeydown);

  window.backend.load(window.responseProcessing.loadOffers.onSuccess, window.responseProcessing.loadOffers.onError);

  window.form.section.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.section), window.responseProcessing.sendForm.onSuccess, window.responseProcessing.sendForm.onError);
  });

  window.form.resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    disableSite();
    window.main.isSiteActivated = false;
  });

  window.main = {
    isSiteActivated: false,
    activateSite: activateSite,
    disableSite: disableSite
  };
})();
