import { fail, redirect } from '@sveltejs/kit';
import word from '$lib/server/models/word';
export let prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	add_cathegory,
};

// @ts-ignore
async function add_cathegory({ cookies, request, params }) {
	const data = await request.formData();
	const name = data.get('cathegory');
	const user_id = cookies.get('session');
	const dictionary_id = params.dictionary_id;
	console.log(`find unerfind `, name, user_id, dictionary_id);
	await word.add_cathegory({ user_id, dictionary_id, name});

	throw redirect(303, './dictionary');
}

