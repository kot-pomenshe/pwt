import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	if (!locals.session) {
		throw redirect(303, '/auth/signin');
	}
}
