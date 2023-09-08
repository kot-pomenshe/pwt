import { runQuery, pool } from '$lib/server/db';
import { send_conf_email } from '$lib/server/mailer';
import word from '$lib/server/models/word';
import bcrypt from 'bcrypt';
import { uid } from 'uid';

import { BASE_URL, HASH_SALT } from '$env/static/private';

//const salt = bcrypt.genSaltSync(10)


async function create({ login, password, email }) {
	const salt = '$2b$10$56wwTPr0VBcS7vzzhudBie';//HASH_SALT;
	const hash = bcrypt.hashSync(password, salt);
	await pool.query(
		'INSERT INTO `user`(login, password, email) VALUES ' + `("${login}","${hash}","${email}")`,
	);

	const [rows, fields] = await pool.query(
		'SELECT user_id from `user` WHERE email = ' + `"${email}"`,
	);
	const user_id = rows.slice(-1)[0].user_id;

	const new_uid = uid(255);

	await pool.execute('INSERT INTO `activation`(`uid`, `user_id`, `is_activate`) VALUES (?,?,?)', [
		new_uid,
		user_id,
		false,
	]);

	await pool.execute(
		'INSERT INTO `user_has_dictionary`(`user_id`, `dictionary_id`) VALUES (?,?)',
		[user_id, '1'],
	);

	const cathegory_id = 3;
	word.add_user_has_cathegory({ user_id, cathegory_id });

	const link = new URL(`auth/activation/${new_uid}`, BASE_URL).toString();

	send_conf_email({ email, login, link });
}

async function activate({ uid }) {
	const [rows, fields] = await pool.execute('SELECT uid FROM `activation` WHERE uid = ?', [uid]);

	if (!rows.length) {
		return false;
	}

	await pool.execute('UPDATE `activation` SET `is_activate`=true WHERE uid = ?', [uid]);
	return true;
}

async function signin({ email, password }) {
	const [rows, fields] = await pool.execute('SELECT password FROM `user` WHERE email = ?', [
		email,
	]);
	//проверить, что аккаунт активирован
	if (!rows.length) {
		throw new Error('user_not_found');
	}

	const salt = '$2b$10$56wwTPr0VBcS7vzzhudBie'; //HASH_SALT;
	const hash = bcrypt.hashSync(password, salt);

	if (rows.slice(0)[0].password != hash) {
		throw new Error('wrong_password');
	}

	const [rows1, fields2] = await pool.execute('SELECT user_id FROM `user` WHERE email = ?', [
		email,
	]);

	const user_id = rows1.slice(-1)[0].user_id;
	return user_id;
}

async function get_name(user_id) {
	const [rows1, fields2] = await pool.execute('SELECT login FROM `user` WHERE user_id = ?', [
		user_id,
	]);
	return rows1.slice(-1)[0].login;
}

async function get_user_info({user_id}) {
	const [rows1, fields2] = await pool.execute('SELECT `user_id`, `login`, `email` FROM `user` WHERE user_id = ?', [
		user_id,
	]);
	return rows1.slice(-1)[0];
	
}

export default { create, activate, signin, get_name, get_user_info };
