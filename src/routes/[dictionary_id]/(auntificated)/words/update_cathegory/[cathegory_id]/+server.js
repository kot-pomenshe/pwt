import { json } from '@sveltejs/kit';
import word from '$lib/server/models/word';

export async function POST({ request, locals, params, cookies }) {
	let cathegory = await request.json();
	let words_of_cathegory = (
		await word.get_words_of_cathegory(params.dictionary_id, params.cathegory_id)
	);
    //console.log(`Вордс оф категори `, words_of_cathegory);
    //console.log(`категори `, cathegory);
	let insert_words = [];
	let delete_words = [];
	for (let i of cathegory) {
		if (i.belongs_to_cathegory && !words_of_cathegory.find((p) => p.id == i.translation_id)) {
			insert_words.push(i.translation_id);
			//console.log(`инзёрт пуш `, i.translation_id);
		} else if (!i.belongs_to_cathegory && words_of_cathegory.find((p) => p.id == i.translation_id)
		) {
			delete_words.push(i.translation_id);
           // console.log(`делит пуш `, i.translation_id);
		}
	}

	for (let i of insert_words) {
		word.insert_word_to_cathegory(i, params.cathegory_id);
	}
	for (let j of delete_words) {
		word.delete_word_from_cathegory(j, params.cathegory_id);
	}
	return json({ ok: true });
}
