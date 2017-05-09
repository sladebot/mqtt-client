'use strict';

var _faye = require('faye');

var faye = _interopRequireWildcard(_faye);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var client_host = process.env.VEGETA_HTTP_HOST || 'localhost';
var client_port = process.env.VEGETA_HTTP_PORT || 1338;
var client_uri = 'http://' + client_host + ':' + client_port;

var client = new faye.Client(client_uri);
console.log('Trying to connect to ' + client_uri);

client.bind('transport:up', function () {
  console.log('[CONNECTION UP]');
  client.subscribe('/messages', function (msg) {
    console.log('Trunks | Got message - ', JSON.stringify(msg.text));
  });
});

setInterval(function () {
  client.publish('/messages', { text: "HTTP Publish" });
}, 5000);

client.bind('transport:down', function () {
  console.log('[CONNECTION DOWN]');
});