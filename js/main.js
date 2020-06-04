'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var similarOffers = createSimilarOffers(mapPins.offsetWidth);

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
for (var i = 0; i < similarOffers.length; i++) {
  fragment.appendChild(createNewPin(pin, similarOffers[i]));
}
mapPins.appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = createNewCard(cardTemplate, similarOffers[0]);
map.insertBefore(card, document.querySelector('.map__filters-container'));
