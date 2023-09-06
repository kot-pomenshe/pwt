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
		<div class="row justify-content-md-center">
			<div class="photo">
				<img src="/files/pwt.svg" alt="main picture" width="100%" />
			</div>

			<h1>Твоя возможность тренировать слова любых иностранных языков</h1>
			<hr>
			<h1>Personal Word Trainer</h1>
			<div class="col col-lg-4 montserrat">
				<p>Данный сайт поможет вам в изучении слов иностранных языков.</p>
				<p>Наша главная особенность - возможность изучения любого языка.</p>
				<p>
					Создавайте свои словари и добавляйте туда нужные слова, либо же пользуйся уже
					готовыми наборами.
				</p>
			</div>
			<div class="col col-lg-1" />
			<div class="col col-lg-4">
				<img src="mp.jpg" class="rounded" alt="main picture" height="250" />
			</div>
			<br />
			
			<div class="flex"><a href="/auth/signup" class="btn btn-primary">Регистрация</a></div>
			<h4 class="red">Начни обучение прямо сейчас</h4>

			<hr>
			<div class="flex">
				<div class="center">
					<br />
					<div
						id="carouselExampleControls"
						class="carousel slide"
						data-bs-ride="carousel"
					>
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
			<hr>
			<div class="card montserrat">
				<div class="card-header"><h7>Статистика использования сервиса</h7></div>
				<div class="card-body">
				<p>Пользователей на сайте: {users}</p>
				<p> Всего слов добавлено: {words}</p>
				<p>Выполнено тернировок: {trainings}</p>
			</div>
			</div>
		</div>
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
	}
	.flex {
		display: flex;
	}
	.center {
		margin: auto;
	}
	.montserrat {
		font-family: 'Montserrat';
		font-size: large;
	}
	.photo{
		margin-top: 8%;
	}
</style>
