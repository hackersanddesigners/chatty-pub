"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var helper = require('./helper');

function api(_x, _x2, _x3, _x4) {
  return _api.apply(this, arguments);
}

function _api() {
  _api = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(baseUrl, config, method, params) {
    var url, auth, authHeader, options, response, message, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = new URL(baseUrl);
            auth = Buffer.from("".concat(config.username, ":").concat(config.apiKey)).toString('base64');
            authHeader = "Basic ".concat(auth);
            options = {
              method: method,
              headers: {
                Authorization: authHeader
              }
            };

            if (method === 'POST') {
              options.body = new helper.FormData();
              Object.keys(params).forEach(function (key) {
                var data = params[key];

                if (Array.isArray(data)) {
                  data = JSON.stringify(data);
                }

                options.body.append(key, data);
              });
            } else if (params) {
              Object.entries(params).forEach(function (_ref) {
                var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                url.searchParams.append(key, value);
              });
            }

            _context.next = 7;
            return helper.fetch(url.href, options);

          case 7:
            response = _context.sent;
            _context.prev = 8;
            return _context.abrupt("return", response.json());

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](8);

            if (!(_context.t0 instanceof SyntaxError)) {
              _context.next = 20;
              break;
            }

            // We probably got a non-JSON response from the server.
            // We should inform the user of the same.
            message = 'Server Returned a non-JSON response.';

            if (response.status === 404) {
              message += " Maybe endpoint: ".concat(method, " ").concat(response.url.replace(config.apiURL, ''), " doesn't exist.");
            } else {
              message += ' Please check the API documentation.';
            }

            error = new Error(message);
            error.res = response;
            throw error;

          case 20:
            throw _context.t0;

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 12]]);
  }));
  return _api.apply(this, arguments);
}

module.exports = api;