import { runQuery, pool } from '$lib/server/db';

async function get_words({ user_id, dictionary_id, current_cathegory }) {
	if (current_cathegory == 0){
		const [rows0, fields0] = await pool.execute(
			'SELECT `translation`.`translation_id` AS translation_id, `has_studied`, `trainings_amount`, `mistakes_amount`, `word1`.`name` AS `name1`, `word2`.`name` AS `name2`, `transcription`, `context`, `picturepath` FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ?  ORDER BY `user_has_translation`.`trainings_amount` LIMIT 5',
			[user_id, dictionary_id],
		);
		return { words: rows0 };
	} else {
		const [rows0, fields0] = await pool.execute(
			'SELECT `translation`.`translation_id` AS translation_id, `has_studied`, `trainings_amount`, `mistakes_amount`, `word1`.`name` AS `name1`, `word2`.`name` AS `name2`, `transcription`, `context`, `picturepath` FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` INNER JOIN `translation_has_cathegory` ON `translation_has_cathegory`.`translation_id` = `translation`.`translation_id` WHERE `user_id` = ? AND `dictionary_id` = ? AND `cathegory_id` = ?  ORDER BY `user_has_translation`.`trainings_amount` LIMIT 5',
			[user_id, dictionary_id, current_cathegory],
		);
		return { words: rows0 };
	}
	
	console.log(`AND has_studied = 0 `, user_id);
	return true;
}

async function get_words20 ({ user_id, dictionary_id, current_cathegory }) {
	if (current_cathegory == 0){
		const [rows0, fields0] = await pool.execute(
			'SELECT `translation`.`translation_id` AS translation_id, `has_studied`, `trainings_amount`, `mistakes_amount`, `word1`.`name` AS `name1`, `word2`.`name` AS `name2`, `transcription`, `context`, `picturepath` FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ?  ORDER BY `user_has_translation`.`trainings_amount` LIMIT 20',
			[user_id, dictionary_id],
		);
		return { words: rows0 };
	} else {
		const [rows0, fields0] = await pool.execute(
			'SELECT `translation`.`translation_id` AS translation_id, `has_studied`, `trainings_amount`, `mistakes_amount`, `word1`.`name` AS `name1`, `word2`.`name` AS `name2`, `transcription`, `context`, `picturepath` FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` INNER JOIN `translation_has_cathegory` ON `translation_has_cathegory`.`translation_id` = `translation`.`translation_id` WHERE `user_id` = ? AND `dictionary_id` = ? AND `cathegory_id` = ?  ORDER BY `user_has_translation`.`trainings_amount` LIMIT 20',
			[user_id, dictionary_id, current_cathegory],
		);
		return { words: rows0 };
	}
	
	console.log(`AND has_studied = 0 `, user_id);
	return true;
}

async function get_second_words({ user_id, dictionary_id }) {
	console.log(`In get second words: User ID: `, user_id);
	console.log(`In get second words: Dictionary ID: `, dictionary_id);
	const [rows0, fields0] = await pool.execute(
		'SELECT `translation_id`, `word2`.`name` AS `name2` FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ?  ORDER BY `user_has_translation`.`trainings_amount`',
		[user_id, dictionary_id],
	);
	//console.log(`In Second words. Second words result: `, rows0);
	return { words: rows0 };
}

async function get_first_words({ user_id, dictionary_id }) {
	const [rows0, fields0] = await pool.execute(
		'SELECT `translation_id`, `word1`.`name` AS `name1` FROM `user_has_translation` INNER JOIN `translation` USING(translation_id) INNER JOIN `word` AS `word1` ON `translation`.word1_id = `word1`.`word_id` INNER JOIN `word` AS `word2` ON `translation`.word2_id = `word2`.`word_id` WHERE `user_id` = ? AND `dictionary_id` = ?  ORDER BY `user_has_translation`.`trainings_amount`',
		[user_id, dictionary_id],
	);
	//console.log(`WRDS `, rows0);
	return { words: rows0 };
}
async function update_word_statistics({
	trainings_amount,
	mistakes_amount,
	last_training_time,
	has_studied,
	translation_id,
	user_id,
}) {
	console.log(
		`Статистика по слову: `,
		trainings_amount,
		mistakes_amount,
		last_training_time,
		has_studied,
		translation_id,
		user_id,
	);
	await pool.execute(
		'UPDATE `user_has_translation` SET `trainings_amount`= ?, `mistakes_amount`= ?, `last_training_time`= ?, `has_studied`= ? WHERE `translation_id` = ? AND `user_id` = ?',
		[
			trainings_amount,
			mistakes_amount,
			last_training_time,
			has_studied,
			translation_id,
			user_id,
		],
	);
	return true;
}

async function set_statistics(user_id, dictionary_id, date, result) {
	//console.log(`set_st2: `, user_id, dictionary_id, date, result);
	await pool.execute('INSERT INTO `training`(`date`, `result`, `user_id`, `dictionary_id`) VALUES (?,?,?,?)', [
		date,
		result,
		user_id,
		dictionary_id,
	]);
	//console.log(`set_st3: `);
	return true;
}

async function get_statistics({user_id, dictionary_id}) {
	//console.log(`d_id: `, dictionary_id, user_id);

	const [rows5, fields0] = await pool.execute('SELECT `date`, `result` FROM `training` WHERE `user_id` = ? AND `dictionary_id` = ?', [
		user_id,
		dictionary_id,
	]);
	//console.log(`rows5: `, rows5);
	return rows5;
}

export default { get_words, get_words20, set_statistics, get_statistics, update_word_statistics, get_second_words, get_first_words };
