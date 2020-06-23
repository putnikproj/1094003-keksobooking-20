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
    window.form.writeAddress();
    window.form.addEventListeners();

    if (window.map.similarOffers.length !== 0) {
      window.map.showOffers();
      window.pin.addEventListeners();
    }
  };

  var onMainPinKeydown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter' && !window.main.isSiteActivated) {
      activateSite();
      window.main.isSiteActivated = true;
    }
  };

  var onSimilarOffersLoadSuccess = function (data) {
    window.map.similarOffers = data;
    if (window.main.isSiteActivated) {
      window.map.showOffers();
      window.pin.addEventListeners();
    }
  };

  var onSimilarOffersLoadError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.textContent = errorMessage;
    errorBlock.style.width = '700px';
    errorBlock.style.minHeight = '65px';
    errorBlock.style.backgroundColor = 'white';
    errorBlock.style.color = 'black';
    errorBlock.style.border = '2px solid black';
    errorBlock.style.borderRadius = '5px';
    errorBlock.style.position = 'absolute';
    errorBlock.style.textAlign = 'center';
    errorBlock.style.boxSizing = 'border-box';
    errorBlock.style.padding = '20px';
    errorBlock.style.top = '10px';
    errorBlock.style.left = '50%';
    errorBlock.style.marginLeft = '-350px';
    errorBlock.style.zIndex = '10';
    document.body.appendChild(errorBlock);
  };


  disableSite();
  window.form.writeAddress();
  window.form.setHousePrice();
  window.form.checkRoomNumberAndCapacity();

  window.map.mainPin.addEventListener('mousedown', window.move.onMainPinMousedown);
  window.map.mainPin.addEventListener('keydown', onMainPinKeydown);

  window.backend.load(onSimilarOffersLoadSuccess, onSimilarOffersLoadError);

  window.main = {
    isSiteActivated: false,
    activateSite: activateSite
  };
})();
