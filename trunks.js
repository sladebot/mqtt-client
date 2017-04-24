'use strict'

import * as mqtt from 'mqtt'

const client = mqtt.connect('mqtt://172.24.19.191:1337')

client.on('connect', () => {
  client.subscribe('presence')
  setInterval(() => {
    client.publish('presence', 'Hello MQTT')
  }, 5000);
})

client.on('message', (topic, message) => {
  console.log(message.toString())
})
