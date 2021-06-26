"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var queues = require('./resources/queues');

var events = require('./resources/events');

function sleep(ms) {
  // TODO add jitter.
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function eventsWrapper(config) {
  var z = {
    queues: queues(config),
    events: events(config)
  };

  function logError(error) {
    console.log('zulip-js: Error while communicating with server:', error); // eslint-disable-line no-console
  }

  function registerQueue() {
    return _registerQueue.apply(this, arguments);
  }

  function _registerQueue() {
    _registerQueue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var eventTypes,
          res,
          params,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              eventTypes = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;

            case 1:
              if (!true) {
                _context.next = 21;
                break;
              }

              _context.prev = 2;
              params = {
                eventTypes: eventTypes
              };
              _context.next = 6;
              return z.queues.register(params);

            case 6:
              res = _context.sent;

              if (!(res.result === 'error')) {
                _context.next = 13;
                break;
              }

              logError(res.msg);
              _context.next = 11;
              return sleep(1000);

            case 11:
              _context.next = 14;
              break;

            case 13:
              return _context.abrupt("return", {
                queueId: res.queue_id,
                lastEventId: res.last_event_id
              });

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](2);
              logError(_context.t0);

            case 19:
              _context.next = 1;
              break;

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 16]]);
    }));
    return _registerQueue.apply(this, arguments);
  }

  function callOnEachEvent(_x) {
    return _callOnEachEvent.apply(this, arguments);
  }

  function _callOnEachEvent() {
    _callOnEachEvent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(callback) {
      var eventTypes,
          queueId,
          lastEventId,
          handleEvent,
          queueData,
          res,
          _args2 = arguments;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              eventTypes = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
              queueId = null;
              lastEventId = -1;

              handleEvent = function handleEvent(event) {
                lastEventId = Math.max(lastEventId, event.id);
                callback(event);
              }; // eslint-disable-next-line no-constant-condition


            case 4:
              if (!true) {
                _context2.next = 25;
                break;
              }

              if (queueId) {
                _context2.next = 11;
                break;
              }

              _context2.next = 8;
              return registerQueue(eventTypes);

            case 8:
              queueData = _context2.sent;
              // eslint-disable-line no-await-in-loop
              queueId = queueData.queueId;
              lastEventId = queueData.lastEventId;

            case 11:
              _context2.prev = 11;
              _context2.next = 14;
              return z.events.retrieve({
                queue_id: queueId,
                last_event_id: lastEventId,
                dont_block: false
              });

            case 14:
              res = _context2.sent;

              if (res.events) {
                res.events.forEach(handleEvent);
              }

              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](11);
              logError(_context2.t0);

            case 21:
              _context2.next = 23;
              return sleep(1000);

            case 23:
              _context2.next = 4;
              break;

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[11, 18]]);
    }));
    return _callOnEachEvent.apply(this, arguments);
  }

  return callOnEachEvent;
}

module.exports = eventsWrapper;