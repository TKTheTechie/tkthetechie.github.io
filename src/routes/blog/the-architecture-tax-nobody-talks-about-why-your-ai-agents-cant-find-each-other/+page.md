---
author: Thomas Kunnumpurath
title: "The Architecture Tax Nobody Talks About: Why Your AI Agents Can't Find Each Other"
date: 8/7/2026
category: "AI/ML"
headerImage: the-architecture-tax-nobody-talks-about-why-your-ai-agents-cant-find-each-other.png
layout: blog
---

Three months ago, I watched a Fortune 500 airline's engineering team demo their shiny new AI agent system. They had a booking agent, a rebooking agent, a loyalty agent, and a flight status agent. Each one worked beautifully in isolation. Then someone asked: "What happens when a flight cancels and a platinum member needs rebooking on a partner airline?"

Silence. Four agents, zero coordination. The rebooking agent didn't know about loyalty status. The loyalty agent didn't know about partner airline availability. The booking agent didn't know a cancellation had even occurred. They'd built four impressive silos and called it agentic AI.

This is the architecture tax nobody talks about — and it's being paid right now by nearly every enterprise experimenting with AI agents.

## The Discovery Problem Is the Whole Problem

Here's the conventional wisdom: building AI agents is hard because the models need to be smart enough, the prompts need to be precise enough, and the tools need to be robust enough. That's not wrong, but it's dramatically incomplete.

The actual hard problem is discovery and coordination. How does Agent A know that Agent B exists? How does it know what Agent B can do? How does it know Agent B's output format, latency characteristics, and failure modes? And critically — how does all of this happen dynamically, without a human hardwiring every possible interaction path?

If you've spent time in the LangChain or CrewAI ecosystem, you've seen the default answer: point-to-point function calls. Agent A calls Agent B directly. This works in demos. It collapses at scale for the same reason point-to-point integrations always collapse at scale — because the number of connections grows quadratically while your ability to manage them grows linearly at best.

I've seen this movie before. I spent nine years at Deutsche Bank watching what happens when mission-critical systems rely on tight coupling. When we ran the firm-wide migration from TIBCO Rendezvous to Solace, the hardest part wasn't the messaging layer itself — it was untangling years of point-to-point dependencies that nobody fully understood anymore. Applications that were supposed to be independent turned out to share implicit contracts through message formats, timing assumptions, and undocumented routing logic.

Agentic AI is recreating this exact anti-pattern, just with HTTP calls and JSON instead of middleware queues.

## What Event-Driven Architecture Actually Solves Here

The fix isn't adding another orchestration layer on top of your agents. It's changing the interaction model from "agents call each other" to "agents publish capabilities and subscribe to needs."

This is the core principle behind what we're building with Solace Agent Mesh, and it's the principle I keep coming back to when I talk with enterprise teams attempting agentic AI at scale. The shift is subtle but fundamental:

**Point-to-point model:** The booking agent must know that the loyalty agent exists at `https://loyalty-service:8080/api/v2/status`, accepts a specific JSON schema, and responds within 200ms.

**Event-driven model:** The booking agent publishes an event on a topic like `customer/loyalty/status/requested/{customerId}`. It doesn't know or care who fulfills it. The loyalty agent subscribes to that topic pattern, processes the request, and publishes a response. If the loyalty agent is replaced, upgraded, or supplemented with a second agent — zero changes to the booking agent.

This is the same dynamic topic routing I've been building systems around for over a decade, but the stakes are higher with AI agents because they're supposed to be autonomous. An autonomous agent that requires hardcoded knowledge of every other agent's endpoint isn't autonomous — it's a distributed monolith with better marketing.

## The Hierarchy That Makes Agents Navigable

At AWS re:Invent a few years ago, I was explaining topic hierarchies to audiences who had never thought about event-driven architecture. Now I'm explaining the same concept to audiences building AI agents, and the reaction is completely different — because they've already felt the pain of not having it.

A well-designed topic hierarchy acts as a self-describing namespace for agent capabilities. Consider:

```
agents/airline/rebooking/request/{flightId}/{priority}
agents/airline/loyalty/status/{customerId}
agents/airline/partner/availability/{route}/{date}
```

An orchestrating agent — or even a peer agent — can discover capabilities by subscribing to wildcard patterns like `agents/airline/>/request/>`. New agents become discoverable the moment they start publishing. Dead agents stop appearing. No service registry to maintain. No configuration files to update. No deployment dependencies between teams.

This is not theoretical. This is how we're deploying Solace Agent Mesh in production across airlines and manufacturing right now, and it's the architectural insight that separates demos from systems.

## The Lesson From Running AI Locally

I run a stock screening system on my MacBook using open-source models — what I call OpenClaw. One thing it taught me is that the gap between "AI works" and "AI works reliably in a system" is enormous. My local models occasionally hallucinate stock tickers. They sometimes return malformed JSON. They have variable latency depending on what else my machine is doing.

Now multiply that unreliability across four, ten, fifty agents in a production enterprise system, all calling each other directly. A single slow or malformed response cascades through the entire chain.

Event-driven architecture gives you the circuit breakers for free. Asynchronous communication means a slow agent doesn't block the caller. Topic-based routing means you can run two versions of an agent simultaneously — canary deployments for AI. Message persistence means that if an agent crashes mid-processing, the request isn't lost.

These aren't new patterns. They're the same patterns I used to keep trading systems alive at Deutsche Bank. But they're newly urgent because AI agents are uniquely unreliable compared to traditional microservices. A REST API either returns a 200 or it doesn't. An AI agent might return a 200 with confidently wrong data. Your architecture needs to account for that.

## What to Actually Do About This

If you're building multi-agent AI systems, here's the decision framework I use with every enterprise customer:

1. **Count your agent-to-agent connections.** If you have N agents with point-to-point calls, you potentially have N×(N-1) connections to manage. If that number is above 12, you need an event-driven backbone. You're already past the complexity threshold.

2. **Design your topic taxonomy before you design your agents.** The topic hierarchy is your system's API contract. Get it wrong early and you'll be refactoring under pressure later. Spend the upfront hours.

3. **Make agent discovery dynamic, not configured.** If adding a new agent requires updating configuration in existing agents, you've built a distributed monolith. Test this: can a new agent join the system and start contributing without any existing agent being redeployed?

4. **Assume every agent response might be wrong.** Build validation, fallback, and retry logic into the messaging layer, not into each individual agent. This is where event brokers with built-in dead-letter queues and replay capabilities earn their keep.

## The Bigger Shift

The AI industry is spending billions on making individual models smarter. That matters. But the enterprises I work with aren't failing because GPT-4 isn't smart enough. They're failing because ten smart agents with no coordination architecture produce chaos, not intelligence.

The irony is that we solved this problem in distributed systems twenty years ago. The principles of loose coupling, publish-subscribe, and dynamic discovery aren't new. What's new is that an entire generation of AI engineers is learning them the hard way — by building tightly coupled agent systems that work in demos and shatter in production.

The architecture tax is real. But unlike technical debt, which you can defer, this one comes due the moment your second agent needs to talk to your first.