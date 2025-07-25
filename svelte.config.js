import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import {mdsvex} from "mdsvex";
import adapter from '@sveltejs/adapter-static';
import path from 'path';

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
			extensions: ['.md'],
			layout: {
			  blog: path.resolve('src/routes/blog/post.svelte')
			},
			 smartypants: {
    			dashes: 'oldschool'
  		   	},
		  })
		
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
            precompress: false,
            strict: true,
			paths: {
				base: dev ? ',' : process.env.BASE_PATH,
			},
			
        })
	}
};

export default config;
