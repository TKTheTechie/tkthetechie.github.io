---
author: TKTheTechie
title: GraphQL Subscriptions With Solace PubSub+
date: 8/18/2023
category: Dev
headerImage: graphql-with-solace.png
layout: blog
---

GraphQL is technology that is extremely popular for quickly building out fast and expansive APIs. The benefit of GraphQL as oppposed to traditional API Gateways is that it enables declarative data fetching where a client can specify only the data it needs from an API. This also enables it to effectively serve as a query layer for multiple datasources and presents the data in a unified graph.

However, the core GraphQL pattern is still effectively request->response. The GraphQL server also has a PubSub Engine that allows you to enable Publish Subscribe semantics with your GraphQL server. Coupling this pattern with Solace PubSub+ provides you with multiple powerful patterns with your GraphQL data.


## Subscriptions with GraphQL


We are going to consider a very bare bones GraphQL server that implements a Book API. Say you have GraphQL [resolvers](https://www.apollographql.com/docs/apollo-server/data/resolvers/) defined for your Book API as follows:


```
const resolvers = {
    Query: {
        books: () => books,
    },
    Mutation: {
        addBook: (parent, args) => {
            const book = {
                title: args.title,
                author: args.author,
            };
            return book;
        },
    },
    
};
```

So you can now select books with this query:

```
{
books {
    title,
    author  
  } 
}

```

which will return something like this
```
{
  "data": {
  "books":
    [
      {
        title: 'The Awakening',
        author: 'Kate Chopin',
      },
      {
        title: 'City of Glass',
        author: 'Paul Auster',
      },
    ];
  }
}
```

This is all well and good, but what if you would like to subscribe to a GraphQL when a new book gets added to the database. Perhaps you would like to have real time inventory notifications to users who are waiting for their favorite book to be back in stock. This is why GraphQL has a PubSub Engine - a mechanism through which GraphQL can expose updates as Event Streams via an Event Broker. So how do you got about defining a subscription resolver?

```
 Subscription: {
    bookCreated: {
      subscribe: () => pubsub.asyncIterator(BOOK_CREATED_TOPIC + '/*'),
    },
  },
```

and you would modify your mutation resolvers to publish an update:

```
 addBook: (parent, args) => {
            const book = {
                title: args.title,
                author: args.author,
            };
            pubsub.publish(`BOOK/CREATED`, { bookCreated: args });
            books.push(book);
            return book;
        },
```

## The Solace PubSub Library in GraphQL 

GraphQL offers a variety of PubSub Engine integrations but integrating it with the Solace PubSub+ Event broker allows you to take advantage of a variety of feautres that can make your GraphQL deployment more flexible and easier to use.

To get started with the Solace PubSub+ Event Broker - you can sign up for a [FREE Solace Cloud SaaS](https://console.solace.cloud/login/new-account) account or you can [download](https://solace.com/products/event-broker/software/getting-started/) the broker.

Once you've done that all you have to do is add the graphql-solace-subscriptions package in your graphql project by running the following command:

```
npm i @solace-community/graphql-solace-subscriptions
```

You import and instatiate the SolacePubSub library with the following import statement:

```
import { SolacePubSub } from 'solace-graphql-subscriptions';

SolacePubSub.startWithDefaultOptions("GRAPH_QL_QUEUE");

```


Note that the statement above expects the evnet broker to be running on localhost. If you need other options, you can connect with your own properties:

```
import { SolacePubSub, SolacePubSubOptions } from 'graphql-solace-subscriptions';

let solacePubSubOptions = new SolacePubSubOptions("wss://host:8081","vpn1","user","password");

const pubsub = await SolacePubSub.startWithSolaceOptions("GRAPH_QL_QUEUE",solacePubSubOptions);
```

and you can event inject your own SolaceSession:

```
import { SolacePubSub } from 'graphql-solace-subscriptions';
import solace from 'solclientjs';

let session: solace.Session;

//instantiate your solace session

const pubsub = await SolacePubSub.startWithSolaceSession("GRAPH_QL_QUEUE",session);

```


## The power of the Solace PubSub+ Event Broker

The Solace PubSub+ Event broker offers numerous powerful features such as:

* **Topic Routing**
Solace Topics are simply properties of a message and do not have to be preprovisioned. This is well explained in this video :[![All about Solace Topics](https://img.youtube.com/vi/PP1nNlgERQI/0.jpg)](https://youtu.be/PP1nNlgERQI)
You can now route messages to specified subscribers thereby alleviating the need for your GraphQL server to do the heavy lifting. 

* **Event Mesh**
The Solace Event Mesh allows you to build a modern hybrid cloud/multi cloud event streaming backbone. By adding a GraphQL server as a node of your Event Mesh, you can create a GrapQL Event Mesh. ![GraphQL Event Mesh](../images/blog/graphql-event-mesh.png)

* **Multi Protocol Event Streaming**
Solace supports a rich number of APIs that allow you to subscribe to these GraphQL events using a number of languages and protocols. ![Solace Mult Protocols](../images/blog/v9-API-Protocols-Diagram-300x220.png)

* **Security** 
Once GraphQL events are pushed onto the Solace Event Broker, you have the ability to restrict who can subscribe to these events using well formed Access Control Lists. For example - you can restrict a set of users to see events on the topic `BOOKS/CREATED/*`. You can also authenticate via OAuth, Certificates or basic username/password

## Sample GraphQL server

I've built out a sample graphql-server that makes use of the graphql-solace-subscriptions package which you can find [here](https://github.com/TKTheTechie/graphql-server-subscriptions-with-solace). To get started with the project, just clone the repo and follow the instructions in the README.


## Conclusion

By using Solace PubSub+ with your GraphQL server - you can liberate your GraphQL events to your non-GraphQL users, extend your GraphQL deployments across regions/geographies, secure your GraphQL events, and off load the distribution of the GraphQL events from your GraphQL server.


