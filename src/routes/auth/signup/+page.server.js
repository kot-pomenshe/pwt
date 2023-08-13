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
	user.create({ login, password, email });

	throw redirect(303, '/auth/signin');
}

