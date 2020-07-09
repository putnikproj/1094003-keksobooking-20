'use strict';

(function () {
  var checkCoords = function () {
    if (window.map.getMainPinCurrentX() > window.map.getPinsFieldWidth()) {
      window.map.mainPin.style.left = window.map.getPinsFieldWidth() - window.constants.MainPin.WIDTH / 2 + 'px';
      window.form.writeAddress();
    }
  };

  var onWindowResize = function () {
    checkCoords();
  };

  var onMainPinMousedown = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      var calculatingCoords = function (calcEvt) {
        var shift = {
          x: startCoords.x - calcEvt.clientX,
          y: startCoords.y - calcEvt.clientY
        };

        startCoords = {
          x: calcEvt.clientX,
          y: calcEvt.clientY
        };

        if (window.constants.MainPin.MinCoords.Y > window.map.getMainPinCurrentY() - shift.y) {
          window.map.mainPin.style.top = window.constants.MainPin.MinCoords.Y - window.constants.MainPin.Height.SHARP + 'px';

        } else if (window.constants.MainPin.MaxCoords.Y < window.map.getMainPinCurrentY() - shift.y) {
          window.map.mainPin.style.top = window.constants.MainPin.MaxCoords.Y - window.constants.MainPin.Height.SHARP + 'px';

        } else {
          window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
        }

        if (window.map.getMainPinCurrentX() - shift.x < window.constants.MainPin.MinCoords.X) {
          window.map.mainPin.style.left = window.constants.MainPin.MinCoords.X - window.constants.MainPin.WIDTH / 2 + 'px';

        } else if (window.map.getMainPinCurrentX() - shift.x > window.map.getPinsFieldWidth()) {
          window.map.mainPin.style.left = window.map.getPinsFieldWidth() - window.constants.MainPin.WIDTH / 2 + 'px';

        } else {
          window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
        }

        window.form.writeAddress();
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        calculatingCoords(moveEvt);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        calculatingCoords(upEvt);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (!window.main.isSiteActivated) {
          window.main.activateSite();
        }
      };

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  window.addEventListener('resize', onWindowResize);

  window.move = {
    onMainPinMousedown: onMainPinMousedown,
    checkCoords: checkCoords
  };
})();
