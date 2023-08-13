import { fail, redirect } from '@sveltejs/kit';
import word from '$lib/server/models/word';
import fs from 'fs/promises';
import path from 'path';
export let prerender = false;
import { writeFileSync } from 'fs';

/** @type {import('./$types').Actions} */
export const actions = {
	add_word,
};

// @ts-ignore
async function add_word({ cookies, request }) {
	const data = await request.formData();
	const word1 = data.get('word');
	const translation = data.get('translation');
	const transcription = data.get('transcription');
	const context = data.get('context');
	const category = data.get('category');
	const user_id = cookies.get('session');

	if (word1 == "") {
		return fail(400, { empty_word1: true });
	}
	if (translation == "") {
		return fail(400, { empty_word2: true });
	}

	const avatar = data.get('avatar');
	let filename;
	if (avatar.name != 'undefined') {
		filename = `${crypto.randomUUID()}.${avatar.type.split('/')[1]}`;
		const picture_path = path.join(process.cwd(), 'static', 'avatars', filename);
		await fs.writeFile(picture_path, Buffer.from(await avatar.arrayBuffer()));
	} else {
		filename = 'placeholder_pic.jpg';
	}
	let url_path = `avatars/` + filename;

	let current_dictionary = data.get('dictionary_id');

	await word.add_word({
		user_id,
		current_dictionary,
		word: word1,
		translation,
		transcription,
		context,
		category,
		picture_path: url_path,
	});
	let redirect_path = '../../' + current_dictionary + '/words/dictionary';
	throw redirect(303, redirect_path);
}
