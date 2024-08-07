import { fail, redirect } from '@sveltejs/kit';
import trainings from '$lib/server/models/trainings';
export let prerender = false;


// @ts-ignore
export async function load({ locals, params}) {
	const user_id = locals.session;
	const dictionary_id = params.dictionary_id;
	let current_cathegory = params.current_cathegory;
	const words = await trainings.get_words50({ user_id, dictionary_id, current_cathegory });
	//console.log(`Words: `, words);
	return words;
}
