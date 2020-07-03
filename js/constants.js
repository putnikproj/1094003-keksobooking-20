'use strict';

(function () {
  window.constants = {
    SimilarPin: {
      AMOUNT: 5,
      WIDTH: 50,
      HEIGHT: 70
    },
    MainPin: {
      WIDTH: 66,
      HEIGHT: 81,
      DefaultCoords: {
        X: 570,
        Y: 375
      },
      MinCoords: {
        X: 0,
        Y: 130
      },
      MaxCoords: {
        X: 1200,
        Y: 630
      }
    },
    Requests: {
      TIMEOUT: 10000,
      Url: {
        LOAD: 'https://javascript.pages.academy/keksobooking/data',
        SAVE: 'https://javascript.pages.academy/keksobooking'
      }
    }
  };
})();
