"use strict";

var api = require('../api');

function emojis(config) {
  return {
    retrieve: function retrieve(params) {
      var url = "".concat(config.apiURL, "/realm/emoji");
      return api(url, config, 'GET', params);
    }
  };
}

module.exports = emojis;