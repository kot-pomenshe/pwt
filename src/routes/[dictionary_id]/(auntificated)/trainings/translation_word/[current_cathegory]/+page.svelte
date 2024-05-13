<script>
	import ShowCard from './ShowCard.svelte';
	import ShowCardAnswer from './ShowCardAnswer.svelte';
	import ShowCardResult from './ShowCardResult.svelte';
	import { goto } from '$app/navigation';
	export let form;

	export let data;
	let { words, second_words } = data;

	words = words.map((word) => {
		return { ...word, answer: false, selected_answer: ''};
	});
	//console.log(`words: `, words);

	function shuffle(array) {
		let currentIndex = array.length, randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
		}

		return array;
	}


	function popChoose(choices){
		const index = Math.floor(Math.random() * choices.length);
		const chosen = choices[index];
		choices.splice(index, 1);
		return chosen;
	}

	function fill_variants(correct_word){
		let all_words = structuredClone(second_words).filter(i=>i!=correct_word);
		let variants = [correct_word];
		//console.log(`allwrds `, all_words);
		for (let i of Array(3).keys()){
			variants.push(popChoose(all_words));
		}
		//console.log(`variants `, variants);
		return shuffle(variants);
	}

	let current = {
		word: 0,
		step: 0,
		variants: fill_variants(words[0].name1),
	}
	

	function nextword(selected_answer) {
		//console.log(`ntwrd `, selected_answer);
		words[current.word].selected_answer = selected_answer;
		//console.log(`verny otvet  `, words[current.word]);
		if(words[current.word].selected_answer == words[current.word].name1){
			words[current.word].answer = true;
			words[current.word].has_studied = true;
		}
		else{
			words[current.word].answer = false;
			words[current.word].mistakes_amount++;
		}
		current.step = 1;
	}
	function next() {
		current.step = 0;
		current.word++;
		current.variants = fill_variants(words[current.word].name1);
	}
	async function finish() {
		for (let i of words) {
			i.picturepath = '';
		}
		
		await fetch(window.location.href, 
		{method: "POST", body: JSON.stringify(words)});
		goto(`../choose_train`);
	}

	if(form?.less_words){
		//alert('Недостаточно слов');
		//<p>Недостаточно слов</p>
	}
</script>

<svelte:head>
	<title>Тренировки</title>
</svelte:head>

<section>
	{#if current.word < words.length}
		{#if current.step == 0}
			<ShowCard
				word={words[current.word]} variants = {current.variants}
				on:nextword = {(e) => nextword(e.detail)}
			/>
		{:else}
			<ShowCardAnswer word={words[current.word]} on:next = {next}/>
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
