---
author: Thomas Kunnumpurath
title: "The Technical Decision That Got Me Yelled At: Why Changing Languages Mid-Project Was Still Right"
date: 6/19/2026
category: "Leadership"
headerImage: the-technical-decision-that-got-me-yelled-at-why-changing-languages-mid-project-was-still-right.png
layout: blog
---

Three months into a greenfield microservices build at Capital One, I walked into a room of Java developers and told them we were rewriting a core service in Go.

The reaction was exactly what you'd expect. One senior engineer asked me, point blank, if I'd lost my mind. Another started listing all the Spring Boot middleware we'd already integrated. A third just went quiet — the dangerous kind of quiet that means someone's updating their LinkedIn profile.

I'd do it again tomorrow.

## The Problem Nobody Wanted to Name

We were building integration APIs for fintech partner onboarding in the upmarket credit card business. The Java Spring Boot services we'd already shipped for real-time credit card controls were solid — they met strict regulatory requirements and performed well under normal load. But the partner onboarding layer had a fundamentally different performance profile: high concurrency, lightweight request handling, and a need for fast cold starts because we were early in the AWS Lambda experimentation wave.

Spring Boot's startup time was measured in seconds. Its memory footprint per instance was substantial. For the credit card controls — long-running services processing complex business logic — that overhead was a rounding error. For the partner integration layer — dozens of lightweight microservices that needed to spin up fast and handle many concurrent connections cheaply — it was the architecture working against us.

The conventional wisdom was clear: standardize on one stack, reduce cognitive overhead, keep the team productive. Every engineering management book I'd read said the same thing. And that conventional wisdom is right — about 70% of the time. The other 30% is where the interesting decisions live.

## Why "One Stack" Is a Heuristic, Not a Law

Here's what I've learned across Deutsche Bank, Capital One, and Solace: the "standardize everything" instinct is a fear response disguised as engineering discipline. It's not wrong to want consistency. It's wrong to treat consistency as the highest-order value when the problem domain is telling you something different.

At Deutsche Bank, I watched what happened when we forced every trading system through the same TIBCO Rendezvous messaging layer regardless of latency profile. Some systems needed sub-millisecond delivery. Others were batch processes that ran overnight. Treating them identically created operational complexity that dwarfed whatever simplicity we gained from standardization. That experience — years of living inside a messaging infrastructure serving millions of trades — taught me that the right abstraction depends on the workload, not the org chart.

The Go rewrite at Capital One wasn't about Go being "better" than Java. It was about Go being better for *that specific service profile*: compiled binaries with near-instant startup, goroutines that handled concurrent connections without the thread-pool tuning that Java required, and a memory footprint that made our AWS bill significantly more predictable.

## The Part They Don't Teach You: Selling Technical Decisions Internally

The technical argument was straightforward. The human argument was the real work.

I made three mistakes initially, and I'll share them because they're mistakes I see engineering leaders make constantly:

**Mistake 1: Leading with the technology.** I walked in talking about goroutines and binary sizes. Nobody cared. What they heard was "your skills are being devalued." I should have led with the business problem — partner onboarding was too slow, and our infrastructure costs were scaling linearly when they should have been scaling sub-linearly.

**Mistake 2: Framing it as a permanent decision.** The team assumed Go was replacing Java everywhere. I hadn't been explicit enough that this was a targeted choice for a specific workload profile. The credit card controls stayed in Spring Boot. They were great in Spring Boot. Different problem, different tool.

**Mistake 3: Not investing in the team first.** I asked people to build in a language they didn't know without first creating a path for them to learn it safely. We fixed this by pairing experienced Go developers with Java developers on the first two services, and by keeping the initial Go services deliberately simple.

The approach that actually worked was running a two-week spike. Two engineers — one enthusiastic about Go, one skeptical — built the same service in both stacks and compared startup time, memory usage, and lines of code. The skeptic became the strongest advocate. Data converts people that arguments can't.

## The Decision Framework I Use Now

After that experience, I developed a simple heuristic for "should we introduce a new technology" decisions that I still use at Solace when evaluating everything from new connectors to AI tooling:

1. **Is the problem domain measurably different from what we're already solving?** Not "slightly" different — measurably, with numbers. If you can't quantify the gap, you're chasing novelty.
2. **Can we contain the blast radius?** The new technology should serve a bounded set of services. If adoption requires rewriting everything, the cost curve will kill you before the benefits materialize.
3. **Will the team be stronger in six months?** Adding Go made our engineers more versatile. If a technology choice makes your team narrower, it's a liability regardless of performance gains.
4. **Can you prove it in a spike, not a slide deck?** Architecture diagrams lie. Working code in a two-week spike tells the truth.

## What This Taught Me About Leadership

I now run a team of 15 systems engineers at Solace, and I screen for this quality in every hire: the ability to hold strong opinions loosely and change their mind when presented with evidence. The engineer who went quiet in that Capital One meeting? He became one of the best Go developers on the team once he saw the spike results. He wasn't resistant to change — he was resistant to unjustified change. That's a feature, not a bug.

The broader lesson is this: the hardest technical decisions aren't technical. They're organizational. The technology choice takes an afternoon. Getting fifteen people aligned on why you're making that choice — and ensuring they feel ownership rather than obligation — takes weeks of deliberate communication.

Every time I'm tempted to make a unilateral technical call because I'm confident I'm right, I remember that room at Capital One. I was right about Go. I was wrong about how I introduced it. And in engineering leadership, being right about the what while being wrong about the how produces the same outcome as being wrong about everything.