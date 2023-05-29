---
author: TKTheTechie
title: OpenFin Apps Need More Than Just REST
date: /02/2019
category: Dev
headerImage: openfin-rest-blog.png
---


If you’re an OpenFin developer, you probably prefer to use REST for remote API calls whenever possible. This works great for query-response type requests, but has its limits beyond that, specifically:

*   **Service availability is binary.** If the remote service is unavailable or overloaded, your app has to deal with the failure scenarios.
*   **It’s a one-to-one protocol.** If your app design is best served with a one-to-many exchange, REST isn’t a great choice.
*   **It only works for web-based services.** Many legacy services don’t present a REST API.
*   **Using REST leads to tight coupling of apps to services.** The endpoints are embedded into the application.

All of these limitations can be overcome by coupling REST with a multi-protocol message broker that natively supports web-based protocols. Your apps can still use web-friendly API management, and the broker handles service reliability issues, publish/subscribe and queueing semantics, and access to non-web legacy systems.

Let’s take a look at three common scenarios and how OpenFin REST interactions can be improved with a message broker acting as an intermediary.

1.  Request/reply to RESTful service
2.  Request/reply to a legacy service with a messaging interface
3.  REST as a publisher to multiple subscribers

## Scenario 1: Request/reply to RESTful service

This is the pattern where REST is most straightforward. You simply POST (or PUT) and specify whether you want the interaction to be synchronous or asynchronous.

[![A diagram of OpenFin Direct to Service through a Solace PubSub+ advanced event broker](../images/blog/openfin-blogpost-3-image-1.png)](../images/blog/openfin-blogpost-3-image-1.png)

I know what you’re thinking:

> They both do the same thing, only the first one is simpler! Why add Solace?!?”

There are three primary reasons people put a message broker between their REST POSTs and their RESTful services:

1.  **Buffering against failure.** A message broker or queue is often used to simplify error handling in the client application. If the remote service is unavailable or heavily loaded, the broker will hold the messages until the service is restored or has caught up. The broker can easily be configured for fault tolerance and disaster recovery to provide instance or site failure recovery. With a direct REST request, if your POST fails it’s on you to manage the retries and handle the many failure scenarios.
2.  **Governance.** If you have many types of messages going to many types of destinations across the datacenter, cloud and SaaS services, it can be very useful to manage security, logging and other governance operations in a single place.
3.  **Publish/subscribe.** Sometimes it is useful for the message payload to go to multiple destinations (see scenario 3 later in this post).

REST may be all you need if everything is a service lookup and everything is working, but distributed systems get messy, and a broker improves both reliability and governance.

## Scenario 2: Request/reply to a legacy service with a messaging interface

Scenario 2 is still a point-to-point interaction, but this time the remote service does not offer a RESTful interface. We’ve discussed the architectural choices facing this scenario in detail in the whitepaper [A Guide to Connectivity for OpenFin Architects and Developers](https://try.solace.com/wp-download-openfin-guide-to-connectivity/). This time Solace is acting as a protocol and security bridge, terminating the REST request, forwarding the payload to a messaging queue or topic, and doing the same with the responses.

[![A diagram of OpenFin to Messaging Service through the Solace PubSub+ advanced event broker.](../images/blog/openfin-blogpost-3-image-2-1024x194.png)](../images/blog/openfin-blogpost-3-image-2-1024x194.png)

The means of receiving the response will vary depending on the nature of your REST request. If the request is synchronous, Solace will hold the connection open until the associated messaging interaction has completed. If the REST POST is asynchronous, you’ll need a means of receiving the message via callback, or polling for the results. There’s a companion blog post entitled [Handling OpenFin Inbound Events from the Hybrid Cloud](https://dev.to/blog/openfin-inbound-events-hybrid-cloud/) that covers handling message flow in the other direction.

[![OpenFin-Connectivity](../images/blog/OpenFin-Micro-campaign-Email-Header-Images-300x150.png)](https://try.solace.com/wp-download-openfin-guide-to-connectivity/)

## Scenario 3: REST as a publisher to multiple subscribers

In scenario 3, the client application needs to post information to multiple remote services. Without a broker, the only way to do this is to have the application send the message to each application one by one, or write some kind of intermediary that forwards the message inside a RESTful service.

Solace offers an elegant solution to this by allowing you to use REST to POST the data along with a publishing topic as metadata. Remote services identify themselves as subscribers and PubSub+ publishes onto many different messaging networks on the specified topic. The net effect is that your OpenFin apps use REST and the data automatically goes to all the subscribers, wherever they are. Some subscribers may produce a response, and others may simply listen, for example for logging or archival.

[![A diagram of OpenFin Publish/Subscribe through REST](../images/blog/openfin-blogpost-3-image-3-1024x467.png)](../images/blog/openfin-blogpost-3-image-3-1024x467.png)

## All-of-the-Above

Of course, many applications will want to include exchange patterns that accomplish all three of these scenarios. The all-of-the-above scenario highlights the governance and reliability advantages of using a broker.

[![A diagram of OpenFin for all REST data exchanges](../images/blog/openfin-blogpost-3-image-4.png)](../images/blog/openfin-blogpost-3-image-4.png)

If an application needed to use all of the message patterns we have discussed in this blog post, without a message broker, it would need to vary the use of REST, possibly handle security differently for each pattern, _and_ deal with all failure scenarios. With a message broker, it simply POSTs the data to Solace which acts as a security and traffic intermediary, routing to all data sources.

Note: To keep the image above from overcrowding, I did not show the return messages. They would work the same as they did in the prior scenario diagrams above.

## Bolstering REST with Enterprise-Grade Resilience and Governance

So there you have it, REST is awesome because it’s so simple—but it has some serious limitations. If operationalizing systems for predictability and high-availability, accessing legacy systems, or taking advantage of messaging-like semantics are requirements for your apps, consider adding a multi-protocol broker to bridge REST into other protocols and bolster your system’s resilience.

Be sure to check out the companion post that discusses receiving notifications and responses from asynchronous REST requests: [Handling OpenFin Inbound Events from the Hybrid Cloud](https://dev.to/blog/openfin-inbound-events-hybrid-cloud/).

The post [OpenFin Apps Need More Than Just REST](https://solace.com/blog/openfin-apps-rest/) appeared first on [Solace](https://solace.com/).
