<script>
	export let word;
	let picturepath = word.picturepath;
	//console.log(`Picturepath: `, picturepath);
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<h1>Выберите ответ</h1>
<div class="d-flex">
	<div class="card" style="width: 18rem;">
		<img src={picturepath} class="card-img-top" alt="картинка к слову" />
		<div class="card-body">
			<h5 class="card-title">{word.name1}</h5>
			<p class="card-text">[{word.transcription}]</p>
			<button on:click={() => dispatch('remember')} class="btn btn-primary">Помню</button>
			<button on:click={() => dispatch('dontremember')} class="btn btn-primary"
				>Не помню</button
			>
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
