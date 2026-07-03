---
author: Thomas Kunnumpurath
title: "The Technical Interview Question I Stopped Asking (And The One That Replaced It)"
date: 7/3/2026
category: "Leadership"
headerImage: the-technical-interview-question-i-stopped-asking-and-the-one-that-replaced-it.png
layout: blog
---

When I started scaling our pre-sales engineering team at Solace from 5 to 15 people, I made every hiring mistake in the book — and I made them confidently, which is the worst kind.

My first three interview loops looked like what you'd expect from someone with a Deutsche Bank trading infrastructure background. I'd whiteboard a messaging architecture problem, ask candidates to walk me through topic hierarchy design, probe their understanding of guaranteed delivery semantics versus best-effort, maybe throw in a curveball about partition ordering in Kafka versus Solace's native topic routing. Technical rigor. Deep protocol knowledge. The stuff I valued because it's the stuff I'd built my career on.

The candidates who aced those interviews were technically excellent. Some of them were also terrible systems engineers.

## Technical Depth Is Table Stakes, Not the Differentiator

Here's what I learned the hard way: a pre-sales or solutions engineer who can architect a perfect event mesh on a whiteboard but cannot read the room during a customer discovery call is a liability, not an asset. And this isn't unique to pre-sales — it applies to any engineering role where the output isn't just code, but decisions that affect other humans.

At Deutsche Bank, I led the firm-wide migration from TIBCO Rendezvous to Solace. That project succeeded not because we had the deepest protocol experts (we did), but because we had engineers who could sit with a trading desk — people who measured their day in microseconds and basis points — and translate "we're changing your messaging backbone" into "here's how your P&L visibility gets better." The engineers who couldn't make that translation created resistance that nearly killed the project twice.

So I stopped screening for technical skills first. Not because they don't matter — they absolutely do. But because I was optimizing for the wrong thing at the wrong stage of the funnel.

## The Question I Retired

The question I dropped: *"Walk me through how you'd design a topic hierarchy for a multi-region event mesh supporting three lines of business with different latency requirements."*

It's a good question. It tests real architectural thinking. But here's the problem: it only tests whether someone can solve a problem I've already framed for them. In client-facing engineering — and honestly, in most engineering — the hard part isn't solving the problem. It's figuring out which problem to solve.

Every candidate who'd read our docs could give me a reasonable answer. The signal-to-noise ratio was terrible.

## The Question That Replaced It

Now the first substantive question in every interview I run is a variant of this:

*"Tell me about a time you walked into a technical conversation and realized the customer — or stakeholder — was solving the wrong problem. What did you do?"*

Then I shut up and listen.

The answers reveal everything I actually need to know:

**Do they listen before they prescribe?** When we broke into the airlines vertical at Solace, I knew nothing about airline operations. My first instinct was to lead with Solace's event mesh capabilities and let the technology sell itself. That failed. What worked was spending two weeks just listening — understanding how irregular operations cascade through crew scheduling, gate assignments, and passenger rebooking. The solution we eventually proposed looked nothing like what I would have designed in week one. I need engineers who have that instinct.

**Can they challenge a customer without alienating them?** At Capital One, we rewrote credit card controls in GoLang. The performance gains were real, but the hard conversation wasn't about performance — it was explaining to a Java team three months into a project why we were changing languages. The engineers who handled that well didn't lead with "Go is better than Java." They led with "here's the latency problem we're actually trying to solve, and here's why our current approach has a ceiling."

**Do they know the difference between being right and being effective?** I've watched brilliant engineers lose deals — and lose internal arguments — because they couldn't distinguish between proving a technical point and achieving a business outcome.

## The Framework I Use Now

After three years of iterating on this, here's the actual rubric I use. I score candidates on four dimensions, in this order:

1. **Discovery instinct** — Can they ask questions that reframe a problem? Do they resist the urge to solutioneer in the first five minutes?
2. **Translation ability** — Can they explain a technical concept to a non-technical stakeholder without dumbing it down or being condescending?
3. **Architectural range** — Can they think across the stack, not just in their comfort zone? An SE who only knows messaging but can't reason about what happens at the application layer is half an engineer.
4. **Technical depth** — Do they actually understand the protocols, the tradeoffs, the failure modes? This matters enormously, but I evaluate it last because the other three are harder to teach.

The counterintuitive finding: when I flipped this order, the technical depth of my hires actually went *up*, not down. Engineers with strong discovery instincts tend to be genuinely curious people, and genuinely curious people tend to have built more things and understood more systems than credential-collectors who memorized the right answers.

## Why This Matters Beyond Hiring

I've been building with Claude Code extensively — an ESP32 video streaming demo in a day, an automated blog pipeline, a local stock screener with open-source models. Every one of these projects reinforced the same lesson: the AI handles the scaffolding; my two decades of systems experience handles the design. But "the design" isn't just architecture. It's knowing which problem is worth solving, which tradeoff is acceptable, and which shortcut will cost you later.

As AI coding tools get better, the engineers who differentiate themselves won't be the ones who write the fastest code or know the most APIs. They'll be the ones who can walk into an ambiguous situation, figure out what actually matters, and build the right thing — not just build the thing right.

That's the skill I hire for now. Technical depth is the price of admission. The ability to figure out which problem to solve — that's the actual job.

If you're building an engineering team, flip your rubric. Screen for discovery instinct first, technical depth last. You'll be surprised how much the overall quality of your hires improves when you stop optimizing for the thing that's easiest to test.