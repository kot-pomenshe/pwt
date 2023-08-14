<script>
	import { dictionary } from '$lib/stores';
	export let data;
	export let form;
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<h1>Добавить слово</h1>
	<div class="container">
		<form method="POST" action="?/add_word" enctype="multipart/form-data">
			<div class="flex">
				<div class="inlb_left">
					<div>
						<label for="word1" class="form-label">Слово</label>
						<input type="text" class="form-control" id="word1" name="word" />
						{#if form?.empty_word1}<p class="error">Введите слово</p>{/if}
					</div>
					<div>
						<label for="transcription" class="form-label">Транскрипция</label>
						<input
							type="text"
							class="form-control"
							id="transcription"
							name="transcription"
						/>
					</div>
				</div>

				<div class="inlb_right">
					<div>
						<label for="word2" class="form-label">Перевод</label>
						<input type="text" class="form-control" id="word2" name="translation" />
						{#if form?.empty_word2}<p class="error">Введите слово</p>{/if}
					</div>

					<div>
						<label for="word1" class="form-label">Изображение</label>
						<input class="form-control" type="file" id="formFile" name="avatar" />
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
				/>
				<input name="dictionary_id" type="hidden" value={$dictionary.dictionary_id} />
			</div>

			<div class="flex">
				<button type="submit" class="btn btn-primary">Добавить</button>
			</div>
		</form>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 6%;
		margin-bottom: 1%;
	}
	.btn {
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;
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
	.pic-hold {
		margin-bottom: 1rem;
	}
	.margin-l {
		margin-right: 2rem;
	}
	@media (max-width: 1000px) {
		.inlb_left {
			width: 80vw;
		}
		.inlb_right {
			width: 80vw;
		}
	}
</style>
