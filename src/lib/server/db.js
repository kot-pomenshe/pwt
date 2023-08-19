// get the client
import mysql from 'mysql2';
import { DB_USER, DB_PASSWORD } from '$env/static/private';

const config = {
	host: '127.0.0.1',
	port: 8889,
	user: DB_USER,
	password: DB_PASSWORD,
	database: 'personal_word_trainer',
};

export const pool = mysql.createPool(config).promise();

// @ts-ignore
export function runQuery(query) {
	return mysql.createConnection(config).query(query, function (err, results, fields) {
		console.log(results);
		console.log(fields);
		console.log(err);
	});
}
