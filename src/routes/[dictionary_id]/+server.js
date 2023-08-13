import { json } from '@sveltejs/kit';
import word from '$lib/server/models/word';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, locals, cookies}) {
    let dictionary = await request.json();
    let {dictionary_id} = dictionary;
    let words = await word.get_words(locals.session, dictionary_id);
    return json({words});
}