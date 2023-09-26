<script>
	import { goto, preloadData } from '$app/navigation';
	import { dictionary } from '$lib/stores';
	import { page } from '$app/stores';

	export let data;

	//let picturepath = 'data:image/jpg;base64,' + data.res.word_data.picturepath;
	let picturepath = data.res.word_data.picturepath;

	let session = data.user_id;
	let translation_id = data.translation_id;
	let cathegories_list = data.cathegories_list.cathegories_list;
	//console.log(`CATHEGORIES LIST `, cathegories_list);
	async function delete_word() {
		await fetch(window.location.href, { method: 'DELETE' });
		goto(`../dictionary`);
	}

	function formatTime(d) {
		//console.log(`было `,d);
		const date = d.getDate().toString().padStart(2, '0');
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const year = d.getFullYear();

		const h = d.getHours().toString().padStart(2, '0');
		const m = d.getMinutes().toString().padStart(2, '0');
		//console.log(`стало `, `${date}.${month}.${year}, ${h}:${m}`);
		return `${date}.${month}.${year}, ${h}:${m}`;
	}
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<div class="container">
		<h1>Просмотр слова</h1>
		<div class="flex">
			<div class="col-md-3">
				<img
					src={picturepath}
					class="rounded "
					alt="Изображение"
					height="180"
				/>
			</div>

			<div class="col-md-12">
				<div class="flex">
					<div class="col-md-4">
						<h5 class="black_text">Слово</h5>
						<h3>{data.res.word_data.word11}</h3>
					</div>
					<div class="col-md-1" />
					<div class="col-md-4">
						<h5 class="black_text">Перевод</h5>
						<h3>{data.res.word_data.word12}</h3>
					</div>
				</div>
				<br />
				<div class="flex">
					<div class="col-md-4">
						<h5 class="black_text">Транскрипция</h5>
						<h3>{data.res.word_data.transcription}</h3>
					</div>
					<div class="col-md-1" />
					<div class="col-md-4">
						<h5 class="black_text">Категории:</h5>
						{#each cathegories_list as cathegory}
							<li>
								{cathegory.name}
							</li>
						{/each}
					</div>
				</div>

				<div class="col-md-9">
					<h5 class="black_text">Контекст</h5>
					<h3>{data.res.word_data.context}</h3>
				</div>
			</div>
		</div>
		<h6>Изучено: {data.res.word_data.trainings_amount}</h6>
		<h6>Ошибок: {data.res.word_data.mistakes_amount}</h6>
		{#if data.res.word_data.last_training_time}
			<h6>Дата последней тренировки: {formatTime(data.res.word_data.last_training_time)}</h6>
		{/if}

		<a href="../update_word/{translation_id}" class="btn btn-primary"
			><img src="/icons/pencil-square.svg" alt="Редактировать" width="30" height="24" /></a
		>

		<button
			on:click={() => delete_word()}
			type="button"
			id="btn-submit-dict"
			class="btn btn-primary btn-red"
			><img src="/icons/trash.svg" alt="Удалить" width="30" height="24" /></button
		>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		padding: 0 0 20px 0;
	}

	.flex {
		display: flex;
	}
	.btn-red {
		background-color: #8a307f;
	}
	.black_text {
		color: #333333;
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
