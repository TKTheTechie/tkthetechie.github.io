---
author: Thomas Kunnumpurath
title: "The Architecture Astronaut Detector: How I Screen Pre-Sales Engineers for Signal Over Noise"
date: 5/15/2026
category: "Leadership"
headerImage: the-architecture-astronaut-detector-how-i-screen-pre-sales-engineers-for-signal-over-noise.png
layout: blog
---

Last year I interviewed a candidate for a senior systems engineering role on my team. Brilliant resume — ten years at top-tier companies, deep Kubernetes experience, could whiteboard a CQRS pattern in their sleep. Forty-five minutes into the interview, I asked a simple question: "Tell me about a time a customer's architecture was wrong and you had to tell them."

Dead silence.

Not because they hadn't encountered it — everyone in pre-sales has. But because their entire career had been optimized for saying yes. Yes, our platform does that. Yes, that architecture will scale. Yes, let me show you another slide. They'd become what I call an architecture astronaut: someone who can describe any system at 30,000 feet but has never had to land the plane in a crosswind.

I didn't extend an offer. And that decision taught me more about building a high-performing SE team than any management book I've read.

## The Hiring Mistake That Scaled

When I took over the Americas SE team at Solace, we were five engineers. Good engineers. But we were screening for the wrong signal. Our interview rubric was what you'd expect: Can you explain pub/sub? Can you whiteboard an event mesh topology? Can you demo the product without crashing it?

Those are table stakes. They tell you whether someone can do the mechanical parts of the job. They tell you nothing about whether they'll earn trust with a skeptical CTO who's been burned by three middleware vendors already.

As we scaled from 5 to 15 engineers — opening entirely new verticals like airlines, manufacturing, and retail — I realized our hiring filter was producing a specific failure mode: engineers who were technically competent but architecturally compliant. They'd mirror whatever the customer said back to them with a Solace logo on it. They wouldn't push back. They wouldn't say "your current approach has a flaw, and here's what I'd do instead."

In pre-sales, that's not politeness. That's malpractice.

## What We Actually Screen For Now

We restructured our entire interview process around three signals, evaluated in this order. Technical depth is third, not first.

**Signal 1: Architectural Judgment Under Ambiguity**

We present a deliberately messy scenario — a real customer architecture (anonymized) with competing constraints: latency requirements that conflict with compliance needs, a hybrid cloud topology that doesn't cleanly map to any textbook pattern, business stakeholders who want contradictory things. We don't ask "how would you solve this?" We ask "what questions would you ask before you started solving this?"

The best candidates immediately start triaging what they don't know. They ask about traffic patterns, failure modes, who owns the budget, what's already been tried. Architecture astronauts jump straight to drawing boxes and arrows.

**Signal 2: Constructive Disagreement**

I roleplay as a customer who's committed to a bad architectural decision. Something like: "We've decided to put Kafka in front of every microservice for guaranteed ordering." (If you've operated Kafka's partition model at scale, you know why this sentence should raise flags.)

The candidate's job is to push back without being adversarial. The best responses I've heard follow a pattern: acknowledge the goal behind the decision, share a specific experience where that approach created problems, then propose an alternative framed as a question rather than a correction.

One candidate said: "I've seen that pattern work for analytics pipelines. For your real-time trading controls, though — have you stress-tested what happens when you need to rebalance partitions during a volume spike? At Deutsche Bank, we ran into exactly that scenario and it changed our approach."

That candidate is on my team now.

**Signal 3: Technical Depth (But Demonstrated, Not Described)**

We do assess technical skills. But instead of whiteboarding algorithms, we ask candidates to walk us through something they actually built — top to bottom, including the mistakes. We want to hear about the memory leak they found at 2 AM, the protocol choice they got wrong, the demo that crashed in front of a customer.

When I built the ESP32 video streaming demo over Solace — the one where I used Claude Code to compress a week of work into a single day — the technical knowledge that mattered wasn't "can I write Arduino code." It was knowing that MQTT's QoS levels would determine whether frames arrived in order, that payload size limits would dictate my compression strategy, and that the web dashboard needed to handle jitter gracefully. Claude Code wrote the scaffolding. Twenty years of messaging infrastructure experience made the design decisions.

That's the depth I screen for: judgment that only comes from building real systems and watching them break.

## The Uncomfortable Truth About SE Hiring

Here's the part most SE leaders won't say out loud: the candidate who interviews best is often the candidate who performs worst.

Pre-sales engineering rewards a specific personality — articulate, confident, comfortable presenting. Those traits correlate with interview performance. They do not correlate with the ability to sit in a room with a hostile architect who's already decided your product is wrong and methodically, respectfully change their mind with evidence.

The engineers who've been strongest on my team are the ones who made me slightly uncomfortable during the interview. They challenged my hypothetical architecture. They said "I don't know" and then explained how they'd find out. They told me about a deal they lost and what it taught them.

## A Rubric You Can Steal

If you're hiring pre-sales engineers, solution architects, or anyone in a customer-facing technical role, here's the framework distilled:

1. **Lead with scenario-based judgment, not knowledge checks.** Anyone can study your product docs. Not everyone can navigate a room where the technical truth conflicts with what the customer wants to hear.

2. **Test for disagreement skills explicitly.** If your interview process never puts the candidate in a position to push back, you're selecting for compliance.

3. **Require show-me-the-code (or show-me-the-architecture) storytelling.** Not "describe microservices" but "show me something you built, including the part that went wrong."

4. **Weight post-interview references toward customers, not managers.** A manager tells you if someone was reliable. A customer tells you if someone was trusted.

## The Broader Principle

This isn't really about pre-sales hiring. It's about a failure mode that infects every technical organization: optimizing for people who describe systems over people who have convictions about them.

As AI tools get better — and they are getting dramatically better — the ability to generate technically accurate descriptions of architectures is becoming commoditized. What Claude Code can't do, and what no AI will do anytime soon, is sit across from a skeptical enterprise architect, read the room, realize the stated problem isn't the real problem, and have the conviction to say: "I think we're solving the wrong thing. Here's why."

That's the skill I hire for. That's the skill that scales.