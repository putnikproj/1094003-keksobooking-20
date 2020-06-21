'use strict';

(function () {
  var disableSite = function () {
    window.form.controls.forEach(function (control) {
      control.disabled = true;
    });
  };

  var activateSite = function () {
    window.map.field.classList.remove('map--faded');
    window.form.section.classList.remove('ad-form--disabled');

    window.form.controls.forEach(function (control) {
      control.disabled = false;
    });

    window.form.address.readOnly = true;

    window.map.showOffers();
  };

  var afterMainPinPress = function () {
    activateSite();
    window.form.writeAddress();
    window.form.addEventListeners();
    window.pin.addEventListeners();
  };

  var onMainPinKeydown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter' && !window.main.isSiteActivated) {
      afterMainPinPress();
      window.main.isSiteActivated = true;
    }
  };


  disableSite();
  window.form.writeAddress();
  window.form.setHousePrice();
  window.form.checkRoomNumberAndCapacity();

  window.map.mainPin.addEventListener('mousedown', window.move.onMainPinMousedown);
  window.map.mainPin.addEventListener('keydown', onMainPinKeydown);

  window.main = {
    isSiteActivated: false,
    afterMainPinPress: afterMainPinPress
  };
})();
