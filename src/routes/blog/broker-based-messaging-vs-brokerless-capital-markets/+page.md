---
title: "Why Broker-Based Messaging Solutions Outperform Brokerless Solutions in Capital Markets"
description: "A comprehensive analysis of why broker-based architectures like Solace offer superior long-term value over brokerless solutions for mission-critical financial applications."
date: "2024-03-15"
category: "Architecture"
tags: ["Event Driven Architecture", "Capital Markets", "Messaging", "Solace", "Financial Technology", "Low Latency"]
author: "Thomas Kunnumpurath"
published: true
featured: true
headerImage: "broker-vs-brokerless-capital-markets.svg"
readingTime: "12 min read"
---

In the high-stakes world of capital markets, where microseconds can mean millions in profit or loss, the choice of messaging architecture is critical. While brokerless solutions have gained sputtering attention over the years for their promise of ultra-low latency, a deeper analysis reveals that broker-based architectures, such as those provided by Solace, offer superior long-term value for mission-critical financial applications.

## The Fundamental Difference

Brokerless architectures rely on direct publisher-to-subscriber communication, often leveraging UDP multicast, TCP, or shared memory transports. Solutions like Aeron eliminate the traditional message broker, promising reduced latency by removing the "middleman."

![Brokerless Architecture](/images/blog/brokerless-eda-vs-brokered_pic-01.png)

Broker-based architectures utilize a central messaging infrastructure that sits between publishers and subscribers, managing message routing, persistence, and delivery guarantees. Solace's TCP-based solution exemplifies this approach, providing a robust foundation for enterprise messaging.

![Broker-based Architecture](/images/blog/brokerless-eda-vs-brokered_pic-02.png)

## The Drawbacks of Going Brokerless

### Observability: The Blind Spot Problem

In capital markets, visibility into your messaging infrastructure isn't just nice-to-have—it's essential for regulatory compliance and operational excellence. Brokerless architectures create a fundamental observability challenge because there's no central point for monitoring message flows.

![Observability Challenges](/images/blog/brokerless-eda-vs-brokered_pic-03.png)

When issues arise, teams find themselves struggling to identify bottlenecks and performance degradation across a variety of transports. The lack of centralized monitoring makes it nearly impossible to track message lineage for audit purposes, turning troubleshooting into a distributed nightmare that spans multiple application logs and network captures.

In contrast, broker-based architectures provide comprehensive observability through their centralized design. Operations teams can monitor real-time message rates, latencies, and queue depths from a single pane of glass. When a slow consumer threatens to impact trading operations, the problem becomes immediately visible through centralized monitoring dashboards. This visibility extends to maintaining detailed audit trails of who is subscribed to what for regulatory reporting and implementing centralized alerting that can prevent minor issues from escalating into trading disruptions.

![Broker-based Observability](/images/blog/brokerless-eda-vs-brokered_pic-04.png)

### Security: The Permission Paradox

Financial services operate under strict regulatory requirements where data access must be controlled, audited, and traceable. Brokerless architectures create a security paradox: how do you enforce permissions when there's no central authority to manage them?

![Security Challenges in Brokerless](/images/blog/brokerless-eda-vs-brokered_pic-05.png)

Multicast traffic, commonly used in brokerless solutions, is inherently difficult to secure and control. Each publisher-subscriber relationship requires individual network configuration, creating a management nightmare that scales exponentially with the number of connections. Without a centralized authentication framework, ensuring that only authorized entities can access sensitive market data becomes an exercise in distributed complexity.

Broker-based solutions solve these security challenges through centralized authentication and authorization mechanisms. Access controls can be implemented at granular topic and queue levels, ensuring that trading desk personnel only see the data they're authorized to access.

Encrypted connections with centralized certificate management eliminate the security risks associated with point-to-point connections. Integration with enterprise identity management systems ensures that when employees change roles or leave the organization, their access is immediately revoked across all messaging channels. Comprehensive audit logging captures every access attempt, providing the detailed records required for regulatory compliance.

![Broker-based Security](/images/blog/brokerless-eda-vs-brokered_pic-06.png)

### Innovation Stagnation: The Niche Market Trap

Brokerless solutions face a fundamental business challenge: they're primarily viable only in capital markets, creating a dangerous dependency on a single vertical market. This narrow focus restricts the vendor's addressable market, limiting revenue growth and reducing investment in research and development. When a technology company's customer base is confined to a single industry, innovation velocity naturally decreases because the diversity of requirements that typically drives technological advancement is absent. Talented developers increasingly prefer working on broadly applicable technologies, making it difficult for niche solution providers to attract and retain top engineering talent.

The market has already provided compelling evidence of this pattern. Informatica UltraMessaging (formerly LBM) has seen its development and market presence diminish significantly and is on the decommission path. TIBCO FTL, failed to even garner any meaningful adoption. Even Aeron, now owned by Adaptive, appears to be following a similar trajectory despite its open-source origins with the vendor not focusing on the product as much.

Broker-based solutions like Solace serve diverse industries including healthcare, manufacturing, gaming, and IoT, ensuring continuous innovation driven by varied use cases. This diversity supports larger development teams and increased investment in research and development. Features developed for one industry often benefit others, creating a virtuous cycle of cross-pollination that keeps the technology advancing. The broader market presence ensures long-term product viability and vendor stability, critical considerations for financial institutions making infrastructure investments that must last for decades. This cycle has driven Solace to extend the core technology behind the on-premise hardware appliance to the cloud enabling record breaking performance in Azure and OCI. This is exemplified by United Airlines and the Chicago Trading Company taking  advantage of this unique architecture to deploy hybrid cloud event meshes as explained in an EDA Summit Video.

## Filtering & Routing Efficiency: Stop Wasting CPU Cycles

Filtering is where broker-based architectures decisively outperform. In brokerless models, every subscriber receives the full firehose and must filter locally. For example, if an application cares only about AAPL, but the multicast feed contains 3,000 symbols at 5 million updates/sec, the app wastes cycles discarding 99.7% of messages. This overhead consumes tens of CPU cores, and inflates GC pauses in Java or .NET runtimes. The constructs exposed by brokerless architectures such as channels and streams are often not a sufficient to satisfy the requirements of a low latency trading sytem at scale.

![Brokerless Filtering Inefficiency](/images/blog/brokerless-eda-vs-brokered_pic-07.png)

Brokers like Solace Event Broker eliminate this inefficiency with in-flight topic-based filtering: subscribe to PRICES/IBM, and only relevant messages related to IBM prices traverse the wire. The difference is stark: instead of handling 5M msgs/sec, the app processes just 17K msgs/sec for 10 symbols—freeing CPU for pricing, analytics, or execution logic. In low-latency systems, those saved cycles translate directly into competitive advantage.

![Broker-based Efficient Filtering](/images/blog/brokerless-eda-vs-brokered_pic-08.png)

## Latency & Determinism: More Than Just Microseconds

It's true that brokerless solutions can achieve sub-10µs raw latencies, compared to 20µs with a Solace hardware appliance. But in capital markets, what matters most isn't the best-case average latency, it's the determinism under stress. During periods of extreme market volatility, multicast feeds often overwhelm subscribers, causing packet drops, replay storms, and jitter spikes into the hundreds of microseconds or more. This unpredictability translates directly into missed opportunities and increased operational risk.



Solace, by contrast, has demonstrated provable, production-grade performance at scale. For example, RBC Capital Markets processed 260 billion messages in a single day (3 million per second) over Solace brokers with zero message loss and consistently low latency. That level of determinism is invaluable during Fed announcements, flash crashes, or crypto surges, where sustained throughput and predictable latency matter far more than shaving 10µs in a lab benchmark.

Equally important, as mentioned above, broker-side filtering reduces subscriber workload dramatically. Instead of burning cycles discarding irrelevant symbols from a multicast firehose, applications only receive what they've explicitly subscribed to thereby further reducing local processing time and tail latency. The net effect is a system that not only delivers lower effective latency to the application but also scales predictably as volumes grow.

Finally, this deterministic performance isn't limited to hardware appliances. Solace has extended its low-latency technology into the cloud, achieving an average latency of just 91 microseconds, a milestone that proves broker-based determinism translates seamlessly into hybrid and cloud-native trading environments.



## Global Routing: The Scalability Ceiling

Capital markets are inherently global enterprises, with trading desks operating across time zones and cryptocurrency markets trading continuously. Brokerless architectures hit a fundamental scalability ceiling when faced with global routing requirements. Multicast traffic doesn't naturally span geographic boundaries, requiring complex bridging solutions to connect trading operations across regions.

![Global Routing Challenges](/images/blog/brokerless-eda-vs-brokered_pic-09.png)


These bridging solutions often negate the latency advantages that motivated the brokerless approach in the first place. Without built-in WAN optimization or intelligent routing capabilities, maintaining consistent performance across global networks becomes increasingly difficult. Implementing disaster recovery across regions requires custom solutions that add complexity and potential failure points.

Broker-based architectures like Solace excel in global deployments through native WAN bridging and replication capabilities. Intelligent message routing can direct traffic based on geographic proximity, actually reducing end-to-end latency in complex global topologies.

Built-in disaster recovery and failover mechanisms ensure business continuity without requiring custom development. Centralized global configuration and monitoring provide consistent operational practices across all regions, simplifying management for global trading operations.

![Broker-based Global Architecture](/images/blog/brokerless-eda-vs-brokered_pic-10.png)



## Operational Complexity and TCO

Operating a brokerless architecture requires specialized networking knowledge, particularly for multicast configuration and management. Network teams must understand the intricacies of multicast routing, IGMP configuration, and switch-level optimizations that are rarely required in traditional enterprise networks. When problems occur, troubleshooting becomes exponentially more complex because there's no central point to diagnose issues. Teams must coordinate across multiple distributed endpoints to understand message flow problems. Capacity planning becomes nearly impossible without central visibility into traffic patterns and growth trends.

Broker-based architectures dramatically reduce operational complexity through centralized configuration and management. Network requirements remain within standard enterprise practices, reducing the specialized knowledge required from operations teams. Troubleshooting is simplified through centralized logging and monitoring, allowing teams to quickly identify and resolve issues. Capacity planning becomes predictable through centralized visibility into usage patterns, enabling proactive scaling decisions that prevent performance degradation.

## Message Durability and Reliability

![Durability Challenges](/images/blog/brokerless-eda-vs-brokered_pic-11.png)



UDP multicast, the foundation of many brokerless solutions, offers no delivery guarantees. Messages can be lost during network hiccups, switch buffer overflows, or when subscribers are temporarily unavailable. Ensuring reliable delivery requires implementing complex API-level acknowledgment schemes that often negate the simplicity advantages of the brokerless approach. Complex retransmission protocols typically involves the subscriber making a point to point connection to the publisher and the publisher publishing the lost message/packet out back to the multicast group for the subscriber's to discard in case they hadn't missed the message.


![Broker Based Durability](/images/blog/brokerless-eda-vs-brokered_pic-12.png)


Robust brokers like Solace provide multiple quality of service levels ranging from non-persistent for market data type use cases to guaranteed messaging for critical financial transactions. Message persistence and replay capabilities ensure that subscribers can recover from temporary outages without data loss. Guaranteed delivery with acknowledgments eliminates the need for complex API-level reliability mechanisms. For guaranteed messaging, queue endpoints act as a persistent buffer to store the messages for the consumers to consume from. Once a message is processed , an acknowledgement is sent to the broker.

## Conclusion

While brokerless architectures may seem appealing for their simplicity and potential latency benefits, the hidden costs in observability, security, operational complexity, and long-term viability make them a poor choice for enterprise capital markets deployments. The narrow market focus of brokerless solutions creates innovation stagnation that has already claimed several prominent players in the space.

And while brokerless software vendors tout latency advantages, modern broker-based architectures like Solace have largely closed this gap through advanced engineering and optimization. Microsecond latencies are achievable with properly configured broker deployments, especially when combined with hardware acceleration for ultra-low latency requirements. Intelligent routing capabilities can actually reduce end-to-end latency in complex topologies by optimizing message paths.

Broker-based solutions like Solace also provide comprehensive observability for operational excellence, enterprise-grade security for regulatory compliance, and continuous innovation backed by diverse market adoption. Their global scalability supports modern trading operations while operational simplicity reduces total cost of ownership. Perhaps most importantly, the broader market presence ensures long-term vendor viability and continued investment in technology advancement.

In an industry where reliability, compliance, and long-term vendor viability are paramount, broker-based architectures represent the mature, strategic choice for capital markets messaging infrastructure. The question isn't whether you can achieve low latency with a brokerless solution, it's whether you can build a sustainable, compliant, and operationally excellent trading platform without the foundational capabilities that only a broker-based architecture can provide.

Modern capital markets require more than just speed; they require a messaging infrastructure that can adapt to changing regulations, scale across global operations, and provide the visibility and control necessary for mission-critical financial operations. In this context, broker-based architectures don't just compete with brokerless solutions, they fundamentally outclass them.

---

*Originally published on the [Solace blog](https://solace.com/blog/broker-based-eda-vs-brokerless-capital-markets/).*