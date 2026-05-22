---
author: Thomas Kunnumpurath
title: "The Six Months Before the Cutover Will Kill You"
date: 5/22/2026
category: "Engineering"
headerImage: the-six-months-before-the-cutover-will-kill-you.png
layout: blog
---

The night we cut over from TIBCO Rendezvous to Solace at Deutsche Bank — a system processing millions of trades across global markets — went remarkably smoothly. We had a plan, a rollback strategy, and a war room full of people who hadn't slept well in weeks. The cutover itself took hours, not days. The celebration was justified.

But here's the thing nobody talks about: the cutover wasn't the hard part. The six months of parallel running before it nearly killed the project.

## Parallel Running Is Where Migrations Actually Fail

Every enterprise migration guide will tell you to run old and new systems in parallel. It's sound advice. It's also wildly incomplete, because it treats parallel running as a validation phase when it's actually an operational nightmare that compounds daily.

At Deutsche Bank, we ran TIBCO and Solace side by side for months. Both systems received the same market data, the same trade messages, the same risk calculations. The theory was simple: compare outputs, build confidence, cut over when the numbers match. The reality was that we had effectively doubled our operational surface area overnight.

Every alert now had to be triaged across two systems. Every capacity plan had to account for both. Every on-call engineer needed expertise in legacy TIBCO *and* the new Solace topology. We didn't just have two messaging layers — we had two sets of failure modes, two monitoring dashboards, two escalation paths, and one team stretched across all of it.

The conventional wisdom is that parallel running reduces risk. It does — for the cutover. But it dramatically increases risk during the parallel phase itself, and most teams don't plan for that.

## The Three Things That Actually Go Wrong

Having led this migration and later watched dozens of enterprise customers at Solace navigate their own, I've seen the same failure patterns emerge during parallel running. They're never the things teams test for in advance.

**1. Message divergence creates trust erosion, not bug reports.**

When your parallel systems produce different outputs — and they will — the first instinct is to open a bug ticket. But in a trading environment, a message divergence at 2 AM triggers a chain reaction: Is the new system wrong, or is the old system masking a bug we've been living with? At Deutsche Bank, we discovered cases where TIBCO's behavior was technically incorrect but had been compensated for by downstream applications. The new system was *more correct*, but correctness broke things. Each divergence eroded stakeholder confidence in the migration timeline, even when the new system was right.

**2. Operational fatigue hits before technical failure.**

We lost more ground to exhaustion than to bugs. Supporting two systems with the same team means every incident takes twice the cognitive load. By month four, the engineers who knew both systems best were the most burned out. I learned — painfully — that parallel running requires dedicated capacity, not shared capacity. If your migration plan assumes the same team runs both systems at the same operational tempo, you're planning for attrition.

**3. The "just one more month" trap.**

Parallel running has no natural end state. There's always another edge case, another stakeholder who wants more data, another quarter where the business doesn't want to absorb cutover risk. At Deutsche Bank, we had to set a hard cutover date and defend it against perfectly reasonable requests to extend. Every month of parallel running costs real money — double infrastructure, double licensing, double operational burden — and the cost is invisible because it's spread across the team as toil rather than appearing on a single line item.

## A Framework for Surviving Parallel Running

If I were advising my former self — or any enterprise architect planning a messaging migration today — here's the framework I'd use:

**Set the cutover date before you start parallel running.** Not after. The date should be based on a defined set of acceptance criteria, not on a feeling of readiness. Readiness is a moving target; criteria are not. We eventually did this at Deutsche Bank, and it was the single decision that saved the project's timeline.

**Staff for two systems, not one system twice.** Assign a dedicated sub-team to the legacy platform during parallel running. Their only job is keeping it alive and triaging divergences. Your migration team should be focused forward, not constantly context-switching into legacy firefighting.

**Classify divergences by business impact, not by root cause.** Not every message difference matters equally. We wasted weeks investigating divergences in logging metadata that had zero business impact while a subtle ordering issue in a low-volume feed went unnoticed. Build a triage rubric on day one: which message types are P1 if they diverge, which are noise?

**Budget for the parallel phase explicitly.** Infrastructure, licensing, and — most importantly — people-hours. If leadership sees parallel running as "just testing," they won't allocate the resources it actually requires. Make the cost visible before you start, not after your team is drowning.

## Why This Matters Beyond Messaging Migrations

I've been at Solace for seven years now, and the migration pattern I lived through at Deutsche Bank shows up everywhere — just in different clothes. Customers migrating from Kafka to Solace, from monoliths to microservices, from on-prem to cloud. The technology changes; the parallel running trap doesn't.

And it's about to get worse. As enterprises adopt agentic AI platforms — including Solace Agent Mesh, which my team is actively deploying — the migration complexity multiplies. You're not just swapping a messaging layer; you're rewiring how autonomous agents discover capabilities and coordinate actions. The parallel phase for an agentic system isn't two message buses side by side. It's two decision-making architectures producing potentially different business outcomes.

The principle holds: plan for the parallel phase as if it's the hardest part of the migration. Because it is. The cutover is just the moment you finally stop paying for two of everything.