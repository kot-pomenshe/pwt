import user from '$lib/server/models/user.js';
import word from '$lib/server/models/word';

export const prerender = "auto";

export async function load({ locals, params }) {
	if (locals.session) {
		let user_id = locals.session;
		console.log(`user_id `, user_id);
		const user_name = await user.get_name(user_id);
		let dictionaries = await word.get_dictionaries(user_id);
		let current_dictionary = await word.get_current_dictionary(params.dictionary_id);
		//console.log(`dctnr: `, current_dictionary);
		return {user_id: locals.session, user_name, dictionaries, current_dictionary};
	}
}
