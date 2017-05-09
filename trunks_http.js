'use strict'
import * as faye from 'faye'
import os from 'os'
const client_host = process.env.VEGETA_HTTP_HOST || 'localhost'
const client_port = process.env.VEGETA_HTTP_PORT || 1338
const client_uri = `http://${client_host}:${client_port}`

const client = new faye.Client(client_uri)
console.log(`Trying to connect to ${client_uri}`)

client.bind('transport:up', () => {
  console.log('[CONNECTION UP]')
  client.subscribe('/messages', (msg) => {
    console.log('Trunks | Got message - ', JSON.stringify(msg.text))
  })
})


setInterval(() => {
  client.publish('/messages', {text: "HTTP Publish"})
}, 5000)



client.bind('transport:down', () => {
  console.log('[CONNECTION DOWN]')
})