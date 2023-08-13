import { fail, redirect } from '@sveltejs/kit';
import user from '$lib/server/models/user';

export async function load({ cookies, locals }) {
	cookies.delete('session', {path:'/'});
	throw redirect(303, `./signin`);
}
