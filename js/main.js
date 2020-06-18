'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min;
};

var createSimilarOffers = function (mapWidth) {
  var similarOffers = [];
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumber(0, mapWidth);
    var locationY = getRandomNumber(130, 630);

    similarOffers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'title',
        'address': locationX + ', ' + locationY,
        'price': 500,
        'type': 'palace',
        'rooms': 3,
        'guests': 4,
        'checkin': '12:00',
        'checkout': '12:00',
        'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        'description': 'description',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return similarOffers;
};

var createNewPin = function (templateElement, offerInfo) {
  var element = templateElement.cloneNode(true);
  var elementImage = element.querySelector('img');

  element.style = 'left: ' + (offerInfo.location.x - PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - PIN_HEIGHT) + 'px;';
  elementImage.src = offerInfo.author.avatar;
  elementImage.alt = offerInfo.offer.title;

  return element;
};

var showOffers = function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  similarOffers.forEach(function (offer) {
    fragment.appendChild(createNewPin(pin, offer));
  });
  mapPinsField.appendChild(fragment);
};

var createNewCard = function (templateElement, offerInfo) {
  var element = templateElement.cloneNode(true);
  var offerType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  element.querySelector('.popup__title').textContent = offerInfo.offer.title;
  element.querySelector('.popup__text--address').textContent = offerInfo.offer.address;
  element.querySelector('.popup__text--price').textContent = offerInfo.offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = offerType[offerInfo.offer.type];
  element.querySelector('.popup__text--capacity').textContent = offerInfo.offer.rooms + ' комнаты для ' + offerInfo.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerInfo.offer.checkin + ', выезд до ' + offerInfo.offer.checkout;
  element.querySelector('.popup__description').textContent = offerInfo.offer.description;
  element.querySelector('.popup__avatar').src = offerInfo.author.avatar;

  var elementFeatures = element.querySelector('.popup__features');
  elementFeatures.innerHTML = '';
  for (var i = 0; i < offerInfo.offer.features.length; i++) {
    elementFeatures.insertAdjacentHTML('beforeend', '<li class=\"popup__feature popup__feature--' + offerInfo.offer.features[i] + '\"></li>');
  }

  var elementPhotos = element.querySelector('.popup__photos');
  var templatePhoto = elementPhotos.querySelector('.popup__photo');
  elementPhotos.innerHTML = '';
  for (i = 0; i < offerInfo.offer.photos.length; i++) {
    var photo = templatePhoto.cloneNode(true);
    photo.src = offerInfo.offer.photos[i];
    elementPhotos.appendChild(photo);
  }

  return element;
};

var showOfferCard = function (number) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = createNewCard(cardTemplate, similarOffers[number]);
  var cardClose = card.querySelector('.popup__close');
  cardClose.addEventListener('click', closeOfferCard);
  window.addEventListener('keydown', closeOfferCard);
  map.insertBefore(card, document.querySelector('.map__filters-container'));
  currentOfferCard = number;
};

var closeOfferCard = function () {
  var card = map.querySelector('.map__card');
  map.removeChild(card);
  isOfferCardShown = false;
  window.removeEventListener('keydown', closeOfferCard);
  currentOfferCard = -1;
};

var onSimilarOfferPinClick = function (number) {
  if (isOfferCardShown && currentOfferCard !== number) {
    closeOfferCard();
    showOfferCard(number);
  } else if (!isOfferCardShown) {
    showOfferCard(number);
  }
  isOfferCardShown = true;
};

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
  adFormAdress.value = (mainPin.offsetLeft - MAIN_PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop - MAIN_PIN_HEIGHT);
};

var disableSite = function () {
  adFormControls.forEach(function (control) {
    control.disabled = true;
  });
};

var activateSite = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  adFormControls.forEach(function (control) {
    control.disabled = false;
  });

  adFormAdress.readOnly = true;

  showOffers();
};

var addEventListenersOnFormElements = function () {
  adFormTitle.addEventListener('invalid', function () {
    checkTitle();
  });
  adFormTitle.addEventListener('input', function () {
    checkTitle();
  });


  adFormTypeOfHouse.addEventListener('change', function () {
    setHousePrice();
  });
  adFormPrice.addEventListener('invalid', function () {
    checkHousePrice();
  });
  adFormPrice.addEventListener('input', function () {
    checkHousePrice();
  });


  adFormTimeIn.addEventListener('change', function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });
  adFormTimeOut.addEventListener('change', function () {
    adFormTimeIn.value = adFormTimeOut.value;
  });


  adFormRoomNumber.addEventListener('change', function () {
    checkRoomNumberAndCapacity();
  });
  adFormCapacity.addEventListener('change', function () {
    checkRoomNumberAndCapacity();
  });
};

var addEventListenersOnSimilarOffer = function (mapPin, i) {
  mapPin.addEventListener('click', function () {
    onSimilarOfferPinClick(i);
  });
  mapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onSimilarOfferPinClick(i);
    }
  });
};

var addEventListenersOnSimilarOffers = function () {
  var mapPins = mapPinsField.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPins.forEach(function (elem, index) {
    addEventListenersOnSimilarOffer(elem, index);
  });
};

var afterMainPinPress = function () {
  activateSite();
  writeAdFormAddress();
  addEventListenersOnFormElements();
  addEventListenersOnSimilarOffers();
  mainPin.removeEventListener('mousedown', onMainPinMousedown);
  mainPin.removeEventListener('keydown', onMainPinKeydown);
};

var onMainPinKeydown = function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    afterMainPinPress();
  }
};

var onMainPinMousedown = function (evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    afterMainPinPress();
  }
};


var map = document.querySelector('.map');
var mapPinsField = map.querySelector('.map__pins');
var similarOffers = createSimilarOffers(mapPinsField.offsetWidth);
var isOfferCardShown = false;
var currentOfferCard = -1;
var mainPin = map.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormControls = adForm.querySelectorAll('input, select, button, textarea');
var adFormAdress = adForm.querySelector('#address');
var adFormTitle = adForm.querySelector('#title');
var adFormTypeOfHouse = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');

disableSite();
writeAdFormAddress();
setHousePrice();
checkRoomNumberAndCapacity();

mainPin.addEventListener('mousedown', onMainPinMousedown);
mainPin.addEventListener('keydown', onMainPinKeydown);
