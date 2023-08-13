
import word from '$lib/server/models/word';

export const prerender = false;

export async function load({ locals, params }) {
        let {translation_id, dictionary_id} = params;
        let res = await word.get_current_word(locals.session, dictionary_id, translation_id);
        return {res: res, user_id: locals.session, translation_id: params.translation_id};
}

