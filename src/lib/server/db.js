// get the client
import mysql from 'mysql2';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, SOCKET_PATH, PROD, DB_NAME } from '$env/static/private';

const config = {
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	// socketPath: PROD ? SOCKET_PATH : undefined
};


const createdPool = mysql.createPool(config)
createdPool.on('connection', () => {
	console.log('DataBase connected')
})
export const pool = createdPool.promise();

// @ts-ignore
export function runQuery(query) {
	return mysql.createConnection(config).query(query, function (err, results, fields) {
		console.log(results);
		console.log(fields);
		console.log(err);
	});
}
