<script>
	export let data;
	let {current_word_info, user_id, translation_id} = data;
	//console.log(`current_word_info `, current_word_info);
	current_word_info = current_word_info.word_data;
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<h1>Редактировать слово</h1>
	<div class="container">
		<form method="POST" action="?/add_word" enctype="multipart/form-data">
			<div class="flex">
				<div class="inlb_left">
					<div>
						<label for="word1" class="form-label">Слово</label>
						<input type="text" class="form-control" id="word1" name="word" value={current_word_info.word11} />
						
					</div>

					<div>
						<label for="word2" class="form-label">Перевод</label>
						<input type="text" class="form-control" id="word2" name="translation" value={current_word_info.word12}/>
						
					</div>
				</div>

				<div class="inlb_right">
					<div>
						<label for="transcription" class="form-label">Транскрипция</label>
						<input
							type="text"
							class="form-control"
							id="transcription"
							name="transcription"
							value={current_word_info.transcription}
						/>
					</div>

					<div>
						<label for="word1" class="form-label">Изображение</label>
						<input class="form-control" type="file" id="formFile" name="avatar" value={current_word_info.path} />
					</div>
				</div>
			</div>

			<div class="flex">
				<label for="context" class="form-label">Контекст</label>
				<input
					type="text"
					class="form-control"
					id="context"
					name="context"
					value={current_word_info.context}
				/>
				
			</div>

			<div class="flex">
				<button type="submit" disabled class="btn btn-primary">Сохранить</button>
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
</style>
