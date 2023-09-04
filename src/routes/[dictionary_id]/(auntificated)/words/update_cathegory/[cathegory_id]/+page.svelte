<script>
	import{goto} from '$app/navigation';
	export let data;
	let words = data.words;
	let cathegory_info = data.cathegory_info.cathegory_info;
	let is_author = data.is_author;
	//console.log(`words_info `, words);

	async function update_cathegory(){
		await fetch(window.location.href, 
		{method: "POST", body: JSON.stringify(words)});
		goto(`../dictionary`);
	}
	
	let search_word = '';
	function extractSearchTerms(word) {
		return word.word11.toLowerCase();
	}
	function filterWords(search_word) {
		let res = words;
		res = res.filter((v) => extractSearchTerms(v).includes(search_word.toLowerCase()));
		return res;
	}
	$: filteredList = filterWords(search_word);


</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<h1>Редактировать категорию</h1>
	<div class="container">
		<h4>{cathegory_info.name}</h4>
		<h5>ID: {cathegory_info.cathegory_id}</h5>
		<h7>Идентификатор категории. Его можно отправить другу, чтобы поделиться катеорией</h7>
		<h6>Автор категори: {cathegory_info.author_name}</h6>
		<hr />
		<br />
		<form class="d-flex">
			<input
				class="form-control me-2"
				type="search"
				placeholder="Слово для добавления"
				aria-label="Search"
				bind:value={search_word}
			/>
			<button class="btn btn-outline-success" type="submit"
				><img
					src="/icons/search.svg"
					alt="Logo"
					height="18"
				/></button
			>
		</form>
		<br />
		{#each filteredList as word}
		<div class="form-check">
			<input class="form-check-input" disabled = {!is_author} type="checkbox" bind:checked="{word.belongs_to_cathegory}" id="{word.translation_id}" />
			<label class="form-check-label" for={word.translation_id}> {word.word11} - {word.word12} </label>
		</div>
		{/each}

		<br />
		<div class="col-md-12">
			<button on:click={update_cathegory} type="submit" id="btn-submit-dict" class="btn btn-primary">Сохранить</button>
		</div>
	</div>

	<br />
</section>

<style>
	h1 {
		text-align: center;
		padding: 0 0 20px 0;
	}
	h5 {
		color: #161616;
	}
	#btn-submit-dict {
		margin: 0 0 20px 0;
	}
</style>
