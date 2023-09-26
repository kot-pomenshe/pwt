<script>
	import Header from './Header.svelte';
	export let data;
	let users = data.statistics_info.users;
	let trainings = data.statistics_info.trainings;
	let words = data.statistics_info.words;
</script>

<svelte:head>
	<title>PWT</title>
</svelte:head>

<Header />

<section>
	<div class="container">
		<div class="photo">
			<img src="/files/pwt.svg" alt="main picture" width="100%" />
			<h1 class="montserrat">Твоя возможность тренировать слова любых иностранных языков</h1>
			<hr />
			<h1 class="montserrat">Personal Word Trainer</h1>
			<br />
		</div>

		<div class="flex">
			<div class="inlb_left">
				<div class="montserrat large">
					<p>Данный сайт поможет тебе в изучении слов иностранных языков.</p>
					<p>Наша главная особенность — возможность изучения любого языка.</p>
					<p>
						Создавай свои словари и добавляй туда нужные слова, либо же пользуйся уже
						готовыми наборами.
					</p>
				</div>
			</div>

			<div class="inlb_right">
				<img src="mp.jpg" class="rounded" alt="main picture" height="250" />
			</div>
		</div>

		<div class="flex">
			<a href="/auth/signup" class="btn btn-primary montserrat">Регистрация</a>
		</div>
		<h4 class="red montserrat">Начни обучение прямо сейчас</h4>

		<hr />

		<div class="flex">
			<div class="center">
				<br />
				<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-inner">
						<div class="carousel-item active">
							<img src="/files/cardt.jpg" class="d-block w-100" alt="pic1" />
						</div>
						<div class="carousel-item">
							<img src="/files/st.jpg" class="d-block w-100" alt="pic2" />
						</div>
						<div class="carousel-item">
							<img src="/files/aw.jpg" class="d-block w-100" alt="pic3" />
						</div>
						<div class="carousel-item">
							<img src="/files/th.jpg" class="d-block w-100" alt="pic3" />
						</div>
						<div class="carousel-item">
							<img src="/files/dict.jpg" class="d-block w-100" alt="pic4" />
						</div>
						<div class="carousel-item">
							<img src="/files/sw.jpg" class="d-block w-100" alt="pic5" />
						</div>
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleControls"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true" />
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleControls"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true" />
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<br />
		</div>
		<br />
		<!-- <hr />
		<div class="card montserrat">
			<div class="card-header montserrat"><h7>Статистика использования сервиса</h7></div>
			<div class="card-body montserrat">
				<p>Пользователей на сайте: {users}</p>
				<p>Всего слов добавлено: {words}</p>
				<p>Выполнено тренировок: {trainings}</p>
			</div>
		</div>
		-->
	</div>
	<br />
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 5%;
		margin-bottom: 3%;
	}
	h4 {
		margin-top: 1rem;
		margin-bottom: 3rem;
		text-align: center;
	}
	.red {
		color: #8a307f;
	}
	.btn {
		margin-top: 4rem;
		margin-left: auto;
		margin-right: auto;
		--bs-btn-color: #f0f0f0;
		--bs-btn-bg: #009d9e;
		--bs-btn-border-color: #f0f0f0;
	}
	.btn:hover {
		color: #161616;
		background-color: #7cc1ac;
		border-color: #009d9e;
	}
	.flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.inlb_left {
		width: 50%;
	}
	.inlb_right {
		width: 40%;
	}
	.center {
		margin: auto;
	}
	.montserrat {
		font-family: 'Montserrat';
	}
	.large {
		font-size: large;
	}
	.photo {
		margin-top: 8%;
	}
	@media (max-width: 1000px) {
		.inlb_left {
			width: 100vw;
		}
		.inlb_right {
			width: 100vw;
		}
	}
</style>
