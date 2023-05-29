---
author: TKTheTechie
title: Solace PubSub+ Queue Redelivery Delayer
date: 2/1/2022
category: Dev
headerImage: redelivery-delayer-blog.png
---


In this post, I’d like to give a high-level overview of an open source project I developed, its internal design and then dive into how I took advantage of an interesting Java construct and Java Streams to build out the functionality I was looking for more quickly and efficiently.  


## Solace Queues

[![](../images/blog/SolaceQueuePatterns-1.png)](../images/blog/SolaceQueuePatterns-1.png)

  

**[Solace Queues](https://docs.solace.com/Basics/Core-Concepts-Endpoints-Queues.htm)** are a fundamental and important construct of the [**Solace PubSub+ Event Broker**](https://solace.com/products/event-broker/). It keeps track of which events are consumed by micro-services and has the ability to detect redeliveries to a consumer. In addition, they can be used as a mechanism to implement a store-and-forward architecture for REST-ful endpoints via [**Rest-Delivery-Points**](https://codelabs.solace.dev/codelabs/solace-event-enable-rest/#0).

## Message Processing Failures

So what happens when a message fails to be processed by a rest-delivery-point or when a transaction that involves consuming a message is rolled back? The message is immediately redelivered back to the consumer for processing again an optionally configurable number of times before it is actually discarded or sent to a [**dead message queue**](https://solace.com/blog/pubsub-message-handling-features-dead-message-queues/) for further processing.  
  
What if the endpoint the message needed to be delivered to was suffering from load or was slow to respond? By immediately retrying – you may be exacerbating the problem. Optionally you could implement a back-off algorithm in your queue consumer code – but that would hold up messages in your queue for further processing and complicates your microservice code base. This is the problem that the redelivery services aims to solve – abstracting that complexity into a seperate code base.

The application stack I chose for this design was: 

*   Java 11
*   Spring Boot
*   [**Solace PubSub+ New Java API**](https://tutorials.solace.dev/java)

  

[![](../images/blog/solace-redelivery-workflow.png)](ttps://github.com/solacecommunity/solace-redelivery-delayer/raw/main/solace-redelivery-workflow.png)

  
When designing the application, here the logical steps it would need to take:  
1. Consume a message from a Dead Message Queue  
2. Calculate a delay factor with the following formula:  calculatedDelay = configuredDelay + pow(backOffFactor,number of redeliveries)
3. If the calculated delay > the max allowable delay, then discard the message or send to an error queue if required 4. Otherwise, send it back to the original queue after the calculatedDelay

Satisfying point #4 presented three interesting challenges to overcome:  
1. A construct that allows for delayed processing of tasks  
2. Ensuring that this construct does not block tasks that are ready for processing by tasks that are not ready for processing  
3. Implement parallel processing of tasks to increase throughput

There are many ways that I could have implemented the above construct – I could have used some form of a Queue, an iterator, and a ThreadPool that would be used to consume from the queue – but as always its great to understand what Java gives you before building something yourself…

## DelayQueue

A [**DelayQueue**](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/DelayQueue.html) in Java is an extension of a BlockingQueue that adds the ability to set an expiry on an item in the queue when you submit it. When you attempt to take an item from the DelayQueue, only items that have expired will be eligible.  

[![](../images/blog/delay-queue.png)](../images/blog/delay-queue.png)

This fit the usecase I was looking for perfectly. I would add an item to the DelayQueue and an iterator would constantly iterate over the queue and simply attempt to pull a message off of it. The DelayQueue would take care of only returning messages that exceeded the set Delay Time.  

## Java Streams

Java Streams is an often overlooked part of the Java programming language that simplifies the rather mundane task of iterating over a collection, processing them in parallel and emitting the result achievable with a few lines of code, the gist of which is shown below:

```
  Stream.generate(() -> {
                ...
                    return delayQueue.take();
                ...
            }).parallel().forEach(d -> {
                ...
                   process(d)
                ...
            });
        });
```

  
Combining Java Streams with the DelayQueue allowed me to implement the required architecture as shown below:  

[![](../images/blog/delay-queue-1.png)](../images/blog/delay-queue-1.png)


## Conclusion

I enjoyed building this application by breaking it down into a series of steps that could be independently solved. Furthermore, it always helps to figure out what a language/framework gives you before attempting to implement it yourself.   
  
An important point to note here is that FIFO (First-in-First-Out) ordering is not preserved on both the SOURCE\_QUEUE and the processing of the DMQ with this architecture. Since the reason for implementing this microservice was to “unblock” the SOURCE\_QUEUE and to also introduce an exponential delay to the events that fail processing, losing FIFO is an expected outcome.  
  
I hope you found this post informative – if you want to see the associated code base – you can view it on [https://github.com/solacecommunity/solace-redelivery-delayer](https://github.com/solacecommunity/solace-redelivery-delayer)

