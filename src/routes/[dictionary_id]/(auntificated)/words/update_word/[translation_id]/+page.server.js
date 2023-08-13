
import word from '$lib/server/models/word';

export const prerender = true;

export async function load({ locals, params }) {
        let {translation_id, dictionary_id} = params;
        let current_word_info = await word.get_current_word(locals.session, dictionary_id, translation_id);
        return {current_word_info: current_word_info, user_id: locals.session, translation_id: params.translation_id};
}

