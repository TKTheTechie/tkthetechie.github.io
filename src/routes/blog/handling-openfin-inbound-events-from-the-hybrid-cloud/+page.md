---
author: TKTheTechie
title: Handling OpenFin Inbound Events from the Hybrid Cloud
date: 5/2/2019
category: Dev
headerImage: openfin-inbound-blog.png
---


Fully integrating OpenFin applications with remote services requires a plan for how to best interact with those services. Most financial services firms have hundreds of applications and thousands of microservices, some of which consume events and some of which generate them. Some present web-native APIs, and many do not.

We have previously talked about how [REST can be enhanced](https://dev.to/blog/openfin-event-mesh-hybrid-cloud/) to handle the many outbound exchange patterns. In this post, we’ll be discussing a better way to organize OpenFin inbound events.

## What is an Inbound Event?

For the purposes of this post, we’re defining inbound events as any asynchronous event received from a remote source. There are two main types of inbound events:

* **A notification triggered from a service.** In most cases, these will be in response to the user’s interest (explicit or implied) in the associated event. For example, a price alert, a risk threshold breach, a fraud event or news associated with a portfolio asset.
* **An asynchronous reply to a prior request.** JavaScript encourages the use of non-blocking resources, and a remote request may result in a variable amount of time to do some work—from milliseconds to minutes. Most OpenFin apps will want to decouple the request and response and treat the latter as an inbound event. For example, if you submit a basket of trades on behalf of a client, you may want to receive a single event when all fills are complete.

## Dealing with Inbound Events

The client side of real-time inbound events is pretty straightforward. You set up a connection and callbacks for the different kinds of events you expect. JavaScript makes it easy to pass control to a function when an event arrives.

The trickier part is choosing what is on the other end of that connection. Your app may be talking to a single remote service or many. It could be inside the datacenter, in a private or public cloud, or a 3rd-party service. The remote service may present a web, messaging or legacy interface. The remote services may also offer different approaches to security.

There are many things to consider to inform the best course of action. Here are three:

* The DIY option is to code your own WebSocket server and handle everything yourself. For example, if the remote service does not present a WebSocket event API. Your code will need to integrate with sources, negotiate handshakes, reformat payloads, and send heartbeat pings at intervals to assure the connection stays alive, and handle a range of errors.
* Some cloud and web-based APIs will include a WebSocket service interface within their APIs, doing that work for you. You code to an API, and the event handling happens under the covers.
* A multi-protocol event broker that supports WebSocket can act as an intermediary. For example, a Solace PubSub+ broker can coordinate with many services and consolidate inbound events back to the OpenFin client through one or more WebSocket links.

If you are interacting with just one remote service, and it implements a WebSocket server, coding direction to its API may be a solid choice. The service will either document how to handle the matching WebSocket client, or it may provide a client-side JavaScript API to handle the connection and event management.

In all other cases your easiest path forward will be to use an [event broker](https://dev.to/what-is-an-event-broker/) to coordinate with the remote services. Let’s take a look at the many ways a Solace PubSub+ broker simplifies your event handling.

## Provide the OpenFin App with a Unified Subscriber Model

Whether your back-end is a cloud service with a web-based API, an internal service connected to an AMQP network, or the stodgy old mainframe holding the legacy crown jewels, your OpenFin app simply connects to the broker. The broker handles all the complexity of the various network topologies and differences in connection protocols. The broker will then stream or queue events for consumption by your application. Security is handled by broker-defined access control lists (ACLs) to verify which remote resources each user or application can use and how.

Let’s take a look at how the broker would pass events from a few different service types.

## Events from Web-Based Services

It’s always easy to post to a cloud or web-based service using REST, but not as clear how best to receive an asynchronous event back. Often cloud architectures will rely on using some kind of intermediary storage like AWS S3, or a database, then ask the calling app to poll to read the stored data. Sometimes the remote service will include a WebSocket server, and will supply a JavaScript API that emits events to feed your callbacks.

Many of our customers write their remote services to POST events to Solace using REST, and Solace can forward that event onto the client through a WebSocket. In OpenFin, the developer uses the Solace JavaScript API, and Solace uses WebSocket to signal anything that arrives for that app.

[![A diagram of web originated events to OpenFin through the Solace PubSub+ broker](../images/blog/openfin-blogpost-4-image-1.png)](../images/blog/openfin-blogpost-4-image-1.png)

## Events from a Non-Web Service

If the service does not present a web-friendly API, Solace becomes a peer on any popular messaging network and forwards events back to OpenFin. For example, Solace would subscribe JMS or AMQP topics, or identify queue names on behalf of the OpenFin app, to receive and forward inbound events over a WebSocket. Solace can even reach proprietary protocols like MQ or Kafka through a bridge so those events can reach OpenFin applications as well.

[![A diagram of non-web originated events to OpenFin through the Solace PubSub+ event broker](../images/blog/openfin-blogpost-4-image-2.png)](../images/blog/openfin-blogpost-4-image-2.png)

## Subscribe to Events from Many Services

In the companion blog post [about outbound requests](https://dev.to/blog/openfin-apps-rest), we showed how Solace allows a REST POST to be mapped into a publish/subscribe network for delivery to many services. The reverse pattern is also true for inbound. An app that receives events from many services can be simplified by having a broker stream or queue the events as an intermediary.

[![A diagram of OpenFin Subscribe to Topic using the PubSub+ advanced event broker](../images/blog/openfin-blogpost-4-image-3.png)](../images/blog/openfin-blogpost-4-image-3.png)

## Events from “All of the Above”

A broker is most useful when you have data going to and from many services. In large OpenFin installations, it is very common for many sources and many apps to need to freely exchange information.

[![All Inbound OpenFin Events Through a Broker.](../images/blog/openfin-blogpost-4-image-4.png)](../images/blog/openfin-blogpost-4-image-4.png)

## Coordinating Inbound Events with a Multi-Protocol Broker

While you may have tight control over your OpenFin environment, the data sources those apps interact with are spread across clouds and datacenters, and have been created with different technologies over a span of decades. Just like a broker can help you do [much more with REST](https://dev.to/blog/openfin-apps-rest/), that same architecture can simplify inbound event management as well.

For more on this topic, download our [Guide to Connectivity for OpenFin](https://try.solace.com/wp-download-openfin-guide-to-connectivity/) that outlines the three architectural approaches developers and architects may choose to connect OpenFin applications to a variety of data sources:

[![OpenFin-Connectivity](../images/blog/OpenFin-Micro-campaign-Email-Header-Images-300x150.png)](https://try.solace.com/wp-download-openfin-guide-to-connectivity/)

The post [Handling OpenFin Inbound Events from the Hybrid Cloud](https://solace.com/blog/openfin-inbound-events-hybrid-cloud/) appeared first on [Solace](https://solace.com/).

