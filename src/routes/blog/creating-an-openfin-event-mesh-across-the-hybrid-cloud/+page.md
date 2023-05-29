---
author: TKTheTechie
title: Creating an OpenFin Event Mesh Across the Hybrid Cloud
date: 05/02/2019
category: Dev
headerImage: openfin-event-mesh-blog.png
---


In financial services, there is an old adage “the trend is your friend.” These days, the trend in every financial services firm is from the datacenter to the cloud. A [recent survey](https://www.thomsonreuters.com/en/press-releases/2018/july/financial-firms-accelerate-their-move-to-the-cloud.html) by Thomson Reuters found that while cloud spend was 30% of financial firms’ IT budgets in 2017, it was expected to reach 47% by this year (2019).

At most financial firms, OpenFin applications need to exchange data with a mix of services that include traditional datacenter resources, newer workloads deployed in the cloud, SaaS services, and a collection of other 3rd-party services. Let’s look at how the back-end landscape is changing:

*   **Datacenter applications.** There are a few core applications like order routing and compliance that may never leave the datacenter, but most other applications are ripe for migration to the cloud. This could be via “lift and shift” using virtualization or containers, or a next-gen legacy replacement initiative that leverages powerful new cloud engines like machine learning or streaming analytics. In some cases datacenter applications are becoming hybrid with some of the workloads in the cloud and the rest staying in the datacenter.![A diagram showing how the back-end landscape is changing between public clouds and datacenters.](../images/blog/openfin-blogpost-1-image-1.png)
*   **SaaS solutions.** The FinTech revolution is bringing to market new managed services that can replace traditional in-house applications at lower cost. Examples include fraud detection, data lineage (as part of compliance) and risk management.
*   **3rd-party services.** The days of acquiring 3rd-party services over special VPNs or leased lines are coming to an end. When Bloomberg ([B-PIPE](https://www.bloomberg.com/company/announcements/bloomberg-makes-real-time-data-available-cloud/)) and Thomson Reuters ([Refinitiv’s Elektron](https://www.refinitiv.com/en/products/elektron-enterprise-data-management)) have a cloud-first strategy, you know it’s officially a trend. OpenFin’s rapidly growing app directory is filled with 3rd-party cloud services.

## Achieving Service Location Transparency


As you plan for OpenFin connectivity amidst ongoing services migration, it becomes essential to have a strategy to abstract service location out of app and service interactions. This is equally true for your OpenFin applications interacting with remote services and for the interplay between the services themselves.

This is one of the many benefits of a messaging infrastructure, particularly one that can span both the datacenter and public clouds. A messaging infrastructure lets you declare which systems produce and consume which events, and uses queue or topic names to route the data. In this way, a back-end service can move from the datacenter to the cloud and the broker will dynamically re-route traffic with no changes to any OpenFin apps or other services. The same technique is used for disaster recovery and business continuity; if your primary cloud fails, traffic from your OpenFin apps can be instantly routed to an alternate public or private cloud.

## OpenFin Service Integration

The quickest way to get started is to use a multi-protocol broker solely to gateway your OpenFin applications to services across the hybrid cloud. The traffic flow looks like this.

[![A diagram showing how a multi-protocol broker acts as a gateway (between public cloud, datacenters and the front office) for OpenFin applications to reach other services across the hybrid cloud.](../images/blog/openfin-blogpost-1-image-2.png)](../images/blog/openfin-blogpost-1-image-2.png)

As outlined in the white paper [A Guide to Connectivity for OpenFin Architects and Developers,](https://try.solace.com/wp-download-openfin-guide-to-connectivity/) Solace lets OpenFin applications use native web technology and still reach all your cloud, web and legacy services through its unique multi-protocol approach.

[![OpenFin-Connectivity](../images/blog/OpenFin-Micro-campaign-Email-Header-Images-300x150.png)](https://try.solace.com/wp-download-openfin-guide-to-connectivity/)

## Global Event Mesh

Many of our customers also need the same capabilities within individual clouds or datacenters, more like this:

[![A diagram showing how PubSub+ works within clouds and datacenters (in the context of OpenFin applications)](../images/blog/openfin-blogpost-1-image-3.png)](../images/blog/openfin-blogpost-1-image-3.png)

For example, in the diagram above, the left-most applications can use the broker deployed in AWS to manage that cloud’s events _and_ route data to the front office, datacenter, or other clouds. Any application anywhere in the hybrid cloud environment can subscribe to any set of events, and the brokers will dynamically coordinate what is needed where while switching protocols during data delivery as necessary.

## Managed Public Cloud Event Mesh

There’s even a managed service offering if you don’t want to manage the cloud infrastructure yourself. You can pay as you go, and Solace will assure uptime and capacity as needed. A single console will let you see all inter-service activity so you always have a complete picture of your data flow.

[![A diagram showing how PubSub+ Cloud works with OpenFin applications and between public cloud and datacenters.](../images/blog/openfin-blogpost-1-image-4.png)](../images/blog/openfin-blogpost-1-image-4.png)

## Which is Right for You?

Whether you’re looking to rationalize service access just for OpenFin or want to transform your entire enterprise, Solace PubSub+ can simplify how your data flows and provide maximum flexibility as you shift workloads to the cloud over time. If you’d like to learn more about Solace PubSub+, PubSub+ Cloud, or a Solace-enabled event mesh, [contact us today](https://dev.to/contact/).

The post [Creating an OpenFin Event Mesh Across the Hybrid Cloud](https://solace.com/blog/openfin-event-mesh-hybrid-cloud/) appeared first on [Solace](https://solace.com/).

