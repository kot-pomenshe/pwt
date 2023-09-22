import { redirect } from '@sveltejs/kit';
import user from '$lib/server/models/user';

export let prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	exit,
	edit_profile,
};

export async function load({ locals, params }) {
	const user_id = locals.session;

	const user_info = await user.get_user_info({ user_id });
	return user_info;
}
// @ts-ignore
async function edit_profile({ cookies, request }) {
	const data = await request.formData();
	const login = data.get('login');
	const email = data.get('email');
	const password = data.get('password');
	const user_id = cookies.get('session');


	if (login == '') {
		return fail(400, { empty_login: true });
	}
	if (email == '') {
		return fail(400, { empty_password: true });
	}

	await user.edit_profile({login, email, password, user_id});
	let redirect_path = '../profile';
	throw redirect(303, redirect_path);
}

async function exit({ cookies, locals }) {
	throw redirect(303, '/auth/logout');
}
