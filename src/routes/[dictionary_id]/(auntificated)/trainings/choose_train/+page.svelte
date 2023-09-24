<script>
	export let data;
	import { cathegories } from '$lib/stores';
	$cathegories = data.cathegories.cathegories;
	$: current_cathegory = 0;
	console.log(`Категория теперь: `, current_cathegory);
</script>

<svelte:head>
	<title>Тренировки</title>
</svelte:head>

<section>
	<div class="container">
		<h1>Тренировки</h1>

		<div class="flex">
			<div class="inlb_left">
				<div class="flex-card">
					<div class="card">
						<img src="/files/cards.jpg" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">Карточки</h5>
							<p class="card-text">
								Тренировка методом словарных карточек с использованием метода Домана
								и интервальных повторений.
							</p>
							<a href="./cards/{current_cathegory}" class="btn btn-primary"
								>Приступить</a
							>
						</div>
					</div>

					<div class="card">
						<img src="/files/wt.jpg" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">Слово - Перевод</h5>
							<p class="card-text">
								Тренировка методом Слово - перевод. К каждому слову на выбор даётся
								4 варианта перевода, необходимо выбрать верный.
							</p>
							<a href="./word_translation/{current_cathegory}" class="btn btn-primary"
								>Приступить</a
							>
						</div>
					</div>

					<div class="card">
						<img src="/files/wt.jpg" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">Перевод - Слово</h5>
							<p class="card-text">
								Тренировка методом Перевод - слово. К каждому переводу на выбор
								даётся 4 варианта слова, необходимо выбрать верный.
							</p>
							<a href="./translation_word/{current_cathegory}" class="btn btn-primary"
								>Приступить</a
							>
						</div>
					</div>
				</div>
			</div>

			<div class="inlb_right">
				<h3>Категории</h3>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						name="flexRadioDefault"
						id="0"
						checked
						value={0}
						bind:group={current_cathegory}
					/>
					<label class="form-check-label" for="flexRadioDefault1"> Все слова </label>
				</div>
				{#each $cathegories as cathegory}
					<div class="form-check">
						<input
							class="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id={cathegory.cathegory_id}
							value={cathegory.cathegory_id}
							bind:group={current_cathegory}
						/>
						<label class="form-check-label" for="flexRadioDefault1">
							{cathegory.name}
						</label>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		padding: 0 0 20px 0;
	}

	.flex {
		display: flex;
		justify-content: space-between;
	}
	.flex-card {
		display: flex;
		flex-wrap: wrap;
	}
	.inlb_left {
		float: left;
	}
	.inlb_right {
		float: right;
	}
	section {
		margin-left: auto;
		margin-right: auto;
		background-color: #f0f0f0;
		color: #009d9e;
		nav-tabs-link-active-bg: #7cc1ac;
		display: block;
		padding: 70px 0 0 0px;
	}

	.card {
		color: #161616;
		background: #d5ece6;
		width: 21rem;
		margin: 10pt;
	}

	.btn,
	.btn-primary {
		--bs-btn-color: #f0f0f0;
		--bs-btn-bg: #009d9e;
		--bs-btn-border-color: #f0f0f0;
	}

	.btn:hover {
		color: #161616;
		background-color: #7cc1ac;
		border-color: #009d9e;
	}

	body {
		background-color: #f0f0f0;
	}
</style>
