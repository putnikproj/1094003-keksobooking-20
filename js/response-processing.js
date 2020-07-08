'use strict';

(function () {
  var showMessage = function (isSuccess) {
    var message;
    var messageTextBlock;
    if (isSuccess) {
      message = successSendTemplate.cloneNode(true);
      messageTextBlock = message.querySelector('.success__message');
    } else {
      message = errorSendTemplate.cloneNode(true);
      messageTextBlock = message.querySelector('.error__message');
      var messageButton = message.querySelector('.error__button');
    }
    var onMessageKeydown = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        removeMessage(message, onMessageKeydown);
      }
    };
    var onMessageClick = function (evt) {
      evt.preventDefault();
      if (evt.target !== messageTextBlock) {
        removeMessage(message, onMessageKeydown);
      }
    };
    message.addEventListener('click', onMessageClick);
    window.addEventListener('keydown', onMessageKeydown);
    messagePlace.appendChild(message);
    if (messageButton) {
      messageButton.focus();
      messageButton.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          removeMessage(message, onMessageKeydown);
        }
      });
    }
  };

  var removeMessage = function (message, func) {
    message.remove();
    window.removeEventListener('keydown', func);
  };

  var onFormSendSuccess = function () {
    window.main.disableSite();
    showMessage(true);
  };

  var onFormSendError = function () {
    showMessage(false);
  };


  var onSimilarOffersLoadSuccess = function (data) {
    window.map.similarOffers = data;
    window.map.filteredSimilarOffers = window.filter.offers.byAmount(window.map.similarOffers);
    if (window.main.isSiteActivated) {
      window.map.showOffers(false);
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
  var messagePlace = document.querySelector('main');

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
