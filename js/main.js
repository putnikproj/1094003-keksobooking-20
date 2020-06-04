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
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return similarOffers;
};

var createNewPin = function (templateElement, offer) {
  var element = templateElement.cloneNode(true);
  var elementImage = element.querySelector('img');

  element.style = 'left: ' + (offer.location.x - PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
  elementImage.src = offer.author.avatar;
  elementImage.alt = offer.offer.title;

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
