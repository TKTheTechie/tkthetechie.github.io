---
author: TKTheTechie
title: Why the Pyth Network needs an Event Mesh
date: 3/24/2022
category: Crypto
headerImage: pyth-network-event-mesh-blog.png
layout: blog
---


[**Pyth**](https://pyth.network/) is an innovative market data distribution protocol that aims to decentralize market data distribution and thereby make it accessible to the masses.   
  
Before we dive deeper into Pyth, lets describe what market data is and why its an essential part for functioning markets nowadays.  


## What is Market Data?

“In finance, market data is price and other related data for a financial instrument reported by a trading venue such as a stock exchange. Market data allows traders and investors to know the latest price and see historical trends for instruments such as equities, fixed-income products, derivatives, and currencies.” – **Wikipedia**  
  
For example, when you open CNBC.com or Robinhood, you will see a price for a stock. That price is essentially derived from MarketData.

  
![Apple stock price display from Robinhood mobile app](../images/blog/IMG_21C5D4C0E8B5-1-e1648139145429.jpeg)  
  
_Example of Apples stock price from the Robinhood App  
_

There are many other intricacies of MarketData which are beyond the scope of this post but if you are interested to learn more, I have found this article  from thebalance.com to be a good overall summary: [**Description of Order Book, Level 1 and Level II Market Data**](https://www.thebalance.com/order-book-level-2-market-data-and-depth-of-market-1031118)

## How MarketData is published and consumed?

MarketData is typically provided by specialized vendors such as Bloomberg, Refinitiv (formerly Thomson Reuters), Morning Star or even directly from the exchanges such as Nasdaq or NYSE. There are numerous costs associated with providing and consuming market data access that is typically outside the reach of individual investors…. until now with the…

## Pyth Network... MarketData for all...

The pyth network is an innovative solution that aims to bring market data to the masses using blockchain technology. The network does this by incentivizing market participants – in the form of crypto currency – to share price data collected as part of their normal operations. The pyth network then aggregates this data and makes it available to end users.  
  
When I first heard about Pyth at the [**FIA Conference**](https://fia.org/), the first thought that crossed my mind was what prevents someone from publishing a bad price so they can skew the market in their favor. Thankfully the Pyth protocol has a series of well thought out safe guards to prevent market manipulation by participants.  

## Pyth Tokens

Pyth Tokens are the financial incentive that is part of the protocol in order to drive behavior that contribute to efficient and fair market data distribution. The stakeholders of the Pyth network will be given Pyth tokens accordingly:  

*   **Publishers:**  Publishers are awarded tokens based on the volume of data they share and also on how accurate the prices of the data they share is. Publishers have to stake tokens in order to participate in the network. This stake is reduced if they publish in-accurate information.
*   **Consumers:** Consumers read price feeds and pay data fees in order to get accurate data. Consumers can submit a claim – entirely on chain – if they believe they received inaccurate market data.
*   **Delegators:** Delegators stake tokens onto publishers and earn a share of data fees and also lose their stake if the price produced is deemed to be inaccurate during a claims process.

## Consuming Pyth Data

Pyth has a [**number of APIs**](https://github.com/pyth-network) that you can use to contribute to and consume from the Pyth Network.  
For the sake of this post, lets consider the Node API. Here is a snippet of sample code that you can use to subscribe to the Pyth Network:


```
pythConnection.onPriceChange((product, price) => {
  // sample output:
  // SRM/USD: $8.68725 ±$0.0131
  if (price.price && price.confidence) {
    // tslint:disable-next-line:no-console
    console.log(\`${product.symbol}: ${price.price} \\xB1${price.confidence}\`)
  } else {
    // tslint:disable-next-line:no-console
    console.log(\`${product.symbol}: price currently unavailable. status is ${PriceStatus\[price.status\]}\`)
  }
})
```
  

Running this code will very quickly overwhelm your javascript console with the following bits of information:

```
Crypto.SLND/USD: 1.9875 ±0.0028
Equity.US.AMC/USD: 19.959999999999997 ±0.18642999999999998
Crypto.FTT/USD: 47.962 ±0.012
Crypto.C98/USD: 1.59415 ±0.00105
Crypto.AVAX/USD: 86.395 ±0.022000000000000002
Crypto.BTC/USD: 43890.793 ±21.202
FX.USD/CNH: 6.380699999999999 ±0.0003
Crypto.UST/USD: 1.00205 ±0.00025100000000000003
```

Now imagine if you were just interested in the price of BitCoin (BTC) or just wanted the price of BTC denominated in your local currency. You would have to sift through all the data you receive, and pull out the information you are interested in. In addition, what if your company had traders sitting in multiple locations – they would also need to use the API to consume the market data and sift through it to find the price they were interested in. This can get prohibitively expensive in terms of both network and infrastructure costs.  

![Pyth Network architecture diagram showing data flow from publishers to consumers](../images/blog/pyth-architecture.png)  
  

The ideal architecture would be that you consume from the pyth.network once and publish it to all globally to all interested parties on a demand basis using a highly robust, logical mesh of event brokers also known as the…

## Event Mesh

“An event mesh is a configurable and dynamic infrastructure layer for distributing events among decoupled applications, cloud services and devices. It enables event communications to be governed, flexible, reliable and fast. An event mesh is created and enabled through a network of interconnected event brokers.” – from [solace.com](https://solace.com/what-is-an-event-mesh/)   
  
Remember from the description of the pyth.network, consuming data in effect costs you. So consuming the pyth feed for every user can get prohibitively expensive both from an Infrastructure Perspective and a Network Perspective. This is where the event mesh would come into play, a mesh of brokers that would allow you to consume from the pyth.network once and then consume it on demand from locations around the world.  
![Pyth Network with Event Mesh architecture showing global distribution of market data](../images/blog/pyth-event-mesh2.png)

The benefits of doing this are as follows:

*   You only have to be the consumption fees from the pyth network once
*   The Event Mesh can be deployed globally and thereby route data from the pyth network globally
*   Users will only see the data they are interested in and not the entire pyth.network feed. This is accomplished via topic routing which takes data and adds a topic address to it. For example, all BTC prices will be on the topic ‘Crypto/BTC/USD’ and whenever anyone is interested in BTC prices, they would simply express a subscription via Crypto/BTC/USD and they will receive it.

## Feedhandler Implementation

In the diagram above, you may have noticed a ‘FeedHander’ that takes data from the Pyth.Network and publishes it to a Solace PubSub+ Event broker. I’ve created a sample implementation of the feedhandler that does exactly that which you can find in [**this repo**](https://github.com/TKTheTechie/PythEventMesh).

## Conclusion

The Pyth.Network is a fascinating initiative that is backed by many key industry players. If successful, it will certainly make MarketData distribution more accessible to the masses. Its implementation is well suited to work with an EventMesh which offers significant advantages such as filtering feeds and global distribution to name a few.

