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
    return json({ok:true});
}