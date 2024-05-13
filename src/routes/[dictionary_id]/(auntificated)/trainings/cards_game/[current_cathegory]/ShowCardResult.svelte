<script>
	export let words;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let words_amount = 0;
	let correct_answers = 0;
	for (let i of words) {
		if (i.answer) correct_answers += 1;
		words_amount += 1;
	}
</script>

<h1>Результаты</h1>
<div class="d-flex">
	<div class="card" style="width: 40rem;">
		<div class="card-body">
			<div class="margin-bottom">
				{#each words as word}
					<ol class="list-group list-group-horizontal">
						<li class="list-group-item fixed_li">{word.name1}</li>
						<li class="list-group-item">
							<img
								src="/icons/arrow-right.svg"
								width="30"
								height="24"
								class="card-img-top"
								alt="->"
							/>
						</li>
						<li class="list-group-item fixed_li">{word.name2}</li>
						{#if !word.answer}
							<li class="list-group-item list-group-item-danger">
								<img
									src="/icons/x-circle-fill.svg"
									width="30"
									height="24"
									class="card-img-top"
									alt="не верно"
								/>
							</li>
						{:else}
							<li class="list-group-item list-group-item-success">
								<img
									src="/icons/check-circle-fill.svg"
									width="30"
									height="24"
									class="card-img-top"
									alt="верно"
								/>
							</li>
						{/if}
					</ol>
				{/each}
			</div>
			<div>
				{#if correct_answers > words_amount / 2}
					<div class="d-flex">
						<span class="badge bg-secondary">{correct_answers}/{words.length}</span>
						<p class="margin-top">Отличный результат, так держать!</p>
					</div>
				{:else}
					<div class="d-flex">
						<span class="badge bg-secondary">{correct_answers}/{words.length}</span>
						<p class="margin-top">Не расстраивайся, в следующий раз сможешь лучше</p>
					</div>
				{/if}
			</div>
			<div class="d-flex">
				<button on:click={() => dispatch('finish')} class="btn btn-primary">Далее</button>
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		text-align: center;
		margin-top: 5%;
	}
	.card {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 5%;
		margin-top: 1%;
		display: flex;
		color: #161616;
		background: #d5ece6;
	}
	.card-body {
		margin-left: auto;
		margin-right: auto;
	}
	.fixed_li {
		width: 15rem;
	}
	.badge {
		margin-right: 0.5rem;
		margin-bottom: 1rem;
	}
	.btn,
	.btn-primary {
		--bs-btn-color: #f0f0f0;
		--bs-btn-bg: #009d9e;
		--bs-btn-border-color: #f0f0f0;
		margin-left: auto;
		margin-right: auto;
	}

	.btn:hover {
		color: #161616;
		background-color: #7cc1ac;
		border-color: #009d9e;
	}

	.margin-bottom {
		margin-bottom: 1.5rem;
	}

	body {
		background-color: #f0f0f0;
	}

	@media (max-width: 1200px) {
		.fixed_li {
			width: 12rem;
			font-size: 5vw;
		}
	}
	@media (max-width: 1000px) {
		.fixed_li {
			width: 30vw;
			font-size: 3vw;
		}
	}
	@media (max-width: 768px) {
		.fixed_li {
			width: 31vw;
			font-size: 3vw;
		}
	}
	@media (max-width: 480px) {
		.fixed_li {
			width: 30vw;
			font-size: 3.3vw;
		}
	}
</style>
