---
author: Thomas Kunnumpurath
title: "The Technical Hire That Changed How I Build Teams"
date: 7/24/2026
category: "Leadership"
headerImage: the-technical-hire-that-changed-how-i-build-teams.png
layout: blog
---

Last year I interviewed a candidate who could whiteboard a perfect event-driven architecture in fifteen minutes. Clean topic hierarchies, proper fan-out patterns, dead letter queues — the whole picture. I was ready to extend an offer on the spot.

Then I put them in front of a mock customer call. The scenario was straightforward: a manufacturing company running batch ETL jobs every six hours, asking why they should care about real-time event streaming. The candidate launched into a textbook explanation of EDA benefits. The "customer" (one of my senior SEs playing the role) pushed back: "We've run batch for fifteen years. Our plant managers don't want real-time — they want fewer 3 AM pages."

The candidate froze. Not because they lacked knowledge, but because they'd never had to translate deep technical understanding into someone else's language, someone else's pain. We didn't extend the offer.

That moment crystallized something I'd been learning the hard way since scaling my pre-sales engineering team at Solace from 5 to 15: **the skill that separates good technical hires from great ones isn't technical depth. It's the ability to hold two mental models simultaneously — yours and the person you're trying to help.**

## The Hiring Rubric I Had to Unlearn

When I started building the team, I screened for technical skills first. This made intuitive sense — we're systems engineers supporting enterprise deals across airlines, banking, manufacturing, and IoT. You need to understand event-driven architecture, protocol differences between MQTT and AMQP, cloud networking, Kubernetes, the works.

So I built a rubric weighted heavily toward technical assessment. Coding exercises. Architecture whiteboarding. Protocol deep-dives. The candidates who scored highest got offers.

And some of them were spectacular failures in the field.

Not because they couldn't do the work. Because pre-sales engineering — and honestly, most engineering roles that touch humans — requires a skill that technical interviews don't measure: **the ability to construct a mental model of someone else's constraints, priorities, and fears, and then map your technical knowledge onto that model in real time.**

I learned this pattern the hard way at Deutsche Bank. When I led the migration from TIBCO Rendezvous to Solace across the trading infrastructure, the hardest conversations weren't about latency benchmarks or failover semantics. They were with application teams who'd built their careers around TIBCO's API patterns. The fear wasn't technical — it was existential. "If my system breaks during migration, that's my reputation." The engineers on my team who succeeded in those conversations weren't the ones who knew Solace's architecture best. They were the ones who could articulate why a trader's P&L wouldn't be at risk during the cutover, in the trader's language.

## What We Screen For Now

I flipped the rubric. Technical depth is now table stakes — a threshold, not a differentiator. If you can't explain how a topic hierarchy works or debug a TLS handshake, the conversation ends early. But once you clear that bar, here's what actually predicts success:

**1. Curiosity about the problem before the solution.**
I give candidates an ambiguous scenario: "A logistics company is losing packages between warehouse scans. They think they need Kafka. Walk me through the conversation." The best candidates ask five questions before proposing anything. What's the scan technology? What's the current data flow? What does 'losing' mean — data loss or visibility gap? The mediocre candidates start drawing architecture diagrams immediately.

**2. The ability to say 'I don't know' and stay credible.**
In enterprise pre-sales, you will be asked questions you can't answer. The instinct to bluff is career poison. I deliberately ask candidates about technologies adjacent to their experience and watch how they handle the boundary. The ones who say "I don't have direct experience with that, but here's how I'd reason about it" are the ones customers trust.

**3. Evidence of having changed their mind.**
I ask: "Tell me about a technology or approach you used to advocate for that you've since moved away from, and why." This filters for intellectual honesty and growth. At Capital One, I watched a team resist moving from Java to GoLang for new microservices — not because Go was wrong for the use case, but because changing your mind feels like admitting you were wrong before. The engineers who could narrate their own evolution were the ones who adapted fastest.

## The Compound Effect on Team Culture

Hiring this way has a second-order effect that took me two years to notice: **it changes how your team collaborates internally.**

When you select for empathy and intellectual honesty alongside technical depth, you get a team that runs blameless postmortems without being told to. You get engineers who pair with each other before customer calls — not to rehearse answers, but to stress-test assumptions. You get people who flag risks early because the culture doesn't punish uncertainty.

One concrete example: when we started positioning Solace Agent Mesh for agentic AI use cases, the team had to rapidly learn a domain where none of us were experts six months prior. The engineers I'd hired for curiosity and adaptability ramped faster than engineers with twice their years of experience at previous companies. They asked better questions of the product team. They built sharper demos. They weren't afraid to say "this capability isn't production-ready yet" to a prospect, which paradoxically increased trust and accelerated deals.

## The Framework I Give My Team

I distilled this into a simple heuristic I share with every new SE:

**Before any customer interaction, answer three questions:**
1. What does this person's Monday morning look like? (What are their actual operational pressures?)
2. What would make them a hero internally? (What outcome do they need to justify this investment?)
3. What are they afraid of that they haven't said out loud? (Migration risk? Job security? Looking foolish to their VP?)

If you can't answer these, you're not ready to present. Go back and do more discovery.

This isn't soft skills fluff. This is the difference between a 30% win rate and a 60% win rate. I've measured it.

## The Bigger Lesson

The tech industry has an obsession with hiring for what people know today. LeetCode scores. Framework expertise. Years of experience with specific tools. These are proxies for competence, but they're terrible proxies for impact.

The engineers who've had the most impact on my team — and on the customers they serve — are the ones who treat their own knowledge as a tool in service of someone else's problem, not as the product itself. They're deeply technical, but they wear that depth lightly.

If you're building a team, here's what I'd challenge you to do: take your current hiring rubric and honestly assess what percentage of it measures the ability to help versus the ability to know. If the split is worse than 50/50, you're optimizing for the wrong thing.

The best engineer in the room isn't the one with the most knowledge. It's the one whose knowledge is most useful to the person sitting across the table.