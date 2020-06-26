'use strict';

(function () {
  var onWindowKeydown = function (evt, message, eventListener) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.remove();
      window.removeEventListener('keydown', eventListener);
    }
  };

  var onMessageClick = function (evt, message, eventListener) {
    evt.preventDefault();
    message.remove();
    window.removeEventListener('keydown', eventListener);
  };

  var showSuccessMessage = function () {
    var successMessage = successSendTemplate.cloneNode(true);

    var onSuccessMessageClick = function (evt) {
      onMessageClick(evt, successMessage, onSuccessMessageKeydown);
    };

    var onSuccessMessageKeydown = function (evt) {
      onWindowKeydown(evt, successMessage, onSuccessMessageKeydown);
    };

    successMessage.addEventListener('click', onSuccessMessageClick);
    window.addEventListener('keydown', onSuccessMessageKeydown);
    document.body.appendChild(successMessage);
  };

  var showErrorMessage = function () {
    var errorMessage = errorSendTemplate.cloneNode(true);

    var onErrorMessageClick = function (evt) {
      onMessageClick(evt, errorMessage, onErrorMessageKeydown);
    };

    var onErrorMessageKeydown = function (evt) {
      onWindowKeydown(evt, errorMessage, onErrorMessageKeydown);
    };

    errorMessage.addEventListener('click', onErrorMessageClick);
    window.addEventListener('keydown', onErrorMessageKeydown);
    errorPlace.appendChild(errorMessage);
  };

  var onFormSendSuccess = function () {
    window.main.disableSite();
    window.main.isSiteActivated = false;
    showSuccessMessage();
  };

  var onFormSendError = function () {
    showErrorMessage();
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

  var successSendTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorSendTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPlace = document.querySelector('main');

  window.responseProcessing = {
    sendForm: {
      onSuccess: onFormSendSuccess,
      onError: onFormSendError
    },
    loadOffers: {
      onSuccess: onSimilarOffersLoadSuccess,
      onError: onSimilarOffersLoadError
    }
  };
})();
