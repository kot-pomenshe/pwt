import { json } from '@sveltejs/kit';
import statistics from '$lib/server/models/statistics';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, locals, cookies, params}) {
    const dictionary_id = params.dictionary_id;
    const user_id = locals.session;
    let total_score = await statistics.get_total_score({user_id, dictionary_id});
    let trainings_amount = await statistics.get_trainings_amount({user_id, dictionary_id});
    console.log(`SCORE: `, total_score, trainings_amount);
    total_score = total_score + 5;
    //trainings_amount = trainings_amount + 1;
    console.log(`SCORE 2: `, total_score, trainings_amount);
    statistics.update_score({user_id, dictionary_id, total_score, trainings_amount});

    let date =  new Date().toISOString().slice(0, 19).replace('T', ' ');

    let training_type = 11;
    statistics.set_research_stat({user_id:locals.session, last_training_time: date, training_type: training_type, trainings_amount: null, first_training_time: null, mistakes_amount: null});
    return json({ok:true});
}