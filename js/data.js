'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var createSimilarOffers = function (mapWidth) {
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
  };

  var similarOffers = [];
  createSimilarOffers(window.map.pinsField.offsetWidth);

  window.data = {
    similarOffers: similarOffers
  };
})();
