'use strict';

(function () {
  var setFieldСorrectness = function (element, isCorrect) {
    if (isCorrect) {
      element.removeAttribute('style');
    } else {
      element.setAttribute('style', 'border-color: red;');
    }
  };

  var checkTitle = function () {
    if (adFormTitle.validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное поле');
      setFieldСorrectness(adFormTitle, false);

    } else if (adFormTitle.validity.tooShort) {
      adFormTitle.setCustomValidity('Заголовок должен быть от 30-ти символов, а у вас их ' + adFormTitle.value.length);
      setFieldСorrectness(adFormTitle, false);

    } else if (adFormTitle.validity.tooLong) {
      adFormTitle.setCustomValidity('Заголовок должен быть до 100 символов, а у вас их ' + adFormTitle.value.length);
      setFieldСorrectness(adFormTitle, false);

    } else {
      adFormTitle.setCustomValidity('');
      setFieldСorrectness(adFormTitle, true);
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
    if (adFormPrice.validity.valueMissing) {
      adFormPrice.setCustomValidity('Обязательное поле');
      setFieldСorrectness(adFormPrice, false);

    } else if (adFormPrice.validity.rangeUnderflow) {
      adFormPrice.setCustomValidity('Цена за ночь при типе жилья \"' + adFormTypeOfHouse.options[adFormTypeOfHouse.selectedIndex].textContent + '\" должна быть не меньше ' + adFormPrice.min);
      setFieldСorrectness(adFormPrice, false);

    } else if (adFormPrice.validity.rangeOverflow) {
      adFormPrice.setCustomValidity('Цена за ночь при типе жилья \"' + adFormTypeOfHouse.options[adFormTypeOfHouse.selectedIndex].textContent + '\" должна быть не больше ' + adFormPrice.max);
      setFieldСorrectness(adFormPrice, false);

    } else {
      adFormPrice.setCustomValidity('');
      setFieldСorrectness(adFormPrice, true);
    }
  };

  var checkRoomNumberAndCapacity = function () {
    if (adFormRoomNumber.value === '1' && !(adFormCapacity.value === '1')) {
      adFormCapacity.setCustomValidity('В 1-й комнате может быть только 1 гость');
      setFieldСorrectness(adFormCapacity, false);

    } else if (adFormRoomNumber.value === '2' && !(adFormCapacity.value === '1' || adFormCapacity.value === '2')) {
      adFormCapacity.setCustomValidity('В 2-х комнатах может быть 1 или 2 гостя');
      setFieldСorrectness(adFormCapacity, false);

    } else if (adFormRoomNumber.value === '3' && !(adFormCapacity.value === '1' || adFormCapacity.value === '2' || adFormCapacity.value === '3')) {
      adFormCapacity.setCustomValidity('В 3-х комнатах может быть от 1 до 3 гостей');
      setFieldСorrectness(adFormCapacity, false);

    } else if (adFormRoomNumber.value === '100' && !(adFormCapacity.value === '0')) {
      adFormCapacity.setCustomValidity('100 комнат – не для гостей');
      setFieldСorrectness(adFormCapacity, false);

    } else {
      adFormCapacity.setCustomValidity('');
      setFieldСorrectness(adFormCapacity, true);
    }
  };

  var writeAdFormAddress = function () {
    var MainPinCurrentY = window.map.getMainPinCurrentY();
    if (!window.main.isSiteActivated) {
      MainPinCurrentY -= window.constants.MainPin.Height.SHARP - window.constants.MainPin.Height.ROUND / 2;
    }
    adFormAdress.value = window.map.getMainPinCurrentX() + ', ' + MainPinCurrentY;
  };

  var disableAdform = function () {
    adFormControls.forEach(function (control) {
      control.disabled = true;
    });
    adForm.classList.add('ad-form--disabled');
  };

  var enableAdForm = function () {
    adFormControls.forEach(function (control) {
      control.disabled = false;
    });

    writeAdFormAddress();
    adFormAdress.readOnly = true;
    adForm.classList.remove('ad-form--disabled');
  };

  var resetForm = function () {
    adForm.reset();
    writeAdFormAddress();
    setHousePrice();
    checkRoomNumberAndCapacity();
    setFieldСorrectness(adFormTitle, true);
    setFieldСorrectness(adFormPrice, true);
    setFieldСorrectness(adFormCapacity, true);
    adFormAvatarPreview.src = window.constants.PreviewImageBlock.Avatar.DEFAULT_IMAGE;
    adFormHousePhotoPreview.innerHTML = '';
  };

  var previewImage = function (upload, preview) {
    var file = upload.files[0];

    if (file.type.indexOf('image') !== -1) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.tagName === 'IMG') {
          preview.src = reader.result;

        } else if (preview.tagName === 'DIV') {
          var image = document.createElement('img');
          image.width = window.constants.PreviewImageBlock.House.WIDTH;
          image.height = window.constants.PreviewImageBlock.House.HEIGHT;
          image.src = reader.result;

          preview.innerHTML = '';
          preview.appendChild(image);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  var addEventListenersOnFormElements = function () {
    adFormTitle.addEventListener('invalid', function () {
      checkTitle();
    });
    adFormTitle.addEventListener('input', function () {
      checkTitle();
    });
    adFormPrice.addEventListener('invalid', function () {
      checkHousePrice();
    });
    adFormPrice.addEventListener('input', function () {
      checkHousePrice();
    });
    adFormTypeOfHouse.addEventListener('change', function () {
      setHousePrice();
    });
    adFormTypeOfHouse.addEventListener('change', function () {
      checkHousePrice();
    });
    adFormRoomNumber.addEventListener('change', function () {
      checkRoomNumberAndCapacity();
    });
    adFormCapacity.addEventListener('invalid', function () {
      checkRoomNumberAndCapacity();
    });
    adFormCapacity.addEventListener('change', function () {
      checkRoomNumberAndCapacity();
    });

    adFormTimeIn.addEventListener('change', function () {
      adFormTimeOut.value = adFormTimeIn.value;
    });
    adFormTimeOut.addEventListener('change', function () {
      adFormTimeIn.value = adFormTimeOut.value;
    });

    adFormFeatures.forEach(function (feature) {
      feature.addEventListener('keydown', function (evt) {
        if (evt.key === window.constants.KeyboardKeys.ENTER) {
          evt.preventDefault();
          if (feature.checked) {
            feature.checked = false;
          } else {
            feature.checked = true;
          }
        }
      });
    });

    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(adForm), window.responseProcessing.sendForm.onSuccess, window.responseProcessing.sendForm.onError);
    });

    var onFormResetClick = function (evt) {
      evt.preventDefault();
      window.main.disableSite();
    };

    var onFormResetKeydown = function (evt) {
      if (evt.key === window.constants.KeyboardKeys.ENTER) {
        evt.preventDefault();
        window.main.disableSite();
      }
    };

    adFormAvatarUpload.addEventListener('change', function () {
      previewImage(adFormAvatarUpload, adFormAvatarPreview);
    });

    adFormHousePhotoUpload.addEventListener('change', function () {
      previewImage(adFormHousePhotoUpload, adFormHousePhotoPreview);
    });

    adFormReset.addEventListener('click', onFormResetClick);
    adFormReset.addEventListener('keydown', onFormResetKeydown);
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
  var adFormFeatures = adForm.querySelectorAll('.features input');
  var adFormAvatarUpload = adForm.querySelector('.ad-form__field input[type=file]');
  var adFormAvatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var adFormHousePhotoUpload = adForm.querySelector('.ad-form__upload input[type=file]');
  var adFormHousePhotoPreview = adForm.querySelector('.ad-form__photo');

  window.form = {
    section: adForm,
    writeAddress: writeAdFormAddress,
    addEventListeners: addEventListenersOnFormElements,
    resetToDefault: resetForm,
    disable: disableAdform,
    enable: enableAdForm
  };
})();
