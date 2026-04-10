---
author: Thomas Kunnumpurath
title: "The Architecture Tax Nobody Talks About: Why Your AI Agents Can't Find Each Other"
date: 4/10/2026
category: "AI/ML"
headerImage: the-architecture-tax-nobody-talks-about-why-your-ai-agents-cant-find-each-other.png
layout: blog
---

Last month, I watched a Fortune 500 airline's innovation team demo their shiny new AI agent system. They had a booking agent, a loyalty agent, a rebooking agent, and a customer sentiment agent. Each one worked beautifully in isolation. Then someone asked: "What happens when a flight cancels and all four need to coordinate in real time?"

Silence. Then: "We're still working on that part."

That part — the coordination, the discovery, the orchestration — isn't a feature you bolt on later. It's the entire architecture. And most teams building agentic AI systems are paying an invisible tax because they skipped it.

## The Point-to-Point Trap

Here's the pattern I see repeated across almost every early agentic AI deployment: teams build agents, then hardwire them together. Agent A calls Agent B's REST endpoint. Agent B calls Agent C. Someone writes a coordinator service that knows about all the agents and routes requests between them. It works in the demo. It even works in staging.

Then the fourth agent shows up. Then the tenth. Then someone needs to swap out the sentiment model without breaking the rebooking flow. Suddenly you're maintaining a hand-rolled service mesh for AI, and every new agent multiplies your integration surface.

This is the same mistake we made with microservices circa 2015. At Capital One, I watched teams build dozens of GoLang and Spring Boot microservices that each called each other directly. The performance was great. The operational complexity was not. Every new service meant updating five other services' configurations. We'd solved the monolith problem and created a distributed monolith instead.

Agentic AI is repeating this history, except faster and with higher stakes — because AI agents are nondeterministic. When a traditional microservice fails, it fails consistently. When an AI agent produces unexpected output, every downstream agent that hardcoded assumptions about that output breaks in creative and unpredictable ways.

## What Discovery Actually Means at Scale

The missing piece isn't just message routing — it's dynamic capability discovery. An agent shouldn't need to know which other agent handles rebooking. It should express an intent ("I need to rebook passenger X on the next available flight") and the architecture should resolve that to the right capability, right now, even if the agent providing that capability was deployed five minutes ago.

This is what we're building with Solace Agent Mesh, and it's why I believe event-driven architecture isn't just compatible with agentic AI — it's prerequisite infrastructure.

Here's the concrete difference. In a point-to-point system:

```
# Booking agent hardcodes knowledge of rebooking agent
response = requests.post("http://rebooking-agent:8080/rebook", json=payload)
```

In an event-driven agent mesh:

```
# Booking agent publishes intent to a topic hierarchy
await broker.publish("airline/ops/rebooking/request/v1", {
  passenger_id: "ABC123",
  constraint: "next_available",
  priority: "high"
})
# The mesh resolves which agent (or agents) handle this capability
# The booking agent doesn't know or care
```

The topic hierarchy — something I was explaining at AWS re:Invent five years ago as a basic EDA concept — turns out to be the natural addressing scheme for agent capabilities. Dynamic topic subscriptions let agents register and deregister capabilities at runtime. The broker handles fan-out, filtering, and guaranteed delivery. No coordinator service. No hardwired endpoints. No distributed monolith.

## The Lesson from Trading Floors

I spent nine years at Deutsche Bank running the messaging middleware that connected real-time trading systems — equities, FX, fixed income — all publishing and consuming millions of messages per second. The reason that infrastructure worked wasn't because we had the fastest broker (though sub-millisecond latency mattered). It worked because no trading application needed to know the address of any other trading application.

A pricing engine published to `trading/fx/eurusd/price`. Any system that needed EUR/USD prices subscribed to that topic. When we migrated from TIBCO Rendezvous to Solace — a multi-year program I led — we could swap out entire subsystems without the publishers or subscribers knowing. The architecture was decoupled not just technically but organizationally: the equities team and the FX team could deploy independently.

Agentic AI needs exactly this property. When your sentiment analysis agent gets upgraded from GPT-4 to a fine-tuned model, the agents consuming sentiment scores shouldn't require a redeployment. When you add a new rebooking agent optimized for international routes, it should subscribe to the relevant topics and start handling traffic. Zero coordination overhead.

## The Practical Framework

If you're building or evaluating an agentic AI system, here's the decision heuristic I use:

**Ask: "What happens when I add the eleventh agent?"**

If the answer involves updating configuration in more than one existing agent, you've built a distributed monolith. Start over with your integration layer.

**Ask: "Can I replace any single agent without notifying other agents?"**

If no, you've hardcoded capability resolution. You need dynamic discovery — whether through an event mesh, a service registry, or both.

**Ask: "What happens when an agent produces unexpected output?"**

If the answer is "the next agent in the chain crashes," you need schema evolution and dead-letter handling at the infrastructure level, not in application code.

These aren't theoretical concerns. In the airline scenario I opened with, the team eventually realized they needed to rebuild their integration layer before they could go to production. Two months of agent development became dependent on an infrastructure decision they'd deferred.

## The Bigger Shift

The industry is spending enormous energy on making individual AI agents smarter — better models, better prompts, better RAG pipelines. That work matters. But the bottleneck for enterprise agentic AI isn't agent intelligence. It's agent coordination.

Every complex system in history — trading floors, airline operations, supply chains, the internet itself — eventually converged on the same pattern: decoupled producers, decoupled consumers, and a smart fabric in between. Agentic AI won't be the exception.

The teams that figure this out early will ship multi-agent systems that scale. The teams that don't will keep demoing impressive individual agents that can't work together when the flight cancels and four systems need to respond in the same second.

I know which architecture I'd bet on. I've been running it in production since 2008.