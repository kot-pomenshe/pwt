import word from '$lib/server/models/word';

export const prerender = false;

export async function load({ locals, params}) {
        let dictionary_id = params.dictionary_id;
        let cathegories = await word.get_cathegories(locals.session, dictionary_id);
        return {cathegories};
}