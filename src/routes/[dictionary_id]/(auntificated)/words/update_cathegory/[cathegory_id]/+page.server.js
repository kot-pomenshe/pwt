import word from '$lib/server/models/word';

export async function load({ locals, params }) {
	let cathegory_id = params.cathegory_id;
	let cathegory_info = await word.get_cathegory_info(cathegory_id);
	
	let translation_ids = new Set();
	let unique_words = [];
	let words = (
		await word.get_words_with_cathegories(locals.session, params.dictionary_id) //получаем все слова с дублями строк для всей категории
	).word_data.map((w) => {
		let belongs_to_cathegory = w.cathegory_id == cathegory_id; //прооверяем, принадлежит ли слово текущей категории
		let result = { ...w, belongs_to_cathegory }; //дописываем строку, принадлежит ли
		if (belongs_to_cathegory && !translation_ids.has(w.transation_id)) { //если слово принадлежит категории и его нет в массиве слов принадлежащих категории
			translation_ids.add(w.translation_id); //добавляем в массив слов, принадлежащих категории
			unique_words.push(result); //добавляем в уникальные
		}
		return result;
	});
	//console.log(`trisd `, translation_ids);
        
	for (let i of words) { //проходим по всему смешанному массиву
                //console.log(`Проходим по всему смешанному массиву `, i);
                //console.log(`Есть ли в правильных: `, i.translation_id);
		if (!translation_ids.has(i.translation_id)) { //если слова нет в правильных
                      //  console.log(`Слова нет в правильных`, i.translation_id);
			translation_ids.add(i.translation_id); //добавляем в правильные
			unique_words.push(i);//добавляем в уникальные
		}
	}

	let is_author = cathegory_info.cathegory_info.author == locals.session;

        //console.log(`unique wrds `, unique_words);
	return { cathegory_info, words:unique_words, is_author };
}
