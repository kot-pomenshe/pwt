import { fail, redirect } from '@sveltejs/kit';
import word from '$lib/server/models/word';
export let prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	import_cathegory,
};

// @ts-ignore
async function import_cathegory({ cookies, request, params }) {
	const data = await request.formData();
	const cathegory_id = data.get('cathegory');
	const user_id = cookies.get('session');
	const dictionary_id = params.dictionary_id;
	console.log(`CAT USE DICT `, cathegory_id, user_id, dictionary_id);
	let words_of_cathegory = await word.get_words_of_cathegory(dictionary_id, cathegory_id);
	console.log(`WRDS OF CTG `, words_of_cathegory);
	let dict_catheg = await word.check_dictionary(cathegory_id);
	console.log(`dict catheg check`, dict_catheg);
	//проверяем, что выбран словарь, соответсвующий словарю категории
	let error;
	if(dict_catheg != dictionary_id){
		error = fail(400, { different_dictionaries: true });
		console.log(`словарь не подходит`);
	}
	if (error) {
		return error;
	}
	console.log(`словарь подходит`);
	//добавляем пользователю категорию в список категорий
	word.add_user_has_cathegory({ user_id, cathegory_id });
	console.log(`добавили категорию пользователю`);
	//для кажого слова из категории добавляем его пользователю в связь юзер_хез_транслейшон
	for (let i of words_of_cathegory){
		await word.import_translation(user_id, i.id);
		console.log(`Добавили слово `, i.id);
	}


	//await word.add_cathegory({ user_id, dictionary_id, name});
	//get info и присвоить новому

	throw redirect(303, './dictionary');
}

