<script>
	import { words, cathegories } from '$lib/stores';
	export let data;
	import {goto} from '$app/navigation';
	import { current_component } from 'svelte/internal';
	$words = data.words.word_data;
	$cathegories = data.cathegories.cathegories;

	let search_word = '';
	function extractSearchTerms(word) {
		return word.word11.toLowerCase();
	}
	function filterWords(search_word) {
		let res = $words;
		res = res.filter((v) => extractSearchTerms(v).includes(search_word.toLowerCase()));
		return res;
	}
	$: filteredList = filterWords(search_word);

	let search_cathegory = '';
	function extractSearchCathegory(cathegory) {
		return cathegory.name.toLowerCase();
	}
	function filterCathegory(search_cathegory) {
		let res = $cathegories;
		res = res.filter((v) => extractSearchCathegory(v).includes(search_cathegory.toLowerCase()));
		//console.log(`res `, res);
		return res;
	}
	$: filteredCathegory = filterCathegory(search_cathegory);

	//console.log(`CURRENT CTG `, filteredCathegory);
	async function delete_word(translation_id) {
		await fetch(window.location.href, 
		{method: "DELETE", body: JSON.stringify(translation_id)});
		goto(`../words/dictionary`);
	}
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	
	<div class="container flex">
		<div class="inlb-left">
			
			<div class="accordion fixed_li2" id="accordionExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingOne">
						<button
							class="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							aria-expanded="true"
							aria-controls="collapseOne"
						>
							<h5>Категории</h5>
						</button>
					</h2>
					<div
						id="collapseOne"
						class="accordion-collapse collapse show"
						aria-labelledby="headingOne"
						data-bs-parent="#accordionExample"
					>
						<div class="accordion-body">
							<div class="inlb ">
								<form class="d-flex">
									<input
										class="form-control me-2"
										type="search"
										placeholder="Поиск"
										aria-label="Search"
										bind:value={search_cathegory}
									/>
									<a href="./import_cathegory" class="btn btn-primary"
										><img
											src="/icons/arrow-bar-down.svg"
											alt="Скачать"
											height="18"
										/></a
									>
								</form>
								<a href="./add_cathegory" class="btn btn-primary"
									><img
										src="/icons/plus-lg.svg"
										alt="+"
										height="18"
									/></a
								>
							</div>
							<br />
							<div>
								{#each filteredCathegory as cathegory}
									<ul class="list-group list-group-horizontal">
										<li class="list-group-item fixed_li2">
											<label class="form-check-label" for="flexRadioDefault1">
												{cathegory.name}
											</label>
										</li>
										<li class="list-group-item">
											<a
												class="nav-link"
												href="./update_cathegory/{cathegory.cathegory_id}"
												><img
													src="/icons/pencil-square.svg"
													alt="Редактировать"
													width="30"
													height="24"
												/></a
											>
										</li>
									</ul>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br />
		<div class="inlb-right">
			<h1>Словарь</h1>
			<div class="inlb ">
				<form class="d-flex">
					<input
						class="form-control me-2 fixed_li3"
						type="search"
						placeholder="Поиск"
						aria-label="Search"
						bind:value={search_word}
					/>
					<button class="btn btn-outline-success" type="submit"
						><img
							src="/icons/search.svg"
							alt="Поиск"
							height="18"
						/></button
					>
				</form>
				<a href="./add_word" class="btn btn-primary"
					><img
						src="/icons/plus-lg.svg"
						alt="+"
						height="18"
					/></a
				>
			</div>
			<br />
			<div class="dictionary">
				{#each filteredList as word_each}
					<ul class="list-group list-group-horizontal">
						<li class="list-group-item fixed_li">
							<a class="nav-link" href="./show_word/{word_each.translation_id}"
								>{word_each.word11}</a
							>
						</li>
						<li class="list-group-item fixed_li">[{word_each.transcription}]</li>
						<li class="list-group-item fixed_li">{word_each.word12}</li>
						<li class="list-group-item">
							{#if word_each.has_studied}
								<img
									src="/icons/check-circle-fill.svg"
									alt="Изучено"
									width="30"
									height="24"
								/>
							{:else}
								<img
									src="/icons/circle.svg"
									alt="Не изучено"
									width="30"
									height="24"
								/>
							{/if}
						</li>
						<li class="list-group-item">
							<button on:click={() => delete_word(word_each.translation_id)} type="button" 
								id="btn-submit-dict" class="btn btn-primary btn_white small_btn"
								><img
									src="/icons/trash_red.svg"
									alt="Удалить"
									width="30"
									height="24"
								/></button
							>
						</li>
					</ul>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		padding: 0 0 20px 0;
	}
	h4 {
		margin-top: 1rem;
	}
	h5{
	color:#009d9e;
}
.accordion-button{
	background-color: #d5ece6;
}
	.inlb {
		display: flex;
	}
	.fixed_li {
		width: 15rem;
	}
	.fixed_li2 {
		width: 19rem;
	}
	.fixed_li3 {
		width: 47rem;
	}
	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.inlb_left {
		float: left;
	}
	.accordion{
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.inlb_right {
		float: right;
	}
	.btn_white {
		background-color: #ffffff;
	}
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



	@media(max-width:1500px){
		.fixed_li{
			width: 12rem;
			
		}
		.fixed_li3{
			width: 39rem;
			
		}
	}
	@media(max-width:1200px){
		.fixed_li{
			width: 12rem;
			font-size: 5vw;
		}
	}
	@media(max-width:1000px){
		.fixed_li{
			width: 40vw;
			font-size: 3vw;
		}
	}
	@media(max-width:768px){
		.fixed_li{
			width: 31vw;
			font-size: 3.5vw;
		}
	}
	@media(max-width:480px){
		.fixed_li{
			width: 19vw;
			font-size: 4vw;
		}
		.fixed_li2{
			width: 95vw;
		}
		.fixed_li3{
			width: 70vw;
		}
		img{
			height: 3vw;
		}
		.small_btn{
			height: 10vw;
		}
	}
</style>
