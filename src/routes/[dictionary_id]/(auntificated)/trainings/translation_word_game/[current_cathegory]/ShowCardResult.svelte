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
	let trainings_amount = score.trainings_amount;
	//console.log(`Score Show Card: `, total_score, trainings_amount);
</script>

<h1>Результаты</h1>
<div class="d-flex">
	<div class="card" style="width: 40rem;">
		<div class="card-body">
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
			<br />
			<span class="badge bg-secondary">{correct_answers}/{words.length}</span>
		<div class="gamification-info">
			{#if correct_answers > words_amount/2}
					<p>Отличный результат, так держать!</p>
					{:else}
					<p>Не расстраивайся, в следующий раз сможешь лучше</p>
			{/if}
			<p>Начислено {correct_answers*2 + 5}XP за тренировку</p>
			<p>Всего баллов: {total_score + correct_answers*2 + 5}</p>
			<p>Пройдено тренировок: {trainings_amount + 1}</p>
			{#if trainings_amount < 10}
			<p>Пройдите ещё {10 - (trainings_amount + 1)}, чтобы получить достижение "Крутой котик"</p>
					{:else}
					<p>Получено достижение: Крутой Котик</p>
					<img
					src="/files/coolcat.jpg"
					width="30"
					height="24"
					class="card-img-top"
					alt="крутой котик"
				/>
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
	}
	.card-body {
		margin-left: auto;
		margin-right: auto;
	}
	.fixed_li {
		width: 15rem;
	}
	.badge {
		margin-top: 1rem;
		margin-bottom: 1rem;
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
