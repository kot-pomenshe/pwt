<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<svelte:head>
	<title>Авторизация</title>
</svelte:head>

<section>
	<h1>Войти</h1>
	<div class="container">
		<form method="POST" action="?/signin">
			<div class="row mb-3">
				<label for="inputEmail3" class="col-sm-2 col-form-label">E-mail</label>
				<div class="col-sm-10">
					<input type="email" class="form-control" id="inputEmail3" name="email" />
				</div>
				{#if form?.user_not_found}<p class="error">Пользователь не найден</p>{/if}
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
				{#if form?.wrong_password}<p class="error">Неверный пароль</p>{/if}
			</div>
			<div class="flex">
				<div class="block marg-a ">
					<button type="submit" class="width10 btn btn-primary">Войти</button>
				</div>
			</div>
		</form>
		<a class="nav-link" href="./reset_password"><h6>Забыли пароль?</h6></a>
		<a class="nav-link" href="/auth/signup"><h6>Регистрация</h6></a>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 8%;
		margin-bottom: 2rem;
	}
	.flex {
		display: flex;
	}
	.block {
		display: block;
	}
	.marg-a {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
	}
	.container{
		width:60%;
		margin-bottom: 8%;
	}
	.btn{
		width: 20rem;
		margin-top: 1rem;
	}
	.width10{
		width: 100%;
	}
	.error{
		color: #8a307f;
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



</style>
