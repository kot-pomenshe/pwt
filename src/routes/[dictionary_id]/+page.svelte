<script>
	import { dictionary } from '$lib/stores';
	export let data;
	let trainings_statistics = data.trainings_statistics;
	let counted_words = data.counted_words.counted_words;
	let done_words = data.done_words.done_words;
	console.log(`K D `, counted_words, ` D `, done_words);

	function formatTime(d) {
		const date = d.getDate().toString().padStart(2, '0');
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const year = d.getFullYear();
		const h = d.getHours().toString().padStart(2, '0');
		const m = d.getMinutes().toString().padStart(2, '0');
		return `${date}.${month}.${year}, ${h}:${m}`;
	}
</script>

<svelte:head>
	<title>PWT</title>
</svelte:head>

<section>
	<div class="container">
		<div class="row justify-content-md-center">
			<h1>Personal Word Trainer</h1>
			<div class="card text-center">
				<div class="card-header"><h3>Статистика обучения</h3></div>
				<div class="card-body">
					<div class="row">
						<div class="col">
							<div class="card">
								<div class="card-body">
									<h3 class="card-title">Добавлено в словарь</h3>
									<h1 class="red">{counted_words}</h1>
									<h5 class="card-text">слов</h5>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card">
								<div class="card-body">
									<h3 class="card-title">Изучено</h3>
									<h1 class="red">{done_words}</h1>
									<h5 class="card-text">слов</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex">
				<a
					href="/{$dictionary.dictionary_id}/trainings/choose_train"
					class="btn btn-primary">Перейти к тренировкам</a
				>
			</div>
			<br />
			<div class="trainings_statistics">
				<br />

				<!-- <div class="card text-center">
					<div class="card-header"><h3>Статистика тренировок</h3></div>
					<div class="card-body">
						{#each trainings_statistics as training, i}
							<ol class="list-group list-group-horizontal">
								<li class="list-group-item fixed_li">
									{i + 1}
								</li>
								<li class="list-group-item fixed_li">Время тренировки</li>
								<li class="list-group-item fixed_li">
									{formatTime(training.date)}
								</li>
								<li class="list-group-item fixed_li">Результат</li>
								<li class="list-group-item fixed_li">{training.result}</li>
							</ol>
						{/each}
					</div>
				</div>
			-->
			</div>
		</div>
	</div>
	<br />
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 5%;
		margin-bottom: 2%;
	}
	h2 {
		text-align: center;
		margin-top: 5%;
		margin-bottom: 2%;
	}
	h3 {
		text-align: center;
		margin-top: 1%;
		margin-bottom: 2%;
	}
	h4 {
		margin-top: 3rem;
		text-align: center;
	}
	.red {
		color: #8a307f;
	}
	.btn {
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;
	}
	.flex {
		display: flex;
	}
	.montserrat {
		font-family: 'Montserrat';
		font-size: large;
	}
	section {
	background-color: #f0f0f0;
	color: #009d9e;
	nav-tabs-link-active-bg: #7cc1ac;
	display: block;
	padding: 70px 0 0 0px;
}
.fixed_li{
	width:21rem;
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
			width: 40vw;
			font-size: 3vw;
		}
	}
	@media(max-width:480px){
		.fixed_li{
			width: 61vw;
			font-size: 2.5vw;
		}
	}
</style>
