---
author: Thomas Kunnumpurath
title: "The Migration Tax: Why Parallel Running Is Where Enterprise Cutovers Actually Fail"
date: 7/17/2026
category: "Engineering"
headerImage: the-migration-tax-why-parallel-running-is-where-enterprise-cutovers-actually-fail.png
layout: blog
---

In 2012, I stood in the Deutsche Bank trading floor operations center at 2 AM watching two messaging systems process the same trades simultaneously. We were six months into a parallel run — TIBCO Rendezvous on one side, Solace on the other — and I'd just discovered that our reconciliation logic had been silently masking a message ordering divergence for three weeks. Not in production. Not during the cutover. During the part everyone treats as the safe part.

That night rewired how I think about every large-scale technology migration I've touched since. The industry obsesses over cutover risk — the big red button moment — while systematically underestimating the slow, corrosive risk of the parallel run that precedes it. I call it the migration tax, and most organizations don't even realize they're paying it.

## The Cutover Fallacy

Ask any enterprise architect where migration risk lives and they'll point to the switchover: the moment traffic moves from old to new. They'll build runbooks, schedule war rooms, negotiate maintenance windows. And they're not wrong — cutovers are dangerous. But they're dangerous in a way that's well-understood and well-rehearsed.

Parallel running is dangerous in a way that's neither. Here's the pattern I've seen repeatedly across Deutsche Bank, Capital One, and now dozens of Solace customers: an organization decides to migrate a critical system. They design a parallel run phase where both old and new systems process the same workload. The stated goal is "building confidence." The actual result is building a second production system that nobody budgeted to operate.

At Deutsche Bank, our TIBCO-to-Solace migration touched systems processing millions of trades per day. The parallel run wasn't a trial period — it became an operational commitment. We had to staff two on-call rotations, maintain two sets of monitoring dashboards, and build custom reconciliation tooling to compare output between systems that had fundamentally different topic routing models. TIBCO Rendezvous used subject-based addressing with wildcard semantics that didn't map cleanly to Solace's topic hierarchy. The reconciliation layer we built to bridge that gap became its own source of bugs.

The migration tax isn't the cutover. It's the six months of dual operations where your team is running 200% of the infrastructure for 100% of the throughput, and every divergence between old and new triggers an investigation that burns engineering hours you didn't plan for.

## Three Ways Parallel Runs Silently Fail

From that Deutsche Bank migration and the enterprise migrations I've advised on since, I've identified three failure modes that parallel runs create — none of which appear in the cutover runbook.

**1. Reconciliation drift.** You build tooling to compare outputs between old and new. At first, every discrepancy gets investigated. By month three, the team has developed a taxonomy of "known differences" — edge cases that are "expected" divergences. By month five, actual bugs hide inside that taxonomy. The three-week ordering divergence I found at 2 AM? It had been categorized as a "known timing difference" by someone who'd seen similar-looking entries in the reconciliation report and pattern-matched without digging in.

**2. Operational attention split.** Your best engineers are now context-switching between two systems. They're not just running the new system — they're becoming experts at comparing the new system to the old one. That's a skill with a shelf life of exactly one migration. Every hour spent debugging a reconciliation mismatch is an hour not spent hardening the target architecture.

**3. Scope creep into parity traps.** This is the most insidious one. During parallel runs, stakeholders discover behaviors in the legacy system they didn't know existed — undocumented features, quirky ordering guarantees, implicit retry logic. They demand parity. Suddenly the new system is being designed to replicate the bugs and accidents of the old one, not to deliver the architectural improvements that justified the migration in the first place.

## A Framework for Shorter, Sharper Parallel Runs

I'm not arguing against parallel runs entirely — for a trading system processing millions of messages per second, you can't skip validation. But I am arguing that most parallel runs are too long, too broad, and too unstructured. Here's the framework I use now when advising customers on enterprise migrations:

**Time-box ruthlessly.** Set a parallel run duration at the start — not as a target but as a constraint. At Deutsche Bank, ours expanded from a planned six weeks to six months. Every extension felt reasonable in isolation. In aggregate, it nearly doubled the migration cost. I now recommend four to six weeks maximum, with a pre-agreed decision criterion for go/no-go.

**Narrow the reconciliation surface.** Don't compare everything. Identify the three to five critical data flows that, if they diverge, indicate a real problem — and only reconcile those. Our Deutsche Bank reconciliation compared every field on every message. The signal-to-noise ratio was terrible. When I later helped Capital One teams design event-driven migration patterns, we reconciled only on business-critical state transitions. The investigations were fewer but each one mattered.

**Separate validation from operation.** Run the new system in shadow mode — receiving real traffic, processing it, but not serving results to downstream consumers. This lets you validate behavior without doubling your operational burden. The key insight: you don't need two production systems. You need one production system and one validation harness.

**Pre-decide your parity boundaries.** Before the parallel run starts, write down which legacy behaviors you will replicate and which you won't. When stakeholders discover undocumented quirks mid-migration and demand parity, you have a document to point to instead of a negotiation to lose.

## The Bigger Principle: Risk Theater vs. Risk Reduction

The migration tax exists because organizations confuse risk theater with risk reduction. A six-month parallel run feels safe. It looks responsible. Executives can point to it and say, "We're being careful." But length doesn't equal rigor. A four-week parallel run with crisp reconciliation criteria and pre-agreed decision boundaries reduces more risk than a six-month run where the team has gone numb to discrepancy reports.

I see the same pattern now in AI deployments. Companies run "pilot programs" for twelve months, comparing AI outputs to human outputs, accumulating a growing pile of "known differences" that nobody has time to investigate. The parallel run becomes the permanent state. The migration tax becomes a line item that never goes away.

Whether you're migrating messaging infrastructure, moving to a new cloud platform, or deploying an agentic AI system alongside human workflows, the question isn't "how long should we run in parallel?" The question is: "What specific evidence would make us confident enough to commit — and how fast can we gather it?"

That night on the Deutsche Bank trading floor, the ordering divergence I found was real. We fixed it in two days. But we'd been paying the migration tax for three weeks before anyone noticed, and for three months before that in accumulated operational overhead. The cutover, when it finally happened? It was the easiest part of the entire program.

The hard part was having the discipline to stop running two systems when one was ready.