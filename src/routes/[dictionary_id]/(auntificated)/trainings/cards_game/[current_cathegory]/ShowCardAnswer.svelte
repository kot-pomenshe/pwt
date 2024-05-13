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
			<h7 class="card-title">{word.context}</h7>
			<hr>
			<div>
			{#if word.answer}
				<div class="flex">
					<img
						src="/icons/check-circle-fill.svg"
						width="30"
						height="24"
						class="icon"
						alt="верно"
					/>
					<p>Отличный результат! Так держать :)</p>
				</div>
				<p class="card-text green padding-bottom">+1XP за верный ответ</p>
			{:else}
				<div class="flex ">
					<img
						src="/icons/x-circle-fill.svg"
						width="30"
						height="24"
						class="icon"
						alt="неверно"
					/>
					<p class="card-text padding-bottom">Не расстраивайся, в следующий раз обязательно получится!</p>
				</div>
			{/if}
		</div>
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
	.green {
		color: #009d9e;
	}
	.flex {
		display: flex;
		justify-content: flex-start;
	}
	.icon {
		margin-right: 5px;
	}
	.padding-bottom{
		padding-bottom: 1rem;
	}
</style>
