import { runQuery, pool } from '$lib/server/db';

async function add_word({
	user_id,
	current_dictionary,
	word,
	translation,
	transcription,
	context,
	category,
	picture_path,
}) { //проверяем, есть ли слово
	const [rows0, fields0] = await pool.execute(' SELECT `name` FROM `word` WHERE `name` = ?', [
		word,
	]); //если нет, добавляем слово
	if (!rows0.length) {
		await pool.execute('INSERT INTO `word` (`name`) VALUES (?)', [word]);
	} //берём айди слова
	const [rows00, fields00] = await pool.execute(
		' SELECT `word_id` FROM `word` WHERE `name` = ?',
		[word],
	); 
	
	let word1_id = rows00[0].word_id;
	console.log(`берём айди слова1`, word1_id);
		//проверяем есть ли второе слово в базе
	const [rows1, fields1] = await pool.execute(' SELECT `name` FROM `word` WHERE `name` = ?', [
		translation,
	]); //если нет, то добавляем
	if (!rows1.length) {
	console.log(`слова нет в базе, добавляем`);
		await pool.execute('INSERT INTO `word` (`name`) VALUES (?)', [translation]);
	} //берём айди второго слова
	console.log(`Добавили. Ищем то, что добавили или было`);
	const [rows11, fields11] = await pool.execute(
		'SELECT `word_id` FROM `word` WHERE `name` = ?',
		[translation],
	);
	console.log(`3`, rows11);
	console.log(`4`, rows11[0]);
	console.log(`5`, rows11[0].word_id);
	let word2_id = rows11[0].word_id;
	console.log(`берём айди слова2`, word2_id);
		//провеярем айди перевода
	const [rows2, fields2] = await pool.execute(
		'SELECT `translation_id` FROM `translation` WHERE `word1_id` = ? AND `word2_id` = ? AND `dictionary_id` = ? AND `transcription` = ? AND `context` = ? AND `picturepath` =  ?',
		[word1_id, word2_id, current_dictionary, transcription, context, picture_path],
	);
	console.log(`есть ли вариант перевода`, rows2);
		//создаём вариант перевода, если такого ещё не было
	if (!rows2.length) {
		await pool.execute(
			'INSERT INTO `translation`(`dictionary_id`, `word1_id`, `word2_id`, `transcription`, `context`, `picturepath`) VALUES (?,?,?,?,?,?)',
			[current_dictionary, word1_id, word2_id, transcription, context, picture_path],
		);
	}
	//достаём айди варианта перевода
	const [rows22, fields22] = await pool.execute(
		'SELECT `translation_id` FROM `translation` WHERE `word1_id` = ? AND `word2_id` = ? AND `dictionary_id` = ? AND `transcription` = ? AND `context` = ? AND `picturepath` =  ?',
		[word1_id, word2_id, current_dictionary, transcription, context, picture_path],
	);
	if (rows22.length) {
		let translation_id = rows22[0].translation_id;
		console.log(`берём айди of the translation`, translation_id);
	await pool.execute(
		'INSERT INTO `user_has_translation`(`translation_id`, `user_id`, `trainings_amount`, `mistakes_amount`, `has_studied`) VALUES (?,?,"0","0","0")',
		[translation_id, user_id],
	);
	}
	return true;
}

async function import_translation(user_id, translation_id) {
	const [rows23, fields23] = await pool.execute(
		' SELECT * FROM `user_has_translation` WHERE `user_id` = ? AND `translation_id` = ? ',
		[user_id, translation_id],
	);

	if (!rows23.length) {
	await pool.execute(
		'INSERT INTO `user_has_translation`(`translation_id`, `user_id`, `trainings_amount`, `mistakes_amount`, `has_studied`) VALUES (?,?,"0","0","0")',
		[translation_id, user_id],
	);}

	return true;
}

async function check_dictionary(cathegory_id ) {
	const [rows5, fields5] = await pool.execute(
		'SELECT `dictionary_id` FROM `cathegory` WHERE `cathegory_id` = ?',
		[cathegory_id],
	);
	console.log(`check dictionary`, rows5);
	//понять, что выводится

	return rows5[0].dictionary_id ;
}

async function delete_word(user_id, translation_id) {
	await pool.execute('DELETE FROM `user_has_translation` WHERE user_id= ? AND translation_id=?', [
		user_id,
		translation_id,
	]);
	return true;
}

async function add_user_has_cathegory({ user_id, cathegory_id }) {
	const [rows00, fields00] = await pool.execute(
		`SELECT * FROM user_has_cathegory WHERE user_id = ${user_id} AND user_id = ${user_id} AND cathegory_id = ${cathegory_id}`,
	);
	if (!rows00.length) {
		await pool.execute(
			'INSERT INTO `user_has_cathegory` (`user_id`, `cathegory_id`) VALUES (?,?)',
			[user_id, cathegory_id],
		);
	}
	return true;
}

async function add_cathegory({ user_id, dictionary_id, name }) {
	//проверяем, что нет такой категории
	const [rows0, fields0] = await pool.execute(
		'SELECT `cathegory_id` FROM `cathegory` WHERE name = ? AND author = ? AND dictionary_id = ?',
		[name, user_id, dictionary_id],
	);
	if (!rows0.length) {
		//добавляем, если нет
		await pool.execute(
			'INSERT INTO `cathegory`(`name`, `author`, `dictionary_id`) VALUES (?,?,?)',
			[name, user_id, dictionary_id],
		);
	}
	console.log(`find другая строка  `, name, user_id, dictionary_id);
	const [rows00, fields00] = await pool.execute(
		//находим идентификатор
		`SELECT cathegory_id FROM cathegory WHERE name = "${name}" AND author = ${user_id} AND dictionary_id = ${dictionary_id}`,
	);
	//console.log(`find unerfind внутри запроса другая  `, rows00);
	let cathegory_id = rows00.slice(0)[0].cathegory_id;
	//console.log(`find unerfind внутри запроса другая строка  `, user_id, cathegory_id);

	await pool.execute(
		'INSERT INTO `user_has_cathegory` (`user_id`, `cathegory_id`) VALUES (?,?)',
		[user_id, cathegory_id],
	);

	return true;
}

async function get_cathegories(user_id, dictionary_id) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `cathegory_id`, `name` FROM `cathegory` INNER JOIN `user_has_cathegory` USING(cathegory_id) WHERE user_id = ? AND dictionary_id = ?',
		[user_id, dictionary_id],
	);
	return { cathegories: rows0 };
}
async function add_dictionary({ user_id, language1, language2 }) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `language_id` FROM `language` WHERE `name` = ?',
		[language1],
	);
	if (!rows0.length) {
		await pool.execute('INSERT INTO `language`(`name`) VALUES (?)', [language1]);
	}
	const [rows00, fields00] = await pool.execute(
		'SELECT `language_id` FROM `language` WHERE `name` = ?',
		[language1],
	);
	let lang1_id = rows00[0].language_id;

	const [rows1, fields1] = await pool.execute(
		'SELECT `language_id` FROM `language` WHERE `name` = ?',
		[language2],
	);
	if (!rows1.length) {
		await pool.execute('INSERT INTO `language`(`name`) VALUES (?)', [language2]);
	}
	const [rows11, fields11] = await pool.execute(
		'SELECT `language_id` FROM `language` WHERE `name` = ?',
		[language2],
	);

	let lang2_id = rows11[0].language_id;

	let lang_name = language1 + ' -> ' + language2;

	const [rows2, fields2] = await pool.execute(
		'SELECT `dictionary_id` FROM `dictionary` WHERE `name` = ? AND id_language1 = ? AND id_language2 = ?',
		[lang_name, lang1_id, lang2_id],
	);
	if (!rows2.length) {
		console.log(`long data name: `, lang_name);
		await pool.execute(
			'INSERT INTO `dictionary`(`name`, `id_language1`, `id_language2`) VALUES (?, ?, ?)',
			[lang_name, lang1_id, lang2_id],
		);
	}
	const [rows22, fields22] = await pool.execute(
		'SELECT `dictionary_id` FROM `dictionary` WHERE `name` = ? AND id_language1 = ? AND id_language2 = ?',
		[lang_name, lang1_id, lang2_id],
	);
	console.log(`params : `, lang_name, lang1_id, lang2_id);
	console.log(`dict id : `, rows22);
	let dictionary_id = rows22[0].dictionary_id;

	await pool.execute(
		'INSERT INTO `user_has_dictionary`(`user_id`, `dictionary_id`) VALUES (?,?)',
		[user_id, dictionary_id],
	);

	return true;
}

async function get_dictionaries(user_id) {
	const [rows1, fields2] = await pool.execute(
		'SELECT user_has_dictionary.dictionary_id, dictionary.name FROM `user_has_dictionary` INNER JOIN dictionary USING(dictionary_id) INNER JOIN `language` AS lang1 ON dictionary.id_language1 = `lang1`.`language_id` INNER JOIN `language` AS lang2 ON dictionary.id_language2 = `lang2`.`language_id` WHERE user_has_dictionary.user_id = ?',
		[user_id],
	);
	return { dictionaries: rows1 };
}

async function get_words(user_id, dictionary_id) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `translation_id`, `has_studied`, `word1`.`name` AS word11, `word2`.`name` AS word12, `translation`.`transcription` AS transcription FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ? ORDER BY translation_id DESC',
		[user_id, dictionary_id],
	);

	return { word_data: rows0 };
}

async function get_words_of_cathegory(dictionary_id, cathegory_id) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `user_has_translation`.`translation_id` as id FROM `user_has_translation` INNER JOIN `translation` ON `translation`.`translation_id` = `user_has_translation`.`translation_id` INNER JOIN `transcription` ON `translation`.`translation_id` = `transcription`.`translation_id` INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` LEFT JOIN `translation_has_cathegory` ON `translation`.`translation_id` = `translation_has_cathegory`.`translation_id` WHERE `dictionary_id` = ? AND `translation_has_cathegory`.`cathegory_id` = ? ORDER BY `user_has_translation`.`translation_id` DESC',
		[ dictionary_id, cathegory_id],
	);
		//console.log(`WORDS OF CATEGORY`, rows0);
	return rows0 ;
}

async function get_words_with_cathegories(user_id, dictionary_id) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `user_has_translation`.`translation_id`, `has_studied`, `word1`.`name` AS word11, `word2`.`name` AS word12, `transcription`, `translation_has_cathegory`.`cathegory_id` FROM `user_has_translation` INNER JOIN `translation` ON `translation`.`translation_id` = `user_has_translation`.`translation_id` INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` LEFT JOIN `translation_has_cathegory` ON `translation`.`translation_id` = `translation_has_cathegory`.`translation_id` WHERE `user_id` = ? AND `dictionary_id` = ? ORDER BY `user_has_translation`.`translation_id` DESC',
		[user_id, dictionary_id],
	);

	return { word_data: rows0 };
}

async function get_cathegory_info(cathegory_id) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `cathegory_id`, `name`, `author`, `user`.`login` as author_name, `dictionary_id` FROM `cathegory` INNER JOIN `user` ON `cathegory`.`author` = `user`.`user_id` WHERE `cathegory_id` = ?',
		[cathegory_id],
	);
	let cathegory_info = rows0[0];

	return { cathegory_info };
}

async function insert_word_to_cathegory(translation_id, cathegory_id) {
	const [rows4, fields4] = await pool.execute(
		'SELECT * FROM `translation_has_cathegory` WHERE `translation_id` = ? AND `cathegory_id` = ?',
		[translation_id, cathegory_id],
	);
	if (!rows4.length) {
		await pool.execute(
			'INSERT INTO `translation_has_cathegory`(`translation_id`, `cathegory_id`) VALUES (?,?)',
			[translation_id, cathegory_id],
		);
	}
	return true;
}

async function delete_word_from_cathegory(translation_id, cathegory_id) {
	//console.log(`удаляем слово из категории `, translation_id, cathegory_id);
	const [rows4, fields4] = await pool.execute(
		'SELECT * FROM `translation_has_cathegory` WHERE `translation_id` = ? AND `cathegory_id` = ?',
		[translation_id, cathegory_id],
	);
	if (rows4.length) {
		await pool.execute(
			'DELETE FROM `translation_has_cathegory` WHERE  `translation_id` = ? AND `cathegory_id` = ?',
			[translation_id, cathegory_id],
		);
	}
	return true;
}

async function get_current_word(user_id, dictionary_id, translation_id) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `has_studied`, `trainings_amount`, `mistakes_amount`, `last_training_time`,`word1`.`name` AS `word11`, `word2`.`name` AS `word12`, `transcription`, `context`, `picturepath` FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ? AND `translation_id` = ?',
		[user_id, dictionary_id, translation_id],
	);

	return { word_data: rows0[0] };
}

async function get_current_dictionary(dictionary_id) {
	const [rows1, fields2] = await pool.execute(
		'SELECT dictionary.dictionary_id, dictionary.name FROM `dictionary` WHERE dictionary_id = ?',
		[dictionary_id],
	);
	return rows1[0];
}

async function count_words({ user_id, dictionary_id }) {
	const [rows0, fields0] = await pool.execute(
		'SELECT COUNT(`word1`.`name`) AS num  FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `transcription` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ?',
		[user_id, dictionary_id],
	);
	let counted_words = rows0[0].num;

	return { counted_words };
}

async function count_done_words({ user_id, dictionary_id }) {
	const [rows0, fields0] = await pool.execute(
		'SELECT COUNT(`word1`.`name`) as num FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `transcription` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ? AND `has_studied` = 1',
		[user_id, dictionary_id],
	);
	let done_words = rows0[0].num;
	return { done_words };
}

export default {
	add_word,
	get_dictionaries,
	delete_word,
	add_cathegory,
	add_dictionary,
	get_words,
	get_current_word,
	get_current_dictionary,
	count_words,
	count_done_words,
	get_cathegories,
	get_words_of_cathegory,
	get_cathegory_info,
	get_words_with_cathegories,
	insert_word_to_cathegory,
	delete_word_from_cathegory,
	import_translation,
	check_dictionary,
	add_user_has_cathegory,
};
