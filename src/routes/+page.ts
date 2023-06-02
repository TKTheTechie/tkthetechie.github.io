import { error } from '@sveltejs/kit';


// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;


/** @type {import('./$types').PageLoad} */
export function load(event) {
    throw error(404, 'Not Found');
}