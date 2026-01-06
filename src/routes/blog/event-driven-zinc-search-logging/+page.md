---
author: TKTheTechie
title: Event Driven Zinc Search Logging
date: 8/23/2022
category: Dev
headerImage: event-driven-zinc-search.png
layout: blog
---


In this post, I will demonstrate how you can easily and natively integrate logging into your event driven architecture using the up and coming Elastic Search replacement – [**Zinc Search**](https://zincsearch.com/) – and the [**Solace PubSub+ Advanced Event Broker**](https://solace.com/try-it-now/). But before we begin, lets start with a high level overview of both Zinc Search and the Solace PubSub+ Advanced Event Broker.

## Zinc Search 

Zinc Search is a search engine for doing full text search on documents. Its Open Sourace and built in Go Lang. It uses bluge – an open source indexing library. Its viewed as a lightweight replacement for ElasticSearch which is the dominant player in the document search category. It also aims to be a drop in replacement for Elastic Search by having Elastic Search compatible APIs for applications that want to migrate from Elastic to Zinc. You can find a good write up of a lot of the motivations for building out Zinc Search from the author’s [**blog**](https://prabhatsharma.in/blog/in-search-of-a-search-engine-beyond-elasticsearch-introducing-zinc/).  
  
Another interesting fact for Zinc Search is that it is currently the fast growing project on Github – showing that there is a significant demand/appetite for a replacement to Elastic that is simpler, lighterweight and easier to use.

## Solace PubSub+ Event Broker

The Solace PubSub+ Advanced Event broker is a multi-protocol event broker that comes in a variety of form factors. Hardware, Software and SaaS. A core differentiating factor of the Solace PubSub+ Event Broker is multi-protocol support – including REST – as shown below.

![Solace PubSub+ multi-protocol support diagram showing various APIs and protocols](../images/blog/v9-API-Protocols-Diagram-300x220.png)

What this means is that you could do a REST-ful operation directly into the event broker and consume the output as an event stream, and vice versa, you could push an event into the event broker and have the event broker do a webhook out to a REST-ful endpoint.

## Installing ZincSearch

Lets start with [**installing ZincSearch**](https://docs.zincsearch.com/installation/), I’ll use docker for this post but feel free to try any of the other installation methods (make sure to modify /full/path/of/data to match where you created the data directory). mkdir data

```
docker run -v /full/path/of/data:/data -e ZINC\_DATA\_PATH="/data" -p 4080:4080 \\ -e ZINC\_FIRST\_ADMIN\_USER=admin -e ZINC\_FIRST\_ADMIN\_PASSWORD=Complexpass#123 \\ --name zinc public.ecr.aws/zinclabs/zinc:latest
```

Once you’ve installed Zinc Search, you should be able to access the web interface on http://localhost:4080. I’m also going to assume that you are going to be running this locally for the purpose of this excercise (if not replace localhost with whatever hostname you are running on).

## Installing Solace PubSub+

There are multiple ways to take install the Solace PubSub+ Broker. You could sign up for a [**free trial of Solace PubSub+ Cloud**](https://console.solace.cloud/login/new-account?product=event-streaming) which is a click button deployment in the cloud of your choosing. But for the sake of simplicity, lets go with the [**Docker Install option**](https://solace.com/products/event-broker/software/getting-started/) once again.

```
docker run -d -p 8080:8080 -p 55554:55555 -p 8008:8008 -p 1883:1883 -p 8000:8000 -p 5672:5672 -p 9000:9000 -p 2222:2222 --shm-size=2g --env username\_admin\_globalaccesslevel=admin --env username\_admin\_password=admin --name=solace solace/solace-pubsub-standard
```

(note if you see any port conflicts with existing applications running, change the port mappings above)

You should be able to access the web interface for the broker by hitting http://localhost:8080 <br><br>

## Setting up an Event Driven Logging Architecture

With the Solace PubSub+ Event Broker, you publish events using dynamic topics. Topics are simply metadata on an event and do not consume resources on a broker. A representation of a message in Solace is shown below: ![Solace message structure diagram showing topic and payload components](../images/blog/SolaceMessage-300x283.png)

##  Publishing and Subscribing to Messages with Solace

You can use a [**variety of APIs**](https://solace.dev/) to interact with the Solace Broker, but lets use the nifty built in ‘Try Me’ tab  to publish and subscribe to Solace messages. To gain access to this try me tab, login to the brokers Web Interface using [**http://localhost:8080**](http://localhost:8080/)  
  
Assuming you used the default credentials, login to the broker ui using admin/admin. Once inside, navigate to the default VPN and click on the ‘Try Me Tab’ as shown below  
  

![Solace Try Me interface showing publisher and subscriber testing tools](../images/blog/TryMeImage-1024x254.png)

Once you are in the ‘Try Me’ tab – click on **Connect** on the Publisher and Subscriber which will connect to the broker using a websocket connection for testing publishing and subscribing to messages

Now lets publish your first event onto Solace. A key aspect of an event driven architecture with Solace is a Topic Taxonomy. Lets assume that you are building out microservices for a retail conglomerate ACME stores. Your first order of business is to build out a New Order Microservice. As such a suitable topic taxonomy will look something like this:

```
\[region\]/\[corporation\]/\[status\]/\[ordernumber\]
```
Solace can transmit any payload, lets assume a payload with the following schema:
```
{
"region": string,  
"orderNumber": string,  
"status": string,  
"item": string,  
"quantity": number,
"price": number
}
```

Now that we have both the topic taxonomy and schema decided upon, lets publish an event or two using the try me tab with the following topic and payload:
```
Topic: us/acme/new/ord12345  
Payload: 
{
"region": "us",
"orderNumber": "ord12345",
"status": "new",
"item": "widget1",
"quantity": 1,
"price": 0.99
}
```
Your try me screen should be populated like the image below and then click ‘Publish’ and you should see the message publisher counter increment.

![](../images/blog/TryMePublish.png)

Ok, so now you published an event onto Solace – now lets figure out how to consume an Event. The typical pattern on how to consume events from Solace is via a construct called Queues. So lets create a ‘New Order Queue’ and attach a New Order Topic subscription to it.

Navigate to the Queues Tab and click on the ‘+ Queue’ Button and follow the sequence of steps as below and click Apply:

![](../images/blog/new-order-queue-1024x281.png)

![](../images/blog/new-order-queue-apply-1024x408.png)

Now that we have a queue created, we need to attach a topic subscription to it to capture new orders. Since specifying the universe of order numbers is not feasible, we’ll use the concept of topic wildcards that will pattern match all events against a string to the Queue. As such, the topic pattern that we want to use to match all orders will be: us/acme/new/order/\*

To attach this subscription to the Queue, go back to the Queues tab in the UI, click on the ‘New Order Queue’  and then the Subscriptions Tab, and click the ‘+ Subscription’, enter the topic subscription and press the create button as follows:

![](../images/blog/queue-list-1024x165.png)

![](../images/blog/queue-subs-1024x161.png)

![](../images/blog/queue-subs2-1024x640.png)

You now have a Queue that is subscribing to all us based new order events that your New Order Microservice can connect to. Lets test the end to end flow by navigating back to the Try Me tab.  
  
On the right hand side of the Try Me screen, click on ‘Bind to an endpoint to receive guaranteed messages’  and put in ‘new-order-queue’, and click on Start Consume. Once again publish the message on the us/acme/new/ord12345 topic and you will see the consumer consume a message on the right hand side of the screen:

![](../images/blog/TryMePublishSubscribe-1024x578.png)

Woohoo … you’ve setup a basic event driven architecture which looks like this below: ![](../images/blog/zinc-topic-to-q-mapping.png)

## Logging new orders to Zinc Search
Now that you have a basic publish/subscribe based Event Driven Architecture implemented, the next requirement is to send all new orders to Zinc Search for searching and indexing. Now there are many ways you could potentially do this, perhaps have your consumer above also log the event to Zinc Search or you could write a separate microservice to do so.

However, one of the differentiating factors of the Solace PubSub+ protocol compared to other event brokers in the market is first class support for the REST protocol – which means you could trigger a webhook out from the Solace PubSub+ Event broker when an event hits a queue! This way – you won’t have to change your publisher and/or subscriber that you implemented above to do anything different. Zinc Search just becomes another consumer transparent to the publisher and existing subscriber. The end to end architecture is illustrated below. 

![](../images/blog/solace-q-to-zinc.png)

As shown here, the publisher publishes to a topic us/acme/new/ord123456 and it gets attracted to the **new-order-queue** and also the **zinc-queue.** The key thing here is that the publisher only publishes it once, the Solace PubSub+ Event Broker distributes it to the two new queues. In addition, the broker will have the responsibility to push the event out into Zinc Search’s REST-ful endpoint for indexing.

## Setting up the connectivity between Solace PubSub+ and Zinc Search
So now that we described the architecture, lets go about configuring the connectivity to Zinc Search. 

The first step is to create the zinc-queue by navigating to the Queues tab and, creating the + Queue button with the following steps:

![](../images/blog/zinc-queue-create.png)

![](../images/blog/zinc-create-queue-2-1024x570.png)

![](../images/blog/zinc-queue-subscription-1024x461.png)

Now we have that queue setup, lets setup a connector to the Zinc Search endpoint. To do this navigate to the ‘Clients’ tab and then to the ‘REST’ tab as shown below:

![](../images/blog/rest-delivery-point-1024x173.png)

The next step is to create a REST Delivery Point by Clicking the ‘+Rest Delivery Point’ button and creating one called ‘zinc-rdp’ as shown below 

![](../images/blog/zinc-rdp-create.png)

On the next screen, toggle the Enabled Button and change the vendor to Zinc Labs as shown below and click Apply.

![](../images/blog/zinc-rdp-create-2-1024x335.png)

Once created, you will be taken back to the REST screen and you will see **zinc-rdp** as an entry in the table. as shown below:

![](../images/blog/zinc-rdp-create-3-1024x225.png)

Click into the zinc-rdp entry and the REST Consumers and then click the +REST Consumer Button naming your REST Consumer as ‘zinc-rdp-rest-consumer’ as shown below:

![](../images/blog/zinc-rest-consumer-1-1024x196.png)

![](../images/blog/zinc-rest-consumer.png)

Once you click the create button, you will be greeted with a screen to configure the REST consumer. Assuming you deployed Zinc Search on the same host as the Solace broker, you will need to change the following settings (and click the Enabled toggle as well):
```
Host: host.docker.internal  
Port:4080  
Authentication Scheme: Basic Authentication  
Username: admin  
Password: Complexpass#123
```
Your screen should look something like below:

![](../images/blog/zinc-rest-consumer-setup-1024x666.png)

If you did, everything correctly you would have been greeted with a screen with the REST Consumer showing the status of Up as below:

![](../images/blog/zinc-rest-consumer-up-1024x155.png)

The very last thing to do is to configure a Queue Binding, navigate to the Queue Bindings tab and click ‘+Queue Binding’ to create a binding to the previously create ‘zinc-queue’ as shown below:

![](../images/blog/zinc-qb-1-1024x131.png)

![](../images/blog/zinc-qb-2.png)

In the next screen, you will want to set the target to Zinc Search’s API to upload a doc to the orders index:

![](../images/blog/zinc-open-api-submit-doc-1024x346.png)

You do this by inputting ‘/api/orders/\_doc’ as the Post request Target as shown below:

![](../images/blog/queue-post-request-target-1024x401.png)

Once again, if everything was done correctly you will be greeted with a Queue Binding screen and an Operational Status of ‘Up’ as shown below:

![](../images/blog/zinc-qb-up-1024x162.png)

## Testing it all out

Woohoo! If you’ve made it this far that means you’ve wired up everything succesfully and the last thing to do is to test the end to end flow out. Lets go back to the try me tab and publish a new order once again with the following topic/payload:

```
Topic: us/acme/new/ord12345  
Payload: 
{
"region": "us",
"orderNumber": "ord12345",
"status": "new",
"item": "widget1",
"quantity": 1,
"price": 0.99
}
```

![](../images/blog/TryMePublish.png)

If all worked correctly, you should see an index “Order” created with the Order 12345 in your Zinc Search UI (which can be accessed by hitting http://localhost:4080)

![](../images/blog/zinc-search-ui-1024x317.png)

## Conclusion

In this post, I demonstrated how easy it was to extend your event driven architecture over Solace PubSub+ with Zinc Search. By implementing this natively within the event broker, you alleviate the need for your existing microservice or an entirely new microservice being deployed to handle logging to Zinc Search. You can further extend this pattern to do more sophisticated logging into Zinc Sarch by updating existing indexes or to log multiple stages of a workflow with no interruption to your existing microservices as all the steps I described above are in-service activities.
