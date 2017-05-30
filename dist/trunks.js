'use strict';

var _mqtt = require('mqtt');

var mqtt = _interopRequireWildcard(_mqtt);

var _os = require('os');

var os = _interopRequireWildcard(_os);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var client_host = process.env.VEGETA_HOST || 'localhost';
var client_port = process.env.VEGETA_PORT || 1883;
var client_uri = 'mqtt://' + client_host + ':' + client_port;

var client = mqtt.connect(client_uri);
console.log("Trying to connect to - " + client_uri);

client.on('connect', function () {
  client.subscribe('presence');
});

setInterval(function () {
  client.publish('presence', 'Hello MQTT from - ' + os.hostname());
}, 5000);

client.on('message', function (topic, message) {
  console.log("RECIEVED ON TOPIC - " + topic);
  console.log(message.toString());
});