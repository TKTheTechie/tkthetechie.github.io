---
author: Thomas Kunnumpurath
title: "Standards Are Not Architecture: Why A2A and MCP Won't Save Your Agents at 3am"
date: 9/11/2026
category: "AI/ML"
headerImage: standards-are-not-architecture-why-a2a-and-mcp-wont-save-your-agents-at-3am.png
layout: blog
---

A2A hit v1.0 this year with signed Agent Cards and over 150 organizations behind it. MCP crossed a hundred million monthly downloads and landed in the Linux Foundation. And I still walked into a customer meeting this quarter — a major airline, agents coordinating crew scheduling and gate assignments — whose multi-agent system fell over in production because nothing underneath it guaranteed delivery.

The agents were fine. The models were fine. The protocols were fine. The problem was that nobody had asked what happens when Agent B is offline for ninety seconds while Agent A is still emitting events that determine whether a flight gets a gate crew.

The answer, it turned out, was data loss. Silent, unrecoverable data loss.

## The Syntax-Semantics Gap

MCP and A2A solved the syntax of agent interoperability. That's not a small thing — eighteen months ago we didn't even have a common way for agents to discover each other's capabilities, and now we have signed Agent Cards and a standardized tool-serving protocol that works across frameworks. Real progress.

But here's what the protocol specs don't give you: audit trails. Delivery guarantees. Backpressure when a downstream agent can't keep up. Replay when something fails at 3am and no human is watching. Policy enforcement that determines which agents can talk to which other agents about which topics.

These aren't edge cases. These are the exact requirements that separate a demo from a deployment, and I've watched this movie before.

When I ran enterprise messaging middleware at Deutsche Bank, we supported trading systems processing millions of messages per second. The protocols were never the hard part. TIBCO Rendezvous had a perfectly functional wire protocol. The hard part was everything around the protocol: guaranteed ordering across a WAN, topic-level access control, disaster recovery with zero message loss, and the operational tooling that let you diagnose at 2am why a specific message didn't reach a specific consumer in Tokyo.

Agent-to-agent communication in 2026 has the same gap. MCP and A2A define how agents talk. They don't define what happens when the conversation breaks.

## What I Found Testing LangGraph on AWS

I spent a week this year deploying LangGraph and LangSmith across several AWS patterns — BYOC, EKS, Fargate, Bedrock AgentCore — specifically looking for the point where an agent orchestration framework needs an event mesh underneath it. I expected it to take a while to find the cracks. It didn't.

The moment you have more than three agents with different lifecycle requirements — one agent that needs to restart without losing state, another that needs to scale horizontally under load, a third owned by a different team with its own deployment cadence — the orchestration framework starts creaking. LangGraph is excellent at defining agent graphs. It was not designed to be a message broker, a delivery guarantee layer, or a WAN-aware routing fabric. Why would it be? That's not its job.

This is the same wall microservices hit around 2015. The framework (Spring Boot, Express, whatever) handled the application logic. But the moment you had fifty services that needed to communicate reliably across failure domains, you needed middleware. Not because the framework was bad, but because reliable distributed communication is a different problem than application orchestration.

With Solace Agent Mesh — now in its third generation with native A2A and MCP support and a Universal A2A Agent Host built on Google's ADK — I've watched customers adopt it for exactly this reason. Not because their agent framework doesn't work, but because their agent framework works right up until the moment an agent goes down and the framework has no opinion about what happens to the messages that were in flight.

## The Advice You Wouldn't Expect From Me

Here's the part where I'm supposed to tell you to build a full multi-agent mesh right now. I'm not going to do that.

The emerging consensus among people actually shipping — and I count myself in that group after a year of Solace Agent Mesh deployments across airlines, banking, manufacturing, and IoT — is this: adopt MCP aggressively. Wrapping your internal capabilities as MCP servers is the highest-return integration work available to most teams right now. It's straightforward, the ecosystem is mature, and you get immediate value.

But adopt A2A and multi-agent orchestration only when you genuinely have agents crossing team, framework, or organizational boundaries. If your "multi-agent system" is three agents built by one team in one framework deployed in one region, you have a single-agent system wearing a trench coat. You're buying complexity without buying capability.

I watched this exact pattern with microservices in 2016 from a middleware seat. Teams decomposed monoliths into fifty services because the conference slides said to, then spent two years building the operational infrastructure that a monolith gave them for free. The teams that won were the ones that decomposed along genuine organizational boundaries — different teams, different deployment cadences, different failure domains — and kept everything else simple.

## The Three-Question Test

Before you add an event mesh beneath your agents, ask three questions:

**1. What happens when an agent is unavailable for two minutes?** If the answer is "we lose messages and someone manually replays them," you need guaranteed delivery and you need it now. This is non-negotiable for any regulated industry — I've been through MiFID II and Dodd-Frank, and the regulators will eventually ask for the audit trail you didn't build.

**2. Do your agents cross trust or team boundaries?** If Agent A is built by your crew scheduling team and Agent B is built by your gate operations team, you need discovery, access control, and a topic namespace that both teams can reason about independently. A flat topic space will fail you here the same way Kafka's flat topic namespace fails at enterprise scale.

**3. Does your agent need the last fifty milliseconds of reality?** An LLM with stale context is a liability. If your agent is making operational decisions — adjusting prices, routing aircraft, managing risk — the interesting engineering question isn't which model to use. It's how that agent gets current state. That's a messaging problem.

If you answered yes to any of these, the protocol layer alone won't save you. You need the operational layer beneath it: delivery guarantees, dynamic topic routing, WAN-aware replication, and the ability to replay any event for any agent at any time.

## The Infrastructure Layer That Agents Will Demand

The industry is going to learn what capital markets learned twenty years ago and what microservices learned ten years ago: the hardest part of distributed systems isn't the application logic or the communication protocol. It's the guarantees around the communication. What happens when things break. What happens when nobody's watching. What you can prove happened after the fact.

Standards like MCP and A2A are necessary. They're not sufficient. The agents that actually run in production at 3am — the ones that handle crew scheduling disruptions, real-time risk calculations, manufacturing line adjustments — will be the ones with an infrastructure layer that treats message delivery as a guarantee, not a hope.

That's not a Solace pitch. That's a lesson I learned the expensive way, at two in the morning, watching a trading system lose messages because someone assumed the protocol was the architecture.