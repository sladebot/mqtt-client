'use strict'

import * as mqtt from 'mqtt'

const client_host = process.env.VEGETA_HOST || 'localhost';
const client_port = process.env.VEGETA_PORT || 1337;

console.log("Trying to connect to - " + client_host);

const client = mqtt.connect(`mqtt:/${client_host}:${client_port}`)

client.on('connect', () => {
  client.subscribe('presence')
  setInterval(() => {
    client.publish('presence', 'Hello MQTT')
  }, 5000);
})

client.on('message', (topic, message) => {
  console.log(message.toString())
})
