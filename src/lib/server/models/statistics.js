import { runQuery, pool } from '$lib/server/db';

async function get_statistics() {
	let users, words, trainings;
	const [rows1, fields1] = await pool.execute(
		'SELECT COUNT(*) AS `words` FROM `word` WHERE 1',
	);

	if (rows1.length) {
		words = rows1[0].words;
	}
	const [rows2, fields2] = await pool.execute(
		'SELECT COUNT(*) AS `users` FROM `user` WHERE 1',
	);
	if (rows2.length) {
		users = rows2[0].users;
	}
	const [rows3, fields3] = await pool.execute(
		'SELECT COUNT(*) AS `trainings` FROM `training` WHERE 1',
	);
	if (rows3.length) {
		trainings = rows3[0].trainings;
	}
	return {words, users, trainings};
}

async function get_total_score({user_id, dictionary_id}) {
	//console.log(`d_id: `, dictionary_id, user_id);

	const [rows6, fields0] = await pool.execute('SELECT total_score FROM `user_has_dictionary` WHERE `user_id`= ? AND `dictionary_id`= ?', [
		user_id,
		dictionary_id,
	]);

	console.log(`rows6: `, rows6[0].total_score);
	return rows6[0].total_score;
}

async function get_trainings_amount({user_id, dictionary_id}) {
	//console.log(`d_id: `, dictionary_id, user_id);

	const [rows7, fields0] = await pool.execute('SELECT trainings_amount FROM `user_has_dictionary` WHERE `user_id`= ? AND `dictionary_id`= ?', [
		user_id,
		dictionary_id,
	]);
	console.log(`кол-во тренировок: `, rows7[0].trainings_amount);
	let tr_am=rows7[0].trainings_amount;
	return tr_am;
}

async function update_score({
	user_id, dictionary_id, total_score, trainings_amount
}) {
	await pool.execute(
		'UPDATE `user_has_dictionary` SET `total_score`= ?, `trainings_amount`= ? WHERE `dictionary_id` = ? AND `user_id` = ?',
		[
			total_score, trainings_amount, dictionary_id, user_id,
		],
	);
	return true;
}

async function set_research_stat({
	user_id, last_training_time, training_type, trainings_amount, first_training_time, mistakes_amount
}) {
	await pool.execute(
		'INSERT INTO `research_stat`(`user_id`, `last_training_time`, `training_type`, `trainings_amount`, `first_training_time`, `mistakes_amount`) VALUES (?,?,?,?,?,?)',
		[
			user_id, last_training_time, training_type, trainings_amount, first_training_time, mistakes_amount
		],
	);
	return true;
}

export default {
	get_statistics, get_total_score, get_trainings_amount, update_score, set_research_stat,
};
