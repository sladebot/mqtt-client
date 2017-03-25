'use strict'

import * as mqtt from 'mqtt'

const client = mqtt.connect('mqtt://localhost:1337')

client.on('connect', () => {
  client.subscribe('presence')
  client.publish('presence', 'Hello MQTT')
})

client.on('message', (topic, message) => {
  console.log(message.toString())
  client.end()
})