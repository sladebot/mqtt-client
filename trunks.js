'use strict'

import * as mqtt from 'mqtt'
import * as os from 'os'
const client_host = process.env.VEGETA_HOST || 'localhost';
const client_port = process.env.VEGETA_PORT || 1337;
const client_uri = 'mqtt://' + client_host + ':' + client_port;


const client = mqtt.connect(client_uri)
console.log("Trying to connect to - " + client_uri);

client.on('connect', () => {
  client.subscribe('presence');
})

setInterval(() => {
  client.publish('presence', 'Hello MQTT from - ' + os.hostname())
}, 5000);

client.on('message', (topic, message) => {
  console.log("RECIEVED ON TOPIC - " + topic);
  console.log(message.toString())
})
