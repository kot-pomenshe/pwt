<script>
	export let data;
	import { cathegories } from '$lib/stores';
	$cathegories = data.cathegories.cathegories;
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
							<a href="./cards" class="btn btn-primary">Приступить</a>
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
							<a href="./word_translation" class="btn btn-primary">Приступить</a>
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
							<a href="./translation_word" class="btn btn-primary">Приступить</a>
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
	.card {
		width: 21rem;
		margin: 10pt;
	}
	section {
		margin-left: auto;
		margin-right: auto;
	}
</style>
