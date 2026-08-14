---
author: Thomas Kunnumpurath
title: "The Architecture Tax Nobody Talks About: Why Your AI Agents Will Fail Without Topic Hierarchies"
date: 8/14/2026
category: "AI/ML"
headerImage: the-architecture-tax-nobody-talks-about-why-your-ai-agents-will-fail-without-topic-hierarchies.png
layout: blog
---

Last month at a customer workshop, an enterprise architect showed me their agentic AI design. Thirty-seven agents, each with clearly defined capabilities, orchestrated through a flat pub/sub layer with topics like `agent-request` and `agent-response`. I asked one question: "How does Agent 12 discover that Agent 29 can validate passport data?" The room went quiet.

This is the architecture tax nobody's talking about in the agentic AI gold rush. Everyone's obsessed with model selection, prompt engineering, and framework wars — LangChain vs. CrewAI vs. AutoGen — while ignoring the connective tissue that determines whether your multi-agent system actually works at enterprise scale. That connective tissue is the topic hierarchy, and its absence is a ticking time bomb in most agentic AI architectures I review.

## Flat Topics Are the New Monolith

Here's the pattern I see repeatedly: teams build agents, give them impressive capabilities, and connect them through a message broker with flat, generic topics. It works beautifully in a demo with four agents. Then they try to deploy it across a real business process — say, airline disruption management involving rebooking, crew scheduling, baggage tracking, customer notification, and loyalty adjustment — and the whole thing collapses into a coordination nightmare.

The problem isn't the agents. It's that flat topic structures create implicit coupling. When every agent publishes to `agent-events` and subscribes to `agent-events`, you've built a distributed monolith. Every agent receives every message and has to decide locally whether it cares. That's not orchestration — that's a shouting match in a crowded room.

I lived through this exact failure mode a decade before AI agents existed. At Deutsche Bank, our early messaging architecture had overly broad topics for trade events. As we scaled to millions of trades per second, the subscription filtering overhead became a material latency problem. The fix wasn't faster hardware — it was rearchitecting to hierarchical topics like `trades/fx/spot/USD/EUR` so that consumers only received what they actually needed. That migration took months and taught me a lesson I carry into every architecture conversation: **your topic taxonomy is your system's nervous system. Get it wrong, and no amount of compute saves you.**

## What a Real Agent Topic Hierarchy Looks Like

This is the approach we've taken with Solace Agent Mesh, and it's informed by patterns I've seen work in high-throughput trading, IoT, and airline operations — not just AI demos.

Consider a hierarchical topic structure for agent communication:

```
solace/agent-mesh/v1/{domain}/{capability}/{action}/{agent-id}
```

A passport validation request becomes:

```
solace/agent-mesh/v1/travel/document-validation/request/booking-agent-01
```

An agent that handles document validation subscribes to:

```
solace/agent-mesh/v1/travel/document-validation/request/*
```

A monitoring system that needs visibility into all travel domain activity subscribes to:

```
solace/agent-mesh/v1/travel/>
```

This isn't just naming convention — it's an architectural decision with cascading consequences. Dynamic topic routing means agents discover each other's capabilities through the topic structure itself. New agents register their capabilities by subscribing to specific topic branches. Orchestrators can route requests without maintaining a static registry. And critically, you get fine-grained access control, observability, and filtering without custom middleware.

## The Discovery Problem Is the Hard Problem

Most agentic AI frameworks treat agent discovery as a configuration problem — you define your agents in a YAML file, wire them together, and deploy. That works when you have five agents built by one team. It disintegrates when you have fifty agents built by eight teams across three business units, which is the actual enterprise reality I see at Solace customers.

The conventional wisdom is to solve this with a central registry service. Register your agent, describe its capabilities, let orchestrators query the registry. I've watched this pattern fail in microservices for years — service registries become single points of failure, stale entries create phantom routing, and the registry itself becomes a political battleground for who owns the canonical capability definitions.

Topic hierarchies solve discovery architecturally rather than infrastructurally. When an agent subscribes to `solace/agent-mesh/v1/finance/fraud-detection/request/*`, it's simultaneously declaring its capability and making itself available. No registry to maintain. No stale entries. The subscription *is* the registration. If the agent goes down, the subscription disappears. If a new agent with the same capability comes online, it subscribes to the same branch and instantly participates in load balancing.

This is exactly how we handled it in trading systems at Deutsche Bank — market data consumers didn't register with a central service to receive EUR/USD spot rates. They subscribed to the right topic. The infrastructure handled discovery, failover, and load distribution. We're applying twenty years of battle-tested messaging patterns to a problem the AI community thinks is new.

## The Actionable Framework

If you're building a multi-agent system and want to avoid the flat-topic trap, here's the decision framework I use:

**1. Design topics before agents.** Map your business domains and capabilities into a topic tree first. If you can't express an agent's role as a clear branch in the hierarchy, your agent boundaries are wrong.

**2. Enforce the hierarchy through subscription ACLs.** An agent that handles fraud detection should not be able to subscribe to customer notification topics. This isn't just security — it's architectural discipline that prevents capability creep.

**3. Use wildcard subscriptions for orchestration, specific subscriptions for execution.** Orchestrators subscribe broadly (`domain/>`), workers subscribe narrowly (`domain/capability/request/*`). This separation of concerns mirrors the difference between management and execution — a pattern that works in organizations and distributed systems alike.

**4. Version your topic structure from day one.** That `/v1/` in the hierarchy isn't optional. You will evolve your agent capabilities. Without versioning in the topic path, you're back to the big-bang migration problem.

## The Bigger Bet

The agentic AI community is currently infatuated with the agents themselves — their reasoning capabilities, their tool use, their ability to chain complex actions. That's understandable. The agents are the exciting part.

But I've spent nearly two decades watching the same movie play out across three technology waves: SOA, microservices, and now AI agents. Every time, teams invest heavily in the compute nodes — the services, the containers, the agents — and underinvest in the communication architecture that connects them. And every time, it's the communication architecture that determines whether the system scales or stalls.

The teams that will win with agentic AI in production aren't the ones with the most sophisticated models. They're the ones who treat the space between agents with the same rigor they bring to the agents themselves. Your topic hierarchy isn't plumbing — it's architecture. And architecture, unlike code, is expensive to change after the fact.