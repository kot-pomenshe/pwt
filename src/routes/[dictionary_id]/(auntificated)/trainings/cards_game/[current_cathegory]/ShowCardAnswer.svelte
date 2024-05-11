<script>
	export let word;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<h1>Ответ</h1>
<div class="d-flex">
	<div class="card" style="width: 18rem;">
		<img src={word.picturepath} class="card-img-top" alt="картинка к слову" />
		<div class="card-body">
			<h5 class="card-title">{word.name1}</h5>
			<p class="card-text">[{word.transcription}]</p>
			<h5 class="card-title">{word.name2}</h5>
			<h7 class="card-title">{word.context}.</h7>
			{#if word.answer}
				<img
					src="/icons/check-circle-fill.svg"
					width="30"
					height="24"
					class="card-img-top"
					alt="верно"
				/>
				<p>Отличный результат! Так держать :)</p>
				<p class="card-text green">+1XP за верный ответ</p>
			{:else}
				<img
					src="/icons/x-circle-fill.svg"
					width="30"
					height="24"
					class="card-img-top"
					alt="неверно"
				/>
				<p>Не расстраивайся, в следующий раз обязательно получится!</p>
			{/if}
			<button on:click={() => dispatch('next')} class="btn btn-primary">Далее</button>
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
		background-color: #7cc1ac;
		border-color: #009d9e;
	}

	body {
		background-color: #f0f0f0;
	}
</style>
