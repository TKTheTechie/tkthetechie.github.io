---
author: Thomas Kunnumpurath
title: "Standards Are Not Architecture: Why A2A and MCP Won't Save Your Agents at 3am"
date: 9/12/2026
category: "AI/ML"
headerImage: standards-are-not-architecture-why-a2a-and-mcp-wont-save-your-agents-at-3am.png
layout: blog
---

A2A hit v1.0 this year with signed Agent Cards and over 150 organizations behind it. MCP crossed a hundred million monthly downloads and landed in the Linux Foundation. And last quarter I walked into a customer — a major airline — whose multi-agent system fell over in production because nothing underneath those protocols guaranteed delivery.

The agents were beautiful. The architecture was not.

## The Syntax-Semantics Gap Nobody Wants to Talk About

Here's the thing about MCP and A2A that their adoption curves obscure: they solved the *syntax* of agent interoperability. MCP gives you a clean way to expose capabilities. A2A gives you a clean way for agents to discover and talk to each other. Both are genuine achievements — eighteen months from one vendor's protocol to a multi-foundation standards stack is remarkable.

But syntax is the easy part. What neither protocol gives you out of the box is an audit trail, delivery guarantees, backpressure, replay, or policy enforcement. They're stateless by design. That's an elegant architectural choice for a specification, and a terrifying operational reality for a production system that processes boarding-gate reassignments at 3am when no human is watching.

Independent security scans this year found thousands of MCP servers exposed to the public internet with no authentication at all. That's not a bug in MCP — it's what happens when adoption outruns the layer meant to govern it.

## I've Seen This Movie Before — It Was Called Microservices in 2016

When I was running the enterprise messaging middleware group at Deutsche Bank, I watched the microservices wave hit financial services. Teams stood up dozens of services with beautiful REST APIs. The contracts were clean. The OpenAPI specs were immaculate. And then reality arrived: network partitions, message loss, retry storms, and the discovery that "eventual consistency" is a phrase that means very different things to a distributed systems engineer and to a regulator asking where a trade went.

The fix, every single time, was the same: put a messaging layer underneath that handled the things HTTP couldn't — guaranteed delivery, ordered processing, dead-letter queues, and replay. The services didn't change. The contracts didn't change. The infrastructure beneath them changed everything.

A2A and MCP are in the same position today that REST APIs were in 2016. They define how agents talk. They don't define what happens when an agent doesn't answer, when a message gets lost, when you need to prove to a regulator that Agent A told Agent B to do something and Agent B actually did it.

## What Breaks First in Production

I spent a week earlier this year testing LangGraph and LangSmith deployment patterns on AWS — BYOC on EKS, Fargate configurations, Bedrock AgentCore — trying to find the exact point where an agent framework needs an event mesh underneath it. I found it faster than I expected.

It's not at scale. It's not at high throughput. It's at the moment you need *guaranteed delivery across an asynchronous boundary*. The instant Agent A fires an action that Agent B must process — not should process, *must* process — and Agent B is temporarily unavailable, restarting, or overloaded, you have a messaging problem. LangGraph handles orchestration beautifully within a single graph. It was not designed to be a durable message bus across organizational boundaries, and it shouldn't be.

The pattern that actually works in the deployments I've seen go to production: MCP for capability exposure, A2A for discovery and cross-boundary communication, and an event mesh beneath both that provides the delivery guarantees, topic-based routing, and replay that the protocols deliberately don't specify.

## The Counterintuitive Advice

Here's something you might not expect from a VP at a company that sells an agent mesh: most of you should adopt MCP immediately and hold off on A2A.

Wrapping your internal capabilities as MCP servers is the highest-return integration work available right now. It's low-risk, high-leverage, and it gives your agents — and your humans — a clean interface to your existing systems. Do it this quarter.

But A2A solves a problem you probably don't have yet: agents crossing team, framework, or organizational boundaries. If all your agents are in the same framework, under the same team's control, talking to the same backend, A2A is ceremony without capability. I watched this exact pattern with microservices — teams decomposing monoliths into twelve services that all shared the same database and deployed together. They bought the complexity of distributed systems without buying the benefits.

Adopt A2A when you genuinely have autonomous agents that need to discover and negotiate with agents you don't control. You'll know when you're there because the coordination problems will be obvious and painful. Until then, a well-structured single-agent system with MCP tools will outperform a multi-agent system every time.

## The Layer That Actually Matters

The EU AI Act went substantially operational in August. I've been through MiFID II and Dodd-Frank at Deutsche Bank, and I can tell you exactly how this plays out: the firms that instrumented for auditability early treated it as an architecture decision and paid once. The firms that bolted it on late treated it as a compliance project and paid for it twice — once to build the audit layer, and again to retrofit every system that should have been publishing events from the start.

An event-driven backbone with distributed tracing is an auditability story before it's a performance story. Every agent action becomes an event. Every event has a timestamp, a source, a destination, and a payload. Every event is replayable. When a regulator asks "what did your agent do and why," the answer isn't a log file search — it's a topic replay.

This is the argument for putting infrastructure beneath your protocols. Not because MCP and A2A are insufficient — they're excellent at what they do. But because what they do is define conversation, not guarantee outcomes. And in production, at 3am, with no human in the loop, guaranteed outcomes are the only thing that matters.

## The Decision Framework

Before you ship your next agent to production, ask three questions:

1. **What happens when the receiving agent is down?** If your answer involves retries at the application layer, you're rebuilding a message broker poorly.
2. **Can you replay the last hour of agent-to-agent communication?** If not, your first production incident will also be your first undebuggable production incident.
3. **Can you prove, to an auditor, the complete chain of actions an agent took?** If this requires stitching together logs from six different systems, you have a compliance gap that will cost you more than the infrastructure to close it.

If any of those answers make you uncomfortable, the problem isn't your agents or your protocols. It's the missing layer beneath them. Standards got us the language. Now we need the infrastructure to make the promises those standards imply.