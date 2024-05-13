<script>
	//import trainings from '$lib/server/models/trainings';
	export let words, score;
	import { createEventDispatcher } from 'svelte';
	import { time_ranges_to_array } from 'svelte/internal';
	const dispatch = createEventDispatcher();

	let words_amount = 0;
	let correct_answers = 0;
	for (let i of words) {
		if (i.answer) correct_answers += 1;
		words_amount += 1;
	}
	//console.log(`SCORE Show Card: `, score);
	let total_score = score.total_score;
	let trainings_amount = score.trainings_amount + 1;
	console.log(`Score Show Result: `, trainings_amount);

	import Modal from './Modal.svelte';
	let showModal = false;

	function callbackFunction() {
		dispatch('finish');
	}
</script>

<h1>Результаты</h1>
<div class="d-flex">
	<div class="card" style="width: 40rem;">
		<div class="card-body">
			<div class="margin-bottom">
				{#each words as word}
					<ol class="list-group list-group-horizontal">
						<li class="list-group-item fixed_li">{word.name2}</li>
						<li class="list-group-item">
							<img
								src="/icons/arrow-right.svg"
								width="30"
								height="24"
								class="card-img-top"
								alt="->"
							/>
						</li>
						<li class="list-group-item fixed_li">{word.name1}</li>

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
					{#if !word.answer}
						<h7>Ваш ответ: {word.selected_answer}</h7>
					{/if}
				{/each}
			</div>

			<div class="gamification-info">
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
				<p class="green">Начислено {correct_answers * 2 + 5}XP за тренировку</p>
				<p>Всего баллов: {total_score + correct_answers * 2 + 5}</p>

				<Modal bind:showModal on:notify={callbackFunction}>
					<div class="card-body">
						<h6>Пройдено тренировок: {trainings_amount}</h6>
						{#if trainings_amount < 10}
							<p>
								Пройдите ещё {10 - trainings_amount}, чтобы получить
								достижение "Крутой котик"
							</p>
						{:else}
							<h6 class="green">Получено достижение: Крутой Котик</h6>
							<img
								src="/files/coolcat.jpg"
								width="500"
								height="500"
								class="border-radius"
								alt="крутой котик"
							/>
						{/if}
					</div>
				</Modal>
			</div>
			<div class="d-flex">
				<button on:click={() => (showModal = true)} class="btn btn-primary">Далее</button>
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		text-align: center;
		margin-top: 1%;
	}
	.card {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1%;
		margin-top: 1%;
		display: flex;
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
	.border-radius{
		border-radius: 0.375rem;
	}
	.green {
		color: #009d9e;
	}
	.margin-bottom {
		margin-bottom: 1.5rem;
	}
	.btn {
		margin-left: auto;
		margin-right: auto;
		--bs-btn-color: #f0f0f0;
		--bs-btn-bg: #009d9e;
		--bs-btn-border-color: #f0f0f0;
	}
	.btn:hover {
		color: #161616;
		background-color: #7cc1ac;
		border-color: #009d9e;
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
