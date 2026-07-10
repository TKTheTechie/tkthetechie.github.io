---
author: Thomas Kunnumpurath
title: "The Six Months Before the Cutover Will Kill You"
date: 7/10/2026
category: "Engineering"
headerImage: the-six-months-before-the-cutover-will-kill-you.png
layout: blog
---

In 2014, I stood in front of a room of Deutsche Bank's most senior trading technology leaders and told them we were ready to migrate from TIBCO Rendezvous to Solace. I was wrong — not about the technology, but about what "ready" meant. The cutover itself, when it finally happened, was almost anticlimactic. What nearly killed the program was the six months of parallel running that preceded it. That experience permanently changed how I think about infrastructure migrations, and I've watched dozens of teams make the same mistake I almost made.

Most migration war stories focus on the dramatic moment: the big bang cutover, the rollback plan, the 2 AM page. But in mission-critical systems — trading platforms processing millions of messages per second, airline reservation systems, real-time payment rails — the cutover is the easiest part to plan for. You rehearse it. You script it. You have rollback criteria. The part that actually threatens the program is the long, grinding period of parallel running where both systems are live, both need support, and organizational patience is bleeding out.

## Why Parallel Running Is Where Migrations Die

At Deutsche Bank, our messaging middleware underpinned real-time trading across equities, fixed income, and FX. When we committed to migrating from TIBCO Rendezvous to Solace, we knew we couldn't do a big bang cutover — the blast radius was too large. So we designed a phased migration with parallel running: both messaging fabrics carrying production traffic simultaneously, application teams migrating on their own schedules within a defined window.

On paper, this was the responsible approach. In practice, it created three problems nobody warned us about.

**First, operational cost doubles but headcount doesn't.** You're now running two messaging infrastructures in production. Two monitoring stacks. Two sets of runbooks. Two on-call rotations' worth of tribal knowledge. My team didn't get twice the people — we got the same team stretched across two systems. The fatigue was cumulative and invisible until it wasn't.

**Second, the long tail of application migrations destroys your timeline.** We had dozens of application teams that needed to migrate. The first wave — the teams with modern, well-factored code — moved fast. The last 20% took longer than the first 80%. These were legacy systems with hardcoded TIBCO dependencies, teams with competing priorities, and applications where the original developers had left the firm. Every week of delay extended the parallel running window and its compounding cost.

**Third, organizational conviction erodes over time.** A migration that runs six months longer than planned stops feeling like a strategic initiative and starts feeling like a boondoggle. Stakeholders who championed the move start hedging. Budget conversations get harder. The irony is brutal: the migration is working — Solace was delivering measurably lower latency and reduced infrastructure costs — but the organizational narrative was "this is taking too long."

## The Framework I Wish I'd Had

If I could go back, here's what I'd do differently — and what I now advise every customer navigating a similar migration.

**Set a hard deadline for parallel running and make it painful to extend.** Not a target. A deadline with consequences. When teams know the old system will be decommissioned on a specific date regardless, migration becomes urgent instead of aspirational. Yes, this requires executive sponsorship. That's the point — if you can't get an executive to commit to a decommission date, you don't actually have organizational buy-in for the migration, and you should figure that out before you start.

**Staff for parallel running explicitly.** Don't pretend your existing team can absorb double the operational surface area through heroics. Budget for temporary additional headcount or contractor support specifically for the parallel running window. When I finally did this at Deutsche Bank, the difference was immediate — not just in operational stability, but in team morale.

**Migrate the hardest applications first, not last.** This is counterintuitive. Most teams start with easy wins to build momentum. I understand the logic, but it's wrong for parallel running scenarios. Your easy wins will migrate regardless — they're easy. Your hard migrations are the ones that will extend the parallel running window. Front-load them. Discover the ugly surprises when you still have organizational patience and budget runway.

**Measure and communicate the cost of parallel running weekly.** Make the burn rate of running two systems visible to every stakeholder. At Deutsche Bank, once we started showing the concrete dollar cost of each additional week of dual operations, the application teams that had been dragging their feet suddenly found time on their roadmaps.

## This Isn't Just About Messaging Middleware

I've seen this pattern repeat everywhere — database migrations, cloud migrations, monolith-to-microservices rewrites. At Capital One, we migrated critical credit card control services from Java to GoLang. The technical rewrite was the straightforward part. The months of running both implementations in parallel while we validated behavioral parity and built confidence? That's where the engineering and organizational energy actually went.

The pattern holds in the current wave of AI platform adoption too. I'm watching enterprises run parallel stacks — legacy automation alongside new agentic AI orchestration — with the same compounding costs and eroding conviction. The technology works. The parallel running is what threatens the program.

## The Actionable Takeaway

Before you start any infrastructure migration, answer this question honestly: **how long can your organization sustain parallel running, and what is the weekly cost?** Not the migration cost. The parallel running cost — the operational overhead, the team fatigue, the split-brain expertise, the opportunity cost of not decommissioning.

If you don't have a number, you don't have a migration plan. You have a hope.

The night we finally decommissioned the last TIBCO Rendezvous instance at Deutsche Bank, I expected to feel triumph. What I actually felt was relief — not that the new system worked (I'd been confident in Solace for months), but that the organizational gauntlet of parallel running was finally over. The lesson branded itself into my approach permanently: the technology is rarely the risk. The transition is the risk. Plan for it like the first-class engineering problem it actually is.