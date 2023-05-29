---
author: TKTheTechie
title: The importance of message settlement for Event Driven Architectures
date: 08/04/2022
category: Dev
headerImage: message-settle-blog.png
---


There is no doubt that Event Driven Architecture (EDA) is going mainstream. Every industry – whether it be consumer goods, retailers, banking, aviation or capital markets – has come to a realization that EDA is no longer a niche architecture but an absolute requirement in order to remain competitive and relevant in the industry. For example, in this [**article**](https://martechasia.net/features/in-the-phygital-age-of-retail-omnichannel-excellence-is-key-to-winning-customers/) about the Retail Industry, Ush Shukla mentions that: “_In the coming phygital age, it is the event-driven business that will capture the lion’s share of the market_“

Now there are many EDA Platforms out there, each with their own strengths and benefits … too numerous to cover in this blog post. An analytics use case for detecting fraud will require a very different Event Driven Architecture platform than a transactional use case that is processing payments. In this post, I will focus on an important aspect of an EDA platform for transactional use cases: Single Message Settlement (or Acknowledgement). Before we dive into that, lets start with some basics…


## Event Driven Architecture 101 ![](../images/blog/PubSub-300x282.png)

In an Event Driven Architecture, you will have three main participants:

*  Event Producers: These are a set of microservices that ‘push’ events to the event broker
*  Event Consumers: These are a set of microservices that ‘subscribe’ to events from the event broker
*  Event Broker: The event broker matches relevant events from the publisher to interested subscribers and pushes it to them

You might be wondering what an event is – it can be anything really – whether it as a sensor reading from an IoT device, a retail order event originating from an e-commerce system, or a trade event that originates from a trading engine. The event broker would typically be agnostic to the type of the event… it just has the responsibility of pushing it to the consumer.

## Settling a message

Once a subscriber receives a message, it typically takes some action and notifies the event broker that it wants to receive the next message. 

For example, a credit card payment microservice will consume the payment and perhaps write it to a system of record, and then notify the event broker that it wants to receive the next message through an acknowledgement (or ACK). Once the event broker, receives this notification it will push more events to the event consumer.

## Two different patterns for message settlement

By now, you should see the importance of message settlement to an event driven architecture. Now there are two prevailing patterns that event brokers use to settle events, single message settlement and batch settlement.

Lets analyze how these two different patterns would work and what type of systems work best with them.

## Individual Message Settlement

![](../images/blog/IndividualMessageSettlement.gif)

In this pattern, a message is individually acknowledged and the event broker keeps track of what messages haven’t been acknowledged. In the case of a failure, the event broker will only deliver messages to the consumer that haven’t been acknowledged. In addition, some event brokers have the functionality to mark a message as redelivered in the case it was sent to a consumer but not processed. These features make it simpler for microservices/applications to deal with failures.

Transactional systems that require individual message settlement such as credit card systems, order management systems, trading systems all functionally work better with a single message acknowledgement pattern.

## Batched Message Settlement

![](../images/blog/BatchedSettlement.gif)

In this pattern, the consumer will periodically send an acknowledgement back to the event broker to notify it that it is done processing a set amount of messages.

In this situation, it is harder for an application/microservice to reason about failures. When the event broker redelivers the message to the consumer, there is no indication that it has been redelivered and so the consumer will have to rely on an external state store to determine what to do with an event once its received. This significantly increases architectural complexity and therefore is not fit for purpose for transactional use cases.

However, when you are doing analytics/processing on a stream of data – your analytics/processing framework will typically act on records in batches and will store an index/offset of the last consumed message to deal with failures and also have the ability to deduplicate messages. In this case, the burden of tracking consumer state is moved away from the broker to the consumer which is typically par for the course for analytics usecases. 

## Conclusion

Message settlement or acknowledgement patterns are an extremely critical  consideration for an event driven architecture.  As with any technology decision, it’s important to start with your business requirements and work towards a supporting technology platform. For example, are your events transactional in nature  (such as retail orders, trades, payments etc) where every message needs to be individually processed , a single message settlement process will be the ideal architecture. Where as if you are dealing with an analytics use case where an extra step of post-processing on your event stream is part of your pipeline, a batched acknowledgement architecture can work better.
