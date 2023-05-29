---
author: TKTheTechie
title: Event Driven Elixir
date: 1/17/2022
category: Dev
headerImage: event-driven-elixir.png
---


Elixir is a fascinating programming language that is built on top of Erlang and puts a modern twist on a very robust programming language. One of the many intriguing features about the programming language is that it inherently promotes building distributed systems by having a built-in distribution protocol. In this post, I’ll describe this distribution protocol, its shortcomings, and how coupling it with an event broker can make distributed programming with Elixir more robust.


## Nodes and Messaging in Elixir

In Elixir, a node is a running instance of an Elixir process. Elixir also has message passing functionality built into the language and takes care of moving messages between nodes – no matter where the node is running. The nodes could be on the same VM on the same underlying host, or they could be on multiple machines within your network or they can even be spread across the network – the location of the node is not something you have to be concerned about when coding in Elixir.

To show you how simple it is to spin up a node and add a hello world function, here are the commands you would run using the Interactive Elixir CLI:

```
    $ iex --sname node1
    Interactive Elixir - press Ctrl + C to exit (type h() ENTER for help)
    iex(node1@localhost)1> defmodule Hello do
```

Now what if we wanted to call this “hello world” code from another node and link it to the node:  

```
$ iex --sname node2
iex> Node.spawn\_link :"node1@localhost", fn -> Hello.world end
#PID<9014.59.0>
hello world
```

Pretty nifty right? With just a few lines of code, we spun up two Elixir nodes and linked them together.  

## Shortcomings of Elixir's Distributed Messaging

While the built in distributed messaging constructs within Elixir are convenient, it does suffer from some draw backs which I’d like to highlight below:

*   **Security**  
    You were probably wondering what the security mechanism is for connecting nodes to each other  in Elixir.  All Elixir nodes start with a [magic cookie](https://www.erlang.org/doc/reference_manual/distributed.html) – an arbitary string – that is used for authentication. So all nodes need to be aware of this magic cookie in order to connect. The connection by default happens over plaintext but can be made TLS. Furthermore, once you are connected there is no further level of authorization semantics. For example, perhaps you’d like certain nodes to be only able to send a Hello request… that logic will have to be built into your node.  
      
    
*   **Non-Guaranteed Delivery of Messages**  
    Data sent from one node to another is sent on a best effort basis – which means that in case of a network blip if nodes were sent across two hosts, there is no guarantee that the message would be received by the node.  
      
    
*   **Message Distribution is Point-to-Point**  
    What if you wanted to send a messages to multiple nodes on the network – this logic would have to be implemented manually within your nodes.  
      
    
*   **WAN Routing**  
    What if you had Elixir nodes split between cloud regions, and you need to send a message from one node in US-EAST to 100s of Elixir nodes in US-WEST for example. This would not be easily achievable.   
      
    Wouldn’t it be great if the addition of a node to the network was transparent to the publisher of an event and if you could efficiently fan-out a message to N consumers no matter where they were located? Essentially dis-intermediating the publishers of events from the subscribers of the events through the introduction of an event broker.  
    

## The Solace PubSub+ Event Broker

The **[Solace PubSub+ Event Broker](https://solace.com/try-it-now/)** is a multi-protocol, enterprise grade event broker than can help us close the gaps we mentioned above. In addition, it comes in multiple form factors a Hardware Appliance, a Software Broker and a SaaS offering – all three are completely interoperable. Also you can use it for FREE as a [**software container**](https://solace.com/products/event-broker/software/getting-started/) or in the **[cloud](https://console.solace.cloud/login/new-account?product=event-streaming)**.  
  
Now lets look at how introducing an event broker into your Elixir architecture will alleviate the concerns I listed above.  
  

*   **Security:** Every connection to the Event Broker can be authenticated via **[OAuth, Kerberos, Client Certificate Authentication or an internal username and password](https://docs.solace.com/Overviews/Client-Authentication-Overview.htm)**. In addition, you have the ability to [**restrict connections**](https://docs.solace.com/Overviews/Granting-Clients-Access.htm) to an ip-address or ip-address range. In addition – on a per user, basis you can restrict what a user is allowed to send or allowed to receive. This will allow you to spin up nodes, associate it with an appropriate username/password and restrict what it can do with regards to sending/receiving messages.  
      
    
*   **Guaranteed Delivery of Messages:** Solace supports two qualities of service – Guaranteed and Non-Guaranteed messaging. The benefit of using Guaranteed messaging is that the publisher can ensure that the broker has received the message and the broker will ensure that it is received and acknowledged by the consumer.  
      
    
*   **Efficient one-to-many distribution:** Whether you have 1 node subscribing to the message, or 1000 nodes interested in the message – the event broker will efficiently distribute the messages in a guaranteed fashion to all interested parties.  
      
    
*   **WAN Routing:** If your Elixir nodes are geographically dispersed across many cloud regions, you may want to simply add the node and not change/notify the publisher which may be in another region. The Solace PubSub+ broker has pioneered an architecture known as the ‘[**Event Mesh**](https://solace.com/what-is-an-event-mesh/)‘. Your Elixir apps can be publishing a message in one region and the consuming apps can be in another region or another cloud all together, the publishing app doesn’t know (or care) how many nodes or subscribers are interested or where they are. An added benefit, is that you can send messages between your elixir and non-elixir apps using this architecture.  
      
    

![Elixir EventMesh](../images/blog/elixir-event-mesh.png)

## Elixir and Solace PubSub+ in action

Now let’s see how you would integrate Elixir and Solace PubSub+ together with some sample code. Since one of the protocols that Solace supports is MQTT, we will be using the **[Tortoise MQTT Elixir Library](https://github.com/gausby/tortoise)** for this purpose.  
  
There are two components to this program, the requestor which sends a request and listens to a response, and the replier which listens to the request and publishes a response. The high level architecture diagram is listed below:  

![architecture diagram](../images/blog/hello-elixir.png)

  
  
Here are the relevant code snippets:

```
    def start_connection do 
        Logger.info "Attempting a connection to #{Application.fetch_env!(:elixir_solace, :host)}:#{Application.fetch_env!(:elixir_solace, :port)}"
        Tortoise.Supervisor.start_child(
          client_id: "solace_hello_requestor",
          user_name: Application.fetch_env!(:elixir_solace, :user_name),
          password: Application.fetch_env!(:elixir_solace, :password),
          handler: {Solace.Hello.Requestor, []},
          server: {Tortoise.Transport.SSL, host: Application.fetch_env!(:elixir_solace, :host), port: Application.fetch_env!(:elixir_solace, :port), verify: :verify_none},
          subscriptions: [{"hello/response",1}])
      end
```

Now lets look at the code for what happens when you receive a message:
```
    def handle_message(topic, payload, state) do
         Logger.info "Received #{payload}"
         {:ok, state}
      end
```

When a message is received, the handle\_message function will be called asynchronously.

  

## The magic of topic routing

A few notes about the message exchange pattern here, if you notice above – you subscribe on a topic. In the above example, its ‘hello/response’.  
  
Think of this as an address that you can subscribe on. Whenever a publisher publishes on the topic ‘hello/response’, the Solace PubSub+ Event Broker will push the event out to all interested subscribers. In addition, subscribers can use wildcards to capture a subset of the flows. For example, if you wanted to limit subscriptions to a specific region, the Elixir nodes would publish on the topic us-east/hello/request and perhaps you had an audit process that needed to capture all requests no matter where the requests originate from, they would simply express a subscription with the following pattern: ‘+/hello/request’ which captures requests from all regions.  
  
Here is a high level architecture diagram of a potential workflow:  
![hello-elixir-mesh](../images/blog/hello-elixir-mesh-1.png)

If you want to see a fully working code sample with instructions to spin up a Solace PubSub+ Event Broker – you can find it on github **[here](https://github.com/TKTheTechie/elixir_solace)**.

  

  

