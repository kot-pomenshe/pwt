import { fail, redirect } from '@sveltejs/kit';
import trainings from '$lib/server/models/trainings';
export let prerender = false;


// @ts-ignore
export async function load({ locals, params}) {
	const user_id = locals.session;
	const dictionary_id = params.dictionary_id;
	let current_cathegory = params.current_cathegory;
	if(current_cathegory == 0){
		current_cathegory = '*';
	}
	const words = (await trainings.get_words({ user_id, dictionary_id, current_cathegory})).words;
	const second_words = (await trainings.get_second_words({ user_id, dictionary_id })).words.map(i=>i.name2);
	let error;
	if (words.length < 4) {
		error = fail(400, { user_not_found: true });
		console.log(`Недостаточно слов для тренировки `);
		//redirect
	}
	console.log(`wrdsmap `, words);
	return {words, second_words};
}
