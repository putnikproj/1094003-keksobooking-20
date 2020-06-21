'use strict';

(function () {
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

  window.card = {
    isShown: false,
    current: -1,
    createNew: createNewCard
  };
})();
