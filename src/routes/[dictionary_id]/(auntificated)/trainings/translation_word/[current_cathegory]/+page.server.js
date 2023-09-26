import { fail, redirect } from '@sveltejs/kit';
import trainings from '$lib/server/models/trainings';
export let prerender = false;


// @ts-ignore
export async function load({ locals, params}) {
	const user_id = locals.session;
	const dictionary_id = params.dictionary_id;
	let current_cathegory = params.current_cathegory;
	let error;
	const words = (await trainings.get_words({ user_id, dictionary_id, current_cathegory })).words;
	const second_words = (await trainings.get_first_words({ user_id, dictionary_id })).words.map(i=>i.name1);
	if (words.length < 4) {
		error = fail(400, { less_words: true });
		console.log(`Недостаточно слов для тренировки `);
		
		//throw redirect(303, '../trainings/choose_train');
	}
	//console.log(`SNDwrdsmap `, second_words);
	return {words, second_words};
}
