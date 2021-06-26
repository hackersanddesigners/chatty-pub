"use strict";

var api = require('../api');

function filters(config) {
  return {
    retrieve: function retrieve(params) {
      var url = "".concat(config.apiURL, "/realm/filters");
      return api(url, config, 'GET', params);
    }
  };
}

module.exports = filters;