import { fail, redirect } from '@sveltejs/kit';
import user from '$lib/server/models/user';
import word from '$lib/server/models/word';
export let prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	reset_password,
};

// @ts-ignore
async function reset_password({ cookies, request }) {
	const data = await request.formData();
	const email = data.get('email');

	let error;

	const user_id = await user.reset_password({ email }).catch((e) => {
		console.log(e.message, e.message == 'user_not_found');
		if (e.message == 'user_not_found') {
			error = fail(400, { user_not_found: true });
		}
	});

	if (error) {
		return error;
	}
	throw redirect(303, '../1');
}

