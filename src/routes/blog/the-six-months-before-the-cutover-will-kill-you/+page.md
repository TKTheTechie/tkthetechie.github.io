---
author: Thomas Kunnumpurath
title: "The Six Months Before the Cutover Will Kill You"
date: 5/8/2026
category: "Engineering"
headerImage: the-six-months-before-the-cutover-will-kill-you.png
layout: blog
---

In 2014, I stood in a Deutsche Bank operations room at 2 AM watching two messaging systems run in parallel — TIBCO Rendezvous carrying live trades on one side, Solace processing the same messages on the other. We were three months into parallel running, and I'd just discovered that a subset of our FX pricing messages were arriving on Solace 47 microseconds *faster* than expected. That sounds like good news. It wasn't. It meant a downstream consumer was occasionally processing the Solace message before the TIBCO message had been acknowledged, creating a phantom state where the system believed a trade had been priced twice.

Everyone talks about migration cutovers like they're the moment of maximum risk. They're not. The cutover is a controlled event with a rollback plan, an incident bridge, and every senior engineer on standby. The real danger lives in the months of parallel running that precede it — the period where two systems coexist, where edge cases multiply geometrically, and where your team's vigilance slowly erodes because nothing has exploded *yet*.

## Parallel Running Is Not a Safety Net — It's a Complexity Multiplier

The conventional wisdom in enterprise infrastructure migration goes something like this: run both systems side-by-side, compare outputs, build confidence, then cut over. It sounds prudent. It's the approach every architecture review board will approve because it feels low-risk.

But here's what nobody tells you: parallel running doesn't halve your risk. It *doubles* your operational surface area. You now have two systems that need monitoring, two sets of failure modes, and — worst of all — an emerging class of bugs that only exist *because* both systems are running simultaneously.

At Deutsche Bank, our migration from TIBCO Rendezvous to Solace touched systems processing millions of trades per day across equities, FX, and fixed income. The Solace infrastructure was demonstrably superior: lower latency, cleaner topic routing, dramatically lower operational overhead. None of that mattered during parallel running, because the hardest problems weren't about either system individually. They were about the *interaction* between them.

That 47-microsecond timing anomaly I mentioned? It happened because Solace's more efficient message path meant certain consumers received data faster than the legacy path could complete its acknowledgment cycle. The fix wasn't in Solace or TIBCO — it was in the consumer-side correlation logic we'd built specifically for the parallel run. We were debugging our safety net, not our destination.

## The Three Failure Modes Nobody Plans For

After leading that multi-year migration and later watching similar patterns play out at Capital One and across Solace customers, I've identified three failure modes that consistently ambush teams during parallel running:

**1. Semantic Drift**
When you run two systems in parallel, you're implicitly asserting they produce equivalent outputs. But "equivalent" is deceptively hard to define. At Deutsche Bank, a TIBCO message and a Solace message carrying the same trade could differ in timestamp precision, header metadata, or serialization ordering — none of which mattered to the business logic, but all of which broke our automated comparison tooling. We spent weeks building comparison logic that was tolerant enough to ignore irrelevant differences but strict enough to catch real divergence. That tooling itself became a source of bugs.

**2. Operational Fatigue**
Parallel runs often last three to six months. In month one, every alert gets investigated thoroughly. By month four, your team has seen enough false positives from the comparison layer that response times slow. The alert that matters — the one indicating real data loss — arrives when vigilance is lowest. I've seen this pattern at every organization I've worked in. Human attention is a non-renewable resource during long parallel runs.

**3. The Rollback Illusion**
Teams enter parallel running believing they can always roll back to the old system. But three months in, the old system has fallen behind on patches, the team's muscle memory has shifted to the new platform, and — critically — some consumers have started quietly depending on behaviors unique to the new system. Your rollback plan is a snapshot of a world that no longer exists.

## What Actually Works: Compress, Isolate, Commit

Here's the framework I use now when advising customers on infrastructure migrations, whether it's legacy middleware to Solace, monolith-to-microservices, or on-prem to cloud:

**Compress the parallel window ruthlessly.** Every additional week of parallel running adds complexity faster than it adds confidence. Set a hard deadline. If your parallel run needs six months, your migration scope is too broad — decompose it into smaller, independently migratable domains.

**Isolate rather than compare.** Instead of running both systems on the same traffic and comparing outputs, migrate one bounded context completely. At Capital One, when we moved credit card controls from Java Spring Boot to GoLang microservices, the wins came from migrating entire API surfaces — not from running both implementations against the same requests. Dark launching a new service behind a feature flag and routing a percentage of real traffic to it gives you production validation without the combinatorial explosion of parallel running.

**Commit to the new system early and instrument heavily.** Rather than building elaborate comparison frameworks, invest that engineering effort in observability on the new platform. Distributed tracing, anomaly detection on message latency distributions, business-metric dashboards that let domain experts — not just engineers — validate behavior. When we finally cut over from TIBCO to Solace at Deutsche Bank, it wasn't the parallel run that gave us confidence. It was the monitoring we'd built on the Solace side that let us see, in real time, that every trade was flowing correctly.

## The Broader Lesson: Safety Theater vs. Actual Safety

This pattern extends well beyond messaging migrations. I see it constantly in enterprise architecture decisions: teams adopt the approach that *feels* safest rather than the approach that *is* safest. Running two systems in parallel feels cautious. But it's often safety theater — a practice that creates the appearance of risk management while actually introducing new, harder-to-detect risks.

The same instinct shows up in AI adoption right now. Organizations running "pilot programs" that never end, keeping legacy and AI-assisted workflows in parallel indefinitely, comparing outputs manually. The parallel running trap isn't specific to messaging infrastructure — it's a universal failure mode wherever organizations mistake coexistence for caution.

The antidote is the same everywhere: define your success criteria before you start, compress your validation window, and commit. The cutover isn't the scary part. The endless purgatory of "almost ready to switch" is where migrations go to die.

That night in the Deutsche Bank operations room, we fixed the timing anomaly by 4 AM. But the real lesson didn't land until months later: the parallel run hadn't found that bug through its normal comparison process. I found it because I happened to be staring at raw message logs at 2 AM. That's not a migration strategy. That's luck wearing an engineering badge.