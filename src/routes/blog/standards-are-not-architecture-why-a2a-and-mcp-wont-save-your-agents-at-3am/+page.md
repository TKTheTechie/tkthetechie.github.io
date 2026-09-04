---
author: Thomas Kunnumpurath
title: "Standards Are Not Architecture: Why A2A and MCP Won't Save Your Agents at 3am"
date: 9/4/2026
category: "AI/ML"
headerImage: standards-are-not-architecture-why-a2a-and-mcp-wont-save-your-agents-at-3am.png
layout: blog
---

A2A hit v1.0 this year. MCP crossed a hundred million monthly downloads and moved into the Linux Foundation. And last quarter, I walked into a customer's war room where their multi-agent system had fallen over at 2am because one agent published a task completion event and nothing underneath guaranteed the three downstream agents actually received it.

The postmortem was painful to watch — not because the team was incompetent, but because they'd done everything the ecosystem told them to do. They adopted MCP for tool integration. They used A2A for cross-agent communication. They had signed Agent Cards. They had clean schemas. And none of it mattered, because standards solved the syntax of agent interoperability while leaving the semantics and the operations completely unaddressed.

I've seen this movie before. I watched it in 2008 at Deutsche Bank, and again in 2016 from a middleware seat. The plot is always the same: the industry standardizes the interface, declares victory, and then spends the next five years learning that the hard problems were never about the interface.

## The Gap Between Protocol and Production

Here's what MCP and A2A actually give you: a common way for agents to discover each other's capabilities and exchange structured requests. That's genuinely valuable. Wrapping internal capabilities as MCP servers is probably the highest-return integration work most teams can do right now.

But here's what they don't give you: delivery guarantees, message ordering, backpressure, replay, audit trails, lineage tracking, or policy enforcement. MCP and A2A are stateless protocols. They assume the transport layer beneath them handles reliability. And in most deployments I've seen this year, that transport layer is... HTTP. Sometimes with retries. Sometimes without.

Independent security scans in 2026 found thousands of MCP servers exposed to the public internet with no authentication. That's not a protocol failure — it's what happens when adoption outruns the layer that's supposed to govern it. The protocol designers didn't ignore security; they assumed someone else would handle it. The same assumption is being made about delivery guarantees, and it will bite harder.

## What Microservices Already Taught Us

In 2016, I was running enterprise messaging middleware at Deutsche Bank when the microservices wave hit. The pattern was identical: teams adopted REST as the interface standard, declared their services decoupled, and then discovered that synchronous HTTP calls between thirty microservices created a distributed monolith that was harder to debug than the monolith it replaced.

The fix wasn't abandoning REST. It was putting an event-driven backbone underneath it — something that could handle guaranteed delivery, fan-out, replay, and temporal decoupling. The services kept their REST interfaces for synchronous queries, but the critical state changes flowed through a broker that could survive a node failure without losing data.

Multi-agent systems are making the same architectural mistake, just with better marketing. An agent that calls another agent over HTTP and waits for a response isn't decoupled. It's a distributed monolith with an AI label. The agent that publishes an event to a topic and trusts the infrastructure to deliver it — that agent can run at 3am without a human babysitting the call chain.

## What I Found Testing LangGraph on AWS

I spent a week earlier this year testing LangGraph and LangSmith deployment patterns on AWS — BYOC on EKS, Fargate configurations, Bedrock AgentCore integration — specifically looking for the point where an agent framework needs an event mesh underneath it.

I found it faster than I expected.

The breaking point isn't scale. LangGraph handles single-agent orchestration well enough. The breaking point is what happens when Agent A's output is consumed by Agents B, C, and D, each owned by different teams with different SLAs, and Agent C is temporarily down for redeployment. In a synchronous call chain, you get a failure. In a retry-based system, you get duplicate processing. In an event mesh with guaranteed delivery, persistent queues, and dynamic topic routing, Agent C picks up exactly where it left off when it comes back online.

This is the same problem Solace solved for trading systems fifteen years ago. The agents are new. The infrastructure problem is not.

## The Honest Framework for What You Actually Need

Here's advice you might not expect from a VP at a company that sells an agent mesh: most of you should not be building a multi-agent system yet.

Adopt MCP now. Wrap your internal APIs, databases, and tools as MCP servers. This is high-return, low-risk work that makes your single-agent implementations dramatically more capable.

Adopt A2A only when you genuinely have agents crossing team, framework, or organizational boundaries. If all your agents are in the same codebase, running in the same framework, owned by the same team — you don't need an interoperability protocol. You need function calls.

Add an event mesh when any of these are true: agents produce events consumed by multiple downstream agents with different SLAs; agent communication crosses network boundaries or cloud regions; you need replay capability for debugging or audit; you need guaranteed delivery because a missed event means a missed trade, a missed flight connection, or a compliance violation; or you're running agents that must operate autonomously overnight without human supervision.

That last condition is the real litmus test. If your agent system requires a human to notice and fix failures, it's a demo. If it runs at 3am on a Saturday and you find out Monday morning that everything worked — that's production. And production requires infrastructure that the protocol layer alone does not provide.

## The Layer Nobody Wants to Talk About

The agentic AI conversation in 2026 is dominated by models, frameworks, and protocols. The layer that actually determines whether your agents work in production — the delivery infrastructure, the audit trail, the backpressure mechanism, the replay capability — doesn't make for exciting keynotes.

But I've spent twenty years on that layer. I ran it for a global bank processing millions of trades per second. I migrated it from TIBCO to Solace when the old infrastructure couldn't keep up. And I'm watching the same architectural gap open up in agentic AI that opened up in microservices a decade ago.

The agents that survive production aren't the ones with the best models. They're the ones where someone asked the boring question: what happens when this message doesn't arrive? If your architecture doesn't have a confident answer to that, no protocol standard will save you at 3am.