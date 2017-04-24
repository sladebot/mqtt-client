'use strict';

var _mqtt = require('mqtt');

var mqtt = _interopRequireWildcard(_mqtt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var client = mqtt.connect('mqtt://172.24.19.191:1337');

client.on('connect', function () {
  client.subscribe('presence');
  setInterval(function () {
    client.publish('presence', 'Hello MQTT');
  }, 5000);
});

client.on('message', function (topic, message) {
  console.log(message.toString());
});