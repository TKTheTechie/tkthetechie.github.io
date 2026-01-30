---
author: Thomas Kunnumpurath
title: "Beyond the Boardroom: My Hands-On Approach to Architecting Next-Gen Event-Driven AI"
date: 1/30/2026
category: "AI & EDA"
headerImage: beyond-the-boardroom-my-hands-on-approach-to-architecting-next-gen-event-driven-ai.png
layout: blog
---

In today’s rapidly evolving tech landscape, the term “leader” often conjures images of strategic planning, team management, and perhaps a healthy distance from the daily grind of code. But for me, as a Vice President of Systems Engineering, true leadership in the engineering world demands a different approach: one that’s deeply hands-on, rooted in architecture, and constantly pushing the boundaries of what’s possible, especially when it comes to cutting-edge areas like Agentic AI.

My journey, spanning nearly two decades in fintech and systems architecture, has reinforced a core belief: you can’t truly lead an engineering team to build robust, scalable solutions if you’re not willing to get your hands dirty. From the trading floors of Deutsche Bank to the agile microservices environments at Capital One, and now at Solace leading the charge on Agentic AI, this philosophy has been my guiding star. It’s about understanding the nuances of a race condition in Go, appreciating the elegance of a well-designed topic hierarchy, and knowing the true cost of an architectural decision, not just theoretically, but from experience.

## The Unsung Heroes: Event-Driven Foundations for Agentic AI

The buzz around Agentic AI is palpable. We’re talking about AI systems that can reason, plan, and execute complex tasks autonomously, interacting with the world in real-time. But for these agents to truly thrive and deliver on their promise, they need a profoundly reliable, performant, and scalable communication backbone. This is where Event-Driven Architecture (EDA) becomes not just important, but absolutely critical.

Think about it: an agent needs to react to changes, process information, make decisions, and communicate those decisions, often simultaneously and with minimal latency, across a distributed system. EDA, with its decoupled services, asynchronous communication, and real-time event streams, is perfectly suited for this paradigm. It’s the foundational nervous system that allows these intelligent agents to interact, learn, and operate effectively.

This isn't a new revelation for me. My career has been a testament to the power of EDA at scale.

### From Legacy Bottlenecks to Real-Time Agility

When I was at Deutsche Bank, leading the messaging middleware team, we faced immense challenges with our legacy TIBCO Rendezvous infrastructure. It was the backbone of mission-critical real-time trading systems, but its limitations were becoming increasingly clear, impacting latency and driving up Total Cost of Ownership (TCO). The decision to spearhead the firm-wide migration to Solace messaging infrastructure wasn't just about replacing a technology; it was about fundamentally modernizing the bank's trading backbone. We learned, often through late nights and complex migrations, the profound difference that low-latency, high-throughput event brokers with robust topic routing could make. That multi-year initiative wasn't just a technical win; it was a cultural shift towards embracing truly real-time, event-native patterns.

Later, at Capital One, when we moved to GoLang for microservices development, the speed difference was remarkable. We were building a high-performance microservices layer for fintech integrations, and designing scalable, event-driven architectures for identity verification was paramount. The lessons from Deutsche Bank about designing for resilience and scale were invaluable, but now we were applying them in a cloud-native, agile context, leveraging AWS services and Spring Boot for critical financial controls. Piloting an engineering internship program and mentoring junior developers during this time further solidified my belief in hands-on guidance and continuous learning.

## Why Solace is the Event Broker for the AI Era

My journey has shown me that not all event brokers are created equal, especially when you’re pushing the boundaries of real-time systems. For the demands of Agentic AI, where every millisecond counts and the topology of communication can be incredibly dynamic, Solace stands out.

While platforms like Kafka are excellent for high-throughput batch processing and log aggregation, Solace shines in scenarios demanding:

*   **Ultra-Low Latency:** Critical for agents reacting in real-time environments.
*   **Advanced Topic Routing:** Enabling highly granular, content-based routing that allows agents to subscribe only to the events relevant to their specific tasks, without unnecessary overhead.
*   **Event Mesh Capabilities:** Connecting distributed agents and services across heterogeneous environments, clouds, and on-premises deployments seamlessly. This is a game-changer for building truly resilient and globally distributed Agentic AI systems.

At Solace, leading the Solutions Engineering effort for Solace Agent Mesh means I’m at the forefront of defining how these intelligent agents will communicate. It’s not just about selling a product; it’s about architecting the very infrastructure that will enable the next generation of AI to function. My hands-on background—whether it was developing internal middleware management platforms at Deutsche Bank or architecting mission-critical Java Spring Boot services at Capital One—gives me the perspective to understand customer pain points and build solutions that truly work.

## The Hands-On VP in Action

Even as a VP, I refuse to be a leader who only operates at 30,000 feet. My day-to-day involves not just scaling our Systems Engineering organization (we’ve grown 3x in headcount since 2018!), defining GTM strategies, and sponsoring alliances with hyperscalers like AWS and Snowflake, but also deeply engaging with the technical details. This includes:

*   **Architecture Guidance:** Providing hands-on guidance for complex customer deployments and internal product initiatives, ensuring our solutions are robust and future-proof.
*   **Coding Critical Connectors:** I've personally contributed to the delivery of critical connectors for platforms like Databricks, Snowflake, GraphQL, and DAPR. This isn't just about technical output; it's about understanding the friction points our customers face and directly addressing them through engineering. My background is hardcore backend/systems (Java, Go, KDB+), but I currently love building with SvelteKit and Cloudflare (Workers/Pages/R2) for rapid prototyping and demonstrating capabilities.
*   **Technical Evangelism:** Being a featured speaker at events like AWS re:Invent and EDA Summit isn't just about public speaking; it’s about translating deep technical insights into compelling narratives that resonate with developers and architects. It’s about sharing the 'why' behind EDA and the 'how' of leveraging Solace for real-world problems.

At Solace, I learned the importance of interviewing not only for technical capability but culture fit. Scaling a team isn’t just about numbers; it’s about building a collective intelligence that can tackle complex problems, which requires strong technical mentorship and a shared understanding of best practices, like embracing Rust and GoLang for high-performance systems.

## Building for Tomorrow, Today

The advent of Agentic AI represents a monumental shift, and its success will depend heavily on the underlying infrastructure. By coupling a hands-on leadership approach with a deep understanding of Event-Driven Architecture, we can architect systems that are not just theoretically sound, but practically resilient, performant, and scalable enough to power these intelligent agents.

My career has been a continuous journey of learning, adapting, and building. From tackling legacy systems to embracing cloud-native microservices and now pioneering Agentic AI infrastructure, the core principle remains: technology leadership is about guiding, enabling, and, yes, sometimes even coding, your way to the future. The boardrooms define the vision, but it's in the code and the architecture where that vision truly comes to life.