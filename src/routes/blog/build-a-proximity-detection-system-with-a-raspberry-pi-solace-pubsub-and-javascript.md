---
author: TKTheTechie
title: Build a Proximity Detection System with a Raspberry Pi, Solace PubSub+, and JavaScript
date: 3/31/2022
category: Dev
headerImage: proximity-detection-blog.png
---


Have you ever wanted to tinker around with a Raspberry Pi and IoT but felt that it was too daunting? We’ve developed a set of instructions for you to build a proximity detection system using a Raspberry Pi with an ultra-sonic proximity sensor. The instructions include the materials you need to purchase, how to wire everything together, and the code required to build an application on top of it.

[![](../images/blog/proximity-comic.png)](../images/blog/proximity-comic.png)

## What You Will Build

In the [codelab](https://codelabs.solace.dev/codelabs/raspberry-pi-proximity-sensor/index.html), it runs you through step by step instructions of setting up your Raspberry Pi, wiring it to a proximity sensor, building an application in Javascript that reads the events from the proximity sensor, and publishing it to a Solace [PubSub+ Event Broker: Cloud](https://solace.com/products/event-broker/cloud/).

You can now build microservices over proximity events triggered when someone comes close to the device!

## JavaScript and IoT – Not Your Typical Combination

JavaScript is typically not a language you would associate with IoT, but with the advent of NodeJs, it is being used for more and more use cases outside of traditional web development. One of the frameworks that builds on Node is [Johnny-Five](http://johnny-five.io/) – a general purpose IoT framework that works across multiple processor architectures such as SparkFun, Arduino, and Raspberry Pi. The codelab makes use of this framework to gather events from the sensor.

## Exposing IoT Events Over Solace PubSub+
Once you’ve detected an object within a certain proximity, what if you wanted to stream this as an event so that it can be picked up by microservices or a dashboard? That’s where [Solace PubSub+ Event Broker: Cloud](https://solace.com/products/event-broker/cloud/) comes into play, a polyglot event broker that allows you to publish IoT events from your Raspberry Pi and subscribe to it with different applications and languages.

[![Building a proximity detection system](https://res.cloudinary.com/practicaldev/image/fetch/s--A-g-4RL5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://solace.com/wp-content/uploads/2020/03/exposing-iot-events.png)](https://solace.com/wp-content/uploads/2020/03/exposing-iot-events.png)

Take a look at the codelab [here](https://codelabs.solace.dev/codelabs/raspberry-pi-proximity-sensor/index.html) and start building!

The post [Build a Proximity Detection System with a Raspberry Pi, Solace PubSub+, and JavaScript](https://solace.com/blog/build-a-proximity-detection-system/) appeared first on [Solace](https://solace.com/)