---
author: Thomas Kunnumpurath
title: "Standards Are Not Architecture: Why A2A and MCP Won't Save Your Agents at 3am"
date: 9/12/2026
category: "AI/ML"
headerImage: standards-are-not-architecture-why-a2a-and-mcp-wont-save-your-agents-at-3am.png
layout: blog
---

A2A hit v1.0 this year with signed Agent Cards and over 150 organizations backing it. MCP crossed a hundred million monthly downloads and moved into the Linux Foundation. And last quarter, I walked into a customer whose multi-agent system fell over in production because nothing underneath it guaranteed delivery.

The agents were fine. The models were fine. The protocols were fine. What was missing was everything that happens when nobody's watching.

## The Syntax vs. Semantics Gap

Here's the thing nobody in the standards community wants to say out loud: MCP and A2A solved the *syntax* of agent interoperability. They gave us a common way for agents to discover capabilities and exchange messages. That's genuinely important work, and I don't want to diminish it.

But syntax is the easy part. What these protocols don't give you is audit trails, delivery guarantees, backpressure, replay, lineage, or policy enforcement. They're stateless by design. That's an architectural choice that makes them easy to adopt and impossible to operate at scale without something else underneath.

Independent security scans this year found thousands of MCP servers exposed to the public internet with no authentication whatsoever. That's not a bug in the protocol — it's what inevitably happens when adoption outruns the layer that's supposed to govern it. I've seen this movie before. I watched it at Deutsche Bank with TIBCO Rendezvous, and I watched it again at Capital One with microservices that shipped faster than the observability stack could keep up.

## The 3am Test

When I evaluate whether an agent system is production-ready, I apply one test: can this run at 3am without a human? Not "will the model hallucinate" — that's a solvable problem with guardrails and grounding. The real question is operational.

What happens when Agent B is down and Agent A sends it a critical task? What happens when your compliance team needs to reconstruct exactly which agent made which decision, in what order, with what context, six months ago? What happens when a downstream system can't keep up and you need backpressure rather than dropped messages?

These aren't hypothetical concerns. I spent a week earlier this year testing LangGraph and LangSmith deployment patterns on AWS — BYOC on EKS, Fargate, Bedrock AgentCore — specifically trying to find the point where an agent framework needs an event mesh underneath it. I found it faster than I expected. The moment you have more than two agents that need guaranteed handoffs, the framework starts reinventing message queuing badly. Retry logic scattered across agent code. State management bolted onto the side. No centralized way to observe what's actually flowing between agents.

This is the exact same wall that microservices hit a decade ago, and I watched it from a messaging middleware seat.

## I've Been Here Before

At Deutsche Bank, I led the migration from TIBCO Rendezvous to Solace across a trading backbone processing millions of messages per second. The hardest lesson from that multi-year program wasn't about latency or throughput — it was about what happens when you have a communication layer without operational semantics.

TIBCO RV was a publish-subscribe system. It moved messages from A to B reliably enough. But when regulators came asking for audit trails under MiFID II, when risk teams needed guaranteed ordering across distributed systems, when we needed WAN-optimized replication across data centers with sub-millisecond requirements — we discovered that having a transport protocol is not the same as having an architecture.

The migration to Solace wasn't a vendor swap. It was an architectural upgrade from "messages get delivered" to "messages get delivered with guarantees, observability, dynamic routing, and a topology that reflects how the business actually works." That distinction is exactly what the agent ecosystem is about to learn the hard way.

## What Actually Needs to Sit Beneath the Protocols

I've been leading the Americas SE effort for Solace Agent Mesh through its Early Access, GA, and now third-generation release with native A2A and MCP support. The pattern in what customers actually adopt first surprised me. I expected them to start with the multi-agent orchestration features. Instead, the first thing that gets adopted is the guaranteed delivery and event persistence layer.

That tells you everything. The customers who are actually shipping agents to production — in airlines, banking, manufacturing — aren't starting with fancy orchestration patterns. They're starting with: "I need to know that when Agent A emits an event, it doesn't disappear into the void if Agent B is temporarily offline."

Here's a concrete framework for what needs to exist beneath MCP and A2A:

- **Guaranteed delivery with replay.** Agents fail. Networks partition. If your agent communication is fire-and-forget, your system is a demo, not a product.
- **Dynamic discovery with topic-based routing.** Flat addressing doesn't scale past a handful of agents. You need hierarchical topic structures where agents can subscribe to patterns, not just endpoints.
- **Distributed tracing and lineage.** When the EU AI Act auditor asks you to reconstruct a decision chain, "we'd have to check the logs on each agent" is not an acceptable answer.
- **Backpressure.** The fastest agent in your system will overwhelm the slowest one. Without flow control at the infrastructure layer, you're building in cascading failures.
- **WAN-aware replication.** Sovereign AI requirements mean your agents will run across regions. The infrastructure needs to handle this natively, not through application-level workarounds.

## The Advice You Wouldn't Expect From Me

Here's something you probably don't expect from a VP at the company that sells Solace Agent Mesh: most of you reading this should not be building a multi-agent system yet.

Adopt MCP without hesitation. Wrapping your internal capabilities as MCP servers is the highest-return integration work available right now — it's the API-ification of your tools for AI consumption. That's a no-regrets move.

But adopt A2A, and multi-agent patterns in general, only when you genuinely have agents crossing team, framework, or organizational boundaries. A single-agent product dressed up as a multi-agent system buys complexity without buying capability. I watched this exact mistake play out with microservices in 2016. Teams decomposed monoliths into dozens of services not because they needed independent deployability, but because the conference talks made it sound like the right thing to do. Then they spent two years building the distributed systems infrastructure they hadn't budgeted for.

The agents that will still be running in production a year from now aren't the ones with the most sophisticated orchestration. They're the ones built on infrastructure that passes the 3am test — where delivery is guaranteed, decisions are traceable, and the system degrades gracefully instead of silently dropping work.

Standards gave us a common language. Architecture gives us reliability. Don't confuse the two.