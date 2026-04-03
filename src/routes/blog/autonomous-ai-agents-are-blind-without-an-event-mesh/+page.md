---
author: Thomas Kunnumpurath
title: "Autonomous AI Agents Are Blind Without an Event Mesh"
date: 4/3/2026
category: "AI/ML"
headerImage: autonomous-ai-agents-are-blind-without-an-event-mesh.png
layout: blog
---

Five years ago, standing on stage at AWS re:Invent, I was still explaining to architects why they needed a topic hierarchy for their event-driven systems. Last year, the conversation had completely transformed. Now, I’m explaining to that same audience why agentic AI, the promise of truly autonomous software, simply collapses without a robust event-driven architecture — an event mesh. It’s a shift from 'what is EDA?' to 'EDA is a prerequisite for your future.' And let me tell you, that's a conviction I've earned, not just evangelized.

## The Missing Nervous System for AI Agents

The hype around agentic AI is intoxicating. We hear about LLMs as the 'brain,' the reasoning engine, the core intelligence. But what about the 'nervous system' that allows these brains to perceive their environment, coordinate with other agents, and act in real-time? That’s the piece that's consistently overlooked, and it’s a critical oversight. Without it, your sophisticated AI agents are flying blind, acting on stale data, operating in silos, and fundamentally failing to achieve true autonomy.

At Solace, I’m leading the Americas Solutions Engineering effort for Solace Agent Mesh. This isn't just a product; it’s a living laboratory for how AI agents discover capabilities, coordinate their actions, and deliver measurable business outcomes at enterprise scale. What we’re seeing, time and again, is that the intelligence of the agent — its LLM, its reasoning — is only as good as its perception of the world. And in a dynamic enterprise, that perception *must* come from a real-time stream of events.

## Lessons from High-Frequency Trading

Think back to my days at Deutsche Bank, when we spearheaded the firm-wide migration from TIBCO Rendezvous to Solace. We were dealing with a system processing millions of trades per second, where sub-millisecond latency was the difference between profit and loss, or even regulatory compliance. If a trading agent were making decisions based on data that was even a few seconds old, it would be catastrophic. The event-driven backbone wasn't a nice-to-have; it was existential. Today's agentic AI, particularly in mission-critical scenarios like banking, supply chain, or manufacturing, faces the exact same reality. Agents need to know *now* that a supply chain bottleneck has emerged, *now* that a trade has executed, *now* that a sensor has flagged an anomaly. Batch processing or polling for status updates simply doesn't cut it for true autonomy.

The problem with conventional architectures, often built on request-response APIs, is that they’re fundamentally passive. An agent has to *ask* for information. It has to know *who* to ask and *when* to ask. This creates tight coupling, introduces latency, and scales poorly in complex, multi-agent environments. Imagine a fleet of autonomous agents trying to coordinate a manufacturing process, each constantly polling a central database or making point-to-point API calls. It’s a recipe for gridlock and inconsistency.

An event mesh, on the other hand, provides an active, pervasive nervous system. Events are published when something significant happens – a sensor reading, a customer order, a system alert. Agents don't have to ask; they simply *subscribe* to the topics relevant to their mission. This decouples agents from each other and from the source of the data, allowing them to perceive changes in their environment in real-time, autonomously.

## Building Perception in a Day with AI (ESP32 + Claude Code)

Let me give you a more concrete example, one where I literally built the nervous system in a day. A client was skeptical about Solace’s IoT and real-time streaming capabilities. Rather than show slides, I picked up an ESP32 Arduino camera module. With Claude Code as my co-pilot, I built a complete working demo in a single day: the ESP32 captured live video frames, published each frame as a message over Solace’s event broker, and a real-time web dashboard rendered the stream. Here, the ESP32 acts like a simple ‘perceiving agent.’ It doesn't *ask* for the world; it *observes* the world (captures a frame) and *publishes* that observation as an event. The web dashboard 'agent' *subscribes* to these events to render its view. What would have taken me a week of hardware research, protocol work, and web development was compressed to one focused day of AI-assisted building. Claude Code didn't replace my engineering knowledge – it eliminated the friction between having an idea and proving it works. But the underlying conviction remained: real-time perception requires an event broker.

## The Event Broker as AI's Blackboard

This pattern extends directly to complex agentic AI. Consider the "blackboard pattern" in AI architectures, where agents collaborate by writing to and reading from a shared, dynamic knowledge space. An event broker, specifically an event mesh, is the ideal implementation of this blackboard. Agents publish their findings or actions as events (writing to the blackboard), and other agents subscribe to relevant event topics to react or integrate that knowledge (reading from the blackboard). This facilitates dynamic coordination without point-to-point dependencies.

## Building an Event-Powered Nervous System for Your Agents

So, when you're designing your next agentic AI system, don't just think about the LLM's intelligence. Think about its sensory organs and its communication channels. Here's my framework for ensuring your autonomous agents aren’t operating in the dark:

1.  **Prioritize Perception:** How do your agents *know* what's happening in the world? Insist on real-time event streams for critical sensory input. Polling is a last resort, not a default.
2.  **Enable Action and Announcement:** How do your agents *tell* the world (and other agents) what they've done or decided? Every significant agent action should trigger an event publication. This isn’t just for coordination; it’s for auditability and observability.
3.  **Facilitate Dynamic Discovery:** How do agents *find* the capabilities they need? An event mesh, with its rich topic hierarchies and potential for schema registries, acts as a dynamic capability catalog. Agents don't need hardcoded service endpoints; they discover services by subscribing to relevant event topics or querying a dynamic capability registry.
4.  **Embrace Loose Coupling:** Agents should interact primarily through events, not direct API calls. This creates a resilient, scalable system where agents can be added, removed, or updated without cascading failures.
5.  **Design the Nervous System First:** Before you even pick your LLM, map out the event flows. What events trigger what agents? What events do agents publish? This architectural decision will have a far greater impact on the system's autonomy and scalability than the specific AI model you choose.

## The Future of Autonomous Systems

The future of enterprise automation isn't about monolithic AI brains. It's about a swarm of specialized, context-aware, and—critically—event-coordinated agents working in concert. To truly unlock their potential, we must provide them with the sophisticated nervous system they deserve: a robust, real-time event mesh. Otherwise, your autonomous agents might be intelligent, but they'll be operating in the dark, forever chasing shadows of reality.