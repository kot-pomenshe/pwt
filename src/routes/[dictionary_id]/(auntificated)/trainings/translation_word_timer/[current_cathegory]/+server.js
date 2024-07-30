import { json } from '@sveltejs/kit';
import trainings from '$lib/server/models/trainings';
import statistics from '$lib/server/models/statistics';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals, cookies, params }) {
	let training_timestart = await request.json();
	let training = training_timestart.words;
	console.log(`training timestart: `, training_timestart);

	let sum = 0;
	for (let i of training) {
		if (i.answer) sum += 1;
	}
	let result = `${sum}/${training.length}`;
	//console.log(`result: `, result);

	let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	let date_end = new Date();
	let time_start = training_timestart.time_start;
	for (let tw of training) {
		//console.log(`tw_show: `, tw);
		trainings.update_word_statistics({
			trainings_amount: tw.trainings_amount + 1,
			mistakes_amount: tw.mistakes_amount,
			last_training_time: date,
			has_studied: tw.has_studied,
			translation_id: tw.translation_id,
			user_id: locals.session,
		});
	}
	const dictionary_id = params.dictionary_id;
	trainings.set_statistics(locals.session, dictionary_id, date, result);

	let mistakes_amount = training.length - sum;
	const training_type = 2;
    let trainings_amount = await statistics.get_trainings_amount({user_id: locals.session, dictionary_id});

	console.log(`time start: `, time_start);
	console.log(`time end: `, date_end);

	/*
let time_start_seconds = new Date(time_start).getSeconds();
let time_start_milliseconds = new Date(time_start).getMilliseconds();
time_start_seconds = time_start_seconds + time_start_milliseconds/1000;

let time_end_seconds = new Date(date_end).getSeconds();
let time_end_milliseconds = new Date(date_end).getMilliseconds();
time_end_seconds = time_end_seconds + time_end_milliseconds/1000;

console.log(`time start: `, time_start_seconds);
console.log(`time end: `, time_end_seconds);*/

	let time_end = Date.now() / 1000;
	console.log(`time_end_train: `, time_end);

	const first_training_time = time_end - time_start;

	console.log(`time: `, first_training_time);

	statistics.set_research_stat({
		user_id: locals.session,
		last_training_time: date,
		training_type: training_type,
		trainings_amount: trainings_amount,
		first_training_time: first_training_time,
		mistakes_amount: mistakes_amount,
	});

	return json({ ok: true });
}
