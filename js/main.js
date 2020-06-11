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

var showOffers = function (map) {
  var mapPins = map.querySelector('.map__pins');
  var similarOffers = createSimilarOffers(mapPins.offsetWidth);

  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarOffers.length; i++) {
    fragment.appendChild(createNewPin(pin, similarOffers[i]));
  }
  mapPins.appendChild(fragment);
};

/*
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
*/

/*
var showOfferCard = function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = createNewCard(cardTemplate, similarOffers[0]);
  map.insertBefore(card, document.querySelector('.map__filters-container'));
};
*/

var checkTitle = function (title) {
  if (title.validity.tooShort) {
    title.setCustomValidity('Заголовок должен быть от 30-ти символов, а у вас их ' + title.value.length);
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Заголовок должен быть до 100 символов, а у вас их ' + title.value.length);
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
};

var setHousePrice = function (typeOfHouse, price) {
  if (typeOfHouse.value === 'bungalo') {
    price.min = '0';
    price.placeholder = '0';
  } else if (typeOfHouse.value === 'flat') {
    price.min = '1000';
    price.placeholder = '1000';
  } else if (typeOfHouse.value === 'house') {
    price.min = '5000';
    price.placeholder = '5000';
  } else {
    price.min = '10000';
    price.placeholder = '10000';
  }
};

var checkHousePrice = function (typeOfHouse, price) {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Цена за ночь при типе жилья \"' + typeOfHouse.options[typeOfHouse.selectedIndex].textContent + '\" должна быть не меньше ' + price.min);
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Цена за ночь при типе жилья \"' + typeOfHouse.options[typeOfHouse.selectedIndex].textContent + '\" должна быть не больше ' + price.max);
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
};

var checkRoomNumberAndCapacity = function (roomNumber, capacity) {
  if (roomNumber.value === '1' && !(capacity.value === '1')) {
    capacity.setCustomValidity('В 1-й комнате может быть только 1 гость');
  } else if (roomNumber.value === '2' && !(capacity.value === '1' || capacity.value === '2')) {
    capacity.setCustomValidity('В 2-х комнатах может быть 1 или 2 гостя');
  } else if (roomNumber.value === '3' && !(capacity.value === '1' || capacity.value === '2' || capacity.value === '3')) {
    capacity.setCustomValidity('В 3-х комнатах может быть от 1 до 3 гостей');
  } else if (roomNumber.value === '100' && !(capacity.value === '0')) {
    capacity.setCustomValidity('100 комнат – не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

var activateSite = function (map, form, formControls) {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  for (var i = 0; i < formControls.length; i++) {
    formControls[i].disabled = false;
  }

  var formAdress = form.querySelector('#address');
  formAdress.readOnly = true;

  showOffers(map);
};

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormControls = adForm.querySelectorAll('input, select');
for (var i = 0; i < adFormControls.length; i++) {
  adFormControls[i].disabled = true;
}


var adFormAdress = adForm.querySelector('#address');
adFormAdress.value = (mainPin.offsetLeft - MAIN_PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop - MAIN_PIN_HEIGHT);
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    activateSite(map, adForm, adFormControls);
    adFormAdress.value = (mainPin.offsetLeft - MAIN_PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop - MAIN_PIN_HEIGHT);
  }
});
mainPin.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    activateSite(map, adForm, adFormControls);
  }
});


var adFormTitle = adForm.querySelector('#title');
adFormTitle.addEventListener('invalid', function () {
  checkTitle(adFormTitle);
});
adFormTitle.addEventListener('input', function () {
  checkTitle(adFormTitle);
});


var adFormTypeOfHouse = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
setHousePrice(adFormTypeOfHouse, adFormPrice);

adFormTypeOfHouse.addEventListener('change', function () {
  setHousePrice(adFormTypeOfHouse, adFormPrice);
});
adFormPrice.addEventListener('invalid', function () {
  checkHousePrice(adFormTypeOfHouse, adFormPrice);
});
adFormPrice.addEventListener('input', function () {
  checkHousePrice(adFormTypeOfHouse, adFormPrice);
});


var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
adFormTimeIn.addEventListener('change', function () {
  adFormTimeOut.value = adFormTimeIn.value;
});
adFormTimeOut.addEventListener('change', function () {
  adFormTimeIn.value = adFormTimeOut.value;
});


var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');

checkRoomNumberAndCapacity(adFormRoomNumber, adFormCapacity);

adFormRoomNumber.addEventListener('change', function () {
  checkRoomNumberAndCapacity(adFormRoomNumber, adFormCapacity);
});
adFormCapacity.addEventListener('change', function () {
  checkRoomNumberAndCapacity(adFormRoomNumber, adFormCapacity);
});
