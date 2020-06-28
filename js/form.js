'use strict';

(function () {
  var checkTitle = function () {
    if (adFormTitle.validity.tooShort) {
      adFormTitle.setCustomValidity('Заголовок должен быть от 30-ти символов, а у вас их ' + adFormTitle.value.length);
    } else if (adFormTitle.validity.tooLong) {
      adFormTitle.setCustomValidity('Заголовок должен быть до 100 символов, а у вас их ' + adFormTitle.value.length);
    } else if (adFormTitle.validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное поле');
    } else {
      adFormTitle.setCustomValidity('');
    }
  };

  var setHousePrice = function () {
    if (adFormTypeOfHouse.value === 'bungalo') {
      adFormPrice.min = '0';
      adFormPrice.placeholder = '0';
    } else if (adFormTypeOfHouse.value === 'flat') {
      adFormPrice.min = '1000';
      adFormPrice.placeholder = '1000';
    } else if (adFormTypeOfHouse.value === 'house') {
      adFormPrice.min = '5000';
      adFormPrice.placeholder = '5000';
    } else {
      adFormPrice.min = '10000';
      adFormPrice.placeholder = '10000';
    }
  };

  var checkHousePrice = function () {
    if (adFormPrice.validity.rangeUnderflow) {
      adFormPrice.setCustomValidity('Цена за ночь при типе жилья \"' + adFormTypeOfHouse.options[adFormTypeOfHouse.selectedIndex].textContent + '\" должна быть не меньше ' + adFormPrice.min);
    } else if (adFormPrice.validity.rangeOverflow) {
      adFormPrice.setCustomValidity('Цена за ночь при типе жилья \"' + adFormTypeOfHouse.options[adFormTypeOfHouse.selectedIndex].textContent + '\" должна быть не больше ' + adFormPrice.max);
    } else if (adFormPrice.validity.valueMissing) {
      adFormPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormPrice.setCustomValidity('');
    }
  };

  var checkRoomNumberAndCapacity = function () {
    if (adFormRoomNumber.value === '1' && !(adFormCapacity.value === '1')) {
      adFormCapacity.setCustomValidity('В 1-й комнате может быть только 1 гость');
    } else if (adFormRoomNumber.value === '2' && !(adFormCapacity.value === '1' || adFormCapacity.value === '2')) {
      adFormCapacity.setCustomValidity('В 2-х комнатах может быть 1 или 2 гостя');
    } else if (adFormRoomNumber.value === '3' && !(adFormCapacity.value === '1' || adFormCapacity.value === '2' || adFormCapacity.value === '3')) {
      adFormCapacity.setCustomValidity('В 3-х комнатах может быть от 1 до 3 гостей');
    } else if (adFormRoomNumber.value === '100' && !(adFormCapacity.value === '0')) {
      adFormCapacity.setCustomValidity('100 комнат – не для гостей');
    } else {
      adFormCapacity.setCustomValidity('');
    }
  };

  var writeAdFormAddress = function () {
    adFormAdress.value = (window.map.getMainPinCurrentX()) + ', ' + (window.map.getMainPinCurrentY());
  };

  var resetForm = function () {
    adForm.reset();
    writeAdFormAddress();
    setHousePrice();
    checkRoomNumberAndCapacity();
  };

  var addEventListenersOnFormElements = function () {
    adFormTitle.addEventListener('invalid', checkTitle);
    adFormTitle.addEventListener('input', checkTitle);
    adFormTypeOfHouse.addEventListener('change', setHousePrice);
    adFormPrice.addEventListener('invalid', checkHousePrice);
    adFormPrice.addEventListener('input', checkHousePrice);
    adFormRoomNumber.addEventListener('change', checkRoomNumberAndCapacity);
    adFormCapacity.addEventListener('change', checkRoomNumberAndCapacity);

    adFormTimeIn.addEventListener('change', function () {
      adFormTimeOut.value = adFormTimeIn.value;
    });
    adFormTimeOut.addEventListener('change', function () {
      adFormTimeIn.value = adFormTimeOut.value;
    });
  };

  var adForm = document.querySelector('.ad-form');
  var adFormControls = adForm.querySelectorAll('input, select, button, textarea');
  var adFormAdress = adForm.querySelector('#address');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var adFormTitle = adForm.querySelector('#title');
  var adFormTypeOfHouse = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  window.form = {
    section: adForm,
    controls: adFormControls,
    address: adFormAdress,
    resetBtn: adFormReset,
    writeAddress: writeAdFormAddress,
    setHousePrice: setHousePrice,
    checkRoomNumberAndCapacity: checkRoomNumberAndCapacity,
    addEventListeners: addEventListenersOnFormElements,
    resetToDefault: resetForm
  };
})();
