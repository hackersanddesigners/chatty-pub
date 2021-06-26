"use strict";

var api = require('../api');

function events(config) {
  return {
    retrieve: function retrieve(params) {
      var url = "".concat(config.apiURL, "/events");
      return api(url, config, 'GET', params);
    }
  };
}

module.exports = events;