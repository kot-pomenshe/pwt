import { fail, redirect } from '@sveltejs/kit';
import user from '$lib/server/models/user.js';

/** @type {import('./$types').Actions} */
export const actions = {
	signup,
};

// @ts-ignore
async function signup({ cookies, request, url }) {
	const data = await request.formData();
	const login = data.get('login');
	const email = data.get('email');
	const password = data.get('password');
	const password_repeat = data.get('password_repeat');

	//  const user = await db.getUser(email);
	//  cookies.set('sessionid', await db.createSession(user));

	if (password !== password_repeat) {
		return fail(400, { passw_different: true });
	}

	//проверить, если всё пусто
	if (login == "" || email == "" || password =="" || password_repeat == "") {
		return fail(400, { field_is_empty: true });
	}


	let error;
	const create = await user.create({ login, password, email }).catch((e) => {
		console.log(e.message, e.message == 'email_already_regd');
		if (e.message == 'email_already_regd') {
			error = fail(400, { email_already_regd: true });
			return error;
		}
	});
	if(error) {
		let error1 = error;
		error = '';
		return error1;
	};
	throw redirect(303, '/auth/signin');
}

