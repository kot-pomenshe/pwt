import { fail, redirect } from '@sveltejs/kit';
import word from '$lib/server/models/word';
export let prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	add_dictionary,
};

// @ts-ignore
async function add_dictionary({ cookies, request }) {
	const data = await request.formData();
	const language1 = data.get('language1');
	const language2 = data.get('language2');
	const user_id = cookies.get('session');

	//console.log(`log` , user_id, language1, language2);
	await word.add_dictionary({ user_id, language1, language2 });

	throw redirect(303, './dictionary');
}

