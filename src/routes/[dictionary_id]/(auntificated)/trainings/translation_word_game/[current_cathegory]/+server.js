import { json } from '@sveltejs/kit';
import trainings from '$lib/server/models/trainings';
import statistics from '$lib/server/models/statistics';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, locals, cookies, params}) {
    let user_id = locals.session;
    let training = await request.json();
    console.log(`training: `, training);

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

    let total_score = await statistics.get_total_score({user_id, dictionary_id});
    let trainings_amount = await statistics.get_trainings_amount({user_id, dictionary_id});
    trainings_amount = trainings_amount + 1;
    total_score = total_score + 5 + sum*2;
    statistics.update_score({user_id, dictionary_id, total_score, trainings_amount});

    return json({ok:true});
}