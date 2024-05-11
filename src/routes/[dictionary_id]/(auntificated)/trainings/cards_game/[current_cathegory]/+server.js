import { json } from '@sveltejs/kit';
import trainings from '$lib/server/models/trainings';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, locals, cookies, params}) {
    
    let today = new Date();
    let training = await request.json();
    //console.log(`training: `, training);

    let sum = 0;
    for (let i of training){
        if (i.answer) sum+=1;
    }
    let result = `${sum}/${training.length}`;
    //console.log(`result: `, result);

    let date =  new Date().toISOString().slice(0, 19).replace('T', ' ');
   for(let tw of training){
        //console.log(`tw_show: `, tw);
        trainings.update_word_statistics({trainings_amount: tw.trainings_amount+1, mistakes_amount: tw.mistakes_amount, last_training_time: date, has_studied: tw.has_studied, translation_id: tw.translation_id, user_id: locals.session});
    }
    const dictionary_id = params.dictionary_id;
    trainings.set_statistics(locals.session, dictionary_id, date, result);
    return json({ok:true});
}