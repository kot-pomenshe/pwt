<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<svelte:head>
	<title>Регистрация</title>
</svelte:head>

<section>
	<h1>Создать аккаунт</h1>
	<div class="container">
		<form method="POST" use:enhance action="?/signup">
			<div class="row mb-3">
				<label for="inputEmail3" class="col-sm-2 col-form-label">Логин</label>
				<div class="col-sm-10">
					<input type="login" class="form-control" id="inputEmail3" name="login" />
				</div>
			</div>
			<div class="row mb-3">
				<label for="inputEmail3" class="col-sm-2 col-form-label">e-mail</label>
				<div class="col-sm-10">
					<input type="email" class="form-control" id="inputEmail3" name="email" />
				</div>
			</div>
			<div class="row mb-3">
				<label for="inputPassword3" class="col-sm-2 col-form-label">Пароль</label>
				<div class="col-sm-10">
					<input
						type="password"
						class="form-control"
						id="inputPassword3"
						name="password"
					/>
				</div>
			</div>
			<div class="row mb-3">
				{#if form?.passw_different}
					<label for="inputPassword3" class="col-sm-2 col-form-label"
						>Пароли не совпадают</label
					>
				{:else}
					<label for="inputPassword3" class="col-sm-2 col-form-label"
						>Повторите пароль</label
					>
				{/if}

				<div class="col-sm-10">
					<input
						type="password"
						class="form-control"
						id="inputPassword3"
						name="password_repeat"
					/>
				</div>
			</div>
			<div class="flex">
				<button type="submit" class="btn btn-primary">Зарегистрироваться</button>
			</div>
		</form>
		<div class="flex">
			<p>Уже есть аккаунт?</p>
		</div>
		<div class="flex">
			<a class="nav-link" href="/auth/signin"><h6>Вход</h6></a>
		</div>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 5%;
		margin-bottom: 2%;
	}
	.btn {
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;
	}
	.flex {
		display: flex;
	}
	p{
		margin-left: auto;
		margin-right: auto;
		margin-top: 1rem;
	}
	a{
		margin-left: auto;
		margin-right: auto;
	}
</style>
