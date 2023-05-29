---
author: TKTheTechie
title: Event Driven Machine Learning
date: 2/28/2022
category: Dev
headerImage: event-driven-machine-learning.png
---


Machine Learning, as defined by [**Wikipedia**](https://en.wikipedia.org/wiki/Machine_learning), “_is the study of computer algorithms that can improve automatically through experience and by the use of data. It is seen as a part of artificial intelligence. Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications, such as in medicine, email filtering, speech recognition, and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks._“  
  
Running a machine learning algorithm/program on your data is only part of the puzzle – once you get the signal or result, you would need to take action on it, typically in combination with other data that is coming in from other sources. Finally, once you’ve done the processing of the output you may want to signal the result to a number of microservices that may be geographically distributed.  
  
This is where you can combine the power of machine learning with event driven architecture to signal the result to all interested parties.   To demonstrate this concept, I built an interactive demo – ‘[**ml-cv-trader**](https://tkthetechie.github.io/ml-cv-trader-ui/)‘ – which is short for ‘machine learning-computer vision-trader’. The application simulates a trading session that lasts for a minute while you use your hand signals to buy/sell/hold a portfolio of stocks. The machine learning uses a tensor-flow.js backed library to determine the hand signal, map it to an action of buying/selling/holding stocks, and ultimately sends the result back to the serverside for processing.  In this blog post, I’ll list out the technology and the architecture involved in making this demo work.

## The Stack

Here is the stack I used to build the demo:  
• [**Svelte**](https://svelte.dev/) – The Svelte Javascript framework has become my goto framework for programming interactive UIs. Among many other things, whats great about this framework is that a Svelte App compiles down to pure Javascript and your resultant web-apps become less bloated.  
• [**Tailwind CSS**](https://tailwindcss.com/) – Tailwind is utility first CSS framework that allows you to configure your CSS and not “code” it – all this without the bloat of other CSS frameworks.  
• [**Node.js**](https://nodejs.org/en/) – A Node server will acts as the backend for this project responsible for sending data to the Svelte front end and responding to requests  
• [**Solace PubSub+**](https://solace.com/) – An enterprise grade event broker that has its roots in low latency messaging which makes it ideal for this demonstration.

#### The Architecture

Lets start with the high level architecture: ![high-level](../images/blog/cv-ml-highlevel.png)

###### UI

There is a lot that actually takes place in the UI – listening to market data events, detecting gestures that take place on the webcam (via the [handtrack.js](https://victordibia.com/handtrack.js/#/) library), and sending streams over to Solace PubSub+. Key to the front-end is the [**Svelte javascript framework**](https://svelte.dev/) that binds everything together. The UI consists of multiple [**Svelte components**](https://svelte.dev/docs#component-format) that are developed in isolation. By making elaborate use of [**Svelte Stores**](https://svelte.dev/docs#run-time-svelte-store), I enabled the different components to share state. The diagram below shows some of the interaction between the various components and the associated Svelte stores: ![cv-ml-ui-arch](../images/blog/cv-ml-ui.png)

##### The Backend

The backend consists of a Node.js server that has a few responsibilities: ![ml-cv-trade-rserver](../images/blog/ml-cv-trader-server.png)

i. Produce Market Data Events  
ii. Save trading session results  
iii. Returning query results for the leaderboard

##### Solace PubSub+

Solace PubSub+ is an enterprise grade event broker that supports many unique features such as a native [**WebSocket streaming protocol**](https://github.com/SolaceSamples/solace-samples-javascripthttps://github.com/SolaceSamples/solace-samples-javascript) allowing you to use it natively with your HTML5 web-apps, [**fine grained filtering of event streams**](https://youtu.be/PP1nNlgERQI), **[event mesh](https://solace.com/what-is-an-event-mesh/)**, access control lists to restrict who can publish/subscribe to what data. 

Another rather unique feature of the Solace PubSub+ Event Broker is the ability to throttle event streams to subscribers using a feature called “[**eliding**](https://docs.solace.com/Basics/Direct-Messages.htm#Message-Eliding)”. In our instance, the back-end server is sending data updates 4 times a second – but we want to only expose the front-end client to a lower frequency of updates – in this case, once a second. By using this feature, the Solace PubSub+ Event Broker can throttle fast streams going to a client that doesn’t need it as quickly.

![ml-cv-server-trading](../images/blog/ml-cv-server-eliding.png)

#### Conclusion

Using Machine Learning to generate interesting insights about your data is only part of the solution. You will need to in real-time react to the insights. Using the event-mesh as the underlying architecture that supports the distribution of your insights so that they can be actioned upon is an ideal approach to accomplish this goal.

If you are interested in taking a look at the code behind this application, visit the following GitHub repos:  
• [**ml-cv-trader-u**](https://github.com/TKTheTechie/ml-cv-trader-ui)i : Svelte Frontend  
• [**ml-cv-trader-server**](https://github.com/TKTheTechie/ml-cv-trader-server): Node.js backend