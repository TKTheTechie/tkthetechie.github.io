---
title: DAPR with Solace PubSub+
date: "2023-05-12"
---


I’m proud to announce a new way to integrate the Solace PubSub+ Event Broker – using the open standard based AMQP 1.0 APIs.  With this integration, you are able to take advantage of Solace’s many powerful features such as exclusive queues, non-exclusive queues, and event mesh to name a few. But before we dive into the details, lets start with some background on these two technologies.


Solace PubSub+ Event Broker
The Solace PubSub+ Event Broker is a multi-protocol, enterprise grade event broker than can help us close the gaps we mentioned above. In addition, it comes in multiple form factors a Hardware Appliance, a Software Broker and a SaaS offering – all three are completely interoperable. Also you can use it for FREE as a software container or in the cloud.
 

APIS that the Solace PubSub+ Event Broker Supports
DAPR
DAPR is a microservices framework that creates powerful but simple to use abstractions on the underlying technologies – whether it is a database or event broker/messaging system. This allows the end users to focus on business logic rather than plumbing code. 

In the illustration below, you could see there are various modules that you can interact with through a unified interface.  For example, whether you use RabbitMQ or Solace PubSub+ – the DAPR SDK Interfaces with DAPR PubSub APIs and through a sidecar implementation, the DAPR run time will translate the publish/subscribe actions to the underlying event broker technology.

 


DAPRS highlevel architecture
Solace PubSub+ with DAPR
Prior to the introduction of the AMQP 1.0 plugin, you would be able to integrate Solace PubSub+ using the MQTT plugin. While this may work well for a lot of the use cases, you could not take advantage of things like topic to queue mappings, non-exclusive queues, or DMQs with MQTT as the concept of a Queue does not exist within the MQTT protocol. Hence the need for support of a more robust messaging protocol. While Solace has a very powerful native GoLang API, it relies on cgo which is explicitly prohibited by DAPR – hence the need to use a a native Go Library to build this integration – go-amqp.

 

Topics and Queues with Solace PubSub+
One of the many useful features of Solace is the ability to publish on dynamic topics that don’t need to be pre-provisioned and subscribe on a filtered stream using wildcards. This is well explained by Solace Developer Advocate Aaron Lee in the video below:
 
 


In addition, you have the ability to map topic subscriptions to queues which is well described in this blog post: Topic Subscriptions on Queues

Publishing on topics and subscribing on queues with the Solace AMQP DAPR PubSub Component
The DAPR PubSub component abstracts away the underlying implementation and provides you with primitives to access the PubSub Event Broker you will connect to. The very first thing that you need to do is configure your DAPR server with Solace PubSub+ using AMQP. This is achieved with something like the following config file for your DAPR server:

solace-amqp.yaml

```

apiVersion: dapr.io/v1alpha1

kind: Component

metadata:

name: solace

spec:

type: pubsub.solace.amqp

version: v1

metadata:

– name: url

value: ‘amqp://localhost:5672’

– name: anonymous

value: true
```

The link to the component documentation can be found here. Once you’ve configured the DAPR Server with Solace AMQP connectivity, the next step would be to configure the publisher to publish to a topic and subscribe to a queue.

With the Solace AMQP implementation, the way to do this is by prefixing the DAPR topic with topic: or queue:.

Here is an example with the DAPR JavaScript SDK of publishing to a topic and subscribing to a queue:
```
  client.pubsub.publish(PUBSUB_NAME, “topic:retail/orders”, {“orderId”: 123});
```

and

```
  server.pubsub.subscribe(PUBSUB_NAME, “queue:orders-queue”, (data) => console.log(“Subscriber received: “ + data));
```



What about Topic To Queue Mappings?
Both the DAPR API and the AMQP spec offers no primitives for mapping topics to queues. Hence the activity of mapping topics to queues and/or making a queue non-exclusive to allow for the competing consumer pattern will have to be done administratively using the Solace PubSub+ Broker’s Web Interface or using Solace SEMP protocol as part of your CI/CD pipeline. If you would like to see this implemented as part of the DAPR spec, please raise an issue on the DAPR components repo or leave a comment below!

