---
author: Thomas Kunnumpurath
title: "AI Coding Isn't a Shortcut, It's My VP Superpower for Staying Hands-On"
date: 3/13/2026
category: "AI/ML"
headerImage: ai-coding-isnt-a-shortcut-its-my-vp-superpower-for-staying-hands-on.png
layout: blog
---

A client once challenged me about Solace’s capabilities for real-time video streaming over IoT. They were skeptical. Their engineers were skeptical. Rather than show another slide deck, I simply said, “Let me build it for you.”

That night, I picked up an ESP32 camera module, set up a Solace event broker, and started coding. By lunch the next day, I had a complete, working demo: the ESP32 captured live video, published individual frames as messages over Solace, and a real-time web dashboard rendered the stream. The demo landed. The client’s skepticism vanished. That kind of rapid prototyping wasn’t possible for me a year ago. What changed? AI coding assistants.

### The VP’s Dilemma: Staying Grounded Amidst Strategic Heights

As a Vice President, leading a team of 15 systems engineers across the Americas, I face a constant tug-of-war. My role demands strategic vision, C-suite presentations, and global partnership management. But my core identity, my conviction, is that of a practicing engineer who never stopped coding. The hardest part of this job isn’t the budget or the politics; it’s staying genuinely hands-on, remaining close enough to the code to truly understand the friction my team faces, and to never ask them to do something I wouldn't do myself.

Conventional wisdom might suggest that AI coding tools are for junior developers, a shortcut for those still learning the ropes. Or, worse, that they're a crutch that replaces fundamental engineering knowledge. I vehemently disagree. For an experienced engineer, especially one in a leadership role, AI coding assistants are not a shortcut; they are a force multiplier. They are my superpower for staying hands-on without sacrificing strategic bandwidth.

### My AI-Assisted Toolkit: From IoT to Content Automation

My conviction comes from doing, not just observing. I’ve aggressively experimented with AI tooling, both professionally and in personal projects, and the results have reshaped my understanding of what it means to be a "hands-on leader" in the AI era.

#### The ESP32 Video Streaming Demo: Eliminating the Friction Between Idea and Proof

Let’s go back to that ESP32 demo. What did *I* bring to the table? Nearly two decades of experience with mission-critical systems: a deep understanding of MQTT, the nuances of event brokers, web architecture, and, crucially, the often-painful process of debugging embedded systems and hardware at 2 AM. That foundational knowledge allowed me to design the overall system, understand the protocols, and identify potential failure points.

What did Claude Code bring? It handled the boilerplate. It generated the initial Arduino code to interface with the camera, set up the basic web server, implemented the JSON encoding for video frames, and integrated with the Solace API. This eliminated hours of tedious research on specific library calls, syntax, and common setup patterns. It didn't replace my engineering knowledge; it eliminated the friction between having an idea and proving it works. It allowed me to focus on the architectural design and the critical path, while the AI handled the scaffolding. The value wasn't just speed; it was the ability to *validate a complex idea* in a day, turning skepticism into conviction.

#### The tkthetechie.io Automated Content Pipeline: Automating Discipline, Not Thinking

Another example is the very pipeline that generates, formats, and publishes these blog posts to tkthetechie.io. As a thought leader, consistent content is vital, but carving out hours each week for writing and publishing is a luxury I don't have. So, I built an automated content pipeline in TypeScript, orchestrated via GitHub Actions, using the Anthropic Claude API and Google Gemini for content generation, and Cloudflare Workers AI for header images.

What I learned here is profound: AI tooling is most powerful when it automates the *discipline*, not the thinking. It doesn't write *what* I want to say; it handles the *mechanics* of how it gets said and published. This frees up my strategic bandwidth to focus on crafting the core message and connecting it to my experiences, rather than wrestling with SvelteKit-compatible output or Twitter character limits. It’s an automation of the routine, allowing me to focus on the truly creative and strategic aspects of communication.

#### OpenClaw Stock Screener: The Real Cost of AI Inference

I also deployed a private AI system on my MacBook to screen stocks and deliver weekly investment reports. Running inference locally with open-source models gave me direct, firsthand experience with the operational gap between cloud AI APIs and on-device models. The latency, cost, privacy implications, and model quality tradeoffs are things you can only truly understand by *building and operating* such a system yourself, not by reading whitepapers. It reinforced that building, even for personal projects, provides invaluable professional insights.

### Redefining “Hands-On” for Leaders in the AI Era

My experiences have clarified a crucial point: AI doesn't diminish the need for deep engineering knowledge; it changes *how* we apply it. For leaders, "hands-on" doesn't necessarily mean writing every line of production code. It means being able to:

1.  **Rapidly prototype and experiment:** Quickly validate architectural concepts or new technologies without months of development. This shortens feedback loops and accelerates innovation.
2.  **Understand the tooling your team uses:** By actively using AI coding assistants, I gain firsthand insight into their strengths, weaknesses, and the unique challenges they present. This allows me to remove obstacles for my team more effectively and advocate for the right tools.
3.  **Debug AI-generated code effectively:** AI isn’t perfect. Its output often needs refinement and debugging. My years of experience debugging Go memory leaks or Java threading issues are more relevant than ever. AI handles the boilerplate; I handle the nuanced fixes and architectural considerations.
4.  **Lead by doing:** My leadership philosophy is servant leadership. Never asking someone to do something I wouldn't do myself means staying technically relevant. AI helps me bridge the gap between strategic leadership and technical contribution.

### The Future of Engineering Leadership: Always a Builder

In an era of rapid technological change, leaders who remain builders—who actively engage with emerging technologies like AI, not just observe them—will be the most effective. They will narrow the gap between strategic vision and technical reality, fostering environments of rapid innovation and deep understanding. They will be better equipped to make informed decisions about technology investments, operational challenges, and talent development.

My advice for any engineering leader, or any engineer looking to grow: don't just observe AI. Pick a real problem, a quick demo, or even a tool to automate part of your workflow, and build it with an AI coding assistant. Get your hands dirty. Experience the friction reduction yourself. You’ll be surprised at what you can achieve in a day, and more importantly, how it profoundly shifts your perspective on leadership and engineering in the AI era.
