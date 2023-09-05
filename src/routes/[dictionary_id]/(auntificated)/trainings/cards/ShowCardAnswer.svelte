<script>
	export let word;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<h1>Ответ</h1>
<div class="d-flex">
	<div class="card" style="width: 18rem;">
		<img src={`/` + word.path} class="card-img-top" alt="картинка к слову" />
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
			{:else}
			<img
				src="/icons/x-circle-fill.svg"
				width="30"
				height="24"
				class="card-img-top"
				alt="неверно"
			/>
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
	}
</style>
