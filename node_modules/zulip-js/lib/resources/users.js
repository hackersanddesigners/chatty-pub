"use strict";

var api = require('../api');

function users(config) {
  return {
    retrieve: function retrieve(params) {
      var url = "".concat(config.apiURL, "/users");
      return api(url, config, 'GET', params);
    },
    create: function create(params) {
      var url = "".concat(config.apiURL, "/users");
      return api(url, config, 'POST', params);
    },
    me: {
      pointer: {
        retrieve: function retrieve(params) {
          var url = "".concat(config.apiURL, "/users/me/pointer");
          return api(url, config, 'GET', params);
        },
        update: function update(id) {
          var url = "".concat(config.apiURL, "/users/me/pointer");
          return api(url, config, 'POST', {
            pointer: id
          });
        }
      },
      getProfile: function getProfile() {
        var url = "".concat(config.apiURL, "/users/me");
        return api(url, config, 'GET');
      },
      subscriptions: {
        add: function add(params) {
          var url = "".concat(config.apiURL, "/users/me/subscriptions");
          return api(url, config, 'POST', params);
        },
        remove: function remove(params) {
          var url = "".concat(config.apiURL, "/users/me/subscriptions");
          return api(url, config, 'DELETE', params);
        }
      },
      alertWords: {
        retrieve: function retrieve(params) {
          var url = "".concat(config.apiURL, "/users/me/alert_words");
          return api(url, config, 'GET', params);
        }
      }
    }
  };
}

module.exports = users;