<script>
	export let word;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<h1>Ответ</h1>
<div class="d-flex">
	<div class="card" style="width: 18rem;">
		<img src={`/` + word.picturepath} class="card-img-top" alt="картинка к слову" />
		<div class="card-body">
			<h4 class="card-title">{word.name2}</h4>
			<p class="card-text">{word.transcription}</p>
			<h4 class="card-title">{word.name1}</h4>
			<h7 class="card-title">{word.context}</h7>
			{#if word.answer}
			<img
				src="/icons/check-circle-fill.svg"
				width="30"
				height="24"
				class="card-img-top"
				alt="верно"
			/>
			<p class="card-text green">Ваш ответ: {word.selected_answer}</p>
			{:else}
			<img
				src="./icons/x-circle-fill.svg"
				width="30"
				height="24"
				class="card-img-top"
				alt="неверно"
			/>
			<p class="card-text red">Ваш ответ: {word.selected_answer}</p>
			{/if}
		</div>
		<div class="d-flex">
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
	}
	.btn {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
		margin-top: 1rem;
	}
	.fixed_li {
		width: 15rem;
	}
	.green{
		color: #009d9e;
	}
	.red{
		color: #cf0303;
	}
</style>
