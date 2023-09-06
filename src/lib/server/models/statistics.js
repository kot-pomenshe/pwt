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

export default {
	get_statistics,
};
