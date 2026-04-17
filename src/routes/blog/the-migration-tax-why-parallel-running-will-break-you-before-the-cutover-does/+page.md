---
author: Thomas Kunnumpurath
title: "The Migration Tax: Why Parallel Running Will Break You Before the Cutover Does"
date: 4/17/2026
category: "Engineering"
headerImage: the-migration-tax-why-parallel-running-will-break-you-before-the-cutover-does.png
layout: blog
---

The night we cut over from TIBCO Rendezvous to Solace at Deutsche Bank, the actual flip took about forty minutes. Forty minutes for a system processing millions of trades per day across a global trading backbone. People congratulated us. The CTO sent an email.

What nobody saw was the six months of parallel running that nearly broke us first.

That experience fundamentally changed how I think about infrastructure migrations — and fifteen years later, I watch organizations make the same mistake over and over. They obsess about the cutover weekend. They build elaborate runbooks for D-Day. They rehearse the rollback. And they massively underestimate the thing that actually kills migrations: the parallel running phase where you're operating two production systems simultaneously, burning double the operational budget, and slowly exhausting your team's will to live.

## Everyone Plans the Cutover. Nobody Plans the Middle.

When I pitched the TIBCO-to-Solace migration at Deutsche Bank, the business case was clean: lower latency, reduced infrastructure costs, simpler operational model. The executive sponsors wanted a timeline. We gave them one. And like every migration timeline in the history of enterprise software, it was a work of speculative fiction.

Here's what the timeline didn't account for: the migration tax.

The migration tax is everything you pay — in engineering hours, operational complexity, cognitive load, and organizational patience — while you're running old and new systems in parallel. It's not a line item in anyone's project plan, but it's the single largest cost of any infrastructure migration.

At Deutsche Bank, this looked like: maintaining compatibility layers between TIBCO's publish-subscribe model and Solace's topic hierarchy. Running dual monitoring stacks. Debugging issues where you first had to determine *which* system was misbehaving. Training support teams on two platforms simultaneously. And the worst part — every application team that hadn't migrated yet was a dependency that could stall the entire program.

We had roughly 200 application teams that needed to move. After six months, we'd migrated about 40. Not because the technology was hard, but because every team had their own release cycle, their own priorities, and their own very reasonable argument for why next quarter was a better time.

## The Compounding Cost of "Almost Done"

Here's the insidious part of parallel running: the cost compounds while the urgency fades.

In month one, everyone's motivated. The new system is shiny. Executive attention is high. In month four, you've migrated the easy applications and you're staring down the long tail of difficult ones — the legacy systems with no test environments, the trading desks that won't accept any risk window, the teams whose original developers left the firm three years ago.

Meanwhile, you're paying full operational cost on both systems. Your on-call engineers need expertise in both platforms. Your monitoring dashboards are split. Every incident has an extra triage step: is this a TIBCO problem, a Solace problem, or a problem in the bridge between them?

I tracked our operational overhead during the parallel phase. The messaging middleware team was spending roughly 60% of their capacity just maintaining the coexistence — leaving 40% for the actual migration work. This is the trap. The longer parallel running continues, the less capacity you have to end it.

## Three Patterns That Actually Shorten the Middle

After Deutsche Bank, and after watching dozens of enterprise customers go through similar migrations at Solace, I've landed on three patterns that materially reduce the migration tax.

**1. Migrate by business domain, not by application.**

At Deutsche Bank, we initially let any application team volunteer to go first. This was democratic and completely wrong. It meant we had migrated applications scattered across every business domain, which meant we couldn't decommission *any* segment of the old infrastructure. The turning point was when we switched to domain-by-domain migration: move all equities trading applications together, then all fixed income, then all FX. Each completed domain let us shut down a chunk of TIBCO infrastructure, which created visible progress and reduced operational surface area.

**2. Build the bridge as a first-class system, not a temporary hack.**

The compatibility layer between old and new systems will exist for longer than you think. At Deutsche Bank, we initially treated the TIBCO-Solace bridge as throwaway code. Six months in, it was the most critical component in our stack — every message flowing between migrated and unmigrated applications depended on it. We eventually had to stop migration work entirely and re-engineer the bridge with proper monitoring, failover, and performance tuning. If I could do it again, I'd invest in that bridge on day one as if it were production infrastructure. Because it is.

**3. Set a tax deadline, not just a migration deadline.**

The migration deadline is when the last application moves. The tax deadline is when you stop paying double. These are different dates, and the tax deadline is the one that matters. At Deutsche Bank, we eventually went to the application teams that were stalling and gave them a hard date: after this date, TIBCO infrastructure for your domain gets decommissioned. You're either on Solace or you're offline. It sounds aggressive. It was. But it was also the only thing that converted "next quarter" into "next sprint."

## This Applies Far Beyond Messaging Middleware

I see the same migration tax pattern everywhere now. Companies moving from on-prem Kafka to Confluent Cloud. Teams migrating from REST-based integration to event-driven architecture. Organizations adopting Solace Agent Mesh alongside existing automation frameworks.

The technology changes but the tax is identical: dual operations, split expertise, compounding cost, fading urgency.

Right now, I'm watching this play out in the agentic AI space. Enterprises are piloting AI agent frameworks alongside existing workflow automation. They'll run both in parallel. The pilot will succeed, leadership will declare victory, and then the organization will spend eighteen months paying the tax of operating two orchestration layers while the migration stalls at 30% completion.

If you're planning any infrastructure migration — messaging, cloud, AI orchestration, anything — do this before you write a single line of migration code: estimate the monthly cost of parallel running, multiply it by twice your expected migration duration, and put that number in front of your executive sponsor. If they still want to proceed, you have a real mandate. If they blanch, you've just saved everyone a year of pain.

The cutover isn't the hard part. It never was. The hard part is the middle, and the only way to survive it is to plan — and budget — for it explicitly.

Forty minutes to flip the switch. Six months to earn the right to flip it. That ratio tells you everything you need to know about where to focus your planning.