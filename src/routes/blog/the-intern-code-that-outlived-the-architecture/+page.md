---
author: Thomas Kunnumpurath
title: "The Intern Code That Outlived the Architecture"
date: 5/29/2026
category: "Leadership"
headerImage: the-intern-code-that-outlived-the-architecture.png
layout: blog
---

Three interns shipped code at Capital One that outlasted the microservices platform it was built on. That fact taught me more about engineering leadership than any management book I've read.

It was 2017. I was running a greenfield team building cloud-native microservices for the upmarket credit card business. We had GoLang services, Java Spring Boot services, AWS infrastructure — the full modern stack. I also had three engineering interns for the summer, and a decision to make: give them a safe, isolated project that couldn't break anything, or put them on something real.

I chose real.

## The Safe Project Trap

The conventional wisdom with interns is containment. Give them a documentation project. Let them shadow senior engineers. Maybe build an internal tool that nobody depends on. The logic is risk mitigation: interns are temporary, so don't let them touch anything permanent.

This logic is exactly backwards.

When you give interns throwaway work, you get throwaway results — and you've wasted the most valuable thing about having interns on your team: fresh eyes on problems your senior engineers have normalized. Every team accumulates operational pain that experienced engineers stop noticing because they've built workarounds. Interns haven't built those workarounds yet. They still feel the pain.

At Capital One, the pain was operational visibility. Our microservices were humming along, but when something failed at 2 AM, the alerting path was: CloudWatch alarm → email → someone checks email → maybe they wake up. In 2017, this was embarrassingly common even at sophisticated engineering organizations.

## What the Interns Actually Built

I pointed the three interns at this problem and gave them constraints, not instructions. The constraints: alerts had to flow through SNS, notifications had to land in Slack where engineers actually lived, and the system had to be self-service so any team could onboard their own alerting without filing a ticket.

What I didn't give them was an architecture diagram. I didn't tell them which libraries to use. I didn't pair them with a senior engineer who would inevitably take over the keyboard.

Instead, I did something that felt risky at the time: I made myself available for design reviews and architectural questions, but I refused to write code for them. When they got stuck on SNS fan-out patterns, I asked questions until they found the answer. When their first Slack integration attempt was a mess of hardcoded webhooks, I asked "what happens when a new team wants to use this?" and let them redesign it.

The result was an SNS-to-Slack alerting pipeline that every engineering team in the org adopted within weeks of deployment. It wasn't the most elegant code I'd ever reviewed. But it solved a real problem, it was operationally sound, and — here's the part that still gets me — it was still running long after the microservices architecture it monitored had evolved through multiple iterations.

## Why Intern Code Survives

This seems paradoxical. How does code written by the least experienced engineers on the team have more longevity than the platform architecture designed by senior staff?

Because the interns solved a stable problem with a simple solution.

The microservices platform evolved because business requirements evolved — new partners, new card products, new regulatory requirements. That's expected. Platform architecture should change. But the need to know when something breaks and tell a human about it in a channel they're already watching? That problem hasn't changed since the first engineer got paged.

This is the lesson most engineering leaders miss about mentorship: the goal isn't to give junior engineers easy problems. It's to give them **stable problems** — problems whose shape won't change next quarter — and let them build solutions with enough autonomy to develop real ownership.

## The Framework I Use Now

Seven years and a team scaling from 5 to 15 engineers later, this experience crystallized into a framework I use for every delegation decision, not just with interns:

**1. Problem stability:** Is the problem itself likely to change, or just the implementation? Stable problems are perfect for developing engineers. Shifting problems require experienced pattern-matching.

**2. Blast radius clarity:** Can you define clear boundaries where a bad solution causes inconvenience rather than catastrophe? The intern alerting project had a natural blast radius: worst case, alerts don't fire and we fall back to email. Not great, but not a production outage.

**3. Feedback loop speed:** Will the person know quickly whether their solution works? The interns could test their alerting pipeline by triggering synthetic failures. They didn't have to wait weeks for production validation.

When all three conditions are met, hand the problem to the least experienced person who can credibly attempt it. Then get out of their way — but not out of the building.

## The Servant Leadership Corollary

There's a version of servant leadership that's essentially micromanagement wearing a humble t-shirt. "I'm here to remove obstacles for you" becomes "let me review every decision before you make it." That's not service. That's control with better branding.

Real servant leadership in engineering means accepting that someone will build something differently than you would — maybe even worse than you would by some objective measure — and recognizing that the organizational capability built by letting them own it outweighs the marginal quality difference.

When I scaled Solace's Americas SE team from 5 to 15, I stopped screening for technical skills first during hiring. Instead, I screen for what I saw in those interns: the instinct to own a problem end-to-end rather than waiting for permission at each step. Technical skills are trainable. Ownership instinct is not.

The engineers I've managed who grew fastest — at Deutsche Bank, at Capital One, at Solace — all share one trait: they were given a real problem with real stakes before they felt ready, and someone trusted them enough to let them struggle productively.

## The Uncomfortable Math

Here's what I want every engineering leader to sit with: if the most durable code your team ships could have been written by an intern with the right problem and the right constraints, what does that say about where your senior engineers' time should actually go?

It says senior engineers should spend less time writing code for stable problems and more time doing what only experience enables: identifying which problems are stable, defining the constraints that make delegation safe, and building the judgment of the people around them.

The interns left Capital One at the end of that summer. Their code didn't. And neither did the lesson: the highest-leverage thing a leader builds isn't software. It's the engineer who builds the software that outlasts you.