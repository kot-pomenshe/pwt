// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import trainings from '$lib/server/models/trainings';
import word from '$lib/server/models/word';
export const prerender = true;

export async function load({ locals, params}) {
	if (locals.session) {
		const dictionary_id = params.dictionary_id;
		let user_id = locals.session;
		const trainings_statistics = await trainings.get_statistics({ user_id, dictionary_id });
		let counted_words = await word.count_words({ user_id, dictionary_id });
		let done_words = await word.count_done_words({ user_id, dictionary_id });
		return {counted_words, done_words, trainings_statistics};
	}
}