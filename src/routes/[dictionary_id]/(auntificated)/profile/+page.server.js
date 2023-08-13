import { redirect } from '@sveltejs/kit';
import user from '$lib/server/models/user';

export let prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	exit,
};

export async function load({ locals, params}) {
	const user_id = locals.session;
	
	const user_info = await user.get_user_info({ user_id });
	return user_info;
}

async function exit({ cookies, locals }) {
	
	throw redirect(303, '/auth/logout');
}
