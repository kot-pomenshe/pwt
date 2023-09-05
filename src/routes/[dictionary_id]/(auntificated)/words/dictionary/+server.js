import { json } from '@sveltejs/kit';
import words from '$lib/server/models/word';


/** @type {import('../$types').RequestHandler} */
export async function DELETE({request, locals, cookies, params}) {
    //let {translation_id} = params;
   
    let translation_id = await request.json();
    console.log(`translation id: `, translation_id);
    words.delete_word(locals.session, translation_id);
    return json({ok:true});
}