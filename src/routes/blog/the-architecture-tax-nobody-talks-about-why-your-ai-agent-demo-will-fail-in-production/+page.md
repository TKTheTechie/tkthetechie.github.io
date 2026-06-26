---
author: Thomas Kunnumpurath
title: "The Architecture Tax Nobody Talks About: Why Your AI Agent Demo Will Fail in Production"
date: 6/26/2026
category: "AI/ML"
headerImage: the-architecture-tax-nobody-talks-about-why-your-ai-agent-demo-will-fail-in-production.png
layout: blog
---

Last month, a Fortune 500 airline showed me their shiny new AI agent demo. It could rebook flights, check loyalty status, and even apologize in three languages. Impressive. Then I asked one question: "What happens when two agents try to rebook the same passenger on the last available seat?"

Silence.

This is the architecture tax nobody's paying upfront. Every enterprise I work with right now is sprinting to build agentic AI — and almost every one of them is building on a foundation that will collapse the moment they move from demo to production. I've seen this pattern before. It looks exactly like what happened with microservices in 2016, and before that, with SOA in 2008. The technology works. The architecture underneath it doesn't.

## The Request-Response Trap

Here's the conventional wisdom: AI agents communicate via API calls. Agent A calls Agent B's REST endpoint, gets a response, moves on. Simple. Clean. Works great in a Jupyter notebook.

Now scale it. You have forty agents across six departments — rebooking, loyalty, baggage, crew scheduling, gate management, and customer communication. Agent A needs to tell fifteen other agents that Flight 2847 just cancelled. In a request-response world, that's fifteen synchronous API calls, each one a potential point of failure. If the crew scheduling agent is slow — and trust me, crew scheduling systems at airlines are always slow — every downstream agent blocks.

I spent nine years at Deutsche Bank watching this exact pattern play out with trading systems. We had services that needed to fan out market data updates to hundreds of consumers. When we tried to do it with point-to-point messaging, we built a distributed monolith — technically decoupled, operationally coupled in every way that mattered. A single slow consumer could back-pressure the entire chain.

The fix wasn't better APIs. It was fundamentally rethinking how services communicated. We moved to publish-subscribe. And that migration — from TIBCO Rendezvous to Solace — taught me something I now see the AI agent world learning the hard way: **the communication pattern between your components matters more than the components themselves.**

## Why Agentic AI Is an Event-Driven Problem

AI agents aren't microservices with better prompts. They're autonomous actors that need to discover capabilities, react to events they didn't anticipate, and coordinate without tight coupling. That's not a request-response pattern. That's event-driven architecture.

At Solace, I lead the Americas SE effort for Agent Mesh, our agentic AI orchestration platform. The core insight behind it isn't complicated: agents should communicate through events on a topic hierarchy, not through hardcoded API calls. When Flight 2847 cancels, a single event publishes to `airline/operations/flight/2847/cancelled`. Every agent that cares — rebooking, loyalty, baggage, crew, comms — subscribes to the topics relevant to its domain. No fan-out logic. No orchestrator bottleneck. No distributed monolith.

But here's the part that most EDA evangelists skip: **topic design is the new schema design**, and it's brutally hard to get right. A flat topic like `flight/cancelled` seems clean until you need agents to subscribe only to cancellations at specific hubs, or only for flights with connecting passengers, or only during irregular operations. The topic hierarchy — `airline/operations/{hub}/{flightNumber}/{eventType}` — becomes the contract between agents. Get it wrong, and you've just recreated the coupling problem with different syntax.

I watched this at AWS re:Invent last year. Five years ago, I was on stage explaining what a topic hierarchy even was. Now I'm explaining why agentic AI collapses without one. The audience shifted from skeptical to desperate.

## The Coordination Problem Nobody Demos

Back to the two-agents-one-seat problem. This is a concurrency and coordination challenge, and it's where most agent frameworks silently punt.

In production agentic systems, you need three things that don't exist in most demo architectures:

1. **Guaranteed ordering** — When Agent A and Agent B both react to the same cancellation event, the rebooking agent must process seat claims in the order they arrived. Kafka gives you this per partition, but now you're managing partition keys and rebalancing. Solace gives you this with exclusive queues and topic-to-queue mappings — no partition math required.

2. **Event replay** — When a new agent comes online (say, a newly deployed "proactive upgrade" agent), it needs to catch up on recent state. If your events are fire-and-forget, that agent starts blind.

3. **Dead letter handling** — When an agent fails to process an event — bad prompt, hallucinated action, timeout — that event can't just vanish. In trading systems at Deutsche Bank, a dropped message could mean a phantom position worth millions. In airline operations, it means a passenger stranded at O'Hare with no hotel voucher.

These aren't edge cases. They're Tuesday.

## A Decision Framework for Agent Communication

If you're building an agentic system right now, here's the framework I use with every enterprise customer:

**Use request-response (REST/gRPC) when:**
- One agent needs a synchronous answer from exactly one other agent
- The interaction is stateless and idempotent
- Failure means "retry the same call"

**Use event-driven (pub/sub) when:**
- One event needs to reach multiple agents
- Agents need to react to things they weren't explicitly designed for
- You need ordering, replay, or guaranteed delivery
- The system must evolve without redeploying the orchestrator

**Use both when:**
- You're building anything real. Seriously. The answer is almost always both, with clear boundaries.

The mistake I see most often is teams starting with request-response because it's familiar, planning to "add events later." This is like building a house on a slab and planning to "add a basement later." The communication pattern is the foundation. Choose it first.

## The Uncomfortable Truth

The agentic AI hype cycle is moving faster than the architectural maturity of the teams building on it. I've sat in rooms with engineering leaders who can explain transformer attention mechanisms in detail but can't answer "what happens when your agent's downstream dependency is unavailable for thirty seconds?"

This isn't a criticism — it's a pattern I've lived through. At Capital One, we built GoLang microservices that were technically elegant and operationally fragile until we invested in the messaging layer. At Deutsche Bank, we ran trading systems through a multi-year messaging migration because the original architecture couldn't scale. The technology was never the bottleneck. The communication pattern was.

Agentic AI will be transformative. I believe that — I'm building on it every day, from enterprise deployments across airlines and manufacturing to personal projects where I use Claude Code to prototype agent interactions in an afternoon. But the teams that win won't be the ones with the best models or the cleverest prompts. They'll be the ones who got the architecture right underneath.

The demo is easy. The architecture tax comes due in production.