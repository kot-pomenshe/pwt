<script>
	import ShowCard from './ShowCard.svelte';
	import ShowCardAnswer from './ShowCardAnswer.svelte';
	import ShowCardResult from './ShowCardResult.svelte';
	import { goto } from '$app/navigation';

	export let data;
	let { words } = data;

	words = words.map((word) => {
		return { ...word, answer: false };
	});
	//console.log(`words: `, words);
	let current_word = 0;
	let current_step = 0;

	function remember() {
		words[current_word].answer = true;
		//words[current_word].has_studied = true;
		current_step = 1;
	}
	function dontremember() {
		words[current_word].answer = false;
		words[current_word].mistakes_amount++;
		current_step = 1;
	}
	function next() {
		current_step = 0;
		current_word++;
	}
	async function finish() {
		await fetch(window.location.href, 
		{method: "POST", body: JSON.stringify(words)});
		goto(`../choose_train`);
	}
</script>

<svelte:head>
	<title>Тренировки</title>
</svelte:head>

<section>
	{#if current_word < words.length}
		{#if current_step == 0}
			<ShowCard
				word={words[current_word]}
				on:remember = {remember}
				on:dontremember = {dontremember}
			/>
		{:else}
			<ShowCardAnswer word={words[current_word]} on:next = {next}/>
		{/if}
	{:else}
		<ShowCardResult {words} on:finish = {finish}/>
	{/if}
</section>

<style>
	section {
	background-color: #f0f0f0;
	color: #009d9e;
	nav-tabs-link-active-bg: #7cc1ac;
	display: block;
	padding: 70px 0 0 0px;
}

.card {
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
    background-color: #7cc1ac;;
    border-color: #009d9e;
}

body {
	background-color: #f0f0f0;
}

</style>
