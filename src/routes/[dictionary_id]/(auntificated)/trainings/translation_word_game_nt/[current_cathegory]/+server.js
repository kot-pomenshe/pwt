import { json } from '@sveltejs/kit';
import trainings from '$lib/server/models/trainings';
import statistics from '$lib/server/models/statistics';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, locals, cookies, params}) {
    let user_id = locals.session;
    let json_rec = await request.json();

    let training = json_rec.words;
    let time_start = json_rec.time_start;

    let time_end = Date.now() / 1000;

	const first_training_time = time_end - time_start;

    let sum = 0;
    for (let i of training){
        if (i.answer) sum+=1;
    }
    let result = `${sum}/${training.length}`;
    console.log(`result: `, result);

    let date =  new Date().toISOString().slice(0, 19).replace('T', ' ');
   for(let tw of training){
        console.log(`Запись произведена: `, tw);
        trainings.update_word_statistics({trainings_amount: tw.trainings_amount+1, mistakes_amount: tw.mistakes_amount, last_training_time: date, has_studied: tw.has_studied, translation_id: tw.translation_id, user_id: locals.session});
    }
    const dictionary_id = params.dictionary_id;
    await trainings.set_statistics(user_id, dictionary_id, date, result);

    let mistakes_amount = training.length - sum;
    const training_type = 3;

    let total_score = await statistics.get_total_score({user_id, dictionary_id});
    let trainings_amount = await statistics.get_trainings_amount({user_id, dictionary_id});
    trainings_amount = trainings_amount + 1;
    total_score = total_score + 5 + sum*2;
    statistics.update_score({user_id, dictionary_id, total_score, trainings_amount});

    statistics.set_research_stat({user_id:locals.session, last_training_time: date, training_type: training_type, trainings_amount: trainings_amount, first_training_time: first_training_time, mistakes_amount: mistakes_amount});

    return json({ok:true});
}