---
author: Thomas Kunnumpurath
title: "The Migration Tax Nobody Budgets For: Why Parallel Running Is Where Enterprise Moves Actually Fail"
date: 8/21/2026
category: "Engineering"
headerImage: the-migration-tax-nobody-budgets-for-why-parallel-running-is-where-enterprise-moves-actually-fail.png
layout: blog
---

It was 2:47 AM on a Tuesday in 2013, and I was staring at a dashboard showing two messaging systems processing the same trade flow — TIBCO Rendezvous on the left, Solace on the right. Both green. Both healthy. Both showing identical message counts down to the last equity swap confirmation. And I was terrified.

Not because something was broken. Because nothing was. We'd been running TIBCO and Solace in parallel at Deutsche Bank for four months, and the absence of problems was becoming the problem. The team was losing urgency. Stakeholders were asking why we hadn't cut over yet. And I knew — from bitter experience — that parallel running is the phase where enterprise migrations don't fail spectacularly. They fail slowly, by never finishing.

## The Cutover Fallacy

Every migration plan I've ever reviewed puts the dramatic red circle on the calendar around "cutover day." The exec sponsors show up. The war room is staffed. Pizza is ordered. Everyone treats cutover as the moment of maximum risk.

They're wrong. Cutover is actually the moment of maximum focus. Every engineer is alert, every dashboard is monitored, every rollback plan is rehearsed. The risk at cutover is high but the attention is higher.

The real danger zone is the three-to-twelve months of parallel running that precedes it — the phase where you're operating two systems simultaneously to "prove" the new one works. This is where I've watched migrations at Deutsche Bank, at Solace customers, and across the industry stall, bloat, and quietly die. Here's why.

## Parallel Running Has a Half-Life

When you first stand up a parallel system, the comparison is rigorous. Engineers are actively validating message-for-message parity. Discrepancies get investigated within hours. The team is motivated because the migration is fresh and the destination is clear.

But parallel running has a half-life. Every month that passes:

- **Alert fatigue sets in.** Those discrepancy reports that used to trigger war rooms start getting triaged as "known differences" and filed away.
- **The old system gets patched.** Production issues don't wait for your migration timeline. Fixes go into the legacy system, and now your parallel comparison baseline has drifted.
- **New features land on the old platform.** Business doesn't stop. A new trading desk needs connectivity. Where does it go? The system that's already in production, naturally. Every new dependency on the old system adds another migration task to the backlog.
- **Political cover accumulates.** "We're still in parallel running" becomes a shield against making a decision. Nobody got fired for being thorough.

At Deutsche Bank, I watched this pattern start to form around month three of our TIBCO-to-Solace migration. The system was processing millions of trades across asset classes. The Solace side was performing beautifully — lower latency, cleaner topic routing, dramatically simpler operations. But the parallel phase was calcifying into a permanent state.

## What Actually Broke the Stall

I learned that the antidote to parallel-running paralysis isn't technical — it's structural. Three things broke our stall, and I've since applied them to every large migration I've advised on:

**1. Set a parallel-running budget, not just a timeline.** We calculated the actual cost of running two messaging infrastructures simultaneously — hardware, licensing, operational overhead, cognitive load on the support team. When we presented that number monthly to stakeholders, "let's keep running in parallel a bit longer" suddenly had a price tag. Abstract timelines are easy to extend. Budgets are not.

**2. Migrate the complainers first.** Conventional wisdom says migrate your least critical systems first. That's fine for technical risk, but terrible for organizational momentum. We deliberately migrated application teams that were most vocal about TIBCO's limitations — the ones fighting with multicast storms, struggling with the operational model, waiting on infrastructure changes. When they moved to Solace and immediately saw the benefits — dynamic topic routing instead of static daemon configurations, native protocol flexibility — they became internal evangelists. Their enthusiasm did more to accelerate the migration than any project plan.

**3. Kill the old system's roadmap before you kill the system.** Six weeks before our cutover target, we announced that TIBCO would receive no further enhancements — no new topic configurations, no capacity additions, no onboarding of new applications. We didn't decommission it yet, but we made it a dead end. This forced every team with upcoming connectivity needs onto Solace by default. The migration stopped being a project and started being gravity.

## This Isn't Just About Messaging

I see the same pattern now with customers evaluating Solace Agent Mesh for agentic AI orchestration. Teams want to run their existing integration layer alongside the new agent-based architecture "to compare." And the same half-life kicks in. The agents work. The event mesh routes correctly. But nobody wants to commit to decommissioning the old REST-and-cron approach because parallel running feels safe.

I had a manufacturing customer recently who'd been running their legacy MES integration alongside a Solace-brokered event mesh for five months. Five months of double infrastructure costs and double operational burden. The technical proof was done in month one. The remaining four months were organizational inertia dressed up as due diligence.

We applied the same playbook: quantified the parallel-running cost, migrated the teams that were most frustrated with the legacy batch-processing model, and set a sunset date on enhancements to the old system. They completed the migration in six weeks.

## The Decision Framework

If you're in a parallel-running phase right now — whether it's messaging middleware, cloud migration, or AI infrastructure — ask yourself these three questions:

1. **Can you state the specific exit criteria for parallel running, and have they been met?** If you can't articulate what "done" looks like, you don't have a migration plan. You have a hedge.
2. **What is the monthly cost — in dollars, engineering hours, and cognitive load — of running both systems?** If nobody has calculated this, the parallel phase will expand to fill whatever patience the organization has.
3. **When was the last time a parallel-running discrepancy actually changed your migration approach?** If the answer is "months ago," you're not validating anymore. You're procrastinating.

## The Bigger Lesson

After leading that TIBCO-to-Solace migration and watching dozens more across my years at Solace, I've come to believe that the hardest part of any enterprise technology transition isn't proving the new system works. It's having the organizational courage to stop running the old one. The migration tax that nobody budgets for isn't technical. It's the cost of indecision — and it compounds monthly.

The next time you see a migration Gantt chart with "parallel running" as a single bar spanning months, ask what the exit criteria are. If the answer is vague, you've just identified where that migration will stall. And now you know what to do about it.