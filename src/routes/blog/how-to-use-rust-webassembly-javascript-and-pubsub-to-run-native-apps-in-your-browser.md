---
author: TKTheTechie
title: How to Use Rust, WebAssembly, JavaScript, and PubSub+ to Run Native Apps in Your Browser
date: 10/15/2020
category: Dev
headerImage: rest-web-assembly-solace-blog.jpeg
---


As the popularity of JavaScript has improved over the years, desktop applications have increasingly started moving away from thick-clients using languages such as .NET and Java to thin-clients like those built out with JavaScript. Frameworks such as [OpenFin](http://www.openfin.co/) and [Electron](https://www.electronjs.org/) have exploded in growth in recent years because of this trend. However, browser-based JavaScript applications do not have the ability to call native code so browser-based JavaScript applications have been relegated, for the most part, to the presentation layer while more heavy weight processing has been moved to the server side. While this works well for a lot of the use cases as desktop and laptop computers continue to get upgraded with more cores, a tremendous amount of processing capability is being left unused.

In this blog post, I will explain how using technology like Rust, WebAssembly, JavaScript (via the Svelte framework), and Solace PubSub+ enables you to reclaim some of that processing power while you continue to use your modern HTML5 applications through a very basic implementation of an options pricer in the browser. Whew … those were a lot of buzzwords. Let’s start by breaking each of them down.


## Rust
[Rust](https://www.rust-lang.org/) is an exciting new programming language from the fine folks over at the Mozilla foundation. It’s a low-level language that offers extreme performance with no run-time since it targets the [LLVM](https://llvm.org/). This makes it ideal for embedded/low powered devices. Other notable features are the lack of a garbage collector, strong compile time checks (such as[the borrow checker](https://doc.rust-lang.org/1.8.0/book/references-and-borrowing.html)), support for functional programming constructs (such as closures), and object oriented constructs (via traits). If you’d like to learn more, I highly recommend the [Rust Book](https://doc.rust-lang.org/book/title-page.html).

## WebAssembly

WebAssembly is a binary instruction format that is designed as a compilation target for programming languages allowing them to be deployed onto the web. It also allows for inter-op with JavaScript through a wasm.js module that you can load in your client-side applications. This allows you to take advantage of native code in your web applications.  
[](https://solace.com/wp-content/uploads/2020/10/running-native-code-2.png)

Rust also includes first-class support for compiling down to WebAssembly. With its strong memory safety paradigms, it is an ideal language for this purpose.



## Svelte

[Svelte](https://svelte.dev/) is a no-nonsense JavaScript framework. It primarily differs from the more popular frameworks such as Angular, Vue, and ReactJS due to the fact that it compiles down to pure JavaScript without the need for a heavy framework library to be loaded, making it blazingly fast and the resultant apps extremely small.

## Solace PubSub+

Solace PubSub+ is an advanced event broker that has many advanced features such as the ability to form an [event-mesh](https://solace.com/what-is-an-event-mesh/), [native multi-protocol](https://cdn.solace.com/wp-content/uploads/2019/09/event-broker-diagram-new.jpg) support, and it’s [FREE](https://solace.com/try-it-now/)! Solace PubSub+ will form a core part of the architecture facilitating communication between WebAssembly, JavaScript, and a Rust process.

## An Example Using Options and Options Pricing

An option is a derivative financial instrument that gives the buyer the right to purchase/sell an asset at a specific price. It also allows for the seller of the options contract to generate income on assets that they have in their portfolio by taking a view on whether they see an upswing or downswing in the price of an asset.

Let’s take an example. Say you think the price of AAPL is going to go above $125 from its current price of $100 after they announce the next iPhone. In such a situation, you can buy a CALL option for a strike price at $125 that expires at the end of September. What this means is that if by the end of September, the price of the AAPL stock reaches $150, having the option contract gives you the right to buy AAPL stock at $125 and you can instantly pocket the profit of $25 by selling AAPL back at $150 (minus how much it costs to purchase the option contract of course). However, if the price never reaches $125 by the end of September, your investment in the option becomes worthless and you lost your money. Likewise, a PUT option gives you the ability to sell an asset at a price in case you believe the asset will go down by a certain amount.

Pricing an option is not a straightforward task as there are multiple factors associated with the price known as ‘[The Greeks](https://en.wikipedia.org/wiki/Greeks_(finance))’. While the math behind pricing an option goes beyond the scope of this blog post, I recently stumbled upon a blog post by [Ronnie Chowdhury](https://www.linkedin.com/in/ronnie-chowdhury/) entitled [Probably the fastest Black Scholes Pricer in the world](https://medium.com/@mushfaqueronniechowdhury/probably-the-fastest-black-scholes-pricer-in-world-34103e97f7eb). I recommend reading through the post but the most interesting technical bit of information for me was a topic called [SIMD](https://en.wikipedia.org/wiki/SIMD) that allows the CPU to perform multiple operations with one instruction set.

_With SIMD, instead we could instead act on multiple numbers together._

[![](../images/blog/running-native-code-1.png)](../images/blog/running-native-code-1.png)

_From the above we are iterating over each value and adding them one by one. But you would hope the compiler is clever enough to see that actually there’s an instruction \_mm\_add\_ps() that could do 8 additions in 1 instruction. That’s \*8x \* faster.”_

I was able to make some small changes to Ronnie’s code which you can find [here](https://github.com/solacese/rust-wasm-js-options-pricer/black_scholes_option_pricer) to allow it to be compiled to WebAssembly.

## Bringing it all together

So, we have a highly performant options pricer implemented in Rust. I also created a [Svelte WebApp](https://github.com/solacese/rust-wasm-js-options-pricer/options_pricing_web_app) that compiles the Rust code to WebAssembly and creates a binding to call this code from JavaScript. I also implemented a very bare-bones Rust Options Market Data Simulator that publishes option prices to Solace PubSub+ which you can find [here](https://github.com/solacese/rust-options-data-simulator). The Svelte app will consume these feeds from a Solace PubSub+ Event Broker and make a call to WebAssembly to price the option feed (note: the simulator spits out random data so the option prices generated by the pricer will not be realistic).

[![](../images/blog/running-native-code-3.png)](https://solace.com/wp-content/uploads/2020/10/running-native-code-3.png)

Here is an image of the application in action:

[![](../images/blog/running-native-code-4.gif)](../images/blog/running-native-code-4.gif)


## Conclusion

While WebAssembly interop with JavaScript is arguably in its infancy and will see tighter integration and improved performance over time, hopefully the information and example in this post opens up your mind to the possibilities of using more of your desktop/laptop cores that are sitting idle on your computer for your modern web applications.

To run this yourself, follow the instructions in [this repo](https://github.com/solacese/rust-wasm-js-options-pricer).


The post [How to Use Rust, WebAssembly, JavaScript, and PubSub+ to Run Native Apps in Your Browser](https://solace.com/blog/rust-webassembly-javascript-solace-native-apps-browser/) appeared first on [Solace](https://solace.com/).
