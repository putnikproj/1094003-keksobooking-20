'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var createSimilarOffers = function () {
    var similarOffers = [];
    for (var i = 0; i < 8; i++) {
      var locationX = getRandomNumber(window.constants.MIN_PIN_X, window.constants.MAX_PIN_X);
      var locationY = getRandomNumber(window.constants.MIN_PIN_Y, window.constants.MAX_PIN_Y);

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

  var similarOffers = createSimilarOffers();

  window.data = {
    similarOffers: similarOffers
  };
})();
