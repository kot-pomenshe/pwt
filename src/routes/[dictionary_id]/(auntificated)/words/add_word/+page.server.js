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

/*async function imageUploaded(avatar) {
	let base64String = '';
	let file = avatar;
	let reader = new FileReader();
	reader.onload = function () {
		base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
	};
	reader.readAsDataURL(file);
	return base64String;
}*/

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

	const avatar = data.get('avatar_path');
	//console.log(`AVATAR PATH: `, avatar);
	let filename = 'placeholder_pic.jpg';

	if (avatar != 'undefined') {
		filename = avatar;
	} else {
		filename = 'placeholder_pic.jpg';
	}
	let url_path = filename;

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
	//let redirect_path = '../../' + current_dictionary + '/words/dictionary';
	let redirect_path = '../words/dictionary';
	throw redirect(303, redirect_path);
}
