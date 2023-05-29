---
author: TKTheTechie
title: A scalable WebSocket fanout solution for your High Performance Kafka deployment
date: 02/21/2021
category: Dev
headerImage: websocket-fanout-kafka-blog.png
---



In this post, I will show how you can take advantage of a high performance Kafka deployment, the Kafka Connect framework and Solace PubSub+ to build out a scalable websocket distribution backbone for a contrived market data distribution use case.

## Market data distribution


For the purpose of this article, I’ll be focusing on a financial service use case- specifically market data distribution. Typically market data will be streamed over an exchange using a proprietary protocol. For your internal microservices or UIs, you would consume/normalize/and republish over an event broker of your choosing such as [Apache Kafka](https://kafka.apache.org/).

## Fanning out to thin clients via WebSocket

For a lot of messaging use-cases, one of the end-points you would likely need to stream to is a web browser. Kafka doesn’t support the WebSocket protocol that you could use with your HTML5/JS applications. To bridge from Kafka to WebSocket, we will need to introduce two new components:

*   [Solace PubSub+ Event Broker](https://solace.com/try-it-now/) – A multiprotocol event broker that is able to publish and subscribe natively through a variety of protocols such as JMS, AMQP, MQTT, Solace WebSocket, and REST.
*   [Solace PubSub+ Kafka Sink Connector](https://github.com/SolaceProducts/pubsubplus-connector-kafka-sink) – This will bridge from Kafka event streams into Solace.

## Filtering messages to a thin-client

A Kafka Topic is a contiguous stream of messages organized via a partition. A sample topic-partition may consist of 1000’s of streams of data with the following structure on a Topic

```
    Topic: PRICES
    Partition: 1
    Offset 0:
    {"tickerSymbol":"AAPL","countryCode":"US","exchange":"NASDAQ","bidSize":10.0,"askSize":10.0,"bidPrice":100.0,"askPrice":105.0}
    Offset 1:
    {"tickerSymbol":"GME","countryCode":"US","exchange":"NYSE","bidSize":10.0,"askSize":10.0,"bidPrice":1000.0,"askPrice":995.0}
    Offset 3:
    {"tickerSymbol":"MSFT","countryCode":"US","exchange":"NASDAQ","bidSize":10.0,"askSize":10.0,"bidPrice":142.0,"askPrice":143.0}
```

However, it’s likely that a user would only want to subscribe to a subset of the streams rather than the entire topic/topic partition… usually via an identifer like a ticker symbol.

As such, a finer level of topic filtering will be required which can be accomodated via the subscription semantics of a protocol like MQTT.

For example, a user may only be interested in the AAPL stock, so they can issue a subscription to Solace PubSub+ with the following semantics:  
`US/NASDAQ/AAPL`

Or if they wanted to subscribe to all US stocks, they can issue a subscription with the following semantics:  
`US/NASDAQ/#`  
which will deliver all messages from the NASDAQ market to the client.

This finer grained topic filtering is not something that Kafka provides out of the box. Hence the Kafka Connector would have some simple logic to translate the contents of the payload into a topic to be passed onto Solace. A simplistic implementation of this function would be as follows:

```
     private class SolMarketDataObject {
            public String tickerSymbol;
            public String countryCode;
            public String exchange;
            public double bidSize;
            public double askSize;
            public double bidPrice;
            public double askPrice;
    
            public String createSolaceTopic() {
                return countryCode + "/" + exchange + "/" + tickerSymbol;
            }
        }
```

In addition, the Solace PubSub+ Broker will guarantee order of the streams to the HTML5 front end in the order it was received from the Kafka cluster without having to create any sorts of topics or partitions.

## Putting it all together

MarketData distribution usescases typically have high performance requirements. While Apache Kafka has a variety of knobs that you can tune to achieve low latency and high throughput, it usually comes at a cost of an increased probability of message loss.

The folks over at [vectorized.io](https://vectorized.io/) have created a Kafka-compatible message broker called RedPanda from the ground up in C++ which means you can use your existing Kafka apps with it and realize an instantaneous performance improvement.

This also means that it should work with the existing Kafka Ecosystem including the aforementioned Solace PubSub+ Kafka Connector for WebSocket fanout.

Here are the steps you need to take to spin up the entire stack:

1.  Sign up for a [FREE Solace PubSub+ Cloud Broker](https://console.solace.cloud/login/new-account?product=event-streaming) or download and run a [FREE Docker container](https://solace.com/products/event-broker/software/getting-started/) to do the websocket fanout
2.  Download, install and run the [RedPanda](https://vectorized.io/docs/) broker. It comes in many deployment options but I recommend the [docker installation](https://vectorized.io/docs/quick-start-docker) for the easiest install
3.  Download the [Apache Kafka](https://kafka.apache.org/) distribution to get access to the connect framework
4.  Compile the [Solace PubSub+ Kafka Sink Connector](https://github.com/SolaceProducts/pubsubplus-connector-kafka-sink) after adding the following file as a message processor: [SolMarketdataProcessor.java](https://gist.github.com/TKTheTechie/872f4a8df0b85e53b33ff0c697c51aff). Follow the instructions in the github repo to add the compiled library to the Kafka Connect you got from the Apache Kafka distribution.
5.  Using a javascript library like [MQTT.js](https://github.com/mqttjs/MQTT.js) you can now connect to the MQTT WebSocket port of your Solace PubSub+ broker using the following code as an example:

```
    var mqtt = require('mqtt')
    var client  = mqtt.connect('wss://host:port',{username:'username',password:'password'})
    
    client.on('connect', function () {
      client.subscribe('US/NASDAQ/AAPL'); //Establish your topic subscriptions here
    })
    
    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
    
    })
```    

You can retrieve the host:port and credentials from the ‘Connect’ tab of your Solace Cloud Console:  
![MQTT-WS](https://github.com/solacese/linking-vuex-stores/raw/master/imgs/mqtt-ws.png)

or use ws://localhost:8000 for a broker deployed locally

Here is an example of a market data stream sent over Solace via WebSocket to a web application –  
![](https://res.cloudinary.com/practicaldev/image/fetch/s--jCZe1sFB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://cdn.solace.com/wp-content/uploads/2020/10/running-native-code-4.gif)

## Extending your deployment using a Solace PubSub+ Event Mesh


The Solace PubSub+ Event Brokers allows you to wire together brokers to create a global multi-region (multi-cloud if need be) backbone for your event streams so you are fanning out in geographic proximity to your users.

![Alt Text](../images/blog/redpanda-event-mesh.png)

In addition, once your Kafka streams are liberated onto the Solace PubSub+ Event Mesh, it provides additional benefits some of which I listed here:

*   [Access Control Lists](https://docs.solace.com/Overviews/ACL-Overview.htm): Provide fine grained permissions on a per topic basis so users can only subscribe to NASDAQ stocks for example.
*   [Throttling Feeds (Eliding)](https://docs.solace.com/PubSub-Basics/Direct-Messages.htm): Allows you to throttle feeds at configured interval – so you will only deliver 1 message per second to your web clients even though your Kafka cluster is getting 1000 messages per second
*   On-Behalf-of Subscription Management – The ability for a microservice to inject subscriptions into a a WebSocket connection’s session. This gives you the ability to add/remove subscriptions based on an entitlements lookup for example.

