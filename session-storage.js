'use strict';

angular.module('session-storage', [])

  .factory('$sessionStorage', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.sessionStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.sessionStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.sessionStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {

        if (!$window.sessionStorage[key] || $window.sessionStorage[key] == "undefined") {
          return undefined;
        }

        return JSON.parse($window.sessionStorage[key]);
      },
      clear: function () {
        $window.sessionStorage.clear();
      },

      remove: function (key) {
        $window.sessionStorage.removeItem(key);
      }
    }
  }])

  .service('$session', ["$sessionStorage", function ($sessionStorage) {

    this.create = function (user, accessToken) {
      $sessionStorage.setObject('user', user);
      $sessionStorage.set('access_token', accessToken);
    };

    this.setFlag = function (flag) {
      $sessionStorage.set('flag', flag);
    };

    this.update = function (user) {
      $sessionStorage.setObject('user', user);
    };

    this.destroy = function () {
      $sessionStorage.remove('user');
      $sessionStorage.remove('access_token');
    };

    this.current = {
      get user() {
        return $sessionStorage.getObject('user');
      },

      get accessToken() {
        return $sessionStorage.get('access_token');
      },

      get isAuthenticated() {
        return !!$sessionStorage.get('access_token');
      },

      get flag() {
        return $sessionStorage.get('flag');
      }
    };

    return this;
  }])
