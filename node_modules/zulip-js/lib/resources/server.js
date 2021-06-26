"use strict";

var api = require('../api');

function server(config) {
  return {
    settings: function settings(params) {
      var url = "".concat(config.apiURL, "/server_settings");
      return api(url, config, 'GET', params);
    }
  };
}

module.exports = server;