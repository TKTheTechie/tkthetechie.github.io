---
author: Thomas Kunnumpurath
title: "The Intern's Alerting Tool Outlasted the Platform It Monitored"
date: 8/28/2026
category: "Leadership"
headerImage: the-interns-alerting-tool-outlasted-the-platform-it-monitored.png
layout: blog
---

Three interns shipped a Slack alerting tool during their ten-week stint at Capital One in 2017. The microservices platform it monitored got refactored twice, re-architected once, and partially deprecated. The alerting tool kept running. Last I heard, a version of it was still in use years after those interns had moved on to full-time roles elsewhere.

That outcome wasn't accidental. It was the result of a deliberate decision about what interns should build — and a broader philosophy about engineering mentorship that I've carried into every team I've led since.

Most engineering internship programs get this wrong, and the mistake is always the same.

## The Trophy Project Trap

The standard playbook for engineering interns looks like this: assign them a contained, low-risk feature on an existing product. Something visible enough that leadership can point to it in a review, but isolated enough that if the code is terrible, nobody's pager goes off. A dashboard nobody asked for. A reporting feature that duplicates what already exists in Datadog. A proof-of-concept that proves a concept everyone already agreed on.

I call these trophy projects. They exist to make the internship program look productive in a slide deck. They teach interns almost nothing about how professional software engineering actually works, because professional software engineering is fundamentally about solving problems that real users have under real constraints.

At Capital One, I was running a greenfield team building cloud-native microservices in GoLang and Java Spring Boot for the upmarket credit card business. We were moving fast — standing up real-time credit card controls, event-driven identity verification, integration APIs for fintech partners. The operational surface area was growing faster than our observability. Engineers were getting paged for issues they discovered too late, and our SNS alerting was a patchwork of manual configurations that nobody fully understood.

This was a real problem. Real users — our own engineers — were suffering from it daily. So when three interns showed up, I gave them the problem.

## Give Interns the Problem, Not the Solution

Here's what I didn't do: I didn't hand them a spec. I didn't tell them to build a Slack bot. I didn't prescribe SNS as the notification backbone. I told them: "Our team finds out about operational issues too late. The alerting we have is fragile and inconsistent. Fix it."

Then I did three things that made the difference:

**1. I paired them with senior engineers who cared about the problem.**
Not a dedicated "intern mentor" whose job was to babysit. Engineers who were personally annoyed by the alerting gap and had opinions about what good looked like. The interns got real code reviews, real architectural pushback, and real answers to the question "why does this matter?"

**2. I made their users accessible.**
The users were the engineering team itself. Interns could walk to someone's desk, watch them respond to an incident, and see firsthand what information was missing, what was noisy, and what came too late. No product requirements document can substitute for watching a user struggle.

**3. I scoped ruthlessly but didn't prescribe the approach.**
Ten weeks is not a lot of time. I constrained the scope to SNS-to-Slack alerting for our specific services. But within that scope, the interns owned the design. They chose the architecture, the data model, the configuration approach. They made mistakes — an early version polled instead of subscribing, which was a great teaching moment about event-driven patterns — and they corrected them.

The result was a tool that the team actually adopted because it solved a problem the team actually had. It wasn't a trophy. It was infrastructure.

## Why the Tool Outlasted the Platform

The alerting tool survived because it was built against a stable abstraction — the operational need for timely, actionable notifications — rather than against the implementation details of any specific service. When the underlying microservices got refactored, the alerting configurations adapted because the interns had designed them to be decoupled from service internals.

This wasn't because the interns were architectural geniuses. It was because their senior engineer mentors pushed them toward that design during code reviews. The interns learned a principle — couple to interfaces, not implementations — not because someone lectured them about it, but because a staff engineer sent back a PR with the comment: "What happens when we rename this service next quarter?"

That's mentorship. Not the org-chart kind. The pull-request kind.

## The Framework I Use Now

I've scaled the Americas SE team at Solace from 5 to 15 engineers, and I've applied the same philosophy to onboarding junior engineers and mentoring across the organization. The framework is simple:

**Real problem → Real users → Real constraints → Real ownership.**

Every element matters. Remove "real users" and you get a science project. Remove "real constraints" and you get over-engineering. Remove "real ownership" and you get someone else's feature with an intern's name on it.

When I interview candidates now — at any level — I listen for whether they can describe a time they solved a problem for a specific person. Not "I built a system that processed N transactions." I want to hear: "The ops team was getting woken up at 3 AM for non-critical alerts, so I built X, and the false-positive pages dropped by Y."

The specificity of the user and the problem tells me everything about whether someone has been mentored well or just assigned work.

## The Meta-Lesson

I think about those three interns whenever I see discourse about whether junior engineers can be productive, whether AI tools are replacing entry-level roles, or whether internship programs are worth the investment.

The answer to all three is the same: it depends entirely on whether you give people real problems and real support. An intern with a trophy project and a distracted mentor learns nothing. An intern with a genuine pain point, accessible users, and senior engineers who review their code with rigor and respect becomes a professional engineer in ten weeks.

I use Claude Code now to compress my own cycle times — I built an ESP32 video streaming demo in a day, I automated this blog's entire publishing pipeline. AI tooling is a genuine force multiplier. But the multiplier is zero if the person wielding it has never been taught to identify real problems, design for real constraints, and listen to real users.

That's not something you learn from a tool. It's something you learn from a senior engineer who cares enough to send back your PR with a hard question.

The three interns at Capital One shipped a tool that outlasted the platform it monitored. That's not a testament to their code. It's a testament to the engineers who reviewed it.