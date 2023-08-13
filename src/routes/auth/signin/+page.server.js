import { fail, redirect } from '@sveltejs/kit';
import user from '$lib/server/models/user';
import word from '$lib/server/models/word';
export let prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	signin,
};

// @ts-ignore
async function signin({ cookies, request }) {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	let error;

	const user_id = await user.signin({ email, password }).catch((e) => {
		console.log(e.message, e.message == 'user_not_found', e.message == 'wrong_password');
		if (e.message == 'user_not_found') {
			error = fail(400, { user_not_found: true });
		} else if (e.message == 'wrong_password') {
			error = fail(400, { wrong_password: true });
		}
	});

	if (error) {
		return error;
	}

	//добавляем пользователю стартовый набор слов
	/*word.add_user_has_cathegory({ user_id, 1 });
	for (let i of words_of_cathegory){
		await word.import_translation(user_id, i.id);
	}*/

	cookies.set('session', user_id, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		maxAge: 60 * 60 * 24 * 30
	});

	const session = cookies.get('session');
	throw redirect(303, '../1');
}

