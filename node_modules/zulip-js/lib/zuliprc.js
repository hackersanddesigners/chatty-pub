"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = require("fs");

var _ini = require("ini");

function parseConfigFile(_x) {
  return _parseConfigFile.apply(this, arguments);
}

function _parseConfigFile() {
  _parseConfigFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filename) {
    var data, parsedConfig, config;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fs.promises.readFile(filename, 'utf8');

          case 2:
            data = _context.sent;
            parsedConfig = (0, _ini.parse)(data);
            config = {
              realm: parsedConfig.api.site,
              username: parsedConfig.api.email,
              apiKey: parsedConfig.api.key
            };
            config.apiURL = "".concat(parsedConfig.api.site, "/api/v1");
            return _context.abrupt("return", config);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseConfigFile.apply(this, arguments);
}

var _default = parseConfigFile;
exports["default"] = _default;