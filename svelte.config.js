import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import {mdsvex} from "mdsvex";
import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {

	extensions: ['.svelte', '.md'],


	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		mdsvex({
			extensions:['.md'],
			
		}),
		
	],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: 'build',
            assets: 'build',
            fallback: undefined,
            precompress: false,
            strict: true,
			paths: {
				base: dev ? ',' : process.env.BASE_PATH,
			},
			prerender: {
				entries:  [
					"blog/a-scalable-websocket-fanout-solution-for-your-high-performance-kafka-deployment",
					"blog/build-a-proximity-detection-system-with-a-raspberry-pi-solace-pubsub-and-javascript",
					"blog/creating-an-openfin-event-mesh-across-the-hybrid-cloud",
					"blog/dapr-with-solace-pubsub",
					"blog/event-driven-elixir",
					"blog/event-driven-machine-learning",
					"blog/event-driven-zinc-search-logging",
					"blog/handling-openfin-inbound-events-from-the-hybrid-cloud",
					"blog/how-to-use-rust-webassembly-javascript-and-pubsub-to-run-native-apps-in-your-browser",
					"blog/linking-vuex-state-machines-across-your-vue-client-applications-with-solace-pubsub",
					"blog/openfin-apps-need-more-than-just-rest",
					"blog/rainbow-wallet-bringing-ethereum-to-the-masses",
					"blog/solace-pubsub-queue-redelivery-delayer",
					"blog/the-importance-of-message-settlement-for-event-driven-architectures",
					"blog/using-graphql-to-query-the-state-of-your-event-mesh",
					"blog/why-the-pyth-network-needs-an-event-mesh"
				  ]
			}
        })
	}
};

export default config;
