import { fail, redirect } from '@sveltejs/kit';
import word from '$lib/server/models/word';
import fs from 'fs/promises';
import path from 'path';
import { writeFileSync } from 'fs';
export const prerender = false;
/** @type {import('./$types').Actions} */
export const actions = {
	edit_word,
};
export async function load({ locals, params }) {
        let {translation_id, dictionary_id} = params;
        let current_word_info = await word.get_current_word(locals.session, dictionary_id, translation_id);
        return {current_word_info: current_word_info, user_id: locals.session, translation_id: params.translation_id};
}

// @ts-ignore
async function edit_word({ cookies, request, params }) {
	const data = await request.formData();
	const word1 = data.get('word');
	const translation = data.get('translation');
	const transcription = data.get('transcription');
	const context = data.get('context');
	const user_id = cookies.get('session');
        const translation_id = params.translation_id;
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

	await word.edit_word({
		word: word1,
		translation,
		transcription,
		context,
		picture_path: url_path,
                translation_id,
	});
	//let redirect_path = '../../' + current_dictionary + '/words/dictionary';
	let redirect_path = '../dictionary';
	throw redirect(303, redirect_path);
}

