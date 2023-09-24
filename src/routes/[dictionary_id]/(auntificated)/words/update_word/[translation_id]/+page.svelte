<script>
	import { dictionary } from '$lib/stores';
	export let data;
	export let form;
	let {current_word_info, user_id, translation_id} = data;

	
	current_word_info = current_word_info.word_data;

	console.log(`current_word_info `, current_word_info);
//

let base64String = '';
	let avatar_path = current_word_info.picture_path;
	console.log(`BASE 64 STRING 1 : `,base64String);
	async function imageUploaded() {
		let file = document.querySelector('input[type=file]')['files'][0];
		let reader = new FileReader();
		reader.onload = async function () {
			base64String = reader.result;
			//avatar_path = 'data:image/jpg;base64,' + base64String;
			avatar_path = base64String;
			/*await fetch(window.location.href, 
			{method: "POST", body: JSON.stringify({base64String})});
			goto(`../words/add_word`);*/
		};
		reader.readAsDataURL(file);		
		return base64String;
	}
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<h1>Редактировать слово</h1>
	<div class="container">
		<div>
			<label for="word1" class="form-label">Изображение</label>
			<input class="form-control" type="file" name="avatar" id="fileId" on:change={imageUploaded}  />
		</div>
		<form method="POST" action="?/edit_word" enctype="multipart/form-data">
				<div class="flex">
					<div class="inlb_left">
						<div>
							<label for="word1" class="form-label">Слово</label>
							<input type="text" class="form-control" id="word1" name="word" value="{current_word_info.word11}" />
							{#if form?.empty_word1}<p class="error">Введите слово</p>{/if}
						</div>
						<div>
							<label for="transcription" class="form-label">Транскрипция</label>
							<input
								type="text"
								class="form-control"
								id="transcription"
								name="transcription"
								value="{current_word_info.transcription}"
							/>
						</div>
					</div>
	
					<div class="inlb_right">
						<div>
							<label for="word2" class="form-label">Перевод</label>
							<input type="text" class="form-control" id="word2" name="translation" value="{current_word_info.word12}" />
							{#if form?.empty_word2}<p class="error">Введите слово</p>{/if}
						</div>
						
						
						<div class="invisible">
							<input type="text" name="avatar_path" id="avatar_path" bind:value={avatar_path}  />
						</div>
					</div>
				</div>
	
				<div class="flex">
					<label for="context" class="form-label">Контекст</label>
					<input
						type="text"
						class="form-control"
						id="context"
						placeholder=""
						name="context"
						value="{current_word_info.context}"
					/>
					<input name="dictionary_id" type="hidden" value={$dictionary.dictionary_id} />
				</div>
	
			<div class="flex">
				<button type="submit" class="btn btn-primary">Сохранить</button>
			</div>
		</form>
	</div>
</section>

<style>
	h1 {
		text-align: center;
	}
	.btn {
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;
	}
	.flex {
		display: flex;
	}
	.pic-hold {
		margin-bottom: 1rem;
	}
	.margin-l {
		margin-right: 2rem;
	}
	.btn-red {
		background-color: #8a307f;
	}
	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.inlb_left {
		float: left;
		width: 40vw;
	}

	.inlb_right {
		float: right;
		width: 40vw;
	}
	section {
	background-color: #f0f0f0;
	color: #009d9e;
	nav-tabs-link-active-bg: #7cc1ac;
	display: block;
	padding: 70px 0 0 0px;
}

.card {
	color: #161616;
	background: #d5ece6;
}

.btn,
.btn-primary {
	--bs-btn-color: #f0f0f0;
	--bs-btn-bg: #009d9e;
	--bs-btn-border-color: #f0f0f0;
}

.btn:hover {
    color: #161616;
    background-color: #7cc1ac;;
    border-color: #009d9e;
}

body {
	background-color: #f0f0f0;
}



</style>
