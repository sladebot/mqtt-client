# Import package
import paho.mqtt.client as mqtt
import time

# Define Variables
MQTT_HOST = "localhost"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 5
MQTT_TOPIC = "home/connect"
MQTT_MSG = "Hello MQTT"


# Define on_connect event Handler
def on_connect(mosq, obj, rc):
    print "Connected to MQTT Broker"


# Define on_publish event Handler
def on_publish(client, userdata, mid):
    print "Message Published..."


# Initiate MQTT Client
mqttc = mqtt.Client()

# Register Event Handlers
mqttc.on_publish = on_publish
mqttc.on_connect = on_connect

# Connect with MQTT Broker
mqttc.connect(MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE_INTERVAL)


while True:
    # Publish message to MQTT Topic
    mqttc.publish(MQTT_TOPIC, MQTT_MSG)
    time.sleep(2)

# # Disconnect from MQTT_Broker
# mqttc.disconnect()