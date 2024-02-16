<script>
	export let data;
	import { cathegories } from '$lib/stores';
	$cathegories = data.cathegories.cathegories;
	$: current_cathegory = 0;
	//console.log(`Категория теперь: `, current_cathegory);
</script>

<svelte:head>
	<title>Тренировки</title>
</svelte:head>

<section>
	<div class="container">
		<h1>Тренировки</h1>

		<div class="flex">
			<div class="accordion fixed_li2" id="accordionExample">
				<div class="accordion-item">
					<h3 class="accordion-header" id="headingOne">
						<button
							class="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							aria-expanded="true"
							aria-controls="collapseOne"
						>
							<h5>Категории</h5>
						</button>
					</h3>
					<div
						id="collapseOne"
						class="accordion-collapse collapse show"
						aria-labelledby="headingOne"
						data-bs-parent="#accordionExample"
					>
						<div class="accordion-body">
							<div class="">
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
									<label class="form-check-label" for="flexRadioDefault1">
										Все слова
									</label>
								</div>
								{#each $cathegories as cathegory}
								<ul class="list-group list-group-horizontal">
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
								</ul>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<div class="inlb_right">
					<div class="flex-card">
						<div class="card">
							<img src="/files/cards.jpg" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Карточки</h5>
								<p class="card-text">
									Тренировка методом словарных карточек с использованием метода
									Домана и интервальных повторений.
								</p>
								<a href="./cards/{current_cathegory}" class="btn btn-primary"
									>Приступить</a
								>
							</div>
						</div>

						<div class="card">
							<img src="/files/wt.jpg" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Слово — Перевод</h5>
								<p class="card-text">
									Тренировка методом Слово — Перевод. К каждому слову на выбор
									даётся 4 варианта перевода, необходимо выбрать верный.
								</p>
								<a
									href="./word_translation/{current_cathegory}"
									class="btn btn-primary">Приступить</a
								>
							</div>
						</div>

						<div class="card">
							<img src="/files/wt.jpg" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Слово — Перевод (hard)</h5>
								<p class="card-text">
									В усложнённой версии не показывается транскрипция слова. Данная тренировка удобна для изучения алфавита.
								</p>
								<a
									href="./word_translation_hard/{current_cathegory}"
									class="btn btn-primary">Приступить</a
								>
							</div>
						</div>

						<div class="card">
							<img src="/files/wt.jpg" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Перевод — Слово</h5>
								<p class="card-text">
									Тренировка методом Перевод — Слово. К каждому переводу на выбор
									даётся 4 варианта слова, необходимо выбрать верный.
								</p>
								<a
									href="./translation_word/{current_cathegory}"
									class="btn btn-primary">Приступить</a
								>
							</div>
						</div>

						<div class="card">
							<img src="/files/wt.jpg" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Слово — Перевод (Время)</h5>
								<p class="card-text">
									Тренировка методом Слово — Перевод. На каждый ответ даётся 5 секунд.
								</p>
								<a
									href="./word_translation_timer/{current_cathegory}"
									class="btn btn-primary">Приступить</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		padding: 0 0 20px 0;
	}
h5{
	color:#009d9e;
}
.accordion-button{
	background-color: #d5ece6;
}
	.flex {
		display: flex;
		flex-wrap: wrap;
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
