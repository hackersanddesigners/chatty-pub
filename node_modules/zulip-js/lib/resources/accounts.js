"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var helper = require('../helper');

function accounts(config) {
  return {
    retrieve: function () {
      var _retrieve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var url, form, res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = "".concat(config.apiURL, "/fetch_api_key");
                form = new helper.FormData();
                form.append('username', config.username);
                form.append('password', config.password);
                _context.next = 6;
                return helper.fetch(url, {
                  method: 'POST',
                  body: form
                });

              case 6:
                res = _context.sent;
                return _context.abrupt("return", res.json());

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function retrieve() {
        return _retrieve.apply(this, arguments);
      }

      return retrieve;
    }()
  };
}

module.exports = accounts;