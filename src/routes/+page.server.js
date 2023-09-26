import { redirect } from '@sveltejs/kit';
import statistics from '$lib/server/models/statistics';

export async function load({ locals }) {
	if (locals.session){
		throw redirect(303, `/1`);
	}
	
	const statistics_info = await statistics.get_statistics();
	console.log(`Статистика `, statistics_info);
	return {statistics_info};
}
