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
	console.log(`words: `, words);
	let current_word = 0;
	let current_step = 0;

	function remember() {
		words[current_word].answer = true;
		words[current_word].has_studied = true;
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
</style>
