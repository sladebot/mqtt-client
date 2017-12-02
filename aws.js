'use strict'
var awsIot = require('aws-iot-device-sdk');
var os = require('os');


var clientId = 'trunks_' + Math.random().toString(16).substr(2, 8);
const device = awsIot.device({
  keyPath: "./certs/private.pem.key",
  certPath: "./certs/certificate.pem.crt",
  caPath: "./certs/rootCA.pem",
  clientId: clientId,
  host: "a3uwgdm81x1lx5.iot.us-east-1.amazonaws.com"
});

const channel = 'test'

device.subscribe(channel);
let publishData = process.env.THERMO ? `Temperature : ${Math.random()}` : `Photo Sensor : ${Math.random()}`

let mode = process.env.mode || 'PUBLISHER';


if (mode == "SUBSCRIBER") {
  device
    .on('message', function(topic, payload) {
      console.log('message', topic, payload.toString());
    });
} else {
  // publisher
  setInterval(() => {
    console.log('Publishing message')
    device.publish(channel, `DATA: ${publishData}, CHANNEL: ${process.env.CHANNEL}, HOST: ${os.hostname()}`);
  }, 100);

}


device.on('connect', function() {
  console.log('connect');
});
device
.on('close', function() {
  console.log('close');
});
device
.on('reconnect', function() {
  console.log('reconnect');
});
device
.on('offline', function() {
  console.log('offline');
});
device
.on('error', function(error) {
  console.log('error', error);
});
